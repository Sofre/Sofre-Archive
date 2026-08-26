<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { PortfolioData } from '../data/portfolio'
import { archiveDirectories } from '../data/portfolio'

type TerminalLine = {
  type: 'system' | 'command' | 'result' | 'warning' | 'error'
  text: string
  href?: string
}

type Suggestion = {
  value: string
  desc: string
}

const props = defineProps<{
  portfolio: PortfolioData
}>()

const emit = defineEmits<{
  switchGui: []
}>()

const output = ref<TerminalLine[]>([])
const commandInput = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const outputEl = ref<HTMLElement | null>(null)
const history = ref<string[]>([])
const historyIndex = ref(-1)
const selectedSuggestion = ref(0)
const showAssist = ref(true)
const isMobile = ref(false)
let mobileQueryList: MediaQueryList | null = null

const updateIsMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 768px)').matches
}

const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, ' ')

const allSkills = computed(() =>
  props.portfolio.categories.flatMap((category) =>
    category.records.map((record) => ({
      category: category.category,
      name: record.name,
      description: record.description,
    })),
  ),
)

const scrollBottom = () => {
  nextTick(() => {
    outputEl.value?.scrollTo({ top: outputEl.value.scrollHeight, behavior: 'smooth' })
  })
}

const pushLine = (line: TerminalLine) => {
  output.value.push(line)
  scrollBottom()
}

const pushLines = (type: TerminalLine['type'], lines: string[]) => {
  lines.forEach((line) => pushLine({ type, text: line }))
}

const suggestions = computed<Suggestion[]>(() => {
  const input = commandInput.value
  const trimmed = input.trim()

  if (!trimmed) {
    return [
      { value: '/help', desc: 'Command reference' },
      { value: '/ls', desc: 'List archive nodes' },
      { value: '/open /PROJECTS', desc: 'Open archive sector' },
      { value: '/srch "Programming Languages"', desc: 'Search category' },
      { value: '/find "Spring"', desc: 'Global search' },
      { value: '/gui', desc: 'Switch to Mechanicus interface' },
    ]
  }

  if (trimmed.startsWith('/srch "') && !trimmed.includes('"-"')) {
    const q = trimmed.replace(/^\/srch\s+"/i, '').replace(/"$/g, '')
    return props.portfolio.categories
      .filter((c) => normalize(c.category).includes(normalize(q)))
      .slice(0, 8)
      .map((c) => ({ value: `/srch "${c.category}"`, desc: 'Archive category' }))
  }

  if (trimmed.startsWith('/srch "') && trimmed.includes('"-"')) {
    const match = trimmed.match(/^\/srch\s+"([^"]+)"-"([^"]*)/i)
    const category = match?.[1] ?? ''
    const query = match?.[2] ?? ''
    const foundCategory = props.portfolio.categories.find((c) => normalize(c.category) === normalize(category))
    if (!foundCategory) {
      return []
    }

    return foundCategory.records
      .filter((r) => normalize(r.name).includes(normalize(query)))
      .slice(0, 8)
      .map((r) => ({ value: `/srch "${foundCategory.category}"-"${r.name}"`, desc: 'Record query' }))
  }

  const commands = [
    '/help',
    '/ls',
    '/open /PROJECTS',
    '/open /AI_SYSTEMS',
    '/srch "Programming Languages"',
    '/find "Spring"',
    '/status',
    '/about',
    '/projects',
    '/experience',
    '/education',
    '/research',
    '/contact',
    '/wargear',
    '/ai',
    '/automation',
    '/cv',
    '/clear',
    '/gui',
  ]

  return commands
    .filter((command) => command.startsWith(trimmed))
    .slice(0, 10)
    .map((command) => ({ value: command, desc: 'Protocol' }))
})

const ghostText = computed(() => {
  const suggestion = suggestions.value[selectedSuggestion.value]
  if (!suggestion) {
    return ''
  }

  if (suggestion.value.startsWith(commandInput.value)) {
    return suggestion.value.slice(commandInput.value.length)
  }

  return ''
})

const printWelcome = () => {
  if (isMobile.value) {
    pushLines('system', [
      '┌─────────────────────────────┐',
      '│ ⚙ SPIRIT COMMAND           │',
      `│ COGITUS // ${props.portfolio.node.padEnd(13).slice(0, 13)} │`,
      '│ ● ONLINE       MACHINE OK  │',
      '└─────────────────────────────┘',
      '',
      'COGITATOR OS v4.0.1',
      '',
      'ARCHIVE ACCESS GRANTED.',
      '',
      'TYPE /help FOR COMMANDS.',
    ])
    return
  }

  pushLines('system', [
    '╔══════════════════════════════════════════════════════════════════╗',
    '║ SPIRIT COMMAND // COGITUS                                       ║',
    `║ COGITATOR NODE: ${props.portfolio.node.padEnd(47).slice(0, 47)}║`,
    '║ MACHINE SPIRIT: ONLINE                                          ║',
    '╚══════════════════════════════════════════════════════════════════╝',
    '',
    'COGITATOR OS v4.0.1',
    '',
    'ARCHIVE ACCESS GRANTED.',
    '',
    'TYPE /help FOR AVAILABLE COMMANDS.',
  ])
}

const listCategory = (categoryName: string) => {
  const category = props.portfolio.categories.find((entry) => normalize(entry.category) === normalize(categoryName))

  if (!category) {
    pushLines('error', ['[ERROR // 0x17]', 'ARCHIVE NODE NOT FOUND.', 'Consult: /help'])
    return
  }

  pushLine({ type: 'result', text: category.category.toUpperCase() })
  pushLine({ type: 'result', text: '' })
  category.records.forEach((record, index) => {
    pushLine({ type: 'result', text: `${String(index + 1).padStart(2, '0')} // ${record.name.toUpperCase()}` })
    pushLine({ type: 'result', text: `    ${record.description}` })
  })
}

const listRecord = (categoryName: string, recordName: string) => {
  const category = props.portfolio.categories.find((entry) => normalize(entry.category) === normalize(categoryName))
  const record = category?.records.find((entry) => normalize(entry.name) === normalize(recordName))

  if (!category || !record) {
    pushLines('error', ['[ERROR // 0x17]', 'RECORD NOT FOUND IN ARCHIVE.', 'Consult: /srch "<category>"'])
    return
  }

  if (isMobile.value) {
    const desc = record.description.length > 28 ? `${record.description.slice(0, 28)}...` : record.description
    pushLines('result', [
      '┌─────────────────────────────┐',
      `│ ${record.name.toUpperCase().padEnd(27).slice(0, 27)}│`,
      '│                             │',
      '│ CATEGORY                    │',
      `│ ${category.category.padEnd(27).slice(0, 27)}│`,
      '│                             │',
      '│ STATUS                      │',
      '│ OPERATIONAL                 │',
      '│                             │',
      `│ ${desc.padEnd(27).slice(0, 27)}│`,
      '└─────────────────────────────┘',
    ])
    return
  }

  const desc = record.description.length > 38 ? `${record.description.slice(0, 35)}...` : record.description
  pushLines('result', [
    '╔══════════════════════════════════════════════╗',
    `║ COGITATOR RECORD // ${record.name.padEnd(26).slice(0, 26)}║`,
    '╠══════════════════════════════════════════════╣',
    `║ CATEGORY: ${category.category.toUpperCase().padEnd(24).slice(0, 24)}║`,
    '║ STATUS: OPERATIONAL                       ║',
    '║                                          ║',
    `║ ${desc.padEnd(38).slice(0, 38)}║`,
    '╚══════════════════════════════════════════════╝',
  ])
}

const globalFind = (query: string) => {
  const q = normalize(query)
  const hits: string[] = []

  props.portfolio.categories.forEach((category) => {
    category.records.forEach((record) => {
      const blob = normalize(`${category.category} ${record.name} ${record.description}`)
      if (blob.includes(q)) {
        hits.push(`${record.name.toUpperCase()} // ${category.category.toUpperCase()}\n    ${record.description}`)
      }
    })
  })

  props.portfolio.projects.forEach((project) => {
    const blob = normalize(`${project.code} ${project.title} ${project.subtitle} ${project.implementation}`)
    if (blob.includes(q)) {
      hits.push(`${project.code} // PROJECT\n    ${project.subtitle}`)
    }
  })

  props.portfolio.experience.forEach((exp) => {
    const blob = normalize(`${exp.title} ${exp.organization} ${exp.domain} ${exp.responsibilities.join(' ')}`)
    if (blob.includes(q)) {
      hits.push(`${exp.title.toUpperCase()} // EXPERIENCE\n    ${exp.organization}`)
    }
  })

  pushLines('warning', ['[SCANNING ARCHIVE...]', `[INDEX MATCH FOUND] ${hits.length} RECORDS IDENTIFIED`])
  if (!hits.length) {
    pushLine({ type: 'error', text: 'NO MATCHES DETECTED.' })
    return
  }

  hits.slice(0, 15).forEach((hit) => {
    const [title, desc] = hit.split('\n')
    pushLine({ type: 'result', text: title })
    pushLine({ type: 'result', text: desc })
  })
}

const printProjects = () => {
  pushLines('result', ['PROJECT ARCHIVE', ''])
  props.portfolio.projects.forEach((project, index) => {
    pushLine({ type: 'result', text: `[${String(index + 1).padStart(2, '0')}] ${project.code}` })
    pushLine({ type: 'result', text: `     ${project.subtitle}` })
  })
  pushLine({ type: 'warning', text: 'SELECT RECORD: /open 01' })
}

const openProject = (indexText: string) => {
  const idx = Number.parseInt(indexText, 10)
  if (Number.isNaN(idx) || idx < 1 || idx > props.portfolio.projects.length) {
    pushLine({ type: 'error', text: 'INVALID PROJECT RECORD INDEX.' })
    return
  }

  const project = props.portfolio.projects[idx - 1]
  pushLines('result', [
    `PROJECT // ${project.code}`,
    `TITLE: ${project.title}`,
    `STATUS: ${project.status}`,
    `OBJECTIVE: ${project.objective}`,
    `TECH: ${project.technologies.join(', ')}`,
  ])
}

const openDirectory = (path: string) => {
  const normalized = path.toUpperCase()
  if (normalized === '/PROJECTS') {
    printProjects()
    return
  }
  if (normalized === '/PROFILE') {
    runAbout()
    return
  }
  if (normalized === '/EXPERIENCE') {
    runExperience()
    return
  }
  if (normalized === '/EDUCATION') {
    runEducation()
    return
  }
  if (normalized === '/RESEARCH') {
    runResearch()
    return
  }
  if (normalized === '/CONTACT') {
    runContact()
    return
  }
  if (normalized === '/TECHNICAL_ARCHIVE' || normalized === '/WARGEAR') {
    runWargear()
    return
  }
  if (normalized === '/AI_SYSTEMS') {
    runAi()
    return
  }
  if (normalized === '/INDUSTRIAL_AUTOMATION') {
    runAutomation()
    return
  }

  pushLine({ type: 'error', text: 'UNKNOWN ARCHIVE DIRECTORY.' })
}

const runStatus = () => {
  pushLines('result', [
    'COGITATOR SYSTEM STATUS',
    '',
    'MACHINE SPIRIT       ONLINE',
    'ARCHIVE CORE         ONLINE',
    'KNOWLEDGE INDEX      100%',
    'SYSTEM INTEGRITY     100%',
    'NETWORK              STABLE',
    'HERESY DETECTED      0',
    'ACCESS LEVEL         PUBLIC',
  ])
}

const runAbout = () => {
  pushLines('result', [
    'IDENTITY RECORD',
    '',
    'DESIGNATION:',
    props.portfolio.profile.name,
    '',
    'ROLE:',
    props.portfolio.profile.role,
    '',
    'SPECIALIZATIONS:',
    ...props.portfolio.profile.specializations,
    '',
    'STATUS:',
    props.portfolio.profile.status,
  ])
}

const runExperience = () => {
  pushLines('result', ['EXPERIENCE ARCHIVE', ''])
  props.portfolio.experience.forEach((exp, index) => {
    pushLine({ type: 'result', text: `[${String(index + 1).padStart(2, '0')}] ${exp.title.toUpperCase()}` })
    pushLine({ type: 'result', text: `     ${exp.organization} // ${exp.period}` })
  })
}

const runEducation = () => {
  pushLines('result', [
    'EDUCATION RECORD',
    '',
    'INSTITUTION:',
    props.portfolio.education.institution,
    '',
    'DEGREE:',
    props.portfolio.education.degree,
    '',
    'COURSEWORK:',
    ...props.portfolio.education.coursework,
  ])
}

const runResearch = () => {
  pushLines('result', ['RESEARCH ARCHIVE', '', ...props.portfolio.researchTopics.map((topic) => `- ${topic}`)])
}

const runContact = () => {
  pushLines('result', ['COMMUNICATION CHANNELS', '', 'EMAIL:'])
  pushLine({ type: 'result', text: props.portfolio.contact.email, href: `mailto:${props.portfolio.contact.email}` })
  pushLines('result', ['', 'LINKEDIN:'])
  pushLine({ type: 'result', text: props.portfolio.contact.linkedin, href: props.portfolio.contact.linkedin })
  pushLines('result', ['', 'GITHUB:'])
  pushLine({ type: 'result', text: props.portfolio.contact.github, href: props.portfolio.contact.github })
  pushLines('result', ['', 'SYSTEM MESSAGE:', 'Use authorized communication channels to establish contact.'])
}

const runWargear = () => {
  pushLines('result', ['WAR GEAR ARCHIVE', ''])
  allSkills.value.slice(0, 20).forEach((skill, index) => {
    pushLine({ type: 'result', text: `[${String(index + 1).padStart(2, '0')}] ${skill.name.toUpperCase()}` })
  })
}

const runAi = () => {
  const aiCategory = props.portfolio.categories.find((entry) => normalize(entry.category) === normalize('AI & Intelligent Systems'))
  pushLines('result', ['AI SYSTEMS ARCHIVE', ''])
  aiCategory?.records.forEach((record) => {
    pushLine({ type: 'result', text: `${record.name.toUpperCase()} // ${record.description}` })
  })
}

const runAutomation = () => {
  const autoCategory = props.portfolio.categories.find((entry) => normalize(entry.category) === normalize('Industrial Automation'))
  pushLines('result', ['INDUSTRIAL AUTOMATION ARCHIVE', ''])
  autoCategory?.records.forEach((record) => {
    pushLine({ type: 'result', text: `${record.name.toUpperCase()} // ${record.description}` })
  })
}

const runCv = () => {
  pushLine({ type: 'result', text: 'CV DATA-SLATE' })
  pushLine({ type: 'result', text: props.portfolio.contact.cv, href: props.portfolio.contact.cv })
}

const clearTerminal = () => {
  output.value = []
  printWelcome()
}

const switchToGui = () => {
  pushLines('warning', [
    'SWITCHING INTERFACE PROTOCOL...',
    '',
    'SPIRIT COMMAND DISENGAGING.',
    'MECHANICUS INTERFACE INITIALIZING...',
    '',
    '[OK]',
    '',
    'COGITATOR GUI ONLINE.',
  ])
  window.setTimeout(() => emit('switchGui'), 900)
}

const handleCommand = (raw: string) => {
  const command = raw.trim()
  if (!command) {
    return
  }

  pushLine({ type: 'command', text: `> ${command}` })

  if (/^\/help$/i.test(command)) {
    pushLines('result', [
      'AVAILABLE COMMANDS',
      '/help /ls /open /srch /find /status /about /projects',
      '/experience /education /research /contact /wargear',
      '/ai /automation /cv /clear /gui',
    ])
    return
  }

  if (/^\/ls$/i.test(command)) {
    pushLines('result', ['COGITATOR ARCHIVE', '', ...archiveDirectories])
    return
  }

  if (/^\/status$/i.test(command)) {
    runStatus()
    return
  }

  if (/^\/about$/i.test(command)) {
    runAbout()
    return
  }

  if (/^\/projects$/i.test(command)) {
    printProjects()
    return
  }

  if (/^\/experience$/i.test(command)) {
    runExperience()
    return
  }

  if (/^\/education$/i.test(command)) {
    runEducation()
    return
  }

  if (/^\/research$/i.test(command)) {
    runResearch()
    return
  }

  if (/^\/contact$/i.test(command)) {
    runContact()
    return
  }

  if (/^\/wargear$/i.test(command)) {
    runWargear()
    return
  }

  if (/^\/ai$/i.test(command)) {
    runAi()
    return
  }

  if (/^\/automation$/i.test(command)) {
    runAutomation()
    return
  }

  if (/^\/cv$/i.test(command)) {
    runCv()
    return
  }

  if (/^\/clear$/i.test(command)) {
    clearTerminal()
    return
  }

  if (/^\/gui$/i.test(command)) {
    switchToGui()
    return
  }

  const openProjectMatch = command.match(/^\/open\s+(\d+)$/i)
  if (openProjectMatch) {
    openProject(openProjectMatch[1])
    return
  }

  const openDirectoryMatch = command.match(/^\/open\s+(\/[A-Z_]+)$/i)
  if (openDirectoryMatch) {
    openDirectory(openDirectoryMatch[1])
    return
  }

  const searchRecordMatch = command.match(/^\/srch\s+"([^"]+)"-"([^"]+)"$/i)
  if (searchRecordMatch) {
    listRecord(searchRecordMatch[1], searchRecordMatch[2])
    return
  }

  const searchCategoryMatch = command.match(/^\/srch\s+"([^"]+)"$/i)
  if (searchCategoryMatch) {
    listCategory(searchCategoryMatch[1])
    return
  }

  const findMatch = command.match(/^\/find\s+"([^"]+)"$/i)
  if (findMatch) {
    globalFind(findMatch[1])
    return
  }

  pushLines('error', ['[ERROR // 0x17]', 'COGITATOR DOES NOT RECOGNIZE THIS COMMAND.', '', 'Consult:', '/help'])
}

const executeInput = () => {
  const raw = commandInput.value
  const value = raw.trim()
  if (!value) {
    return
  }

  history.value.push(value)
  historyIndex.value = history.value.length
  handleCommand(value)
  commandInput.value = ''
}

const useSuggestion = (value: string) => {
  commandInput.value = value
  selectedSuggestion.value = 0
  inputEl.value?.focus()
}

const useHistoryCommand = (value: string) => {
  commandInput.value = value
  inputEl.value?.focus()
}

const categoryAssistChips = computed(() => {
  const trimmed = commandInput.value.trim()
  if (!trimmed.startsWith('/srch "') || trimmed.includes('"-"')) {
    return [] as string[]
  }

  const query = trimmed.replace(/^\/srch\s+"/i, '').replace(/"$/g, '')
  return props.portfolio.categories
    .filter((category) => normalize(category.category).includes(normalize(query)))
    .map((category) => category.category)
    .slice(0, 8)
})

const recordAssistChips = computed(() => {
  const match = commandInput.value.trim().match(/^\/srch\s+"([^"]+)"-"([^"]*)/i)
  if (!match) {
    return [] as string[]
  }

  const category = props.portfolio.categories.find((entry) => normalize(entry.category) === normalize(match[1]))
  if (!category) {
    return [] as string[]
  }

  const query = match[2] ?? ''
  return category.records
    .filter((record) => normalize(record.name).includes(normalize(query)))
    .map((record) => record.name)
    .slice(0, 8)
})

const applyCategoryChip = (category: string) => {
  commandInput.value = `/srch "${category}"`
  inputEl.value?.focus()
}

const applyRecordChip = (record: string) => {
  const match = commandInput.value.trim().match(/^\/srch\s+"([^"]+)"/i)
  if (!match) {
    return
  }

  commandInput.value = `/srch "${match[1]}"-"${record}"`
  inputEl.value?.focus()
}

const handleKeydown = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') {
    event.preventDefault()
    handleCommand('/clear')
    commandInput.value = ''
    return
  }

  if (event.key === 'Enter') {
    event.preventDefault()
    executeInput()
    return
  }

  if (event.key === 'ArrowUp' && !commandInput.value && history.value.length) {
    event.preventDefault()
    historyIndex.value = Math.max(0, historyIndex.value - 1)
    commandInput.value = history.value[historyIndex.value] ?? ''
    return
  }

  if (event.key === 'ArrowDown' && !commandInput.value && history.value.length) {
    event.preventDefault()
    historyIndex.value = Math.min(history.value.length, historyIndex.value + 1)
    commandInput.value = history.value[historyIndex.value] ?? ''
    return
  }

  if (event.key === 'ArrowUp' && suggestions.value.length) {
    event.preventDefault()
    selectedSuggestion.value = (selectedSuggestion.value - 1 + suggestions.value.length) % suggestions.value.length
    return
  }

  if (event.key === 'ArrowDown' && suggestions.value.length) {
    event.preventDefault()
    selectedSuggestion.value = (selectedSuggestion.value + 1) % suggestions.value.length
    return
  }

  if (event.key === 'Tab') {
    event.preventDefault()
    const suggestion = suggestions.value[selectedSuggestion.value]
    if (suggestion) {
      useSuggestion(suggestion.value)
    }
    return
  }

  if (event.key === 'Escape') {
    showAssist.value = false
    return
  }
}

watch(
  () => commandInput.value,
  () => {
    selectedSuggestion.value = 0
    showAssist.value = true
  },
)

onMounted(() => {
  updateIsMobile()
  mobileQueryList = window.matchMedia('(max-width: 768px)')
  mobileQueryList.addEventListener('change', updateIsMobile)

  printWelcome()

  if (!isMobile.value) {
    nextTick(() => inputEl.value?.focus())
  }
})

onUnmounted(() => {
  mobileQueryList?.removeEventListener('change', updateIsMobile)
})
</script>

<template>
  <section class="spirit-command" :class="{ 'spirit-command--mobile': isMobile }">
    <div class="spirit-command__terminal" :class="{ 'spirit-command__terminal--mobile': isMobile }">
      <header class="spirit-command__header" :class="{ 'spirit-command__header--mobile': isMobile }" aria-label="Cogitator machine header">
        <pre class="spirit-command__frame">┌──────────────────────────────────────────────────────────────┐
│ ⚙ SPIRIT COMMAND // COGITUS                                 │
│ COGITATOR NODE: {{ props.portfolio.node }}                                    │
│ STATUS: ONLINE                     MACHINE SPIRIT: STABLE    │
└──────────────────────────────────────────────────────────────┘</pre>

        <div class="spirit-command__diag">
          <span>NODE: 01</span>
          <span>MEM: 64K</span>
          <span>ARCHIVE: ONLINE</span>
          <span>SERIAL: 0x7F-SOF-001</span>
          <span>AUTH: PUBLIC</span>
        </div>

        <div class="spirit-command__indicators" aria-label="Machine status indicators">
          <span class="is-online">● ONLINE</span>
          <span class="is-processing">● INDEX READY</span>
          <span class="is-online">● ARCHIVE MOUNTED</span>
          <span class="is-online">● MACHINE SPIRIT STABLE</span>
        </div>
      </header>

      <div ref="outputEl" class="spirit-command__output" aria-live="polite">
        <div
          v-for="(line, idx) in output"
          :key="`${line.text}-${idx}`"
          :class="`spirit-command__line spirit-command__line--${line.type}`"
        >
          <a v-if="line.href" :href="line.href" target="_blank" rel="noreferrer noopener">{{ line.text }}</a>
          <template v-else>{{ line.text }}</template>
        </div>
      </div>

      <div v-if="showAssist && suggestions.length" class="spirit-command__assist" :class="{ 'spirit-command__assist--mobile': isMobile }" role="listbox" aria-label="Command assist">
        <p>COMMAND ASSIST // AVAILABLE PROTOCOLS</p>
        <button
          v-for="(suggestion, idx) in suggestions"
          :key="suggestion.value"
          type="button"
          :class="['spirit-command__assist-item', { 'is-selected': idx === selectedSuggestion }]"
          @click="useSuggestion(suggestion.value)"
        >
          <span>{{ suggestion.value }}</span>
          <small>{{ suggestion.desc }}</small>
        </button>

        <div v-if="isMobile && categoryAssistChips.length" class="spirit-command__chips">
          <button
            v-for="chip in categoryAssistChips"
            :key="`c-${chip}`"
            type="button"
            class="spirit-command__chip"
            @click="applyCategoryChip(chip)"
          >
            {{ chip }}
          </button>
        </div>

        <div v-if="isMobile && recordAssistChips.length" class="spirit-command__chips">
          <button
            v-for="chip in recordAssistChips"
            :key="`r-${chip}`"
            type="button"
            class="spirit-command__chip"
            @click="applyRecordChip(chip)"
          >
            {{ chip.toUpperCase() }}
          </button>
        </div>
      </div>

      <div class="spirit-command__input-dock" :class="{ 'spirit-command__input-dock--mobile': isMobile }">
        <div class="spirit-command__input-row">
          <span>&gt;</span>
          <div class="spirit-command__input-wrap">
            <span class="spirit-command__ghost">{{ ghostText }}</span>
            <input
              ref="inputEl"
              v-model="commandInput"
              type="text"
              class="spirit-command__input"
              autocomplete="off"
              @focus="showAssist = true"
              @keydown="handleKeydown"
            />
          </div>
          <span class="spirit-command__cursor" aria-hidden="true" />
        </div>

        <div class="spirit-command__toolbar">
          <button type="button" @click="useSuggestion('/help')">/help</button>
          <button type="button" @click="useSuggestion('/ls')">/ls</button>
          <button type="button" @click="useSuggestion('/find ')" >/find</button>
          <button type="button" @click="useSuggestion('/open /')">/open</button>
          <button type="button" @click="useSuggestion('/gui')">/gui</button>
        </div>

        <div v-if="isMobile && history.length" class="spirit-command__history" aria-label="Recent commands">
          <button
            v-for="(cmd, idx) in [...history].slice(-6).reverse()"
            :key="`h-${idx}-${cmd}`"
            type="button"
            class="spirit-command__history-item"
            @click="useHistoryCommand(cmd)"
          >
            {{ cmd }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
