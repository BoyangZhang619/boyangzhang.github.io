import type { NavCategoryId } from './item'

export interface SiteLogo {
  emoji?: string
  text?: string
  image?: string
}

export interface SiteConfig {
  id: string
  title: string
  subTitle: string
  logo: SiteLogo
  welcomeText: string
  heroNotice?: string
  locale?: string
  copyright?: string
}

export interface ProfileLink {
  label: string
  href: string
}

export interface ProfileConfig {
  name: string
  displayName: string
  avatarType?: 'emoji' | 'image'
  avatar: string
  bio: string
  statusText?: string
  location?: string
  email?: string
  links?: ProfileLink[]
}

export interface HeroAction {
  label: string
  target?: string
  action?: string
}

export interface HeroQuickNavConfig {
  source: 'featured' | 'latest' | 'manual'
  max: number
  sort: 'priority-desc' | 'update-desc' | 'order-asc'
  ids?: string[]
}

export interface HeroFunPanel {
  id: string
  type: 'stats' | 'recent-updates' | 'random-pick' | 'custom'
  title: string
}

export interface ScrollHintConfig {
  text: string
  icon?: string
}

export interface HeroConfig {
  id: string
  headline: string
  subHeadline: string
  description: string
  primaryAction?: HeroAction
  secondaryAction?: HeroAction
  quickNav?: HeroQuickNavConfig
  funPanels?: HeroFunPanel[]
  scrollHint?: ScrollHintConfig
}

export interface FooterAction {
  label: string
  action: string
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterConfig {
  id: string
  headline: string
  description: string
  actions?: FooterAction[]
  links?: FooterLink[]
}

export interface CategoryConfig {
  id: NavCategoryId
  title: string
  icon: string
  desc: string
  theme: string
  defaultLayout: string
  order: number
}
