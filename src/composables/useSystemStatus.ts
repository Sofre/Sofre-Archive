import { computed, onMounted, onUnmounted, ref } from 'vue'

type StatusLine = { label: string; value: string; state: 'ok' | 'warn' }
type ArchiveMetric = { label: string; value: string; state: 'ok' | 'warn' }

const baseStatus: StatusLine[] = [
  { label: 'IDENTITY', value: 'VERIFIED', state: 'ok' },
  { label: 'MACHINE SPIRIT', value: 'NOMINAL', state: 'ok' },
  { label: 'DATABASE', value: 'CONNECTED', state: 'ok' },
  { label: 'SECURITY', value: 'AUTHORIZED', state: 'ok' },
  { label: 'SYSTEM STATUS', value: 'ONLINE', state: 'ok' },
]

const pulseTexts = ['CALIBRATING', 'SYNCED', 'MONITORING', 'STABLE']

export function useSystemStatus() {
  const now = ref(new Date())
  const pulse = ref('STABLE')
  const linesWritten = ref(42180)
  const diagnosticsRuns = ref(143)
  const fieldDeployments = ref(27)
  let timerId: number | undefined

  const lines = computed<StatusLine[]>(() =>
    baseStatus.map((line) => {
      if (line.label === 'SYSTEM STATUS') {
        return { ...line, value: `ONLINE / ${pulse.value}` }
      }
      return line
    }),
  )

  const metrics = computed<ArchiveMetric[]>(() => [
    { label: 'CODE LINES WRITTEN', value: linesWritten.value.toLocaleString(), state: 'ok' },
    { label: 'DIAGRAMS DRAWN', value: '312', state: 'ok' },
    { label: 'TEXTBOOKS WRITTEN', value: '9', state: 'ok' },
    { label: 'DIAGNOSTICS RUN', value: diagnosticsRuns.value.toLocaleString(), state: 'ok' },
    { label: 'FIELD DEPLOYMENTS', value: fieldDeployments.value.toLocaleString(), state: 'ok' },
    { label: 'AGENTS ORCHESTRATED', value: '58', state: 'ok' },
  ])

  onMounted(() => {
    timerId = window.setInterval(() => {
      now.value = new Date()
      pulse.value = pulseTexts[Math.floor(Math.random() * pulseTexts.length)]
      linesWritten.value += Math.floor(Math.random() * 9) + 1
      diagnosticsRuns.value += Math.random() > 0.7 ? 1 : 0
      fieldDeployments.value += Math.random() > 0.92 ? 1 : 0
    }, 3200)
  })

  onUnmounted(() => {
    if (timerId) {
      window.clearInterval(timerId)
    }
  })

  return {
    lines,
    metrics,
    timestamp: computed(() => now.value.toISOString().replace('T', ' ').slice(0, 19)),
  }
}
