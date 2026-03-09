<script setup lang="ts">
import type { PropType } from 'vue'
import type { SiteConfig, HeroConfig } from '@/types/site'
import type { SectionViewModel } from '@/types/view-model'

const emit = defineEmits<{
  (e: 'jump', id: string): void
  (e: 'go-body'): void
}>()

defineProps({
  site: {
    type: Object as PropType<SiteConfig>,
    required: true
  },
  hero: {
    type: Object as PropType<HeroConfig>,
    required: true
  },
  stats: {
    type: Object as PropType<Record<string, number>>,
    required: true
  },
  quickNavSections: {
    type: Array as PropType<SectionViewModel[]>,
    required: true
  }
})
</script>

<template>
  <section id="header" class="header-section">
    <div class="header-section__bg"></div>

    <div class="header-section__inner">
      <div class="header-section__left">
        <div class="header-section__eyebrow">
          {{ site.welcomeText }}
        </div>

        <h1 class="header-section__title">
          {{ hero.headline }}
        </h1>

        <h2 class="header-section__subtitle">
          {{ hero.subHeadline }}
        </h2>

        <p class="header-section__desc">
          {{ hero.description }}
        </p>

        <div class="header-section__actions">
          <button class="header-section__primary" type="button" @click="emit('go-body')">
            {{ hero.primaryAction?.label || '开始探索' }}
          </button>

          <button class="header-section__secondary" type="button">
            {{ hero.secondaryAction?.label || '随机看看' }}
          </button>
        </div>
      </div>

      <div class="header-section__right">
        <div class="header-section__panel header-section__panel--stats">
          <div class="panel-title">站点概览</div>
          <div class="stats-grid">
            <div class="stats-card">
              <strong>{{ stats.total }}</strong>
              <span>项目总数</span>
            </div>
            <div class="stats-card">
              <strong>{{ stats.featured }}</strong>
              <span>精选项目</span>
            </div>
            <div class="stats-card">
              <strong>{{ stats.categoryCount }}</strong>
              <span>分类数量</span>
            </div>
            <div class="stats-card">
              <strong>{{ stats.active }}</strong>
              <span>可用项目</span>
            </div>
          </div>
        </div>

        <div class="header-section__panel">
          <div class="panel-title">快速入口</div>

          <div class="quick-grid">
            <button
              v-for="section in quickNavSections"
              :key="section.id"
              class="quick-card"
              type="button"
              @click="emit('jump', section.id)"
            >
              <span class="quick-card__icon">{{ section.icon }}</span>
              <span class="quick-card__title">{{ section.title }}</span>
              <span class="quick-card__meta">{{ section.meta.statusText }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <button class="header-section__scroll-hint" type="button" @click="emit('go-body')">
      <span>{{ hero.scrollHint?.icon || '↓' }}</span>
      <span>{{ hero.scrollHint?.text || '向下探索' }}</span>
    </button>
  </section>
</template>

<style scoped lang="scss">
.header-section {
  position: relative;
  min-height: 100vh;
  scroll-snap-align: start;
  overflow: hidden;
  background:
    radial-gradient(circle at 20% 20%, rgba(124, 92, 255, 0.18), transparent 28%),
    radial-gradient(circle at 80% 32%, rgba(115, 186, 224, 0.18), transparent 24%),
    linear-gradient(135deg, #0f1117 0%, #171b29 45%, #101828 100%);

  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.7;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 28px 28px;
    mask-image: radial-gradient(circle at center, black 52%, transparent 100%);
  }

  &__inner {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    padding: 120px 72px 80px 120px;
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(420px, 0.95fr);
    gap: 36px;
    align-items: center;
  }

  &__left {
    max-width: 720px;
  }

  &__eyebrow {
    display: inline-flex;
    align-items: center;
    min-height: 36px;
    padding: 0 14px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.76);
    font-size: 14px;
    margin-bottom: 22px;
  }

  &__title {
    margin: 0;
    font-size: clamp(40px, 7vw, 78px);
    line-height: 1.02;
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  &__subtitle {
    margin: 18px 0 0;
    font-size: clamp(20px, 2.2vw, 30px);
    font-weight: 600;
    color: rgba(255, 255, 255, 0.88);
  }

  &__desc {
    margin: 22px 0 0;
    max-width: 640px;
    font-size: 17px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.72);
  }

  &__actions {
    display: flex;
    gap: 14px;
    margin-top: 32px;
  }

  &__primary,
  &__secondary {
    min-width: 132px;
    height: 48px;
    padding: 0 20px;
    border-radius: 16px;
    border: none;
    color: #fff;
    cursor: pointer;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  &__primary {
    background: linear-gradient(135deg, #7c5cff 0%, #73bae0 100%);
    box-shadow: 0 12px 28px rgba(124, 92, 255, 0.26);
  }

  &__secondary {
    background: rgba(255, 255, 255, 0.08);
  }

  &__primary:hover,
  &__secondary:hover {
    transform: translateY(-2px);
  }

  &__right {
    display: grid;
    gap: 18px;
  }

  &__panel {
    border-radius: 28px;
    padding: 22px;
    background: rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  &__panel--stats {
    min-height: 220px;
  }

  &__scroll-hint {
    position: absolute;
    left: 50%;
    bottom: 28px;
    transform: translateX(-50%);
    border: none;
    background: transparent;
    color: rgba(255, 255, 255, 0.72);
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }
}

.panel-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.82);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.stats-card {
  min-height: 78px;
  border-radius: 18px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  strong {
    font-size: 28px;
    line-height: 1;
  }

  span {
    margin-top: 10px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.64);
  }
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.quick-card {
  min-height: 88px;
  border: none;
  border-radius: 20px;
  padding: 14px;
  text-align: left;
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  &__icon {
    font-size: 22px;
  }

  &__title {
    font-size: 14px;
    font-weight: 600;
  }

  &__meta {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>