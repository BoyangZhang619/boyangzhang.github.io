<script setup lang="ts">
import type { PropType } from 'vue'
import type { SectionViewModel } from '@/types/view-model'
import SectionShell from '../SectionShell.vue'

const emit = defineEmits<{
  (e: 'jump', id: string): void
  (e: 'next'): void
  (e: 'previous'): void
}>()

defineProps({
  section: {
    type: Object as PropType<SectionViewModel>,
    required: true
  }
})
</script>

<template>
  <SectionShell :section="section">
    <div class="audio">
      <div class="audio__center">
        <div class="audio__chips">
          <span class="audio__chip">{{ section.icon }}</span>
          <span class="audio__chip">{{ section.meta.statusText }}</span>
          <span v-if="section.meta.badge" class="audio__chip">{{ section.meta.badge }}</span>
        </div>

        <h2 class="audio__title">{{ section.title }}</h2>
        <div class="audio__desc" v-html="section.desc"></div>

        <div class="wave-card">
          <div class="wave-card__bars">
            <span v-for="n in 24" :key="n" class="wave-bar"></span>
          </div>

          <div class="wave-card__keys">
            <span v-for="n in 12" :key="n" class="key"></span>
          </div>
        </div>

        <div v-if="section.features.length" class="audio__features">
          <span v-for="feature in section.features" :key="feature" class="audio__feature">
            {{ feature }}
          </span>
        </div>

        <div class="audio__actions">
          <a
            v-if="section.actions.href && !section.actions.disabled"
            class="audio__primary"
            :href="section.actions.href"
            :target="section.actions.target"
            rel="noreferrer"
          >
            {{ section.actions.primaryLabel }}
          </a>

          <button
            v-else
            class="audio__primary is-disabled"
            type="button"
            disabled
          >
            {{ section.actions.disabledReason || section.actions.primaryLabel }}
          </button>

          <button class="audio__secondary" type="button" @click="emit('next')">
            下一项
          </button>
        </div>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped lang="scss">
.audio {
  width: 100%;
  display: flex;
  justify-content: center;

  &__center {
    width: min(980px, 100%);
    text-align: center;
  }

  &__chips {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 18px;
  }

  &__chip {
    min-height: 34px;
    padding: 0 12px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.08);
    font-size: 13px;
  }

  &__title {
    margin: 0;
    font-size: clamp(36px, 4.5vw, 62px);
    line-height: 1.05;
    font-weight: 800;
  }

  &__desc {
    margin: 20px auto 0;
    max-width: 760px;
    font-size: 16px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.72);
  }

  &__features {
    margin-top: 22px;
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  &__feature {
    min-height: 40px;
    padding: 0 14px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.08);
  }

  &__actions {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
  }

  &__primary,
  &__secondary {
    min-width: 132px;
    height: 50px;
    padding: 0 22px;
    border-radius: 16px;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
  }

  &__primary {
    background: linear-gradient(135deg, var(--section-accent) 0%, rgba(255, 255, 255, 0.18) 100%);
  }

  &__secondary {
    background: rgba(255, 255, 255, 0.08);
  }

  &__primary.is-disabled {
    opacity: 0.72;
    cursor: not-allowed;
  }
}

.wave-card {
  margin-top: 30px;
  border-radius: 30px;
  padding: 26px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.08);

  &__bars {
    min-height: 180px;
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    gap: 10px;
    align-items: end;
  }

  &__keys {
    margin-top: 22px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 8px;
  }
}

.wave-bar {
  border-radius: 12px 12px 8px 8px;
  background: linear-gradient(180deg, var(--section-accent), rgba(255, 255, 255, 0.12));
  min-height: 30px;
}

.wave-bar:nth-child(1) { height: 24%; }
.wave-bar:nth-child(2) { height: 56%; }
.wave-bar:nth-child(3) { height: 36%; }
.wave-bar:nth-child(4) { height: 68%; }
.wave-bar:nth-child(5) { height: 42%; }
.wave-bar:nth-child(6) { height: 82%; }
.wave-bar:nth-child(7) { height: 60%; }
.wave-bar:nth-child(8) { height: 32%; }
.wave-bar:nth-child(9) { height: 76%; }
.wave-bar:nth-child(10) { height: 48%; }
.wave-bar:nth-child(11) { height: 86%; }
.wave-bar:nth-child(12) { height: 54%; }
.wave-bar:nth-child(13) { height: 28%; }
.wave-bar:nth-child(14) { height: 62%; }
.wave-bar:nth-child(15) { height: 40%; }
.wave-bar:nth-child(16) { height: 72%; }
.wave-bar:nth-child(17) { height: 34%; }
.wave-bar:nth-child(18) { height: 88%; }
.wave-bar:nth-child(19) { height: 52%; }
.wave-bar:nth-child(20) { height: 66%; }
.wave-bar:nth-child(21) { height: 38%; }
.wave-bar:nth-child(22) { height: 80%; }
.wave-bar:nth-child(23) { height: 44%; }
.wave-bar:nth-child(24) { height: 58%; }

.key {
  height: 88px;
  border-radius: 0 0 16px 16px;
  background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.66));
}
</style>