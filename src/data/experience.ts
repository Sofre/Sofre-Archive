export type CampaignRecord = {
  id: string
  title: string
  organization: string
  period: string
  domain: string
  systems: string[]
  responsibilities: string[]
  achievements: string[]
}

export const serviceHistory: CampaignRecord[] = [
  {
    id: '001',
    title: 'Automation Engineer Intern',
    organization: 'SisKon',
    period: 'June 2025 – September 2025',
    domain: 'Industrial Automation',
    systems: ['PLC Programming', 'Ladder Logic (LAD)', 'Function Block (FBD)', 'Siemens Step 7', 'TIA Portal', 'SCADA', 'WinCC'],
    responsibilities: [
      'Gained hands-on experience with PLC programming using Ladder Logic (LAD) and Function Block (FBD).',
      'Worked with Siemens Step 7-line hardware configurations and SCADA systems.',
      'Assisted in configuring WinCC on an IPC for a SCADA system and protection setup at a substation in Elbasan, Albania.',
    ],
    achievements: [
      'Developed practical understanding of industrial control architecture, field configuration, and supervision layers.',
      'Strengthened the connection between automation logic and reliable, observable real-world system operation.',
    ],
  },
]
