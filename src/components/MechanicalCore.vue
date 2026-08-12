<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

const mountEl = ref<HTMLElement | null>(null)
let renderer: THREE.WebGLRenderer | null = null
let frameId = 0

onMounted(() => {
  if (!mountEl.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const width = mountEl.value.clientWidth
  const height = mountEl.value.clientHeight

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.set(0, 0, 5)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  mountEl.value.appendChild(renderer.domElement)

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.1, 0.08, 20, 120),
    new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.35 }),
  )

  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.7, 1),
    new THREE.MeshStandardMaterial({ color: 0x8b0000, metalness: 0.55, roughness: 0.25 }),
  )

  const lightA = new THREE.PointLight(0xd4af37, 4.5)
  lightA.position.set(2.5, 2.3, 3)
  const lightB = new THREE.PointLight(0x8b0000, 3)
  lightB.position.set(-2.6, -1.4, 2.2)

  scene.add(ring, core, lightA, lightB)

  const animate = () => {
    frameId = requestAnimationFrame(animate)
    ring.rotation.x += 0.005
    ring.rotation.y += 0.003
    core.rotation.y -= 0.006
    renderer?.render(scene, camera)
  }

  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(frameId)
  if (renderer) {
    renderer.dispose()
    renderer.domElement.remove()
  }
})
</script>

<template>
  <div ref="mountEl" class="mechanical-core" aria-hidden="true" />
</template>
