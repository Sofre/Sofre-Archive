<script setup lang="ts">
import { useSystemStatus } from '../composables/useSystemStatus'

const { lines, metrics, timestamp } = useSystemStatus()
</script>

<template>
  <section class="system-status" aria-label="Archive access terminal">
    <p class="system-status__title">+++ ARCHIVE ACCESS TERMINAL +++</p>
    <p class="system-status__stamp">STAMP: {{ timestamp }}</p>
    <ul class="system-status__list">
      <li v-for="line in lines" :key="line.label" class="system-status__row">
        <span class="system-status__label">{{ line.label }}</span>
        <strong :class="`state-${line.state} system-status__value`">{{ line.value }}</strong>
      </li>
    </ul>

    <p class="system-status__title system-status__title--secondary">+++ ENGINEERING DOSSIER METRICS +++</p>
    <ul class="system-status__list system-status__metrics">
      <li v-for="metric in metrics" :key="metric.label" class="system-status__row">
        <span class="system-status__label">{{ metric.label }}</span>
        <strong :class="`state-${metric.state} system-status__value`">{{ metric.value }}</strong>
      </li>
    </ul>
  </section>
</template>
