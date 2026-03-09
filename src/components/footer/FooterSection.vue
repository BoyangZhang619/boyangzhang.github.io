<script setup lang="ts">
import type { PropType } from 'vue'
import type { FooterConfig } from '@/types/site'

const emit = defineEmits<{
  (e: 'go-top'): void
}>()

defineProps({
  footer: {
    type: Object as PropType<FooterConfig>,
    required: true
  }
})
</script>

<template>
  <section id="footer" class="footer-section">
    <div class="footer-section__inner">
      <div class="footer-section__content">
        <div class="footer-section__eyebrow">Footer</div>

        <h2 class="footer-section__title">
          {{ footer.headline }}
        </h2>

        <p class="footer-section__desc">
          {{ footer.description }}
        </p>

        <div class="footer-section__actions">
          <button class="footer-section__primary" type="button" @click="emit('go-top')">
            回到顶部
          </button>

          <button class="footer-section__secondary" type="button">
            随机探索
          </button>
        </div>
      </div>

      <div class="footer-section__links">
        <a
          v-for="link in footer.links || []"
          :key="link.label"
          :href="link.href"
          class="footer-section__link"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.footer-section {
  min-height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  background:
    radial-gradient(circle at 25% 25%, rgba(115, 186, 224, 0.12), transparent 28%),
    radial-gradient(circle at 70% 40%, rgba(124, 92, 255, 0.14), transparent 26%),
    linear-gradient(135deg, #0d1018 0%, #151928 45%, #0f1320 100%);

  &__inner {
    width: 100%;
    padding: 120px 120px 80px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 48px;
    align-items: center;
  }

  &__content {
    max-width: 760px;
  }

  &__eyebrow {
    display: inline-flex;
    align-items: center;
    min-height: 34px;
    padding: 0 14px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.72);
    font-size: 13px;
    margin-bottom: 22px;
  }

  &__title {
    margin: 0;
    font-size: clamp(34px, 5vw, 62px);
    line-height: 1.06;
    font-weight: 800;
  }

  &__desc {
    margin: 22px 0 0;
    font-size: 17px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.7);
  }

  &__actions {
    display: flex;
    gap: 14px;
    margin-top: 30px;
  }

  &__primary,
  &__secondary {
    height: 48px;
    padding: 0 20px;
    border: none;
    border-radius: 16px;
    color: #fff;
    cursor: pointer;
  }

  &__primary {
    background: linear-gradient(135deg, #73bae0 0%, #7c5cff 100%);
  }

  &__secondary {
    background: rgba(255, 255, 255, 0.08);
  }

  &__links {
    display: grid;
    gap: 12px;
    align-content: start;
  }

  &__link {
    min-height: 48px;
    border-radius: 16px;
    padding: 0 16px;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
    transition: background 0.2s ease, transform 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }
  }
}
</style>