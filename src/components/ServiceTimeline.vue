<script setup lang="ts">
import SectionHeader from './SectionHeader.vue'
import { serviceHistory } from '../data/experience'
</script>

<template>
  <section id="service-history" class="service-timeline section reveal" aria-labelledby="campaigns-title">
    <SectionHeader
      overline="SERVICE TO THE THRONE"
      title="HISTORICAL CAMPAIGNS"
      subtitle="Professional experience documented as campaign-grade engineering records."
    />

    <div class="service-timeline__line" />
    <article v-for="record in serviceHistory" :key="record.id" class="service-timeline__entry">
      <div class="service-timeline__marker" aria-hidden="true" />
      <p class="service-timeline__code">+++ HISTORICAL CAMPAIGN {{ record.id }} +++</p>
      <h3 id="campaigns-title">{{ record.title }}</h3>
      <p class="service-timeline__org">{{ record.organization }}</p>
      <p class="service-timeline__period">{{ record.period }}</p>

      <p class="service-timeline__label">SERVICE DOMAIN</p>
      <p>{{ record.domain }}</p>

      <p class="service-timeline__label">SYSTEMS</p>
      <ul class="service-timeline__systems">
        <li v-for="system in record.systems" :key="system">{{ system }}</li>
      </ul>

      <p class="service-timeline__label">RESPONSIBILITIES</p>
      <ul>
        <li v-for="item in record.responsibilities" :key="item">{{ item }}</li>
      </ul>

      <p class="service-timeline__label">ACHIEVEMENTS</p>
      <ul>
        <li v-for="item in record.achievements" :key="item">{{ item }}</li>
      </ul>
    </article>
  </section>
</template>
