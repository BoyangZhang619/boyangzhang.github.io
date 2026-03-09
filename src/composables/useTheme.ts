import { computed, onMounted, ref } from 'vue'

export type AppThemeMode = 'dark' | 'light'

const STORAGE_KEY = 'zby-home-theme'

export function useTheme() {
  const theme = ref<AppThemeMode>('dark')

  function applyTheme(mode: AppThemeMode) {
    theme.value = mode
    document.documentElement.setAttribute('data-theme', mode)
    localStorage.setItem(STORAGE_KEY, mode)
  }

  function toggleTheme() {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as AppThemeMode | null
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved)
      return
    }

    applyTheme('dark')
  })

  const isDark = computed(() => theme.value === 'dark')

  return {
    theme,
    isDark,
    applyTheme,
    toggleTheme
  }
}