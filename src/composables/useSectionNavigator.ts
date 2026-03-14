import { computed, ref } from 'vue'
import type { SectionViewModel } from '@/types/view-model'

export function useSectionNavigator(sectionsSource: () => SectionViewModel[]) {
  const activeSectionId = ref<string>('header')

  const sections = computed(() => sectionsSource())

  const allAnchors = computed(() => {
    return ['header', ...sections.value.map((section) => section.anchor), 'footer']
  })

  function setActiveSection(id: string) {
    activeSectionId.value = id
  }

  function getSectionIndexById(id: string): number {
    return allAnchors.value.findIndex((anchor) => anchor === id)
  }

  function scrollToElementById(id: string) {
    const el = document.getElementById(id)
    if (!el) return

    activeSectionId.value = id

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  function goToHeader() {
    scrollToElementById('header')
  }

  function goToFooter() {
    scrollToElementById('footer')
  }

  function goToSection(id: string) {
    const targetId = id.startsWith('section-') ? id : `section-${id}`
    scrollToElementById(targetId)
  }

  function goNext() {
    const currentIndex = getSectionIndexById(activeSectionId.value)
    if (currentIndex < 0) return

    const nextId = allAnchors.value[currentIndex + 1]
    if (!nextId) return

    scrollToElementById(nextId)
  }

  function goPrevious() {
    const currentIndex = getSectionIndexById(activeSectionId.value)
    if (currentIndex <= 0) return

    const prevId = allAnchors.value[currentIndex - 1]
    if (!prevId) return

    scrollToElementById(prevId)
  }

  return {
    activeSectionId,
    allAnchors,
    setActiveSection,
    getSectionIndexById,
    goToHeader,
    goToFooter,
    goToSection,
    goNext,
    goPrevious
  }
}