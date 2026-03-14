<script setup lang="ts">
import { nextTick, ref, watch, type PropType } from 'vue'
import type { SectionViewModel } from '@/types/view-model'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'jump', id: string): void
  (e: 'update:query', value: string): void
}>()

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  query: {
    type: String,
    default: ''
  },
  results: {
    type: Array as PropType<SectionViewModel[]>,
    required: true
  }
})

const inputRef = ref<HTMLInputElement | null>(null)

watch(
  () => props.open,
  async (value) => {
    if (value) {
      await nextTick()
      inputRef.value?.focus()
    }
  }
)
</script>

<template>
  <Teleport to="body">
    <transition name="search-fade">
      <div v-if="open" class="search-panel__mask" @click="emit('close')"></div>
    </transition>

    <transition name="search-pop">
      <div v-if="open" class="search-panel">
        <div class="search-panel__box">
          <div class="search-panel__input-wrap">
            <span class="search-panel__icon">⌕</span>
            <input
              ref="inputRef"
              :value="query"
              class="search-panel__input"
              type="text"
              placeholder="搜索项目 / 标签 / 关键词"
              @input="emit('update:query', ($event.target as HTMLInputElement).value)"
            />
            <button class="search-panel__close" type="button" @click="emit('close')">
              Esc
            </button>
          </div>

          <div class="search-panel__meta">
            <span>/ 打开搜索</span>
            <span>{{ results.length }} 个结果</span>
          </div>

          <div v-if="results.length" class="search-panel__list">
            <button
              v-for="section in results"
              :key="section.id"
              class="search-result"
              type="button"
              @click="emit('jump', section.id)"
            >
              <div class="search-result__left">
                <div class="search-result__icon">{{ section.icon }}</div>
                <div class="search-result__content">
                  <div class="search-result__title">{{ section.title }}</div>
                  <div class="search-result__desc" v-html="section.desc"></div>
                </div>
              </div>

              <div class="search-result__right">
                <span class="search-result__category">{{ section.category }}</span>
                <span class="search-result__status">{{ section.meta.statusText }}</span>
              </div>
            </button>
          </div>

          <div v-else class="search-panel__empty">
            没有匹配结果
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped lang="scss">
.search-panel__mask {
  position: fixed;
  inset: 0;
  z-index: 79;
  background: rgba(0, 0, 0, 0.46);
  backdrop-filter: blur(8px);
}

.search-panel {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 96px 20px 20px;

  &__box {
    width: min(920px, 100%);
    max-height: calc(100dvh - 120px);
    overflow: hidden;
    border-radius: 28px;
    background: rgba(15, 17, 23, 0.94);
    backdrop-filter: blur(18px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.32);
  }

  &__input-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 72px;
    padding: 0 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  &__icon {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.66);
  }

  &__input {
    flex: 1;
    height: 48px;
    border: none;
    background: transparent;
    color: #fff;
    font-size: 16px;
    outline: none;
  }

  &__close {
    min-width: 52px;
    height: 34px;
    border: none;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.78);
    cursor: pointer;
  }

  &__meta {
    min-height: 40px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.54);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  &__list {
    max-height: calc(100dvh - 220px);
    overflow-y: auto;
    padding: 10px;
  }

  &__empty {
    min-height: 180px;
    display: grid;
    place-items: center;
    color: rgba(255, 255, 255, 0.58);
    font-size: 14px;
  }
}

.search-result {
  width: 100%;
  border: none;
  border-radius: 18px;
  background: transparent;
  color: #fff;
  text-align: left;
  padding: 14px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.07);
    transform: translateY(-1px);
  }

  &__left {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    min-width: 0;
    flex: 1;
  }

  &__icon {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.08);
    display: grid;
    place-items: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  &__content {
    min-width: 0;
    flex: 1;
  }

  &__title {
    font-size: 15px;
    font-weight: 700;
  }

  &__desc {
    margin-top: 6px;
    font-size: 13px;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.62);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__right {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;
    flex-shrink: 0;
  }

  &__category,
  &__status {
    min-height: 28px;
    padding: 0 10px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.72);
  }
}

.search-fade-enter-active,
.search-fade-leave-active {
  transition: opacity 0.2s ease;
}

.search-fade-enter-from,
.search-fade-leave-to {
  opacity: 0;
}

.search-pop-enter-active,
.search-pop-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.search-pop-enter-from,
.search-pop-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.985);
}
</style>