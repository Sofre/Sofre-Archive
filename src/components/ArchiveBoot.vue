<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits<{ complete: [] }>()

const progress = ref(0)
const lines = [
  '+++ INITIALIZING COGITATOR +++',
  '',
  'MACHINE SPIRIT ........ NOMINAL',
  'DATABASE .............. CONNECTED',
  'IDENTITY .............. VERIFIED',
  'SECURITY .............. AUTHORIZED',
  '',
  'LOADING ENGINEERING ARCHIVE...',
]

const complete = () => {
  progress.value = 100
  emit('complete')
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduced) {
    progress.value = 100
    return
  }

  gsap.to(progress, {
    value: 100,
    duration: 2.4,
    ease: 'power2.out',
    onComplete: () => {
      window.setTimeout(() => emit('complete'), 350)
    },
  })
})
</script>

<template>
  <div class="archive-boot" role="dialog" aria-label="Archive boot sequence">
    <div class="archive-boot__scan" />
    <div class="archive-boot__content">
      <pre class="archive-boot__terminal" aria-live="polite">{{ lines.join('\n') }}</pre>
      <div class="archive-boot__progress-wrap" aria-label="Loading progress">
        <div class="archive-boot__progress" :style="{ width: `${progress}%` }" />
      </div>
      <p class="archive-boot__status">{{ '█'.repeat(Math.max(1, Math.round(progress / 5))) }} {{ Math.round(progress) }}%</p>
      <p v-if="progress >= 100" class="archive-boot__granted">ARCHIVE ACCESS GRANTED</p>
      <button class="archive-boot__skip" type="button" @click="complete">SKIP BOOT</button>
    </div>
  </div>
</template>
