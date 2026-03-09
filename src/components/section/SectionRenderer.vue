<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { SectionViewModel } from '@/types/view-model'

import ShowcaseHeroSection from './presets/ShowcaseHeroSection.vue'
import ToolWorkbenchSection from './presets/ToolWorkbenchSection.vue'
import AlgoLabSection from './presets/AlgoLabSection.vue'
import AudioStageSection from './presets/AudioStageSection.vue'
import FestiveCardSection from './presets/FestiveCardSection.vue'
import DisabledStateSection from './presets/DisabledStateSection.vue'

const emit = defineEmits<{
  (e: 'jump', id: string): void
  (e: 'next'): void
  (e: 'previous'): void
}>()

const props = defineProps({
  section: {
    type: Object as PropType<SectionViewModel>,
    required: true
  }
})

const componentMap = {
  'showcase-hero': ShowcaseHeroSection,
  'tool-workbench': ToolWorkbenchSection,
  'algo-lab': AlgoLabSection,
  'audio-stage': AudioStageSection,
  'festive-card': FestiveCardSection,
  'disabled-state': DisabledStateSection
}

const currentComponent = computed(() => {
  return componentMap[props.section.layout.name] ?? ShowcaseHeroSection
})
</script>

<template>
  <component
    :is="currentComponent"
    :section="section"
    @jump="emit('jump', $event)"
    @next="emit('next')"
    @previous="emit('previous')"
  />
</template>