export type Deployment = {
  id: string
  code: string
  title: string
  subtitle: string
  objective: string
  architecture: string[]
  technologies: string[]
  implementation: string
  status: string
  features: string[]
  links: { label: string; url: string }[]
  note: string
}

export const deployments: Deployment[] = [
  {
    id: '001',
    code: 'RPM-API',
    title: 'Remote Patient Monitoring API',
    subtitle: 'RESTful backend for managing patient vitals and real-time alerts',
    objective:
      'Develop a RESTful API for managing patient vitals and alerts while keeping the backend portable, maintainable, and testable.',
    architecture: ['Client', 'REST API', 'Spring Boot', 'H2 Database', 'Container Runtime'],
    technologies: ['Java', 'Spring Boot', 'H2', 'Maven', 'Podman', 'REST API', 'Postman'],
    implementation:
      'Built a Java Spring Boot application with clear service boundaries, data persistence, and endpoint validation. The system was containerized with Podman and tested via Postman for API reliability.',
    status: 'Completed Prototype',
    features: [
      'RESTful endpoints for patient vitals and alert management',
      'In-memory H2 database for lightweight testing and deployment',
      'Containerized runtime for portable cross-platform execution',
      'Maven-managed dependency and build workflow',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/Sofre/RPM-API' },
      { label: 'API Overview', url: 'https://github.com/Sofre/RPM-API' },
    ],
    note: 'This project highlights backend architecture discipline, API design, and practical deployment preparedness.',
  },
  {
    id: '002',
    code: 'INTELIQUIZ',
    title: 'InteliQuiz Game Platform',
    subtitle: 'AI-powered gamified learning system with review and admin workflows',
    objective:
      'Create a full-stack educational platform to improve engagement, personalize practice, and integrate AI-assisted question generation with governance controls.',
    architecture: ['Frontend', 'Authentication', 'AI Retrieval Pipeline', 'Admin Review', 'Student Analytics'],
    technologies: ['Java', 'Python', ' .NET', 'JWT', 'RAG', 'Embeddings', 'Docker', 'Excel Export'],
    implementation:
      'Developed a gamified questioning system with role-based Admin/Student flows, LLM-backed retrieval and semantic matching, and review before publishing generated questions. The platform includes performance tracking, weak-area detection, and reporting features.',
    status: 'Completed Project',
    features: [
      'AI/RAG pipeline with embeddings and semantic retrieval',
      'Admin approval workflow before question activation',
      'JWT authentication and role-based user access',
      'Performance tracking, weak-area detection, and Excel export',
      'Dockerized deployment for portability',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/Sofre/InteliQuizzGaming_.NET_wRAG' },
      { label: 'Project Page', url: 'https://github.com/Sofre/InteliQuizzGaming_.NET_wRAG' },
    ],
    note: 'This was a strong integration of full-stack architecture, AI retrieval, and responsible content governance in an applied learning environment.',
  },
  {
    id: '003',
    code: 'HRIMTHURSHUB',
    title: 'HrimthursHub',
    subtitle: 'Site and workforce management system with operational dashboards',
    objective:
      'Build a modular workforce and site management platform to coordinate employees, attendance, materials, payments, and field operations through structured workflows.',
    architecture: ['NestJS API', 'Prisma ORM', 'PostgreSQL', 'Angular Frontend', 'Google Maps', 'Scheduling Services'],
    technologies: ['NestJS', 'Prisma ORM', 'Angular', 'PostgreSQL', 'Google Maps API', 'Firebase', 'Background Jobs'],
    implementation:
      'Designed a modular backend using NestJS and Prisma with DTO validation and repository/service patterns, while building a responsive Angular frontend with dashboards and data management interfaces. The system also includes maps, notifications, and scheduled reporting tasks.',
    status: 'Completed Platform',
    features: [
      'Employee, site, material, attendance, and payment management',
      'Role-based workflows and dashboard-driven UI',
      'Google Maps geocoding for site distance and location calculations',
      'Firebase notifications and stock-monitoring automation',
      'Structured relational modeling with PostgreSQL',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/Sofre/HrimthursHub-Site-and-Workload-ManagmentSystem' },
      { label: 'Project Repository', url: 'https://github.com/Sofre/HrimthursHub-Site-and-Workload-ManagmentSystem' },
    ],
    note: 'This project demonstrates the practical application of backend modularity, database design, role-driven interfaces, and operational workflows.',
  },
  {
    id: '004',
    code: 'MULTI-AGENT',
    title: 'Multi Agent AI Conflict Simulation with Safety Constraints',
    subtitle: 'Decision-support simulation using autonomous agents and deterministic validation',
    objective:
      'Model geopolitical tensions, coalition dynamics, and crisis scenarios with autonomous country agents constrained by validated rules and safety boundaries.',
    architecture: ['Country Agents', 'Secretary/Board Agents', 'LLM Proposal Layer', 'Validation Engine', 'Simulation State'],
    technologies: ['Python', 'LLMs', 'Multi-Agent Systems', 'Prompt Engineering', 'Mathematical Modeling', 'Optimization'],
    implementation:
      'Designed a simulation engine where autonomous agents generate proposals that are validated against world constraints before affecting the simulation state. The system blends LLM orchestration, structured decision support, and mathematical modeling to improve control and traceability.',
    status: 'Research Active / Not Public',
    features: [
      'Autonomous country agents with coordinated strategic behavior',
      'Secretary and board-level validation for structural integrity',
      'Deterministic simulation engine and safety-constrained state updates',
      'LLM orchestration and prompt-driven crisis evaluation',
    ],
    links: [
      { label: 'Project Status', url: '#' },
      { label: 'Conference Preview', url: '#' },
    ],
    note: 'This project is being prepared for presentation at IHCONCS 2026 and remains intentionally restricted from public release while research continues.',
  },
]
