/** Event-page layout content aligned to the reference site structure.
 *  Placeholder fields can be replaced as details are confirmed.
 */

import { PROGRAM_DOWNLOAD_HREF } from './images'

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
  credits: [
    { value: '2.50', label: 'PRC CPD Units' },
    { value: '30', label: 'PDS CME Units' },
  ],
  ctaNote: 'Secure your spot now. Limited seats available!',
  earlyRegistration: 'Early registration is until August 15, 2026 or until all slots are filled.',
  rates: [
    { label: 'Early (until Aug 15) — PDS Members', value: '₱1,000' },
    { label: 'Early (until Aug 15) — PDS Residents', value: '₱500' },
    { label: 'Regular (Aug 16–26) — PDS Members', value: '₱1,200' },
    { label: 'Regular (Aug 16–26) — PDS Residents', value: '₱600' },
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
  downloadHref: PROGRAM_DOWNLOAD_HREF,
  downloadReady: true,
} as const

export const SYMPOSIUM = {
  label: 'Sunset Symposium (NOVARTIS)',
  title: 'The Fast & The Future: 10 Years of Excellence with Secukinumab',
  panelists: [
    {
      name: 'Maria Deanna S. Ramiscal, FPDS',
      role: 'Speaker',
    },
    {
      name: 'Wilsie Salas-Walinsundin, MSc, FPDS, FPDSP-PDS',
      role: 'Moderator',
    },
  ],
  closing: 'See you there!',
  flyerSrc: '/images/assets/symposium-flyer-placeholder.webp',
} as const

export type SponsorTier = {
  id: string
  label: string
  variant: 'platinum' | 'silver' | 'bronze' | 'minor'
  slots: { name: string; src: string }[]
}

/** Confirmed sponsor packages for Immunodermatology Masterclass 2026. */
export const SPONSOR_TIERS: SponsorTier[] = [
  {
    id: 'platinum',
    label: 'Platinum sponsor',
    variant: 'platinum',
    slots: [
      {
        name: 'Novartis Healthcare Philippines Inc.',
        src: '/images/sponsors/novartis.webp',
      },
    ],
  },
  {
    id: 'bronze',
    label: 'Bronze sponsor',
    variant: 'bronze',
    slots: [
      {
        name: 'Galderma',
        src: '/images/sponsors/galderma.png',
      },
    ],
  },
  {
    id: 'minor',
    label: 'Minor sponsors',
    variant: 'minor',
    slots: [
      { name: 'Zuellig Pharma', src: '/images/sponsors/zuellig-pharma.webp' },
      { name: 'Johnson & Johnson', src: '/images/sponsors/johnson-and-johnson.webp' },
      { name: 'Glenmark Philippines Inc.', src: '/images/sponsors/glenmark.png' },
      { name: 'AbbVie Philippines Inc.', src: '/images/sponsors/abbvie.webp' },
      { name: 'Dmark', src: '/images/sponsors/dmark.png' },
      { name: 'Pfizer Inc.', src: '/images/sponsors/pfizer.png' },
      { name: 'Hyphens', src: '/images/sponsors/hyphens.webp' },
      { name: 'Sun Pharma', src: '/images/sponsors/sun-pharma.webp' },
    ],
  },
]
