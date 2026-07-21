export type Speaker = {
  slug: string
  name: string
  credentials?: string
  designation?: string
  role?: string
  country?: string
  isModerator?: boolean
}

export type Session = {
  id: string
  title: string
  moderators: Speaker[]
  speakers: Speaker[]
}

export const PROGRAM: Session[] = [
  {
    id: 'session-1',
    title: 'Mitigating Complications in Immunodermatology',
    moderators: [
      {
        slug: 'melanie-doria-ruiz',
        name: 'Dr. Melanie Doria-Ruiz',
        designation: 'Moderator',
        isModerator: true,
      },
      {
        slug: 'rogelio-balagat',
        name: 'Dr. Rogelio Balagat',
        designation: 'Moderator',
        isModerator: true,
      },
    ],
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
    moderators: [
      {
        slug: 'cybill-uy',
        name: 'Dr. Cybill Uy',
        designation: 'Moderator',
        isModerator: true,
      },
      {
        slug: 'josef-concha',
        name: 'Dr. Josef Symon Concha',
        designation: 'Moderator',
        isModerator: true,
      },
    ],
    speakers: [
      { slug: 'katrina-canlas-estrella', name: 'Dr. Katrina Canlas-Estrella' },
      { slug: 'roxanne-casis-hao', name: 'Dr. Roxanne Casis-Hao' },
    ],
  },
  {
    id: 'session-3',
    title: 'Blistering Across Generations',
    moderators: [
      {
        slug: 'johanna-lazo-dizon',
        name: 'Dr. Johanna Pauline Lazo-Dizon',
        designation: 'Moderator',
        isModerator: true,
      },
      {
        slug: 'kristine-legaspi',
        name: 'Dr. Kristine Natalee Legaspi',
        designation: 'Moderator',
        isModerator: true,
      },
    ],
    speakers: [
      { slug: 'jasmin-jamora', name: 'Dr. Maria Jasmin Jamora' },
      { slug: 'clarisse-mendoza', name: 'Dr. Clarisse Mendoza' },
      { slug: 'marie-nicolas', name: 'Dr. Marie Eleanore Nicolas' },
    ],
  },
]

export const OPENING_SPEAKER: Speaker = {
  slug: 'jasmin-jamora',
  name: 'Maria Jasmin Jamora, MD, FPDS',
  designation: 'President, Philippine Dermatological Society',
  role: 'Opening Remarks',
}

export const CLOSING_SPEAKER: Speaker = {
  slug: 'bryan-guevara',
  name: 'Dr. Bryan Guevara',
  role: 'Closing Remarks',
}
