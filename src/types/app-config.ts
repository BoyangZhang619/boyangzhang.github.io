import type { NavigationConfig } from './navigation'
import type { NavItem } from './item'
import type { AppSettings } from './settings'
import type { ThemePresetMap } from './theme'
import type { SectionPresetMap } from './section'
import type { SiteConfig, ProfileConfig, HeroConfig, FooterConfig, CategoryConfig } from './site'

export interface BadgePreset {
  bg: string
  border: string
  text: string
}

export type BadgePresetMap = Record<string, BadgePreset>

export interface AppDataSchema {
  version: string
  site: SiteConfig
  profile: ProfileConfig
  navigation: NavigationConfig
  hero: HeroConfig
  footer: FooterConfig
  categories: CategoryConfig[]
  badgePresets: BadgePresetMap
  themePresets: ThemePresetMap
  sectionPresets: SectionPresetMap
  items: NavItem[]
  settings: AppSettings
}