export type Speaker = {
  slug: string
  name: string
  credentials?: string
  role?: string
  country?: string
}

export type Session = {
  id: string
  title: string
  moderators: string[]
  speakers: Speaker[]
}

export const PROGRAM: Session[] = [
  {
    id: 'session-1',
    title: 'Mitigating Complications in Immunodermatology',
    moderators: ['Dr. Melanie Doria-Ruiz', 'Dr. Rogelio Balagat'],
    speakers: [
      { slug: 'amanda-esquivel', name: 'Dr. Amanda Christine Esquivel' },
      { slug: 'kenneth-samala', name: 'Dr. Kenneth Samala' },
      { slug: 'danielle-senador', name: 'Dr. Danielle Marlo Senador' },
      { slug: 'janus-ong', name: 'Dr. Janus Ong' },
      { slug: 'jamaine-cruz-regalado', name: 'Dr. Jamaine Cruz-Regalado' },
      { slug: 'arthur-roman', name: 'Dr. Arthur Dessi Roman' },
      { slug: 'jayv-barit', name: 'Dr. Jayv James Barit' },
    ],
  },
  {
    id: 'session-2',
    title: 'New Insights in Urticaria',
    moderators: ['Dr. Cybill Uy', 'Dr. Josef Symon Concha'],
    speakers: [
      { slug: 'katrina-canlas-estrella', name: 'Dr. Katrina Canlas-Estrella' },
      { slug: 'roxanne-casis-hao', name: 'Dr. Roxanne Casis-Hao' },
    ],
  },
  {
    id: 'session-3',
    title: 'Blistering Across Generations',
    moderators: ['Dr. Johanna Pauline Lazo-Dizon', 'Dr. Kristine Natalee Legaspi'],
    speakers: [
      { slug: 'jasmin-jamora', name: 'Dr. Maria Jasmin Jamora' },
      { slug: 'clarisse-mendoza', name: 'Dr. Clarisse Mendoza' },
      { slug: 'marie-nicolas', name: 'Dr. Marie Eleanore Nicolas' },
    ],
  },
]

export const OPENING_SPEAKER = {
  slug: 'jasmin-jamora',
  name: 'Maria Jasmin Jamora, MD, FPDS',
  role: 'President, Philippine Dermatological Society',
}

export const CLOSING_SPEAKER = {
  slug: 'bryan-guevara',
  name: 'Dr. Bryan Guevara',
}
