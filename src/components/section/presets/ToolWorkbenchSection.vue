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
    <div class="tool">
      <div class="tool__left">
        <div class="tool__topline">
          <span class="tool__icon">{{ section.icon }}</span>
          <span class="tool__type">Tool</span>
          <span v-if="section.meta.badge" class="tool__badge">{{ section.meta.badge }}</span>
        </div>

        <h2 class="tool__title">{{ section.title }}</h2>
        <div class="tool__desc" v-html="section.desc"></div>

        <div v-if="section.features.length" class="tool__list">
          <div
            v-for="feature in section.features"
            :key="feature"
            class="tool__list-item"
          >
            <span class="tool__list-dot"></span>
            <span>{{ feature }}</span>
          </div>
        </div>

        <div class="tool__actions">
          <a
            v-if="section.actions.href && !section.actions.disabled"
            class="tool__primary"
            :href="section.actions.href"
            :target="section.actions.target"
            rel="noreferrer"
          >
            {{ section.actions.primaryLabel }}
          </a>

          <button
            v-else
            class="tool__primary is-disabled"
            type="button"
            disabled
          >
            {{ section.actions.disabledReason || section.actions.primaryLabel }}
          </button>

          <button class="tool__secondary" type="button" @click="emit('next')">
            下一项
          </button>
        </div>

        <div class="tool__tags">
          <span v-for="tag in section.meta.tags" :key="tag" class="tool__tag">
            {{ tag }}
          </span>
        </div>
      </div>

      <div class="tool__right">
        <div class="workbench">
          <div class="workbench__toolbar">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div class="workbench__panel">
            <div class="workbench__sidebar">
              <div class="sidebar-block" v-for="n in 4" :key="n"></div>
            </div>

            <div class="workbench__main">
              <div class="main-line main-line--lg"></div>
              <div class="main-line"></div>
              <div class="main-line"></div>

              <div class="tool-grid">
                <div class="tool-grid__card tool-grid__card--big"></div>
                <div class="tool-grid__card"></div>
                <div class="tool-grid__card"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="tool__footer-meta">
          <span>{{ section.layout.previewType }}</span>
          <span>{{ section.meta.statusText }}</span>
          <span v-if="section.meta.updateTime">更新 {{ section.meta.updateTime }}</span>
        </div>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped lang="scss">
.tool {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 0.96fr) minmax(420px, 1.04fr);
  gap: 40px;
  align-items: center;

  &__topline {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  &__icon,
  &__type,
  &__badge {
    min-height: 34px;
    padding: 0 12px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.08);
    font-size: 13px;
  }

  &__icon {
    font-size: 16px;
    padding: 0 10px;
  }

  &__title {
    margin: 0;
    font-size: clamp(34px, 4vw, 56px);
    line-height: 1.08;
    font-weight: 800;
  }

  &__desc {
    margin-top: 18px;
    font-size: 16px;
    line-height: 1.78;
    color: rgba(255, 255, 255, 0.72);
    max-width: 700px;
  }

  &__list {
    margin-top: 24px;
    display: grid;
    gap: 12px;
  }

  &__list-item {
    min-height: 48px;
    padding: 0 16px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.07);
  }

  &__list-dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: var(--section-accent);
    box-shadow: 0 0 16px var(--section-glow);
    flex-shrink: 0;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 28px;
  }

  &__primary,
  &__secondary {
    min-width: 132px;
    height: 50px;
    padding: 0 22px;
    border-radius: 16px;
    border: none;
    color: #fff;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &__primary {
    background: linear-gradient(135deg, var(--section-accent) 0%, rgba(255, 255, 255, 0.18) 100%);
  }

  &__primary.is-disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &__secondary {
    background: rgba(255, 255, 255, 0.08);
  }

  &__tags {
    margin-top: 22px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  &__tag {
    min-height: 32px;
    padding: 0 12px;
    border-radius: 999px;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.74);
  }

  &__footer-meta {
    margin-top: 16px;
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
  }
}

.workbench {
  border-radius: 30px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.2);

  &__toolbar {
    display: flex;
    gap: 8px;
    padding-bottom: 14px;

    span {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.3);
    }
  }

  &__panel {
    display: grid;
    grid-template-columns: 92px 1fr;
    gap: 16px;
  }

  &__sidebar {
    display: grid;
    gap: 12px;
  }

  &__main {
    min-height: 380px;
    border-radius: 22px;
    padding: 18px;
    background: rgba(255, 255, 255, 0.05);
  }
}

.sidebar-block,
.main-line,
.tool-grid__card {
  border-radius: 16px;
  background: linear-gradient(135deg, var(--section-accent-soft), rgba(255, 255, 255, 0.04));
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.sidebar-block {
  min-height: 70px;
}

.main-line {
  min-height: 18px;
  margin-bottom: 12px;

  &--lg {
    min-height: 64px;
    margin-bottom: 16px;
  }
}

.tool-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  &__card {
    min-height: 110px;

    &--big {
      grid-column: span 2;
      min-height: 150px;
    }
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