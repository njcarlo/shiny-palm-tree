export type Speaker = {
  slug: string
  name: string
  /** Post-nominals / credential letters, e.g. FPDS (MD omitted — names already use Dr.) */
  credentials?: string
  /** Specialty or short title line from the slides */
  designation?: string
  /** Role affiliations and training lines from the slides */
  affiliations?: string[]
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

/** Credentials sourced from the Immunodermatology Masterclass slide deck. */
const SPEAKERS: Record<string, Speaker> = {
  'amanda-esquivel': {
    slug: 'amanda-esquivel',
    name: 'Dr. Amanda Christine Esquivel',
    credentials: 'FPDS',
    designation: 'Dermatology — Immunodermatology and Supportive Oncodermatology',
    affiliations: [
      'Clinical Associate Professor, Department of Dermatology, University of the Philippines College of Medicine — Philippine General Hospital',
      'Active Consultant, St. Luke’s Medical Center – Global City and Manila Doctors Hospital',
      'Residency Training in Dermatology, UP-PGH (Chief Resident 2023–2024)',
      'Fellowship in Autoimmune Skin Disease and Skin Cancer, University of Utah',
      'Fellowship in Cutaneous Oncology and Supportive Oncodermatology, Stanford University and Cleveland Medical Center',
    ],
  },
  'kenneth-samala': {
    slug: 'kenneth-samala',
    name: 'Dr. Kenneth Samala',
    credentials: 'MCMMO, FPCP, FPSMO, FPSO',
    designation: 'Internal Medicine — Medical Oncology — Thoracic Oncology',
    affiliations: [
      'Internal Medicine Residency, University of the Philippines–Philippine General Hospital',
      'Medical Oncology Fellowship, University of the Philippines–Philippine General Hospital',
      'Masters in Clinical Medicine (Medical Oncology), University of the Philippines–Manila',
      'Thoracic Oncology Observership, Memorial Sloan Kettering Cancer Center, New York City, USA',
      'Thoracic Oncology Fellowship, University of Alberta, Cross Cancer Institute, Alberta, Canada',
      'Chair, Section of Medical Oncology, Manila Med–Medical Center Manila',
      'Clinical Associate Professor, UP College of Medicine',
      'Immediate Vice-President, Philippine Society of Oncologists, Inc.',
      'Fellow, Philippine College of Physicians (PCP), Philippine Society of Medical Oncology (PSMO) and Philippine Society of Oncologists, Inc. (PSO)',
      'Member, ASCO, IASLC, ESMO, and ASPIRE for Lung Cancer',
      'Hospital affiliations: Philippine General Hospital; Manila Med–Medical Center Manila; Manila Doctors Hospital; Our Lady of Lourdes Hospital',
    ],
  },
  'danielle-senador': {
    slug: 'danielle-senador',
    name: 'Dr. Danielle Marlo Senador',
    credentials: 'DPDS',
    designation: 'Dermatology — Immunodermatology, Molecular Dermatology',
    affiliations: [
      'Active Consultant, Research Institute for Tropical Medicine',
      'Residency Training in Dermatology, RITM',
      'Fellowship in Molecular Dermatology and Genodermatoses, National Cheng Kung University Hospital, Taiwan',
    ],
  },
  'janus-ong': {
    slug: 'janus-ong',
    name: 'Dr. Janus Ong',
    credentials: 'MPH',
    designation: 'Gastroenterology & Hepatology',
    affiliations: [
      'Assistant to the Vice Chancellor for Research, University of the Philippines Manila',
      'Former Director, Research Management and Translation Office, UP Manila',
      'Affiliate Research Faculty, Institute of Health Policy and Development Studies, and National Institutes of Health',
      'Associate Professor of Medicine and Affiliate Research Faculty, University of the Philippines College of Medicine, Manila',
      'Active Consultant, Division of Gastroenterology, Department of Medicine, Philippine General Hospital',
      'Active Consultant, Section of Gastroenterology and Endoscopy, The Medical City',
      'Active Consultant, Section of Gastroenterology and Endoscopy, Manila Doctors Hospital',
      'Residency, Internal Medicine, Yale Primary Care Internal Medicine Residency Program, New Haven, CT',
      'Fellowship, Gastroenterology, Cleveland Clinic Foundation, Cleveland, OH',
      'Fellowship, Hepatology, National Institutes of Health, Bethesda, MD',
      'Masters in Public Health, Johns Hopkins Bloomberg School of Public Health, Baltimore, MD',
      'Convenor and Founding Member, UP Manila Liver Study Group',
      'Chair, University of the Philippines Manila Biobank Committee',
    ],
  },
  'jamaine-cruz-regalado': {
    slug: 'jamaine-cruz-regalado',
    name: 'Dr. Jamaine Cruz-Regalado',
    credentials: 'FPDS',
    designation: 'Dermatology — Immunodermatology',
    affiliations: [
      'Active Consultant and Training Committee Member, St. Luke’s Medical Center',
      'Medical Specialist II (Part-Time), Dr. Jose N. Rodriguez Memorial Hospital and Sanitarium',
      'Medical Specialist III, Amang Rodriguez Memorial Medical Center',
      'Residency Training in Dermatology, Makati Medical Center (Chief Resident 2015)',
      'Fellowship in Complex Medical Dermatology and Blistering Diseases, NSW, Australia',
    ],
  },
  'arthur-roman': {
    slug: 'arthur-roman',
    name: 'Dr. Arthur Dessi Roman',
    credentials: 'MTM, FPCP, FPSMID',
    designation: 'Internist, Infectious Diseases and Tropical Medicine Specialist',
    affiliations: [
      'Head and Medical Specialist IV, Medical Department, Research Institute for Tropical Medicine',
      'Clinical Associate Professor, Department of Medicine, UP–Philippine General Hospital',
      'President, Philippine Society for Microbiology and Infectious Diseases, 2026–2027',
      'Past President, Philippine Hospital Infection Control Society',
      'Diplomate and Fellow, Philippine College of Physicians; Vice-President, PCP Manila Chapter',
      'Member, DOH Emerging and Re-emerging Infectious Diseases Strategic Advisory Group of Experts (SAGE)',
    ],
  },
  'jayv-barit': {
    slug: 'jayv-barit',
    name: 'Dr. Jayv James Barit',
    credentials: 'FPDS, FAADV, DDSP',
    designation: 'Dermatology — Immunodermatology, Dermatopathology',
    affiliations: [
      'Attending Physician, Department of Dermatology, University of the Philippines — Philippine General Hospital',
      'Medical Specialist II (Part-Time) & Head, Dermatopathology Unit, Department of Dermatology, Valenzuela Medical Center',
      'Visiting Consultant, Department of Dermatology, East Avenue Medical Center',
      'Courtesy Consultant, Section of Dermatology, Department of Internal Medicine, Manila Doctors Hospital & Medical Center Imus',
    ],
  },
  'katrina-canlas-estrella': {
    slug: 'katrina-canlas-estrella',
    name: 'Dr. Katrina Canlas-Estrella',
    credentials: 'FPDS',
    designation: 'Dermatology — Immunodermatology',
  },
  'roxanne-casis-hao': {
    slug: 'roxanne-casis-hao',
    name: 'Dr. Roxanne Casis-Hao',
    credentials: 'FPPS, FPSAAI',
    designation: 'Pediatrics — Allergology & Immunology',
  },
  'jasmin-jamora': {
    slug: 'jasmin-jamora',
    name: 'Dr. Maria Jasmin Jamora',
    credentials: 'FPDS, FDSP-PDS',
    designation: 'Dermatology — Dermatopathology, Immunodermatology, Integrative Dermatology',
    affiliations: [
      'President, Philippine Dermatological Society',
      'Training Officer, Department of Dermatology, Quirino Memorial Medical Center',
      'Active Consultant & Section Chief (Dermatopathology), Makati Medical Center',
      'Vice-Chair, Skin and Cancer Foundation',
      'Visiting Consultant, St. Luke’s Medical Center — Quezon City and Region 1 Medical Center Department of Dermatology',
    ],
  },
  'clarisse-mendoza': {
    slug: 'clarisse-mendoza',
    name: 'Dr. Clarisse Mendoza',
    credentials: 'FPDS, FPACS',
    designation: 'Dermatology — Immunodermatology',
    affiliations: [
      'Residency Training Officer and Immunodermatology Unit Head, Research Institute for Tropical Medicine',
      'Active Professor and Consultant, De La Salle Health Sciences Institute and De La Salle University Hospital',
      'Active Consultant, Asian Hospital and Medical Center',
      'Immediate Past Chair, Immunodermatology Subspecialty Core Group',
      'Residency Training in Dermatology, RITM',
      'Fellowship on Immunodermatology and Clinical Research Trials, St. George Hospital, Sydney, Australia',
    ],
  },
  'marie-nicolas': {
    slug: 'marie-nicolas',
    name: 'Dr. Marie Eleanore Nicolas',
    credentials: 'FPDS, FPDSP',
    designation: 'Dermatology — Pediatric Dermatology & Immunodermatology',
    affiliations: [
      'Active Consultant, Asian Hospital & Medical Center',
      'Active Consultant, St. Luke’s Medical Center, Global City',
      'Past President, Pediatric Dermatology Society of the Philippines (2022)',
      'Founding President, Pediatric Dermatology Society of the Philippines',
      'Past Chair, Pediatric Dermatology Subspecialty Core Group of the Philippine Dermatological Society (2019–2022)',
      'Fellow, Philippine Dermatological Society',
      'Fellow, Society for Pediatric Dermatology (USA)',
      'Ordinary Member, Asian Society for Pediatric Dermatology',
      'Past Head of Pediatric Dermatology, University of the Philippines – PGH (2003–2015)',
      'Past Head of Immunodermatology, University of the Philippines – PGH',
    ],
  },
  'bryan-guevara': {
    slug: 'bryan-guevara',
    name: 'Dr. Bryan Guevara',
    role: 'Closing Remarks',
  },
  'melanie-doria-ruiz': {
    slug: 'melanie-doria-ruiz',
    name: 'Dr. Melanie Doria-Ruiz',
    designation: 'Moderator',
    isModerator: true,
  },
  'rogelio-balagat': {
    slug: 'rogelio-balagat',
    name: 'Dr. Rogelio Balagat',
    designation: 'Moderator',
    isModerator: true,
  },
  'cybill-uy': {
    slug: 'cybill-uy',
    name: 'Dr. Cybill Uy',
    designation: 'Moderator',
    isModerator: true,
  },
  'josef-concha': {
    slug: 'josef-concha',
    name: 'Dr. Josef Symon Concha',
    designation: 'Moderator',
    isModerator: true,
  },
  'johanna-lazo-dizon': {
    slug: 'johanna-lazo-dizon',
    name: 'Dr. Johanna Pauline Lazo-Dizon',
    designation: 'Moderator',
    isModerator: true,
  },
  'kristine-legaspi': {
    slug: 'kristine-legaspi',
    name: 'Dr. Kristine Natalee Legaspi',
    designation: 'Moderator',
    isModerator: true,
  },
}

function speaker(slug: string, overrides: Partial<Speaker> = {}): Speaker {
  const base = SPEAKERS[slug]
  if (!base) throw new Error(`Unknown speaker slug: ${slug}`)
  return { ...base, ...overrides }
}

export const PROGRAM: Session[] = [
  {
    id: 'session-1',
    title: 'Mitigating Complications in Immunodermatology',
    moderators: [
      speaker('melanie-doria-ruiz'),
      speaker('rogelio-balagat'),
    ],
    speakers: [
      speaker('amanda-esquivel'),
      speaker('kenneth-samala'),
      speaker('danielle-senador'),
      speaker('janus-ong'),
      speaker('jamaine-cruz-regalado'),
      speaker('arthur-roman'),
      speaker('jayv-barit'),
    ],
  },
  {
    id: 'session-2',
    title:
      'New Insights in Chronic Spontaneous Urticaria: Perspectives from Immunodermatology and Allergology',
    moderators: [
      speaker('cybill-uy'),
      speaker('josef-concha'),
    ],
    speakers: [
      speaker('katrina-canlas-estrella'),
      speaker('roxanne-casis-hao'),
    ],
  },
  {
    id: 'session-3',
    title: 'Blistering Across Generations',
    moderators: [
      speaker('johanna-lazo-dizon'),
      speaker('kristine-legaspi'),
    ],
    speakers: [
      speaker('jasmin-jamora'),
      speaker('clarisse-mendoza'),
      speaker('marie-nicolas'),
    ],
  },
]

export const OPENING_SPEAKER: Speaker = speaker('jasmin-jamora', {
  role: 'Opening Remarks',
  designation: 'President, Philippine Dermatological Society',
})

export const CLOSING_SPEAKER: Speaker = speaker('bryan-guevara', {
  role: 'Closing Remarks',
})
