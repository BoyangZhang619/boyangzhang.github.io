import type { LayoutType, PreviewType } from './item'

export type SectionAlignType =
  | 'split'
  | 'center'
  | 'center-split'

export type SectionContentWidth =
  | 'medium'
  | 'wide'
  | 'full'

export type SectionMotionType =
  | 'fade-up-stagger'
  | 'slide-fade'
  | 'grid-rise'
  | 'pulse-fade'
  | 'float-fade'
  | 'slow-fade'

export interface SectionPreset {
  align: SectionAlignType
  contentWidth: SectionContentWidth
  previewType: PreviewType
  showFeatureList: boolean
  showMetaBar: boolean
  motion: SectionMotionType
}

export type SectionPresetMap = Record<LayoutType, SectionPreset>