<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { DrawerConfig } from '@/types/navigation'
import type { ProfileConfig } from '@/types/site'
import type { AppSettings } from '@/types/settings'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const props = defineProps({
  config: {
    type: Object as PropType<DrawerConfig>,
    required: true
  },
  profile: {
    type: Object as PropType<ProfileConfig>,
    required: true
  },
  stats: {
    type: Object as PropType<Record<string, number>>,
    required: true
  },
  settings: {
    type: Object as PropType<AppSettings>,
    required: true
  },
  open: {
    type: Boolean,
    default: false
  }
})

const drawerStyle = computed(() => ({
  width: `${props.config.width}px`
}))
</script>

<template>
  <Teleport to="body">
    <transition name="drawer-fade">
      <div v-if="open" class="right-drawer__mask" @click="emit('close')"></div>
    </transition>

    <transition name="drawer-slide">
      <aside
        v-if="open"
        class="right-drawer"
        :style="drawerStyle"
        :class="[`right-drawer--${config.placement}`]"
      >
        <div class="right-drawer__header">
          <div>
            <div class="right-drawer__title">{{ config.title }}</div>
            <div class="right-drawer__subtitle">站点信息与一些设置</div>
          </div>

          <button class="right-drawer__close" type="button" @click="emit('close')">
            ×
          </button>
        </div>

        <div class="right-drawer__body">
          <section class="drawer-card">
            <div class="drawer-card__title">关于我</div>

            <div class="profile-card">
              <div class="profile-card__avatar">
                {{ profile.avatar }}
              </div>

              <div class="profile-card__content">
                <div class="profile-card__name">{{ profile.displayName }}</div>
                <div class="profile-card__bio">{{ profile.bio }}</div>

                <div v-if="profile.statusText" class="profile-card__status">
                  {{ profile.statusText }}
                </div>
              </div>
            </div>
          </section>

          <section class="drawer-card">
            <div class="drawer-card__title">站点概览</div>

            <div class="stats-list">
              <div class="stats-list__item">
                <span>项目总数</span>
                <strong>{{ stats.total ?? 0 }}</strong>
              </div>
              <div class="stats-list__item">
                <span>精选项目</span>
                <strong>{{ stats.featured ?? 0 }}</strong>
              </div>
              <div class="stats-list__item">
                <span>分类数量</span>
                <strong>{{ stats.categoryCount ?? 0 }}</strong>
              </div>
              <div class="stats-list__item">
                <span>可用项目</span>
                <strong>{{ stats.active ?? 0 }}</strong>
              </div>
            </div>
          </section>

          <section class="drawer-card">
            <div class="drawer-card__title">当前设置</div>

            <div class="settings-list">
              <div class="settings-list__item">
                <span>默认主题</span>
                <strong>{{ settings.defaultTheme }}</strong>
              </div>
              <div class="settings-list__item">
                <span>显示标签</span>
                <strong>{{ settings.showTags ? '开启' : '关闭' }}</strong>
              </div>
              <div class="settings-list__item">
                <span>滚动吸附</span>
                <strong>{{ settings.enableScrollSnap ? '开启' : '关闭' }}</strong>
              </div>
              <div class="settings-list__item">
                <span>阻尼滚动</span>
                <strong>{{ settings.enableDampingScroll ? '开启' : '关闭' }}</strong>
              </div>
            </div>
          </section>

          <section class="drawer-card" v-if="profile.links?.length">
            <div class="drawer-card__title">探索入口</div>

            <div class="link-list">
              <a
                v-for="link in profile.links"
                :key="link.label"
                class="link-list__item"
                :href="link.href"
              >
                {{ link.label }}
              </a>
            </div>
          </section>
        </div>
      </aside>
    </transition>
  </Teleport>
</template>

<style scoped lang="scss">

template {
  z-index: 999;
}

.right-drawer__mask {
  position: fixed;
  inset: 0;
  z-index: 69;
  background: rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(6px);
}

.right-drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 70;
  background: rgba(15, 17, 23, 0.92);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.28);
  display: flex;
  flex-direction: column;

  &--right {
    right: 0;
  }

  &--left {
    left: 0;
    border-left: none;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
  }

  &__header {
    min-height: 80px;
    padding: 20px 20px 16px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  &__title {
    font-size: 18px;
    font-weight: 800;
  }

  &__subtitle {
    margin-top: 6px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.58);
  }

  &__close {
    width: 38px;
    height: 38px;
    border: none;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    cursor: pointer;
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: 18px 18px 28px;
    display: grid;
    gap: 16px;
  }
}

.drawer-card {
  border-radius: 22px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.06);

  &__title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 14px;
    color: rgba(255, 255, 255, 0.86);
  }
}

.profile-card {
  display: flex;
  gap: 14px;
  align-items: flex-start;

  &__avatar {
    width: 56px;
    height: 56px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.08);
    display: grid;
    place-items: center;
    font-size: 26px;
    flex-shrink: 0;
  }

  &__name {
    font-size: 16px;
    font-weight: 700;
  }

  &__bio {
    margin-top: 8px;
    font-size: 14px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.68);
  }

  &__status {
    margin-top: 10px;
    display: inline-flex;
    min-height: 28px;
    align-items: center;
    padding: 0 10px;
    border-radius: 999px;
    background: rgba(124, 92, 255, 0.16);
    color: #cfc3ff;
    font-size: 12px;
  }
}

.stats-list,
.settings-list {
  display: grid;
  gap: 10px;

  &__item {
    min-height: 46px;
    padding: 0 14px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.66);
    }

    strong {
      font-size: 14px;
      font-weight: 700;
    }
  }
}

.link-list {
  display: grid;
  gap: 10px;

  &__item {
    min-height: 44px;
    border-radius: 14px;
    padding: 0 14px;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
    transition: background 0.2s ease, transform 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.09);
      transform: translateY(-1px);
    }
  }
}

.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.24s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.28s ease, opacity 0.28s ease;
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
  opacity: 0.94;
}
</style>