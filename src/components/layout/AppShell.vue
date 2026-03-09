<script setup lang="ts">
import { computed, nextTick, onMounted, ref, toRef, toRefs, watch, type PropType } from 'vue'
import type { SiteConfig, ProfileConfig, HeroConfig, FooterConfig, CategoryConfig } from '@/types/site'
import type { NavigationConfig } from '@/types/navigation'
import type { AppSettings } from '@/types/settings'
import type { SectionViewModel } from '@/types/view-model'

import { useActiveSection } from '@/composables/useActiveSection'
import { useSearch } from '@/composables/useSearch'
import { useDampingScroll } from '@/composables/useDampingScroll'
import { useTheme } from '@/composables/useTheme'

import TopBar from '@/components/layout/TopBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
import RightDrawer from '@/components/layout/RightDrawer.vue'
import HeaderSection from '@/components/header/HeaderSection.vue'
import BodySectionList from '@/components/section/BodySectionList.vue'
import FooterSection from '@/components/footer/FooterSection.vue'
import SearchPanel from '@/components/search/SearchPanel.vue'

const drawerOpen = ref(false)

function openDrawer() {
  drawerOpen.value = true
}

function closeDrawer() {
  drawerOpen.value = false
}

const { toggleTheme } = useTheme()

function handleRandomJump() {
  if (!sections.value.length) return

  const candidates = sections.value.filter((section) => section.flags.visible)
  if (!candidates.length) return

  const currentId = navigator.value.activeSectionId.value
  const filtered = candidates.filter((section) => section.anchor !== currentId)
  const pool = filtered.length ? filtered : candidates

  const picked = pool[Math.floor(Math.random() * pool.length)]
  if (!picked) return
  navigator.value.goToSection(picked.id)
}
const props = defineProps({
  site: {
    type: Object as PropType<SiteConfig>,
    required: true
  },
  profile: {
    type: Object as PropType<ProfileConfig>,
    required: true
  },
  navigation: {
    type: Object as PropType<NavigationConfig>,
    required: true
  },
  hero: {
    type: Object as PropType<HeroConfig>,
    required: true
  },
  footer: {
    type: Object as PropType<FooterConfig>,
    required: true
  },
  settings: {
    type: Object as PropType<AppSettings>,
    required: true
  },
  sections: {
    type: Array as PropType<SectionViewModel[]>,
    required: true
  },
  categories: {
    type: Array as PropType<CategoryConfig[]>,
    required: true
  },
  heroQuickNavSections: {
    type: Array as PropType<SectionViewModel[]>,
    required: true
  },
  stats: {
    type: Object as PropType<Record<string, number>>,
    required: true
  },
  navigator: {
    type: Object as PropType<{
      activeSectionId: { value: string }
      goToHeader: () => void
      goToFooter: () => void
      goToSection: (id: string) => void
      goNext: () => void
      goPrevious: () => void
      setActiveSection: (id: string) => void
    }>,
    required: true
  }
})

const {
  site,
  profile,
  navigation,
  hero,
  footer,
  settings,
  sections,
  categories,
  heroQuickNavSections,
  stats,
  navigator
} = toRefs(props)

const observableIds = computed(() => {
  return ['header', ...sections.value.map((section) => section.anchor), 'footer']
})

const { observe } = useActiveSection({
  ids: observableIds,
  onChange: (id) => {
    navigator.value.setActiveSection(id)
  }
})

const {
  open: searchOpen,
  query: searchQuery,
  results: searchResults,
  openSearch,
  closeSearch
} = useSearch(sections)

function handleSearchJump(id: string) {
  closeSearch()
  navigator.value.goToSection(id)
}

useDampingScroll({
  enabled: () =>
    settings.value.enableDampingScroll &&
    !drawerOpen.value &&
    window.matchMedia('(min-width: 1024px)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  goNext: () => navigator.value.goNext(),
  goPrevious: () => navigator.value.goPrevious(),
  threshold: 96,
  cooldownMs: 720
})

onMounted(async () => {
  await nextTick()
  observe()
})

watch(
  sections,
  async () => {
    await nextTick()
    observe()
  },
  { deep: true }
)
</script>

<template>
  <div class="app-shell">
    <TopBar
  :site="site"
  :config="navigation.topbar"
  :active-section-id="navigator.activeSectionId.value"
  @go-home="navigator.goToHeader"
  @open-drawer="openDrawer"
  @open-search="openSearch"
  @toggle-theme="toggleTheme"
  @random-jump="handleRandomJump"
/>

    <!-- <SideBar
      :config="navigation.sidebar"
      :sections="sections"
      :categories="categories"
      :active-section-id="navigator.activeSectionId.value"
      @jump="navigator.goToSection"
    /> -->

    <RightDrawer :config="navigation.drawer" :profile="profile" :stats="stats" :settings="settings" />
    <SearchPanel :open="searchOpen" :query="searchQuery" :results="searchResults" @close="closeSearch"
      @jump="handleSearchJump" @update:query="searchQuery = $event" />
    <main class="app-shell__main">
      <HeaderSection :site="site" :hero="hero" :stats="stats" :quick-nav-sections="heroQuickNavSections"
        @jump="navigator.goToSection" @go-body="() => sections[0] && navigator.goToSection(sections[0].id)" />

      <BodySectionList :sections="sections" @jump="navigator.goToSection" @next="navigator.goNext"
        @previous="navigator.goPrevious" />

      <FooterSection :footer="footer" @go-top="navigator.goToHeader" />
    </main>
  </div>
</template>

<style scoped lang="scss">
.app-shell {
  max-height: 100dvh;
  background: #0f1117;
  color: #fff;
}

.app-shell__main {
  position: relative;
}
</style>