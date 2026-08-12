<script setup lang="ts">
import SectionHeader from './SectionHeader.vue'
import { skillDomains } from '../data/skills'
</script>

<template>
  <section id="wargear" class="wargear section reveal" aria-labelledby="wargear-title">
    <SectionHeader
      overline="WARGEAR"
      title="WARGEAR & MACHINE SPIRIT APTITUDES"
      subtitle="Calibrated engineering capabilities across software, automation, and AI domains."
    />

    <div class="wargear__domains">
      <article v-for="domain in skillDomains" :key="domain.title" class="wargear__domain">
        <h3 id="wargear-title">{{ domain.title }}</h3>
        <ul>
          <li v-for="system in domain.systems" :key="system.name">
            <div class="wargear__meta">
              <strong>{{ system.name }}</strong>
              <span>CAL {{ system.calibration }}%</span>
            </div>
            <div class="wargear__gauge" role="img" :aria-label="`${system.name} calibration ${system.calibration}%`">
              <div class="wargear__gauge-fill" :style="{ width: `${system.calibration}%` }" />
            </div>
            <small>{{ system.note }}</small>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>
