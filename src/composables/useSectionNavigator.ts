import { computed, ref } from 'vue'
import type { SectionViewModel } from '@/types/view-model'

export function useSectionNavigator(sectionsSource: () => SectionViewModel[]) {
  const activeSectionId = ref<string>('header')

  const sections = computed(() => sectionsSource())

  const allAnchors = computed(() => {
    return ['header', ...sections.value.map((section: SectionViewModel) => section.anchor), 'footer']
  })

  function setActiveSection(id: string) {
    activeSectionId.value = id
  }

  function getSectionIndexById(id: string): number {
    return allAnchors.value.findIndex((anchor: string) => anchor === id)
  }

  function scrollToElementById(id: string) {
    const el = document.getElementById(id)
    if (!el) return

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  function goToHeader() {
    setActiveSection('header')
    scrollToElementById('header')
  }

  function goToFooter() {
    setActiveSection('footer')
    scrollToElementById('footer')
  }

  function goToSection(id: string) {
    const targetId = id.startsWith('section-') ? id : `section-${id}`
    setActiveSection(targetId)
    scrollToElementById(targetId)
  }

  function goNext() {
    const currentIndex = getSectionIndexById(activeSectionId.value)
    if (currentIndex < 0) return

    const nextId = allAnchors.value[currentIndex + 1]
    if (!nextId) return

    setActiveSection(nextId)
    scrollToElementById(nextId)
  }

  function goPrevious() {
    const currentIndex = getSectionIndexById(activeSectionId.value)
    if (currentIndex <= 0) return

    const prevId = allAnchors.value[currentIndex - 1]
    if (!prevId) return

    setActiveSection(prevId)
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