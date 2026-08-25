<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Menu, X } from '@lucide/vue'

type NavSection = { id: string; label: string; subtitle: string; info: string }

const props = defineProps<{
  sections: NavSection[]
}>()

const active = ref('hero')
const mobileOpen = ref(false)

const updateActiveSection = () => {
  const viewportCenter = window.innerHeight * 0.38
  let closestId = props.sections[0]?.id ?? 'hero'
  let closestDistance = Number.POSITIVE_INFINITY

  props.sections.forEach((section) => {
    const element = document.getElementById(section.id)
    if (!element) {
      return
    }

    const rect = element.getBoundingClientRect()
    const isVisible = rect.top <= viewportCenter && rect.bottom >= window.innerHeight * 0.2

    if (!isVisible) {
      return
    }

    const distance = Math.abs(rect.top - viewportCenter)
    if (distance < closestDistance) {
      closestId = section.id
      closestDistance = distance
    }
  })

  active.value = closestId
}

const scrollToSection = (id: string) => {
  const target = document.getElementById(id)
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  mobileOpen.value = false
}

onMounted(() => {
  updateActiveSection()
  window.addEventListener('scroll', updateActiveSection, { passive: true })
  window.addEventListener('resize', updateActiveSection)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
  window.removeEventListener('resize', updateActiveSection)
})
</script>

<template>
  <header class="imperial-nav">
    <div class="imperial-nav__bar">
      <p class="imperial-nav__sigil">IMPERIUM ARCHIVE</p>
      <button class="imperial-nav__toggle" type="button" aria-label="Toggle archive navigation" @click="mobileOpen = !mobileOpen">
        <Menu v-if="!mobileOpen" :size="20" />
        <X v-else :size="20" />
      </button>
      <nav class="imperial-nav__desktop" aria-label="Primary navigation">
        <button
          v-for="section in sections"
          :key="section.id"
          class="imperial-nav__item"
          :class="{ 'is-active': active === section.id }"
          type="button"
          :aria-label="`${section.label} - ${section.info}`"
          @click="scrollToSection(section.id)"
        >
          <span class="imperial-nav__led" />
          <span class="imperial-nav__label">{{ section.label }}</span>
          <span class="imperial-nav__tooltip" role="note">{{ section.info }}</span>
        </button>
      </nav>
    </div>

    <div v-if="mobileOpen" class="imperial-nav__mobile" role="dialog" aria-label="Mobile archive terminal">
      <p class="imperial-nav__mobile-title">+++ MOBILE COGITATOR TERMINAL +++</p>
      <button
        v-for="section in sections"
        :key="`m-${section.id}`"
        class="imperial-nav__mobile-item"
        :class="{ 'is-active': active === section.id }"
        type="button"
        @click="scrollToSection(section.id)"
      >
        <span>{{ section.label }}</span>
        <small>{{ section.subtitle }}</small>
      </button>
    </div>
  </header>
</template>
