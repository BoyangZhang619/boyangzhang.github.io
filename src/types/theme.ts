import type { MoodType } from './item'

export type ThemePatternType =
  | 'dots'
  | 'grid'
  | 'soft-noise'
  | 'spark'
  | 'diagonal-lines'
  | 'mono-grid'
  | 'curve-flow'
  | 'node-grid'
  | 'wave'
  | 'bars'
  | 'pixel-grid'
  | 'matrix'

export interface ThemePreset {
  accent: string
  accentSoft: string
  background: string
  surface: string
  glow: string
  pattern: ThemePatternType
  mood: MoodType
}

export type ThemePresetMap = Record<string, ThemePreset>