<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SectionHeader from './SectionHeader.vue'

const terminalLines = [
  '+++ IMPERIUM RECORD +++',
  '',
  'DESIGNATION',
  'DUSHKO SOFRONIEVSKI',
  '',
  'CLASS',
  'SOFTWARE ENGINEER',
  '',
  'SPECIALIZATION',
  'BACKEND DEVELOPMENT',
  'INDUSTRIAL AUTOMATION',
  'ARTIFICIAL INTELLIGENCE',
  'SYSTEM ARCHITECTURE',
  '',
  'STATUS',
  'ACTIVE',
]

const typedTerminalLines = ref<string[]>(Array(terminalLines.length).fill(''))
const typingFinished = ref(false)

const typeTerminalLine = (lineIndex: number, charIndex = 0) => {
  const target = terminalLines[lineIndex]

  if (charIndex > target.length) {
    if (lineIndex < terminalLines.length - 1) {
      window.setTimeout(() => {
        typeTerminalLine(lineIndex + 1, 0)
      }, 120 + Math.random() * 180)
      return
    }

    typingFinished.value = true
    return
  }

  const nextChar = target[charIndex] ?? ''
  const punctuationPause = /[.!?]/.test(nextChar) ? 55 : 0
  const mechanicalPause = Math.random() < 0.12 ? 60 + Math.random() * 100 : 0
  const delay = nextChar === ' ' ? 12 + Math.random() * 18 : 18 + Math.random() * 30 + punctuationPause + mechanicalPause

  typedTerminalLines.value[lineIndex] = target.slice(0, charIndex + 1)

  if (charIndex >= target.length) {
    if (lineIndex < terminalLines.length - 1) {
      window.setTimeout(() => {
        typeTerminalLine(lineIndex + 1, 0)
      }, 120 + Math.random() * 180)
    } else {
      typingFinished.value = true
    }
    return
  }

  window.setTimeout(() => {
    typeTerminalLine(lineIndex, charIndex + 1)
  }, delay)
}

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion) {
    typedTerminalLines.value = [...terminalLines]
    typingFinished.value = true
    return
  }

  typeTerminalLine(0, 0)
})
</script>

<template>
  <section id="imperium-record" class="personnel-record section reveal" aria-labelledby="record-title">
    <SectionHeader
      overline="IMPERIUM RECORD"
      title="PURITY EDICT"
      subtitle="A technical record of systems, machines and artificial intelligence."
    />

    <div class="personnel-record__plate">
      <pre class="personnel-record__terminal" aria-live="polite">{{ typedTerminalLines.join('\n') }}<span v-if="!typingFinished" class="personnel-record__terminal-cursor" aria-hidden="true" /></pre>

      <article class="personnel-record__archive" aria-live="polite">
        <h3 id="record-title"></h3>
        <p>Graduate in Software Engineering with hands-on experience in backend development, web technologies, PLC programming, and industrial automation. I build reliable systems across software engineering, automation, and AI-assisted workflows, with a focus on real-world integration and long-term architectural clarity.</p>
        <p>My objective is to work in a Software Engineering role where I can contribute to meaningful projects, continue learning across all areas of technology, and grow toward a System Architect career. I value disciplined engineering, practical problem solving, and the ability to connect complex systems into dependable solutions.</p>
      </article>
    </div>
  </section>
</template>
