import type {
  LayoutType,
  NavCategoryId,
  NavItem,
  NavItemStatus,
  PreviewType,
  MoodType
} from './item'
import type { SectionAlignType, SectionContentWidth, SectionMotionType } from './section'
import type { ThemePatternType } from './theme'

export interface SectionActionState {
  primaryLabel: string
  secondaryLabel?: string
  disabled: boolean
  disabledReason?: string
  href?: string
  target?: '_self' | '_blank'
}

export interface SectionMeta {
  createTime?: string | null
  updateTime?: string | null
  tags: string[]
  badge?: string
  badgeTone?: string
  status: NavItemStatus
  statusText: string
  statusNote?: string
}

export interface SectionThemeResolved {
  name: string
  accent: string
  accentSoft: string
  background: string
  surface: string
  glow: string
  pattern: ThemePatternType
  mood: MoodType
}

export interface SectionLayoutResolved {
  name: LayoutType
  align: SectionAlignType
  contentWidth: SectionContentWidth
  previewType: PreviewType
  motion: SectionMotionType
  showFeatureList: boolean
  showMetaBar: boolean
}

export interface SectionNavigationLink {
  id: string
  title: string
}

export interface SectionRelation {
  relatedIds: string[]
  previous?: SectionNavigationLink
  next?: SectionNavigationLink
}

export interface SectionRuntimeFlags {
  clickable: boolean
  visible: boolean
  featured: boolean
  searchable: boolean
  showInSidebar: boolean
}

export interface SectionViewModel {
  index: number
  sectionId: string
  anchor: string

  raw: NavItem

  id: string
  href: string
  icon: string
  title: string
  desc: string

  category: NavCategoryId
  group?: string

  theme: SectionThemeResolved
  layout: SectionLayoutResolved
  meta: SectionMeta

  features: string[]
  keywords: string[]

  actions: SectionActionState
  relations: SectionRelation
  flags: SectionRuntimeFlags

  priority: number
  order: number
}