<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { Monitor } from '@lucide/vue'
import ArchiveBoot from './components/ArchiveBoot.vue'
import SpiritCommandTerminal from './components/SpiritCommandTerminal.vue'
import { portfolioData } from './data/portfolio'

type InterfaceMode = 'gui' | 'terminal'
type Stage = 'legacy-boot' | 'boot' | 'select' | 'ready'

const STORAGE_MODE_KEY = 'sofrecogitator.interface.mode'
const STORAGE_BOOT_KEY = 'sofrecogitator.boot.completed'

const stage = ref<Stage>('legacy-boot')
const mode = ref<InterfaceMode>('gui')
const bootLines = ref<string[]>([])
const savedMode = ref<InterfaceMode | null>(null)
const isMobile = ref(false)
let mobileQueryList: MediaQueryList | null = null

const bootScript = [
  'MECHANICUS SYSTEM INITIALIZATION',
  '',
  '> POWER CORE: ONLINE',
  '> MACHINE SPIRIT: AWAKENING',
  '> ARCHIVE CORE: MOUNTING',
  '> KNOWLEDGE DATABASE: INDEXING',
  '> IDENTITY MATRIX: VERIFIED',
  '> COGITATOR NETWORK: CONNECTED',
  '',
  'SYSTEM READY',
  '',
  'SELECT INTERFACE PROTOCOL',
]

const isTerminalMode = computed(() => stage.value === 'ready' && mode.value === 'terminal')
const showMobileSwitchBar = computed(() => stage.value === 'ready' && mode.value === 'gui' && isMobile.value)

const updateIsMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 720px)').matches
}

const persistMode = (value: InterfaceMode) => {
  localStorage.setItem(STORAGE_MODE_KEY, value)
  localStorage.setItem(STORAGE_BOOT_KEY, 'true')
}

const selectMode = (value: InterfaceMode) => {
  mode.value = value
  persistMode(value)
  stage.value = 'ready'
}

const runBootSequence = () => {
  stage.value = 'boot'
  bootLines.value = []

  bootScript.forEach((line, index) => {
    window.setTimeout(() => {
      bootLines.value.push(line)
      if (index === bootScript.length - 1) {
        window.setTimeout(() => {
          if (savedMode.value) {
            mode.value = savedMode.value
            stage.value = 'ready'
            return
          }

          stage.value = 'select'
        }, 220)
      }
    }, index * 110)
  })
}

const handleLegacyBootComplete = () => {
  runBootSequence()
}

const switchToTerminal = () => {
  mode.value = 'terminal'
  persistMode('terminal')
  stage.value = 'ready'
}

const switchToGui = () => {
  mode.value = 'gui'
  persistMode('gui')
  stage.value = 'ready'
}

const handleSpiritCommandRequest = () => {
  switchToTerminal()
}

const handleMechanicusInterfaceRequest = () => {
  switchToGui()
}

const handleResetInterfaceRequest = () => {
  localStorage.removeItem(STORAGE_MODE_KEY)
  localStorage.removeItem(STORAGE_BOOT_KEY)
  savedMode.value = null
  mode.value = 'gui'
  runBootSequence()
}

onMounted(() => {
  updateIsMobile()
  mobileQueryList = window.matchMedia('(max-width: 720px)')
  mobileQueryList.addEventListener('change', updateIsMobile)

  window.addEventListener('open-spirit-command', handleSpiritCommandRequest)
  window.addEventListener('open-mechanicus-interface', handleMechanicusInterfaceRequest)
  window.addEventListener('reset-interface-protocol', handleResetInterfaceRequest)
  const saved = localStorage.getItem(STORAGE_MODE_KEY)

  if (saved === 'terminal' || saved === 'gui') {
    savedMode.value = saved
  }
})

onUnmounted(() => {
  mobileQueryList?.removeEventListener('change', updateIsMobile)
  window.removeEventListener('open-spirit-command', handleSpiritCommandRequest)
  window.removeEventListener('open-mechanicus-interface', handleMechanicusInterfaceRequest)
  window.removeEventListener('reset-interface-protocol', handleResetInterfaceRequest)
})
</script>

<template>
  <div class="cogitator-os">
    <ArchiveBoot v-if="stage === 'legacy-boot'" @complete="handleLegacyBootComplete" />

    <section v-else-if="stage === 'boot'" class="os-boot" aria-label="Mechanicus initialization">
      <pre class="os-boot__text">{{ bootLines.join('\n') }}</pre>
    </section>

    <section v-else-if="stage === 'select'" class="os-select" aria-label="Interface protocol selector">
      <article class="os-select__panel">
        <pre class="os-select__frame">╔══════════════════════════════════════════════════════════╗
║                  INTERFACE PROTOCOL                     ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║ [01] MECHANICUS INTERFACE                               ║
║      Graphical Cogitator interface                      ║
║                                                          ║
║ [02] SPIRIT COMMAND // COGITUS                          ║
║      Direct terminal access                             ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝</pre>

        <div class="os-select__actions">
          <button type="button" @click="selectMode('gui')">[01] MECHANICUS INTERFACE</button>
          <button type="button" @click="selectMode('terminal')">[02] SPIRIT COMMAND // COGITUS</button>
        </div>
      </article>
    </section>

    <template v-else>
      <SpiritCommandTerminal v-if="isTerminalMode" :portfolio="portfolioData" @switch-gui="switchToGui" />

      <div v-else class="os-gui-wrap">
        <button
          type="button"
          class="os-spirit-button"
          aria-label="Enter Spirit Command terminal mode"
          title="Spirit Command"
          @click="switchToTerminal"
        >
          <Monitor :size="22" aria-hidden="true" />
        </button>
        <RouterView />

        <div v-if="showMobileSwitchBar" class="os-mobile-switch" role="region" aria-label="Mobile system control">
          <span class="os-mobile-switch__label">MECHANICUS INTERFACE</span>
          <button type="button" class="os-mobile-switch__button" @click="switchToTerminal">
            SPIRIT COMMAND
          </button>
        </div>
      </div>
    </template>
  </div>
</template>
