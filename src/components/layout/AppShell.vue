<script setup lang="ts">
import { ref, type PropType } from 'vue'
import type { SiteConfig, ProfileConfig, HeroConfig, FooterConfig, CategoryConfig } from '@/types/site'
import type { NavigationConfig } from '@/types/navigation'
import type { AppSettings } from '@/types/settings'
import type { SectionViewModel } from '@/types/view-model'

import TopBar from '@/components/layout/TopBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
import RightDrawer from '@/components/layout/RightDrawer.vue'
import HeaderSection from '@/components/header/HeaderSection.vue'
import BodySectionList from '@/components/section/BodySectionList.vue'
import FooterSection from '@/components/footer/FooterSection.vue'

const drawerOpen = ref(false)

function openDrawer() {
  drawerOpen.value = true
}

function closeDrawer() {
  drawerOpen.value = false
}

defineProps({
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
</script>

<template>
  <div class="app-shell">
    <TopBar
      :site="site"
      :config="navigation.topbar"
      :active-section-id="navigator.activeSectionId.value"
      @go-home="navigator.goToHeader"
    />

    <SideBar
      :config="navigation.sidebar"
      :sections="sections"
      :categories="categories"
      :active-section-id="navigator.activeSectionId.value"
      @jump="navigator.goToSection"
    />

    <RightDrawer
      :config="navigation.drawer"
      :profile="profile"
      :stats="stats"
      :settings="settings"
    />

    <main class="app-shell__main">
      <HeaderSection
        :site="site"
        :hero="hero"
        :stats="stats"
        :quick-nav-sections="heroQuickNavSections"
        @jump="navigator.goToSection"
        @go-body="() => sections[0] && navigator.goToSection(sections[0].id)"
      />

      <BodySectionList
        :sections="sections"
        @jump="navigator.goToSection"
        @next="navigator.goNext"
        @previous="navigator.goPrevious"
      />

      <FooterSection
        :footer="footer"
        @go-top="navigator.goToHeader"
      />
    </main>
  </div>
</template>

<style scoped lang="scss">
.app-shell {
  min-height: 100vh;
  background: #0f1117;
  color: #fff;
}

.app-shell__main {
  position: relative;
}
</style>