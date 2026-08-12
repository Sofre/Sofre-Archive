<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const props = defineProps<{
  nodes: string[]
  accent?: 'gold' | 'crimson'
}>()

const root = ref<HTMLElement | null>(null)

const nodeWidth = 180
const gap = 54

const dimensions = computed(() => {
  const width = props.nodes.length * nodeWidth + (props.nodes.length - 1) * gap
  return { width, height: 140 }
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  if (!root.value) {
    return
  }

  gsap.fromTo(
    root.value.querySelectorAll('.project-schematic__node'),
    { autoAlpha: 0, y: 14 },
    { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power2.out' },
  )

  gsap.to(root.value.querySelectorAll('.project-schematic__flow-dot'), {
    x: 34,
    repeat: -1,
    duration: 1.2,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.05,
  })
})
</script>

<template>
  <div ref="root" class="project-schematic" :class="`accent-${accent ?? 'gold'}`">
    <svg :viewBox="`0 0 ${dimensions.width} ${dimensions.height}`" :width="dimensions.width" :height="dimensions.height" aria-hidden="true">
      <g v-for="(node, index) in nodes" :key="`${node}-${index}`" class="project-schematic__node" :transform="`translate(${index * (nodeWidth + gap)}, 25)`">
        <rect x="0" y="0" :width="nodeWidth" height="62" rx="0" />
        <text x="90" y="36">{{ node }}</text>
        <g v-if="index < nodes.length - 1" :transform="`translate(${nodeWidth}, 30)`">
          <line x1="0" y1="0" :x2="gap" y2="0" />
          <circle class="project-schematic__flow-dot" cx="16" cy="0" r="3" />
        </g>
      </g>
    </svg>
  </div>
</template>
