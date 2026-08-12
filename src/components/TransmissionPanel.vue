<script setup lang="ts">
import SectionHeader from './SectionHeader.vue'
import { Mail, Link2, Network, FileText } from '@lucide/vue'
</script>

<template>
  <section id="transmission" class="transmission section reveal" aria-labelledby="transmission-title">
    <SectionHeader
      overline="TRANSMISSION"
      title="SECURE TRANSMISSION CHANNEL"
      subtitle="Establish authenticated communication with the archive owner."
    />

    <div class="transmission__terminal" role="region" aria-label="Secure transmission terminal">
      <pre>+++ SECURE TRANSMISSION CHANNEL +++

CHANNEL STATUS: READY
IDENTITY: DUŠKO SOFRONIEVSKI
AWAITING MESSAGE...</pre>

      <ul class="transmission__links">
        <li><Mail :size="16" /><a href="mailto:dukisofronievski@gmail.com">dukisofronievski@gmail.com</a></li>
        <li><Link2 :size="16" /><a href="https://github.com/Sofre" target="_blank" rel="noreferrer noopener">GitHub</a></li>
        <li><Network :size="16" /><a href="www.linkedin.com/in/dushko-sofronievski-19044021b" target="_blank" rel="noreferrer noopener">LinkedIn</a></li>
        <li><FileText :size="16" /><a href="#" aria-label="Download CV Data-Slate">CV / Data-Slate</a></li>
      </ul>

      <form class="transmission__form" @submit.prevent>
        <label>
          ORIGINATOR IDENT
          <input type="text" name="name" autocomplete="name" required />
        </label>
        <label>
          PRIORITY CHANNEL
          <input type="email" name="email" autocomplete="email" required />
        </label>
        <label>
          TRANSMISSION PAYLOAD
          <textarea name="message" rows="6" required />
        </label>
        <button type="submit">TRANSMIT MESSAGE</button>
      </form>
    </div>
  </section>
</template>
