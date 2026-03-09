export interface TopBarAction {
  label?: string
  action: string
  icon?: string
}

export interface TopBarConfig {
  enabled: boolean
  fixed: boolean
  icon: string
  title: string
  showSearch: boolean
  searchPlaceholder: string
  showMoreButton: boolean
  moreButtonIcon: string
  quickActions?: string[]
}

export interface SideBarConfig {
  enabled: boolean
  collapsedByDefault: boolean
  triggerMode: 'hover-or-click' | 'hover' | 'click'
  showProgressDots: boolean
  showCategoryList: boolean
  showSectionIndex: boolean
  groupBy: 'category' | 'group' | 'none'
  highlightCurrentSection: boolean
}

export interface DrawerSectionConfig {
  id: string
  title: string
  type: 'profile' | 'stats' | 'preferences' | 'links'
}

export interface DrawerConfig {
  id: string
  title: string
  placement: 'right' | 'left'
  width: number
  sections: DrawerSectionConfig[]
}

export interface NavigationConfig {
  topbar: TopBarConfig
  sidebar: SideBarConfig
  drawer: DrawerConfig
}