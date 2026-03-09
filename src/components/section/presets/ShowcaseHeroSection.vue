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
    <div class="showcase">
      <div class="showcase__content">
        <div class="showcase__topline">
          <span class="showcase__icon">{{ section.icon }}</span>
          <span class="showcase__status">{{ section.meta.statusText }}</span>
          <span v-if="section.meta.badge" class="showcase__badge">
            {{ section.meta.badge }}
          </span>
        </div>

        <h2 class="showcase__title">{{ section.title }}</h2>

        <div class="showcase__desc" v-html="section.desc"></div>

        <div v-if="section.features.length" class="showcase__features">
          <div
            v-for="feature in section.features"
            :key="feature"
            class="showcase__feature"
          >
            {{ feature }}
          </div>
        </div>

        <div v-if="section.meta.tags.length" class="showcase__tags">
          <span
            v-for="tag in section.meta.tags"
            :key="tag"
            class="showcase__tag"
          >
            {{ tag }}
          </span>
        </div>

        <div class="showcase__actions">
          <a
            v-if="section.actions.href && !section.actions.disabled"
            class="showcase__primary"
            :href="section.actions.href"
            :target="section.actions.target"
            rel="noreferrer"
          >
            {{ section.actions.primaryLabel }}
          </a>

          <button
            v-else
            class="showcase__primary is-disabled"
            type="button"
            disabled
          >
            {{ section.actions.disabledReason || section.actions.primaryLabel }}
          </button>

          <button
            v-if="section.actions.secondaryLabel"
            class="showcase__secondary"
            type="button"
            @click="emit('next')"
          >
            {{ section.actions.secondaryLabel }}
          </button>
        </div>

        <div class="showcase__meta">
          <span v-if="section.meta.updateTime">更新于 {{ section.meta.updateTime }}</span>
          <span v-if="section.meta.createTime">创建于 {{ section.meta.createTime }}</span>
        </div>
      </div>

      <div class="showcase__preview">
        <div class="preview-card">
          <div class="preview-card__header">
            <span>{{ section.icon }}</span>
            <span>{{ section.layout.previewType }}</span>
          </div>

          <div class="preview-card__hero">
            <div class="preview-card__hero-title">{{ section.title }}</div>
            <div class="preview-card__hero-sub">
              {{ section.category }} · {{ section.theme.mood }}
            </div>
          </div>

          <div class="preview-card__grid">
            <div class="preview-tile preview-tile--large"></div>
            <div class="preview-tile"></div>
            <div class="preview-tile"></div>
            <div class="preview-tile"></div>
          </div>
        </div>

        <div class="showcase__nav">
          <button
            class="nav-btn"
            type="button"
            :disabled="!section.relations.previous"
            @click="emit('previous')"
          >
            上一屏
          </button>
          <button
            class="nav-btn"
            type="button"
            :disabled="!section.relations.next"
            @click="emit('next')"
          >
            下一屏
          </button>
        </div>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped lang="scss">
.showcase {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(380px, 0.95fr);
  gap: 40px;
  align-items: center;

  &__topline {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 18px;
  }

  &__icon,
  &__status,
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
    font-size: clamp(36px, 4.5vw, 64px);
    line-height: 1.04;
    font-weight: 800;
  }

  &__desc {
    margin-top: 20px;
    font-size: 17px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.74);
    max-width: 760px;
  }

  &__features {
    margin-top: 26px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  &__feature {
    min-height: 44px;
    padding: 0 16px;
    border-radius: 16px;
    display: inline-flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  &__tags {
    margin-top: 18px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  &__tag {
    min-height: 32px;
    padding: 0 12px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.76);
    background: rgba(255, 255, 255, 0.06);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 30px;
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
    transition: transform 0.2s ease, opacity 0.2s ease, background 0.2s ease;
  }

  &__primary {
    background: linear-gradient(
      135deg,
      var(--section-accent) 0%,
      rgba(255, 255, 255, 0.22) 100%
    );
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);
  }

  &__secondary {
    background: rgba(255, 255, 255, 0.08);
  }

  &__primary:hover,
  &__secondary:hover {
    transform: translateY(-2px);
  }

  &__primary.is-disabled {
    opacity: 0.72;
    cursor: not-allowed;
  }

  &__meta {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.58);
  }

  &__preview {
    display: grid;
    gap: 18px;
  }

  &__nav {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }
}

.preview-card {
  border-radius: 28px;
  padding: 22px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);

  &__header {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.68);
  }

  &__hero {
    margin-top: 18px;
    padding: 20px;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.05);
  }

  &__hero-title {
    font-size: 22px;
    font-weight: 700;
  }

  &__hero-sub {
    margin-top: 8px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.62);
  }

  &__grid {
    margin-top: 18px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
}

.preview-tile {
  min-height: 92px;
  border-radius: 20px;
  background:
    linear-gradient(135deg, var(--section-accent-soft), rgba(255, 255, 255, 0.04));
  border: 1px solid rgba(255, 255, 255, 0.06);

  &--large {
    grid-column: span 2;
    min-height: 140px;
  }
}

.nav-btn {
  min-width: 110px;
  height: 42px;
  border: none;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  cursor: pointer;

  &:disabled {
    opacity: 0.42;
    cursor: not-allowed;
  }
}
</style>