<script setup lang="ts">
import AppShell from '@/components/layout/AppShell.vue'
import { useNavData } from '@/composables/useNavData'
import { useSectionNavigator } from '@/composables/useSectionNavigator'

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
  stats
} = useNavData()

const navigator = useSectionNavigator(() => sections.value)
</script>

<template>
  <AppShell
    :site="site"
    :profile="profile"
    :navigation="navigation"
    :hero="hero"
    :footer="footer"
    :settings="settings"
    :sections="sections"
    :categories="categories"
    :hero-quick-nav-sections="heroQuickNavSections"
    :stats="stats"
    :navigator="navigator"
  />
</template>