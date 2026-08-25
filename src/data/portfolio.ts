import { skillDomains } from './skills'
import { serviceHistory } from './experience'
import { deployments } from './projects'
import { researchTopics } from './research'

export type PortfolioRecord = {
  name: string
  description: string
}

export type PortfolioCategory = {
  category: string
  records: PortfolioRecord[]
}

const categories: PortfolioCategory[] = skillDomains.map((domain) => ({
  category: domain.title,
  records: domain.systems.map((system) => ({
    name: system.name,
    description: system.note,
  })),
}))

export const portfolioData = {
  node: 'SOFRE-01',
  profile: {
    name: 'DUSHKO SOFRONIEVSKI',
    role: 'SOFTWARE ENGINEER',
    specializations: [
      'BACKEND SYSTEMS',
      'AI / LLM SYSTEMS',
      'MULTI-AGENT SYSTEMS',
      'WEB TECHNOLOGIES',
      'INDUSTRIAL AUTOMATION',
    ],
    status: 'ENGINEER // SYSTEM ARCHITECT IN DEVELOPMENT',
    summary:
      'Software engineer with practical experience across backend development, industrial automation, and AI-assisted engineering workflows.',
  },
  education: {
    institution: 'UNIVERSITY AMERICAN COLLEGE SKOPJE (UACS)',
    degree: 'BACHELOR OF SCIENCE IN COMPUTER SCIENCE',
    coursework: [
      'DATA STRUCTURES & ALGORITHMS',
      'OBJECT-ORIENTED PROGRAMMING',
      'SOFTWARE ENGINEERING',
      'WEB DEVELOPMENT',
      'DATABASE SYSTEMS',
      'DISTRIBUTED DATABASE SYSTEMS',
      'COMPUTER ARCHITECTURE',
      'ARCHITECTURE & DESIGN PRINCIPLES',
      'LINUX SERVER ENVIRONMENTS',
    ],
  },
  contact: {
    email: 'dukisofronievski@gmail.com',
    github: 'https://github.com/Sofre',
    linkedin: 'https://www.linkedin.com/in/dushko-sofronievski-19044021b',
    cv: '#',
  },
  experience: serviceHistory,
  projects: deployments,
  researchTopics,
  categories,
} as const

export type PortfolioData = typeof portfolioData

export const archiveDirectories = [
  '/PROFILE',
  '/EXPERIENCE',
  '/EDUCATION',
  '/PROJECTS',
  '/TECHNICAL_ARCHIVE',
  '/AI_SYSTEMS',
  '/INDUSTRIAL_AUTOMATION',
  '/RESEARCH',
  '/CONTACT',
] as const
