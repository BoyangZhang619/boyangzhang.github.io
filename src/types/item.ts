export type NavItemStatus =
  | 'active'
  | 'limited'
  | 'inactive'
  | 'beta'
  | 'deprecated'

export type NavCategoryId =
  | 'game'
  | 'tool'
  | 'image'
  | 'music'
  | 'algorithm'
  | 'experiment'
  | 'festival'

export type LayoutType =
  | 'showcase-hero'
  | 'tool-workbench'
  | 'algo-lab'
  | 'audio-stage'
  | 'festive-card'
  | 'disabled-state'

export type PreviewType =
  | 'mockup'
  | 'tool-panel'
  | 'diagram'
  | 'waveform'
  | 'locked'
  | 'ornament'
  | 'app-dashboard'
  | 'timeline-card'
  | 'festival-generator'
  | 'locked-card'
  | 'text-style-grid'
  | 'image-transform'
  | 'tree-diagram'
  | 'keyboard-wave'
  | 'sorting-bars'
  | 'ascii-grid'
  | 'step-sequencer'
  | 'kalimba-panel'
  | 'pixel-grid'
  | 'dither-preview'
  | 'path-grid'
  | 'before-after'
  | 'arcade-grid'

export type MoodType =
  | 'playful'
  | 'productive'
  | 'calm'
  | 'festive'
  | 'locked'
  | 'focused'
  | 'experimental'
  | 'structured'
  | 'rhythmic'
  | 'analytical'
  | 'digital'
  | 'systematic'

export interface NavItem {
  id: string
  href: string
  icon: string
  title: string
  desc: string
  tags: string[]

  badge?: string
  badgeColor?: string
  badgeTone?: string

  status: NavItemStatus
  createTime?: string | null
  updateTime?: string | null
  banMsg?: string
  statusNote?: string

  category?: NavCategoryId
  group?: string
  featured?: boolean
  priority?: number

  theme?: string
  layout?: LayoutType
  accent?: string
  previewType?: PreviewType

  features?: string[]
  searchKeywords?: string[]
  ctaText?: string
  secondaryText?: string

  mood?: MoodType
  availability?: string
  order?: number

  relatedIds?: string[]
}