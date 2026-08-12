export const researchTopics = [
  'Artificial Intelligence',
  'Multi-Agent Systems',
  'Decision Support Systems',
  'Simulation',
  'Industrial AI',
  'SCADA + AI',
  'Mathematical Modeling',
  'System Architecture',
  'Optimization',
  'Machine Learning',
  'LLM Orchestration',
  'Prompt Engineering',
]

export const researchEquations = [
  'U(a) = alpha * Safety + beta * Stability + gamma * Efficiency',
  'argmax(policy) sum_t Reward_t subject to WorldConstraints_t',
  'State_(t+1) = F(State_t, Actions_t, Constraints_t)',
  'Decision Quality = Accuracy + Reliability + Constraint Compliance',
]

export type CommendationRecord = {
  name: string
  position: string
  organization: string
  commendation: string
}

export const commendations: CommendationRecord[] = []
