export type SkillDomain = {
  title: string
  systems: { name: string; calibration: number; note: string }[]
}

export const skillDomains: SkillDomain[] = [
  {
    title: 'Programming Languages',
    systems: [
      { name: 'Java', calibration: 92, note: 'Core backend and enterprise application work' },
      { name: 'Python', calibration: 90, note: 'Automation, scripting, and AI workflows' },
      { name: 'C/C++', calibration: 76, note: 'Systems and performance-oriented development' },
      { name: 'SQL', calibration: 88, note: 'Relational modeling and querying' },
      { name: 'Ladder Logic (LAD)', calibration: 85, note: 'PLC logic design and industrial control' },
      { name: 'C#', calibration: 72, note: 'Microsoft ecosystem fundamentals' },
    ],
  },
  {
    title: 'Frameworks & Technologies',
    systems: [
      { name: 'Spring Boot', calibration: 90, note: 'REST services and enterprise backend architecture' },
      { name: 'Spring MVC', calibration: 84, note: 'Structured server-side application design' },
      { name: 'JDBC', calibration: 78, note: 'Database access and persistence integration' },
      { name: 'Angular', calibration: 82, note: 'Modern frontend application development' },
      { name: 'Prisma ORM', calibration: 74, note: 'Type-safe data access patterns' },
      { name: 'NestJS', calibration: 76, note: 'Modular backend service architecture' },
      { name: 'REST APIs', calibration: 92, note: 'Contract-driven service integrations' },
    ],
  },
  {
    title: 'Web Development',
    systems: [
      { name: 'HTML', calibration: 88, note: 'Structured semantic interfaces' },
      { name: 'CSS', calibration: 86, note: 'Responsive and maintainable UI styling' },
      { name: 'JavaScript', calibration: 84, note: 'Interactive frontend logic' },
      { name: 'TypeScript', calibration: 83, note: 'Typed application development' },
      { name: 'Vue.js 3', calibration: 80, note: 'Component-oriented UI building' },
    ],
  },
  {
    title: 'Database Systems',
    systems: [
      { name: 'Oracle SQL', calibration: 82, note: 'Enterprise database design and querying' },
      { name: 'PostgreSQL', calibration: 84, note: 'Relational systems and application data modeling' },
      { name: 'Microsoft SQL Server', calibration: 80, note: 'Data management and query workflows' },
      { name: 'SQLite', calibration: 78, note: 'Lightweight local persistence' },
      { name: 'H2 Database', calibration: 77, note: 'In-memory development and testing' },
    ],
  },
  {
    title: 'AI & Intelligent Systems',
    systems: [
      { name: 'Machine Learning Fundamentals', calibration: 78, note: 'Core concepts and model understanding' },
      { name: 'LLMs', calibration: 88, note: 'Large language model integration and usage' },
      { name: 'Multi-Agent Systems', calibration: 86, note: 'Autonomous coordination and orchestration' },
      { name: 'Prompt Engineering', calibration: 82, note: 'Structured, reliable prompting patterns' },
      { name: 'Agent Orchestration', calibration: 80, note: 'Coordinated decision workflows' },
      { name: 'AI-Assisted Development', calibration: 90, note: 'Productivity and engineering acceleration' },
    ],
  },
  {
    title: 'Industrial Automation',
    systems: [
      { name: 'PLC Programming', calibration: 90, note: 'Control logic and industrial sequence design' },
      { name: 'TIA Portal', calibration: 86, note: 'Siemens automation environment' },
      { name: 'CODESYS', calibration: 80, note: 'Controller and automation programming' },
      { name: 'SCADA', calibration: 84, note: 'Supervision and process monitoring' },
      { name: 'WinCC', calibration: 80, note: 'HMI and visualization setup' },
      { name: 'Factory I/O', calibration: 76, note: 'Simulation and industrial process testing' },
      { name: 'OpenClaw', calibration: 72, note: 'Automation tooling exploration' },
    ],
  },
  {
    title: 'Tools & Platforms',
    systems: [
      { name: 'Linux', calibration: 84, note: 'Environment and system administration confidence' },
      { name: 'IntelliJ IDEA', calibration: 90, note: 'Primary Java development environment' },
      { name: 'Visual Studio Code', calibration: 89, note: 'Full-stack coding and debugging' },
      { name: 'Microsoft Azure', calibration: 70, note: 'Cloud platform fundamentals' },
      { name: 'Docker', calibration: 82, note: 'Containerized deployment workflows' },
      { name: 'Podman', calibration: 80, note: 'Cross-platform container management' },
      { name: 'Git', calibration: 88, note: 'Version control and team collaboration' },
      { name: 'Postman', calibration: 85, note: 'API testing and validation' },
      { name: 'Ollama', calibration: 76, note: 'Local LLM experimentation and deployment' },
    ],
  },
]
