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
    <div class="disabled-wrap">
      <div class="disabled-card">
        <div class="disabled-card__lock">🔒</div>

        <div class="disabled-card__status">
          <span>{{ section.meta.statusText }}</span>
          <span v-if="section.meta.badge">{{ section.meta.badge }}</span>
        </div>

        <h2 class="disabled-card__title">
          {{ section.title }}
        </h2>

        <div class="disabled-card__desc" v-html="section.desc"></div>

        <div class="disabled-card__reason">
          {{ section.actions.disabledReason || '暂未开放' }}
        </div>

        <div class="disabled-card__actions">
          <button class="disabled-card__primary" type="button" disabled>
            {{ section.actions.disabledReason || '暂未开放' }}
          </button>

          <button class="disabled-card__secondary" type="button" @click="emit('next')">
            看下一个
          </button>
        </div>

        <div class="disabled-card__meta">
          <span v-if="section.meta.updateTime">最近记录 {{ section.meta.updateTime }}</span>
        </div>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped lang="scss">
.disabled-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
}

.disabled-card {
  width: min(720px, 100%);
  border-radius: 34px;
  padding: 34px 28px;
  text-align: center;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04)),
    rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(16px);

  &__lock {
    width: 72px;
    height: 72px;
    margin: 0 auto;
    border-radius: 24px;
    display: grid;
    place-items: center;
    font-size: 32px;
    background: rgba(255,255,255,0.08);
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
    font-size: clamp(32px, 4vw, 50px);
    line-height: 1.08;
    font-weight: 800;
  }

  &__desc {
    margin-top: 18px;
    font-size: 16px;
    line-height: 1.8;
    color: rgba(255,255,255,0.68);
  }

  &__reason {
    margin-top: 22px;
    padding: 16px;
    border-radius: 18px;
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.86);
    font-size: 15px;
  }

  &__actions {
    margin-top: 26px;
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
    color: #fff;
  }

  &__primary {
    background: rgba(255,255,255,0.1);
    opacity: 0.68;
    cursor: not-allowed;
  }

  &__secondary {
    background: rgba(255,255,255,0.08);
    cursor: pointer;
  }

  &__meta {
    margin-top: 20px;
    font-size: 13px;
    color: rgba(255,255,255,0.54);
  }
}
@media (max-width: 1200px) {
  .showcase,
  .tool,
  .algo {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .showcase__title,
  .tool__title,
  .algo__title,
  .audio__title,
  .festive-card__title,
  .disabled-card__title {
    font-size: clamp(28px, 8vw, 42px);
  }

  .showcase__desc,
  .tool__desc,
  .algo__desc,
  .audio__desc,
  .festive-card__desc,
  .disabled-card__desc {
    font-size: 15px;
    line-height: 1.7;
  }

  .preview-card,
  .workbench,
  .graph-board,
  .wave-card,
  .festive-card,
  .disabled-card {
    border-radius: 22px;
    padding: 18px;
  }
}
</style>