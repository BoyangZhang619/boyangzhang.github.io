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
    <div class="algo">
      <div class="algo__left">
        <div class="algo__head">
          <span class="algo__chip">{{ section.icon }}</span>
          <span class="algo__chip">{{ section.meta.statusText }}</span>
          <span v-if="section.meta.badge" class="algo__chip">{{ section.meta.badge }}</span>
        </div>

        <h2 class="algo__title">{{ section.title }}</h2>
        <div class="algo__desc" v-html="section.desc"></div>

        <div class="algo__metrics">
          <div class="metric-card">
            <strong>{{ section.features.length || 3 }}</strong>
            <span>核心特性</span>
          </div>
          <div class="metric-card">
            <strong>{{ section.meta.tags.length || 1 }}</strong>
            <span>标签数量</span>
          </div>
          <!-- <div class="metric-card">
            <strong>{{ section.relatedIds?.length || section.relations.relatedIds.length }}</strong>
            <span>相关项目</span>
          </div> -->
        </div>

        <div v-if="section.features.length" class="algo__features">
          <div v-for="feature in section.features" :key="feature" class="algo__feature">
            {{ feature }}
          </div>
        </div>

        <div class="algo__actions">
          <a
            v-if="section.actions.href && !section.actions.disabled"
            class="algo__primary"
            :href="section.actions.href"
            :target="section.actions.target"
            rel="noreferrer"
          >
            {{ section.actions.primaryLabel }}
          </a>

          <button
            v-else
            class="algo__primary is-disabled"
            type="button"
            disabled
          >
            {{ section.actions.disabledReason || section.actions.primaryLabel }}
          </button>

          <button class="algo__secondary" type="button" @click="emit('next')">
            继续浏览
          </button>
        </div>
      </div>

      <div class="algo__right">
        <div class="graph-board">
          <div class="graph-board__grid">
            <span v-for="n in 24" :key="n" class="node"></span>
          </div>

          <div class="graph-board__bars">
            <span v-for="n in 14" :key="n" class="bar"></span>
          </div>
        </div>

        <div class="algo__nav">
          <button class="nav-btn" type="button" :disabled="!section.relations.previous" @click="emit('previous')">
            上一屏
          </button>
          <button class="nav-btn" type="button" :disabled="!section.relations.next" @click="emit('next')">
            下一屏
          </button>
        </div>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped lang="scss">
.algo {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(420px, 1.05fr);
  gap: 42px;
  align-items: center;

  &__head {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  &__chip {
    min-height: 34px;
    padding: 0 12px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    font-size: 13px;
    background: rgba(255, 255, 255, 0.08);
  }

  &__title {
    margin: 0;
    font-size: clamp(34px, 4vw, 56px);
    font-weight: 800;
    line-height: 1.08;
  }

  &__desc {
    margin-top: 18px;
    font-size: 16px;
    line-height: 1.78;
    color: rgba(255, 255, 255, 0.72);
  }

  &__metrics {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  &__features {
    margin-top: 24px;
    display: grid;
    gap: 12px;
  }

  &__feature {
    min-height: 46px;
    padding: 0 16px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.07);
  }

  &__actions {
    margin-top: 28px;
    display: flex;
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
    color: #fff;
    text-decoration: none;
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

  &__nav {
    margin-top: 18px;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }
}

.metric-card {
  min-height: 92px;
  border-radius: 20px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.08);

  strong {
    display: block;
    font-size: 28px;
    font-weight: 800;
  }

  span {
    display: block;
    margin-top: 10px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.62);
  }
}

.graph-board {
  min-height: 500px;
  border-radius: 28px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.18);

  &__grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 14px;
  }

  &__bars {
    margin-top: 22px;
    display: grid;
    grid-template-columns: repeat(14, 1fr);
    gap: 10px;
    align-items: end;
    min-height: 180px;
  }
}

.node {
  aspect-ratio: 1;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--section-accent-soft), rgba(255, 255, 255, 0.05));
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.bar {
  border-radius: 14px 14px 8px 8px;
  background: linear-gradient(180deg, var(--section-accent), rgba(255, 255, 255, 0.14));
  min-height: 40px;
}

.bar:nth-child(1) { height: 32%; }
.bar:nth-child(2) { height: 56%; }
.bar:nth-child(3) { height: 24%; }
.bar:nth-child(4) { height: 72%; }
.bar:nth-child(5) { height: 44%; }
.bar:nth-child(6) { height: 88%; }
.bar:nth-child(7) { height: 62%; }
.bar:nth-child(8) { height: 34%; }
.bar:nth-child(9) { height: 76%; }
.bar:nth-child(10) { height: 50%; }
.bar:nth-child(11) { height: 68%; }
.bar:nth-child(12) { height: 40%; }
.bar:nth-child(13) { height: 84%; }
.bar:nth-child(14) { height: 58%; }

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