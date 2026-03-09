import { computed, onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import type { SectionViewModel } from '@/types/view-model'

function normalize(text: string) {
  return text.trim().toLowerCase()
}

export function useSearch(sections: Ref<SectionViewModel[]>) {
  const open = ref(false)
  const query = ref('')

  const results = computed(() => {
    const q = normalize(query.value)

    if (!q) {
      return sections.value.slice(0, 8)
    }

    return sections.value
      .map((section) => {
        const haystack = [
          section.title,
          section.desc,
          section.category,
          ...section.meta.tags,
          ...section.keywords,
          ...section.features
        ]
          .join(' ')
          .toLowerCase()

        let score = 0

        if (section.title.toLowerCase().includes(q)) score += 6
        if (section.meta.tags.some((tag) => tag.toLowerCase().includes(q))) score += 4
        if (section.keywords.some((kw) => kw.toLowerCase().includes(q))) score += 3
        if (haystack.includes(q)) score += 1

        return {
          section,
          score
        }
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || b.section.priority - a.section.priority)
      .slice(0, 10)
      .map((item) => item.section)
  })

  function openSearch() {
    open.value = true
  }

  function closeSearch() {
    open.value = false
    query.value = ''
  }

  function toggleSearch() {
    open.value = !open.value
    if (!open.value) {
      query.value = ''
    }
  }

  function onKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLElement | null
    const isTyping =
      !!target &&
      !!target.closest('input, textarea, [contenteditable="true"]')

    if (event.key === '/' && !isTyping) {
      event.preventDefault()
      openSearch()
      return
    }

    if (event.key === 'Escape' && open.value) {
      event.preventDefault()
      closeSearch()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeydown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
  })

  return {
    open,
    query,
    results,
    openSearch,
    closeSearch,
    toggleSearch
  }
}