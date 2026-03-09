import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

interface UseActiveSectionOptions {
  ids: Ref<string[]>
  onChange?: (id: string) => void
  rootMargin?: string
  threshold?: number | number[]
}

export function useActiveSection(options: UseActiveSectionOptions) {
  const currentActiveId = ref<string>('header')
  let observer: IntersectionObserver | null = null

  function setActive(id: string) {
    currentActiveId.value = id
    options.onChange?.(id)
  }

  function disconnect() {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  function observe() {
    disconnect()

    if (!options.ids.value.length) return

    observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (!visibleEntries.length) return

        const best: any = visibleEntries[0]
        const id = (best.target as HTMLElement).id
        if (id) setActive(id)
      },
      {
        root: null,
        rootMargin: options.rootMargin ?? '-20% 0px -35% 0px',
        threshold: options.threshold ?? [0.2, 0.35, 0.5, 0.7]
      }
    )

    for (const id of options.ids.value) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  }

  onMounted(() => {
    observe()
  })

  onBeforeUnmount(() => {
    disconnect()
  })

  return {
    currentActiveId,
    observe,
    disconnect,
    setActive
  }
}