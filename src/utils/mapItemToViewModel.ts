import type { AppDataSchema } from '@/types/app-config'
import type {
  LayoutType,
  NavCategoryId,
  NavItem,
  NavItemStatus,
  PreviewType
} from '@/types/item'
import type { SectionViewModel } from '@/types/view-model'
import type { ThemePreset } from '@/types/theme'
import type { SectionPreset } from '@/types/section'

function inferCategoryFromTags(item: NavItem): NavCategoryId {
  const tags = item.tags ?? []

  if (tags.includes('游戏')) return 'game'
  if (tags.includes('图像')) return 'image'
  if (tags.includes('音乐')) return 'music'
  if (tags.includes('算法')) return 'algorithm'
  if (tags.includes('实验')) return 'experiment'
  if (tags.includes('节日')) return 'festival'
  if (tags.includes('工具')) return 'tool'

  return 'tool'
}

function resolveCategory(item: NavItem): NavCategoryId {
  return item.category ?? inferCategoryFromTags(item)
}

function resolveLayout(
  item: NavItem,
  category: NavCategoryId,
  appData: AppDataSchema
): LayoutType {
  if (item.layout) return item.layout

  if (item.status === 'inactive') return 'disabled-state'

  const categoryConfig = appData.categories.find((c: any) => c.id === category)
  if (categoryConfig?.defaultLayout) {
    return categoryConfig.defaultLayout as LayoutType
  }

  return 'showcase-hero'
}

function resolveThemeName(
  item: NavItem,
  category: NavCategoryId,
  appData: AppDataSchema
): string {
  if (item.status === 'inactive') return 'locked-gray'
  if (item.theme) return item.theme

  const categoryConfig = appData.categories.find((c: any) => c.id === category)
  return categoryConfig?.theme ?? 'productivity-blue'
}

function resolveThemePreset(themeName: string, appData: AppDataSchema): ThemePreset {
  return (
    appData.themePresets[themeName] ??
    appData.themePresets['productivity-blue']
  )
}

function resolveSectionPreset(
  layout: LayoutType,
  appData: AppDataSchema
): SectionPreset {
  return (
    appData.sectionPresets[layout] ??
    appData.sectionPresets['showcase-hero']
  )
}

function resolvePreviewType(
  item: NavItem,
  sectionPreset: SectionPreset
): PreviewType {
  return item.previewType ?? sectionPreset.previewType
}

function resolveStatusText(status: NavItemStatus): string {
  switch (status) {
    case 'active':
      return '可用'
    case 'limited':
      return '受限可用'
    case 'inactive':
      return '未开放'
    case 'beta':
      return '测试中'
    case 'deprecated':
      return '已归档'
    default:
      return '未知状态'
  }
}

function resolveActionState(item: NavItem) {
  const primaryLabel = item.ctaText ?? '立即进入'
  const secondaryLabel = item.secondaryText

  if (item.status === 'inactive') {
    return {
      primaryLabel,
      secondaryLabel,
      disabled: true,
      disabledReason: item.banMsg || '暂未开放',
      href: undefined,
      target: '_self' as const
    }
  }

  if (item.status === 'deprecated') {
    return {
      primaryLabel,
      secondaryLabel,
      disabled: true,
      disabledReason: '该页面已归档',
      href: undefined,
      target: '_self' as const
    }
  }

  const isExternal = /^https?:\/\//.test(item.href)

  return {
    primaryLabel,
    secondaryLabel,
    disabled: false,
    disabledReason: undefined,
    href: item.href,
    target: isExternal ? '_blank' as const : '_self' as const
  }
}

function buildKeywords(item: NavItem, category: NavCategoryId): string[] {
  const keywords = new Set<string>()

  keywords.add(item.title)
  keywords.add(item.id)
  keywords.add(category)

  for (const tag of item.tags ?? []) keywords.add(tag)
  for (const kw of item.searchKeywords ?? []) keywords.add(kw)

  return Array.from(keywords).filter(Boolean)
}

function buildFeatures(item: NavItem): string[] {
  return Array.isArray(item.features) ? item.features : []
}

export function mapItemToViewModel(
  item: NavItem,
  index: number,
  appData: AppDataSchema
): SectionViewModel {
  const category = resolveCategory(item)
  const layoutName = resolveLayout(item, category, appData)
  const themeName = resolveThemeName(item, category, appData)

  const themePreset = resolveThemePreset(themeName, appData)
  const sectionPreset = resolveSectionPreset(layoutName, appData)
  const previewType = resolvePreviewType(item, sectionPreset)

  const clickable = item.status !== 'inactive' && item.status !== 'deprecated'

  return {
    index,
    sectionId: item.id,
    anchor: `section-${item.id}`,

    raw: item,

    id: item.id,
    href: item.href,
    icon: item.icon,
    title: item.title,
    desc: item.desc,

    category,
    group: item.group,

    theme: {
      name: themeName,
      accent: item.accent ?? themePreset.accent,
      accentSoft: themePreset.accentSoft,
      background: themePreset.background,
      surface: themePreset.surface,
      glow: themePreset.glow,
      pattern: themePreset.pattern,
      mood: item.mood ?? themePreset.mood
    },

    layout: {
      name: layoutName,
      align: sectionPreset.align,
      contentWidth: sectionPreset.contentWidth,
      previewType,
      motion: sectionPreset.motion,
      showFeatureList: sectionPreset.showFeatureList,
      showMetaBar: sectionPreset.showMetaBar
    },

    meta: {
      createTime: item.createTime ?? null,
      updateTime: item.updateTime ?? null,
      tags: item.tags ?? [],
      badge: item.badge,
      badgeTone: item.badgeTone,
      status: item.status,
      statusText: resolveStatusText(item.status),
      statusNote: item.statusNote
    },

    features: buildFeatures(item),
    keywords: buildKeywords(item, category),

    actions: resolveActionState(item),

    relations: {
      relatedIds: item.relatedIds ?? [],
      previous: undefined,
      next: undefined
    },

    flags: {
      clickable,
      visible: true,
      featured: Boolean(item.featured),
      searchable: true,
      showInSidebar: true
    },

    priority: item.priority ?? 0,
    order: item.order ?? index + 1
  }
}