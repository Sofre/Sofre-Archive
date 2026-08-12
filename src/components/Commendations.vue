<script setup lang="ts">
import SectionHeader from './SectionHeader.vue'
import { commendations } from '../data/research'
</script>

<template>
  <section id="commendations" class="commendations section reveal" aria-labelledby="commendations-title">
    <SectionHeader
      overline="COMMENDATIONS"
      title="HIGH-ECHELON COMMENDATIONS"
      subtitle="Professional endorsements preserved in official archive format."
    />

    <article v-for="record in commendations" :key="record.name" class="commendations__document">
      <div class="commendations__seal" aria-hidden="true" />
      <h3 id="commendations-title">{{ record.name }}</h3>
      <p class="commendations__position">{{ record.position }}</p>
      <p class="commendations__org">{{ record.organization }}</p>
      <p class="commendations__text">{{ record.commendation }}</p>
    </article>
  </section>
</template>
