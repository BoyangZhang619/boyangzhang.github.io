import { onBeforeUnmount, onMounted } from 'vue'

interface UseDampingScrollOptions {
  enabled?: () => boolean
  goNext: () => void
  goPrevious: () => void
  cooldownMs?: number
  threshold?: number
}

export function useDampingScroll(options: UseDampingScrollOptions) {
  let wheelLock = false
  let accumulatedDelta = 0
  let cooldownTimer: number | null = null

  const threshold = options.threshold ?? 90
  const cooldownMs = options.cooldownMs ?? 700

  function isInteractiveElement(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) return false

    return Boolean(
      target.closest(
        'input, textarea, select, button, a, [contenteditable="true"], .right-drawer'
      )
    )
  }

  function shouldIgnore(event: WheelEvent) {
    if (options.enabled && !options.enabled()) return true
    if (wheelLock) return true
    if (event.ctrlKey || event.metaKey || event.shiftKey) return true
    if (isInteractiveElement(event.target)) return true
    return false
  }

  function lockWheel() {
    wheelLock = true

    if (cooldownTimer) {
      window.clearTimeout(cooldownTimer)
    }

    cooldownTimer = window.setTimeout(() => {
      wheelLock = false
      accumulatedDelta = 0
    }, cooldownMs)
  }

  function onWheel(event: WheelEvent) {
    if (shouldIgnore(event)) return

    const absX = Math.abs(event.deltaX)
    const absY = Math.abs(event.deltaY)

    if (absY <= absX) return

    accumulatedDelta += event.deltaY

    if (Math.abs(accumulatedDelta) < threshold) return

    event.preventDefault()

    if (accumulatedDelta > 0) {
      options.goNext()
    } else {
      options.goPrevious()
    }

    accumulatedDelta = 0
    lockWheel()
  }

  onMounted(() => {
    window.addEventListener('wheel', onWheel, { passive: false })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('wheel', onWheel)

    if (cooldownTimer) {
      window.clearTimeout(cooldownTimer)
    }
  })
}