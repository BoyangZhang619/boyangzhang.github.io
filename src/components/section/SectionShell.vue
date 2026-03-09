<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { SectionViewModel } from '@/types/view-model'

const props = defineProps({
  section: {
    type: Object as PropType<SectionViewModel>,
    required: true
  }
})

const themeStyle = computed(() => ({
  '--section-accent': props.section.theme.accent,
  '--section-accent-soft': props.section.theme.accentSoft,
  '--section-background': props.section.theme.background,
  '--section-surface': props.section.theme.surface,
  '--section-glow': props.section.theme.glow
}))
</script>

<template>
  <section
    :id="section.anchor"
    class="section-shell"
    :class="[
      `section-shell--${section.layout.name}`,
      `section-shell--${section.layout.align}`,
      `section-shell--${section.theme.pattern}`,
      {
        'is-disabled': !section.flags.clickable
      }
    ]"
    :style="themeStyle"
  >
    <div class="section-shell__bg"></div>

    <div class="section-shell__inner">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-shell {
  position: relative;
  min-height: 100vh;
  scroll-snap-align: start;
  overflow: hidden;
  background: var(--section-background);

  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.9;
    background:
      radial-gradient(circle at 20% 20%, var(--section-accent-soft), transparent 30%),
      radial-gradient(circle at 80% 30%, var(--section-accent-soft), transparent 25%);
  }

  &__inner {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    padding: 96px 48px 48px;
    display: flex;
    align-items: center;
  }

  &.is-disabled {
    filter: saturate(0.72);
  }
}
</style>