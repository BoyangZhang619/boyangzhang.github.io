import type { NavItemStatus } from './item'

export interface FilterDefaultConfig {
  status: NavItemStatus[]
  featuredOnly: boolean
}

export interface AppSettings {
  showTags: boolean
  showBadge: boolean
  showUpdateTime: boolean
  showCreateTime: boolean
  maxTagsDisplay: number

  enableMotion: boolean
  enableScrollSnap: boolean
  enableDampingScroll: boolean

  defaultTheme: 'dark' | 'light' | 'auto'
  sidebarCollapsed: boolean
  headerQuickCount: number

  bodyFullscreen: boolean
  bodyRenderMode: 'item-per-screen' | 'grouped'

  searchFields: string[]
  sortDefault: 'order-asc' | 'priority-desc' | 'update-desc'

  filterDefault: FilterDefaultConfig
}