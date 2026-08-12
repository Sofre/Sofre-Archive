<script setup lang="ts">
defineProps<{
  overline: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="section-header reveal">
    <p class="section-header__overline">{{ overline }}</p>
    <h2>{{ title }}</h2>
    <p v-if="subtitle" class="section-header__subtitle">{{ subtitle }}</p>
  </header>
</template>
