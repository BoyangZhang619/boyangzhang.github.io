<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import type { SideBarConfig } from '@/types/navigation'
import type { CategoryConfig } from '@/types/site'
import type { SectionViewModel } from '@/types/view-model'

const emit = defineEmits<{
  (e: 'jump', id: string): void
}>()

const props = defineProps({
  config: {
    type: Object as PropType<SideBarConfig>,
    required: true
  },
  sections: {
    type: Array as PropType<SectionViewModel[]>,
    required: true
  },
  categories: {
    type: Array as PropType<CategoryConfig[]>,
    required: true
  },
  activeSectionId: {
    type: String,
    default: 'header'
  }
})

const expanded = ref(!props.config.collapsedByDefault)

const groupedSections = computed(() => {
  return props.categories
    .map((category) => {
      const items = props.sections.filter(
        (section) => section.category === category.id && section.flags.showInSidebar
      )

      return {
        ...category,
        items
      }
    })
    .filter((group) => group.items.length > 0)
})

function toggleExpand() {
  expanded.value = !expanded.value
}

function isActive(section: SectionViewModel) {
  return props.activeSectionId === section.anchor
}
</script>

<template>
  <aside
    v-if="config.enabled"
    class="sidebar"
    :class="{ 'is-expanded': expanded }"
    @mouseenter="config.triggerMode !== 'click' ? (expanded = true) : null"
    @mouseleave="config.triggerMode === 'hover-or-click' ? (expanded = false) : null"
  >
    <div class="sidebar__head">
      <button class="sidebar__toggle" type="button" @click="toggleExpand">
        {{ expanded ? '←' : '→' }}
      </button>
    </div>

    <div class="sidebar__body">
      <div
        v-for="group in groupedSections"
        :key="group.id"
        class="sidebar__group"
      >
        <div class="sidebar__group-title">
          <span class="sidebar__group-icon">{{ group.icon }}</span>
          <span v-if="expanded" class="sidebar__group-text">{{ group.title }}</span>
        </div>

        <button
          v-for="section in group.items"
          :key="section.id"
          class="sidebar__item"
          :class="{ 'is-active': isActive(section) }"
          type="button"
          @click="emit('jump', section.id)"
        >
          <span class="sidebar__item-icon">{{ section.icon }}</span>
          <span v-if="expanded" class="sidebar__item-text">{{ section.title }}</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  top: 96px;
  left: 18px;
  bottom: 24px;
  z-index: 35;
  width: 72px;
  border-radius: 28px;
  backdrop-filter: blur(16px);
  background: rgba(15, 17, 23, 0.52);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: width 0.25s ease, background 0.25s ease;
  overflow: hidden;

  &.is-expanded {
    width: 260px;
  }

  &__head {
    display: flex;
    justify-content: flex-end;
    padding: 14px;
  }

  &__toggle {
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    cursor: pointer;
  }

  &__body {
    padding: 0 10px 16px;
    height: calc(100% - 64px);
    overflow-y: auto;
  }

  &__group {
    margin-bottom: 18px;
  }

  &__group-title {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    margin-bottom: 8px;
    color: rgba(255, 255, 255, 0.72);
    font-size: 13px;
    font-weight: 600;
  }

  &__group-icon {
    width: 24px;
    text-align: center;
    flex-shrink: 0;
  }

  &__group-text {
    white-space: nowrap;
  }

  &__item {
    width: 100%;
    min-height: 42px;
    border: none;
    border-radius: 14px;
    background: transparent;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 10px;
    margin-bottom: 6px;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s ease, transform 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      transform: translateX(2px);
    }

    &.is-active {
      background: rgba(255, 255, 255, 0.14);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
    }
  }

  &__item-icon {
    width: 24px;
    text-align: center;
    flex-shrink: 0;
  }

  &__item-text {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>