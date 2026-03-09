<script setup lang="ts">
import type { PropType } from 'vue'
import type { SectionViewModel } from '@/types/view-model'
import SectionRenderer from './SectionRenderer.vue'

const emit = defineEmits<{
  (e: 'jump', id: string): void
  (e: 'next'): void
  (e: 'previous'): void
}>()

defineProps({
  sections: {
    type: Array as PropType<SectionViewModel[]>,
    required: true
  }
})
</script>

<template>
  <section id="body" class="body-section-list">
    <SectionRenderer
      v-for="section in sections"
      :key="section.id"
      :section="section"
      @jump="emit('jump', $event)"
      @next="emit('next')"
      @previous="emit('previous')"
    />
  </section>
</template>

<style scoped lang="scss">
.body-section-list {
  position: relative;
}
</style>