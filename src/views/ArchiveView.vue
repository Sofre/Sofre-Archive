<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ArchiveBoot from '../components/ArchiveBoot.vue'
import ImperialNavigation from '../components/ImperialNavigation.vue'
import SystemStatus from '../components/SystemStatus.vue'
import PersonnelRecord from '../components/PersonnelRecord.vue'
import SectionHeader from '../components/SectionHeader.vue'
import ServiceTimeline from '../components/ServiceTimeline.vue'
import WargearSection from '../components/WargearSection.vue'
import DeploymentSection from '../components/DeploymentSection.vue'
import ResearchArchive from '../components/ResearchArchive.vue'
import TransmissionPanel from '../components/TransmissionPanel.vue'
import { useArchiveBoot } from '../composables/useArchiveBoot'
import { useParallax } from '../composables/useParallax'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import mePortrait from '../assets/me.png'

const route = useRoute()
const { isBootVisible, completeBoot } = useArchiveBoot()

const scholasticaTerminalLines = [
  '+++ SCHOLASTICA +++',
  '',
  'INSTITUTION',
  'UNIVERSITY AMERICAN COLLEGE SKOPJE (UACS)',
  '',
  'DEGREE',
  'BACHELOR OF SCIENCE IN COMPUTER SCIENCE',
  '',
  'RELEVANT COURSEWORK',
  'DATA STRUCTURES & ALGORITHMS',
  'OBJECT-ORIENTED PROGRAMMING',
  'SOFTWARE ENGINEERING',
  'WEB DEVELOPMENT',
  'DATABASE SYSTEMS',
  'DISTRIBUTED DATABASE SYSTEMS',
  'COMPUTER ARCHITECTURE',
  'ARCHITECTURE & DESIGN PRINCIPLES',
  'LINUX SERVER ENVIRONMENTS',
]

const typedScholasticaTerminal = ref<string[]>(Array(scholasticaTerminalLines.length).fill(''))
const scholasticaTerminalFinished = ref(false)

const typeScholasticaTerminalLine = (lineIndex: number, charIndex = 0) => {
  const target = scholasticaTerminalLines[lineIndex]

  if (charIndex > target.length) {
    if (lineIndex < scholasticaTerminalLines.length - 1) {
      window.setTimeout(() => {
        typeScholasticaTerminalLine(lineIndex + 1, 0)
      }, 120 + Math.random() * 180)
      return
    }

    scholasticaTerminalFinished.value = true
    return
  }

  const nextChar = target[charIndex] ?? ''
  const punctuationPause = /[.!?]/.test(nextChar) ? 55 : 0
  const mechanicalPause = Math.random() < 0.12 ? 60 + Math.random() * 120 : 0
  const delay = nextChar === ' ' ? 12 + Math.random() * 18 : 20 + Math.random() * 32 + punctuationPause + mechanicalPause

  typedScholasticaTerminal.value[lineIndex] = target.slice(0, charIndex + 1)

  if (charIndex >= target.length) {
    if (lineIndex < scholasticaTerminalLines.length - 1) {
      window.setTimeout(() => {
        typeScholasticaTerminalLine(lineIndex + 1, 0)
      }, 120 + Math.random() * 180)
    } else {
      scholasticaTerminalFinished.value = true
    }
    return
  }

  window.setTimeout(() => {
    typeScholasticaTerminalLine(lineIndex, charIndex + 1)
  }, delay)
}

const scholasticaSummary = [
  'Bachelor of Science in Computer Science, completed with a strong foundation in software engineering, architecture, databases, distributed systems, and the practical realities of building technology.',
  'This academic phase gave me the structural discipline needed to approach software and automation as scalable, maintainable systems rather than isolated projects.',
]

const sections = [
  {
    id: 'imperium-record',
    label: 'IMPERIUM RECORD',
    subtitle: 'Profile / Doctrine',
    info: 'Professional summary, specialization focus, and engineering operating principles.',
  },
  {
    id: 'scholastica',
    label: 'SCHOLASTICA',
    subtitle: 'Academic Formation',
    info: 'Education background and the foundation of my discipline in Computer Science.',
  },
  {
    id: 'service-history',
    label: 'SERVICE HISTORY',
    subtitle: 'Historical Campaigns',
    info: 'Work experience timeline with real responsibilities, systems, and measurable outcomes.',
  },
  {
    id: 'wargear',
    label: 'WARGEAR',
    subtitle: 'Skills and Technologies',
    info: 'Core stack proficiency across backend, automation, AI, and engineering tooling.',
  },
  {
    id: 'deployments',
    label: 'DEPLOYMENTS',
    subtitle: 'Project Dossiers',
    info: 'Portfolio projects with objectives, architecture, implementation details, and results.',
  },
  {
    id: 'research',
    label: 'RESEARCH ARCHIVE',
    subtitle: 'AI and Systems Research',
    info: 'Research interests in multi-agent AI, simulation, optimization, and decision systems.',
  },
  {
    id: 'transmission',
    label: 'TRANSMISSION',
    subtitle: 'Secure Contact Channel',
    info: 'Direct contact options for job opportunities, collaboration, and technical inquiries.',
  },
]

const routeSection = computed(() => route.meta.section as string | undefined)

const goTo = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(async () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion) {
    typedScholasticaTerminal.value = [...scholasticaTerminalLines]
    scholasticaTerminalFinished.value = true
  } else {
    typeScholasticaTerminalLine(0, 0)
  }

  if (routeSection.value) {
    await nextTick()
    goTo(routeSection.value)
  }
})

watch(routeSection, async (newSection) => {
  if (!newSection) {
    return
  }

  await nextTick()
  goTo(newSection)
})

useParallax('.archive-root')
useScrollAnimation('.reveal')
</script>

<template>
  <div class="archive-root">
    <ArchiveBoot v-if="isBootVisible" @complete="completeBoot" />

    <div class="archive-environment" aria-hidden="true">
      <div data-parallax-depth="14" class="archive-environment__halo" />
      <div data-parallax-depth="24" class="archive-environment__gear archive-environment__gear--a" />
      <div data-parallax-depth="18" class="archive-environment__gear archive-environment__gear--b" />
      <div data-parallax-depth="9" class="archive-environment__grid" />
      <div data-parallax-depth="6" class="archive-environment__smoke" />
    </div>

    <ImperialNavigation :sections="sections" />

    <main>
      <section id="hero" class="hero reveal" aria-labelledby="archive-title">
        <p class="hero__overline">THE IMPERIUM's ENGINEERING ARCHIVE</p>
        <h1 id="archive-title">DUSHKO SOFRONIEVSKI</h1>
        <p class="hero__designation">BSc • SOFTWARE ENGINEER</p>
        <p class="hero__secondary">ADEPT OF THE MACHINE SPIRIT</p>
        <p class="hero__specialization">BACKEND • INDUSTRIAL AUTOMATION • ARTIFICIAL INTELLIGENCE</p>

        <div class="hero__status-layout">
          <SystemStatus />
          <figure class="hero__portrait" aria-label="Dushko Sofronievski portrait">
            <img :src="mePortrait" alt="Portrait of Dushko Sofronievski" loading="eager" decoding="async" />
          </figure>
        </div>
      </section>

      <PersonnelRecord />

      <section id="scholastica" class="section reveal" aria-labelledby="scholastica-title">
        <SectionHeader
          overline="SCHOLASTICA"
          title="ACADEMIC FOUNDRY"
          subtitle="Formal education and the disciplined foundation of my engineering path."
        />

        <div class="personnel-record__plate">
          <pre class="personnel-record__terminal" aria-live="polite">{{ typedScholasticaTerminal.join('\n') }}<span v-if="!scholasticaTerminalFinished" class="personnel-record__terminal-cursor" aria-hidden="true" /></pre>

          <article class="personnel-record__archive" aria-live="polite">
            <h3 id="scholastica-title">University American College Skopje</h3>
            <p>{{ scholasticaSummary[0] }}</p>
            <p>{{ scholasticaSummary[1] }}</p>
          </article>
        </div>
      </section>

      <ServiceTimeline />
      <WargearSection />
      <DeploymentSection />
      <ResearchArchive />
      <TransmissionPanel />

      <footer class="archive-footer reveal">
        <p>I DON'T JUST BUILD SOFTWARE. I ENGINEER SYSTEMS.</p>
      </footer>
    </main>
  </div>
</template>
