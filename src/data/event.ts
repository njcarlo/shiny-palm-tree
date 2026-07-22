/** Event-page layout content aligned to the reference site structure.
 *  Placeholder fields can be replaced as details are confirmed.
 */

export const EVENT_META = {
  name: 'Immunodermatology Masterclass 2026',
  tagline:
    'Precision immunology in dermatology — optimizing systemic treatments for better outcomes.',
  taglineLead: 'Precision immunology in dermatology:',
  taglineBody: 'Optimizing Systemic Treatments for Better Outcomes',
  dateDisplay: 'September 2, 2026',
  dateMonth: 'September',
  dateDay: '2',
  dateYear: '2026',
  timeDisplay: '1 PM – 8 PM',
  datetime: 'September 2, 2026 · 1:00 PM – 8:00 PM',
  venue: 'Seda Hotel, Bonifacio Global City',
  locationLine: 'Taguig City, Philippines',
  credits: ['PRC CPD Units — TBA', 'PDS CME Units — TBA'],
  ctaNote: 'Secure your spot now. Limited seats available!',
  earlyRegistration: 'Early registration is until August 15, 2026 or until all slots are filled.',
  rates: [
    { label: 'Early — PDS Members', value: '₱1,000' },
    { label: 'Early — PDS Residents', value: '₱500' },
    { label: 'Regular (Aug 16–26) — PDS Members', value: '₱1,200' },
    { label: 'Regular (Aug 16–26) — PDS Residents', value: '₱1,000' },
  ],
  paymentNote:
    'Scan the QR code to register and pay. PDS Members and Residents need to upload proof of payment for a successful registration.',
  bank: {
    name: 'BDO',
    accountName: 'Philippine Dermatological Society, Inc.',
    accountNumber: '007640004168',
  },
} as const

export const PROGRAM_INVITE = {
  eyebrow: 'Program invite',
  title: 'Immunodermatology Masterclass 2026',
  body:
    'You are invited to join the Philippine Dermatological Society Immunodermatology Subspecialty Core Group for a full afternoon of plenary sessions, faculty discussions, and closing remarks.',
  downloadLabel: 'Download program',
  downloadHint: 'PNG schedule image',
  downloadHref: '/files/immunodermatology-masterclass-2026-program.png',
  downloadReady: true,
} as const

export type SponsorTier = {
  id: string
  label: string
  variant: 'platinum' | 'silver' | 'bronze' | 'minor'
  slots: { src: string; label: string }[]
}

/** Sponsor tiers with logo placeholders (maps to Wix sponsor block). */
export const SPONSOR_TIERS: SponsorTier[] = [
  {
    id: 'platinum',
    label: 'Platinum sponsor',
    variant: 'platinum',
    slots: [{ src: '/images/sponsors/platinum-1.png', label: 'Platinum sponsor logo' }],
  },
  {
    id: 'silver',
    label: 'Silver sponsors',
    variant: 'silver',
    slots: [
      { src: '/images/sponsors/silver-1.png', label: 'Silver sponsor logo' },
      { src: '/images/sponsors/silver-2.png', label: 'Silver sponsor logo' },
    ],
  },
  {
    id: 'bronze',
    label: 'Bronze sponsors',
    variant: 'bronze',
    slots: [
      { src: '/images/sponsors/bronze-1.png', label: 'Bronze sponsor logo' },
      { src: '/images/sponsors/bronze-2.png', label: 'Bronze sponsor logo' },
      { src: '/images/sponsors/bronze-3.png', label: 'Bronze sponsor logo' },
    ],
  },
  {
    id: 'minor',
    label: 'Minor sponsors',
    variant: 'minor',
    slots: [
      { src: '/images/sponsors/minor-1.png', label: 'Minor sponsor logo' },
      { src: '/images/sponsors/minor-2.png', label: 'Minor sponsor logo' },
      { src: '/images/sponsors/minor-3.png', label: 'Minor sponsor logo' },
    ],
  },
]
