<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Menu, X } from '@lucide/vue'

type NavSection = { id: string; label: string; subtitle: string; info: string }

const props = defineProps<{
  sections: NavSection[]
}>()

const active = ref('hero')
const mobileOpen = ref(false)
let observer: IntersectionObserver | null = null

const scrollToSection = (id: string) => {
  const target = document.getElementById(id)
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  mobileOpen.value = false
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          active.value = entry.target.id
        }
      })
    },
    { rootMargin: '-35% 0px -50% 0px', threshold: 0.1 },
  )

  props.sections.forEach((section) => {
    const el = document.getElementById(section.id)
    if (el) {
      observer?.observe(el)
    }
  })
})

onUnmounted(() => {
  observer?.disconnect()
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
        type="button"
        @click="scrollToSection(section.id)"
      >
        <span>{{ section.label }}</span>
        <small>{{ section.subtitle }}</small>
      </button>
    </div>
  </header>
</template>
