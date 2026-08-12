<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import SectionHeader from './SectionHeader.vue'
import ProjectSchematic from './ProjectSchematic.vue'
import { deployments } from '../data/projects'

const primaryDeployments = computed(() => deployments.slice(0, 3))
const archiveLimit = 2
const availableArchivedDeployments = computed(() => deployments.slice(3))
const archivedDeployments = computed(() => deployments.slice(3, 3 + archiveLimit))

const isLoadingArchive = ref(false)
const isArchiveWindowOpen = ref(false)
const hasLoadedArchive = ref(false)

const openArchiveWindow = async () => {
  if (!archivedDeployments.value.length) {
    return
  }

  if (!hasLoadedArchive.value) {
    isLoadingArchive.value = true
    await new Promise((resolve) => window.setTimeout(resolve, 650))
    hasLoadedArchive.value = true
    isLoadingArchive.value = false
  }

  isArchiveWindowOpen.value = true
}

const closeArchiveWindow = () => {
  isArchiveWindowOpen.value = false
}

const onEscClose = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isArchiveWindowOpen.value) {
    closeArchiveWindow()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onEscClose)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onEscClose)
})
</script>

<template>
  <section id="deployments" class="deployments section reveal" aria-labelledby="deployments-title">
    <SectionHeader
      overline="DEPLOYMENTS"
      title="HISTORICAL DEPLOYMENTS"
      subtitle="Major projects archived as full deployment dossiers."
    />

    <article
      v-for="project in primaryDeployments"
      :key="project.id"
      class="deployments__record"
      :class="{ 'is-forbidden': project.code === 'MACSWC' }"
    >
      <p class="deployments__record-code">+++ DEPLOYMENT RECORD {{ project.id }} +++</p>
      <h3 id="deployments-title">{{ project.code }} // {{ project.title }}</h3>
      <p class="deployments__subtitle">{{ project.subtitle }}</p>

      <div class="deployments__grid">
        <div>
          <p class="deployments__label">OBJECTIVE</p>
          <p>{{ project.objective }}</p>
        </div>
        <div>
          <p class="deployments__label">STATUS</p>
          <p>{{ project.status }}</p>
        </div>
        <div>
          <p class="deployments__label">TECHNOLOGIES</p>
          <ul class="deployments__technologies">
            <li v-for="tech in project.technologies" :key="tech">{{ tech }}</li>
          </ul>
        </div>
        <div>
          <p class="deployments__label">IMPLEMENTATION</p>
          <p>{{ project.implementation }}</p>
        </div>
      </div>

      <p class="deployments__label">SYSTEM ARCHITECTURE</p>
      <ProjectSchematic :nodes="project.architecture" :accent="project.code === 'MACSWC' ? 'crimson' : 'gold'" />

      <p class="deployments__label">KEY FEATURES</p>
      <ul>
        <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
      </ul>

      <p class="deployments__label">GITHUB / LIVE DEMO</p>
      <div class="deployments__links">
        <a v-for="link in project.links" :key="link.label" :href="link.url" target="_blank" rel="noreferrer noopener">{{ link.label }}</a>
      </div>

      <p class="deployments__note">{{ project.note }}</p>
    </article>

    <div v-if="availableArchivedDeployments.length" class="deployments__more">
      <p class="deployments__more-label">+++ ADDITIONAL RECORDS LOCKED IN DEEP ARCHIVE +++</p>
      <div class="deployments__more-actions">
        <button type="button" class="deployments__open-archive" :disabled="isLoadingArchive" @click="openArchiveWindow">
          {{ isLoadingArchive ? 'FETCHING ARCHIVE RECORDS...' : 'FETCH MORE DEPLOYMENTS' }}
        </button>
      </div>
    </div>
  </section>

  <Teleport to="body">
    <div v-if="isArchiveWindowOpen" class="deployments-window" role="dialog" aria-modal="true" aria-label="Extended deployment archive">
      <div class="deployments-window__backdrop" @click="closeArchiveWindow" />
      <section class="deployments-window__panel">
        <header class="deployments-window__header">
          <p>+++ EXTENDED DEPLOYMENT ARCHIVE +++</p>
          <div class="deployments-window__header-actions">
            <a class="deployments__source-link" href="https://github.com/Sofre" target="_blank" rel="noreferrer noopener">GO INTO THE VOID</a>
            <button type="button" @click="closeArchiveWindow">CLOSE WINDOW</button>
          </div>
        </header>

        <div class="deployments-window__body">
          <article
            v-for="project in archivedDeployments"
            :key="`archived-${project.id}`"
            class="deployments__record"
            :class="{ 'is-forbidden': project.code === 'MACSWC' }"
          >
            <p class="deployments__record-code">+++ DEPLOYMENT RECORD {{ project.id }} +++</p>
            <h3>{{ project.code }} // {{ project.title }}</h3>
            <p class="deployments__subtitle">{{ project.subtitle }}</p>

            <div class="deployments__grid">
              <div>
                <p class="deployments__label">OBJECTIVE</p>
                <p>{{ project.objective }}</p>
              </div>
              <div>
                <p class="deployments__label">STATUS</p>
                <p>{{ project.status }}</p>
              </div>
              <div>
                <p class="deployments__label">TECHNOLOGIES</p>
                <ul class="deployments__technologies">
                  <li v-for="tech in project.technologies" :key="tech">{{ tech }}</li>
                </ul>
              </div>
              <div>
                <p class="deployments__label">IMPLEMENTATION</p>
                <p>{{ project.implementation }}</p>
              </div>
            </div>

            <p class="deployments__label">SYSTEM ARCHITECTURE</p>
            <ProjectSchematic :nodes="project.architecture" :accent="project.code === 'MACSWC' ? 'crimson' : 'gold'" />

            <p class="deployments__label">KEY FEATURES</p>
            <ul>
              <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
            </ul>

            <p class="deployments__label">GITHUB / LIVE DEMO</p>
            <div class="deployments__links">
              <a v-for="link in project.links" :key="link.label" :href="link.url" target="_blank" rel="noreferrer noopener">{{ link.label }}</a>
            </div>

            <p class="deployments__note">{{ project.note }}</p>
          </article>
        </div>
      </section>
    </div>
  </Teleport>
</template>
