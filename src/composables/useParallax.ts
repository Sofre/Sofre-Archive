import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

export function useParallax(rootSelector: string) {
  let handleMove: ((event: MouseEvent) => void) | null = null

  onMounted(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      return
    }

    const root = document.querySelector<HTMLElement>(rootSelector)
    if (!root) {
      return
    }

    const layers = root.querySelectorAll<HTMLElement>('[data-parallax-depth]')

    handleMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5
      const y = event.clientY / window.innerHeight - 0.5

      layers.forEach((layer) => {
        const depth = Number(layer.dataset.parallaxDepth ?? 0)
        gsap.to(layer, {
          x: x * depth,
          y: y * depth,
          duration: 0.7,
          ease: 'power2.out',
        })
      })
    }

    window.addEventListener('mousemove', handleMove)
  })

  onUnmounted(() => {
    if (handleMove) {
      window.removeEventListener('mousemove', handleMove)
    }
  })
}
