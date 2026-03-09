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
    <div class="festive">
      <div class="festive-card">
        <div class="festive-card__ornaments">
          <span>✦</span>
          <span>{{ section.icon }}</span>
          <span>✦</span>
        </div>

        <div class="festive-card__status">
          <span>{{ section.meta.statusText }}</span>
          <span v-if="section.meta.badge">{{ section.meta.badge }}</span>
        </div>

        <h2 class="festive-card__title">{{ section.title }}</h2>
        <div class="festive-card__desc" v-html="section.desc"></div>

        <div v-if="section.features.length" class="festive-card__features">
          <div v-for="feature in section.features" :key="feature" class="festive-card__feature">
            {{ feature }}
          </div>
        </div>

        <div v-if="section.meta.statusNote" class="festive-card__note">
          {{ section.meta.statusNote }}
        </div>

        <div class="festive-card__actions">
          <a
            v-if="section.actions.href && !section.actions.disabled"
            class="festive-card__primary"
            :href="section.actions.href"
            :target="section.actions.target"
            rel="noreferrer"
          >
            {{ section.actions.primaryLabel }}
          </a>

          <button
            v-else
            class="festive-card__primary is-disabled"
            type="button"
            disabled
          >
            {{ section.actions.disabledReason || section.actions.primaryLabel }}
          </button>

          <button class="festive-card__secondary" type="button" @click="emit('next')">
            看下一个
          </button>
        </div>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped lang="scss">
.festive {
  width: 100%;
  display: flex;
  justify-content: center;
}

.festive-card {
  width: min(780px, 100%);
  border-radius: 36px;
  padding: 36px 32px;
  text-align: center;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05)),
    rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(18px);
  box-shadow: 0 26px 70px rgba(0,0,0,0.2);

  &__ornaments {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 18px;
    font-size: 28px;
  }

  &__status {
    margin-top: 18px;
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;

    span {
      min-height: 34px;
      padding: 0 12px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      background: rgba(255,255,255,0.08);
      font-size: 13px;
    }
  }

  &__title {
    margin: 22px 0 0;
    font-size: clamp(34px, 4vw, 54px);
    line-height: 1.08;
    font-weight: 800;
  }

  &__desc {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.86;
    color: rgba(255,255,255,0.74);
  }

  &__features {
    margin-top: 24px;
    display: grid;
    gap: 12px;
  }

  &__feature {
    min-height: 46px;
    border-radius: 16px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.07);
  }

  &__note {
    margin-top: 20px;
    padding: 14px 16px;
    border-radius: 18px;
    background: rgba(255, 212, 73, 0.12);
    color: rgba(255,255,255,0.86);
    font-size: 14px;
    line-height: 1.7;
  }

  &__actions {
    margin-top: 28px;
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
    background: linear-gradient(135deg, var(--section-accent) 0%, rgba(255,255,255,0.18) 100%);
  }

  &__secondary {
    background: rgba(255,255,255,0.08);
  }

  &__primary.is-disabled {
    opacity: 0.72;
    cursor: not-allowed;
  }
}
</style>