<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { SiteConfig } from '@/types/site'
import type { TopBarConfig } from '@/types/navigation'

const emit = defineEmits<{
  (e: 'go-home'): void
  (e: 'open-search'): void
  (e: 'open-drawer'): void
  (e: 'toggle-theme'): void
  (e: 'random-jump'): void
}>()

const props = defineProps({
  site: {
    type: Object as PropType<SiteConfig>,
    required: true
  },
  config: {
    type: Object as PropType<TopBarConfig>,
    required: true
  },
  activeSectionId: {
    type: String,
    default: 'header'
  }
})

const logoText = computed(() => {
  return props.site.logo?.emoji || props.config.icon || '🧭'
})
</script>

<template>
  <header v-if="config.enabled" class="topbar">
    <div class="topbar__left" @click="emit('go-home')">
      <div class="topbar__logo">{{ logoText }}</div>
      <div class="topbar__brand">
        <div class="topbar__title">{{ config.title || site.title }}</div>
        <div class="topbar__subtitle">{{ site.subTitle }}</div>
      </div>
    </div>

    <div class="topbar__center" v-if="config.showSearch">
      <button class="topbar__search" type="button" @click="emit('open-search')">
        <span class="topbar__search-icon">⌕</span>
        <span class="topbar__search-text">
          {{ config.searchPlaceholder }}
        </span>
      </button>
    </div>

    <div class="topbar__right">
      <button v-for="action in config.quickActions || []" :key="action" class="topbar__action" type="button" @click="
        action === 'theme-toggle'
          ? emit('toggle-theme')
          : action === 'random-jump'
            ? emit('random-jump')
            : null
        ">
        <span v-if="action === 'theme-toggle'">◐</span>
        <span v-else-if="action === 'random-jump'">✦</span>
        <span v-else>•</span>
      </button>

      <button v-if="config.showMoreButton" class="topbar__menu" type="button" @click="emit('open-drawer')">
        {{ config.moreButtonIcon }}
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  height: 72px;
  display: grid;
  grid-template-columns: 320px 1fr 160px;
  align-items: center;
  padding: 0 20px;
  backdrop-filter: blur(18px);
  background: rgba(15, 17, 23, 0.48);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  &__left {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    min-width: 0;
  }

  &__logo {
    width: 42px;
    height: 42px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    font-size: 20px;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 24px rgba(255, 255, 255, 0.06);
    flex-shrink: 0;
  }

  &__brand {
    min-width: 0;
  }

  &__title {
    font-size: 15px;
    font-weight: 700;
    line-height: 1.2;
  }

  &__subtitle {
    margin-top: 2px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.62);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__center {
    display: flex;
    justify-content: center;
    padding: 0 24px;
  }

  &__search {
    width: min(640px, 100%);
    height: 44px;
    border: none;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.72);
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 16px;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.12);
      transform: translateY(-1px);
    }
  }

  &__search-icon {
    font-size: 15px;
  }

  &__search-text {
    font-size: 14px;
    text-align: left;
  }

  &__right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }

  &__action,
  &__menu {
    width: 42px;
    height: 42px;
    border-radius: 14px;
    border: none;
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;

    &:hover {
      transform: translateY(-1px);
      background: rgba(255, 255, 255, 0.14);
    }
  }

  &__menu {
    font-size: 18px;
    font-weight: 700;
  }
}
</style>