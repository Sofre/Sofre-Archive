import { ref } from 'vue'

const STORAGE_KEY = 'imperial_archive_boot_seen'

export function useArchiveBoot() {
  const isBootVisible = ref(localStorage.getItem(STORAGE_KEY) !== 'true')

  const completeBoot = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    isBootVisible.value = false
  }

  const replayBoot = () => {
    localStorage.removeItem(STORAGE_KEY)
    isBootVisible.value = true
  }

  return {
    isBootVisible,
    completeBoot,
    replayBoot,
  }
}
