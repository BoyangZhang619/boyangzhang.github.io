import { computed, ref } from 'vue'
import type { AppDataSchema } from '@/types/app-config'
import type { SectionViewModel } from '@/types/view-model'
import navData from '@/data/nav-data'
import { mapItemsToSections } from '@/utils/mapItemsToSections'

export function useNavData() {
  const appData = ref<AppDataSchema>(navData as AppDataSchema)

  const sections = computed<SectionViewModel[]>(() => {
    return mapItemsToSections(appData.value)
  })

  const featuredSections = computed(() => {
    return sections.value
      .filter((section: any) => section.flags.featured)
      .sort((a: any, b: any) => b.priority - a.priority)
  })

  const heroQuickNavSections = computed(() => {
    const quickNav = appData.value.hero.quickNav
    if (!quickNav) return []

    if (quickNav.source === 'manual' && quickNav.ids?.length) {
      return quickNav.ids
        .map((id: string) => sections.value.find((section: any) => section.id === id))
        .filter(Boolean) as SectionViewModel[]
    }

    if (quickNav.source === 'latest') {
      return [...sections.value]
        .sort((a, b) => {
          const aTime = a.meta.updateTime ? new Date(a.meta.updateTime).getTime() : 0
          const bTime = b.meta.updateTime ? new Date(b.meta.updateTime).getTime() : 0
          return bTime - aTime
        })
        .slice(0, quickNav.max)
    }

    return featuredSections.value.slice(0, quickNav.max)
  })

  const categories = computed(() => appData.value.categories)

  const site = computed(() => appData.value.site)
  const profile = computed(() => appData.value.profile)
  const navigation = computed(() => appData.value.navigation)
  const hero = computed(() => appData.value.hero)
  const footer = computed(() => appData.value.footer)
  const settings = computed(() => appData.value.settings)

  const stats = computed(() => {
    const total = sections.value.length
    const active = sections.value.filter((s: any) => s.meta.status === 'active').length
    const limited = sections.value.filter((s: any) => s.meta.status === 'limited').length
    const inactive = sections.value.filter((s: any) => s.meta.status === 'inactive').length
    const featured = sections.value.filter((s: any) => s.flags.featured).length

    return {
      total,
      active,
      limited,
      inactive,
      featured,
      categoryCount: categories.value.length
    }
  })

  return {
    appData,
    sections,
    featuredSections,
    heroQuickNavSections,
    categories,
    site,
    profile,
    navigation,
    hero,
    footer,
    settings,
    stats
  }
}