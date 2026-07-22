import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { ImageSlot } from './components/ImageSlot'
import { DocumentModal, type TeamDocument } from './components/DocumentModal'
import { SpeakerModal } from './components/SpeakerModal'
import {
  EVENT_META,
  PROGRAM_INVITE,
  SPONSOR_TIERS,
} from './data/event'
import { ASSETS, TEAM_DOC_ASSETS, speakerImage } from './data/images'
import { CLOSING_SPEAKER, OPENING_SPEAKER, PROGRAM, type Speaker } from './data/program'

function useReveal(): RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = root.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return ref
}

type ModalState = { speaker: Speaker; sessionTitle?: string } | null

const TEAM_DOCS = {
  coreGroup: {
    title: 'Immunodermatology Subspecialty Core Group',
    src: TEAM_DOC_ASSETS.coreGroup,
  },
  directory: {
    title: 'Immunodermatology 2026 Directory',
    src: TEAM_DOC_ASSETS.directory,
  },
} as const satisfies Record<string, TeamDocument>

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Navigate to="/#register" replace />} />
    </Routes>
  )
}

function SpeakerCard({
  speaker,
  sessionTitle,
  onSelect,
}: {
  speaker: Speaker
  sessionTitle?: string
  onSelect: (s: Speaker, t?: string) => void
}) {
  return (
    <article
      className={`speaker-card speaker-card--clickable${speaker.isModerator ? ' speaker-card--mod' : ''}`}
      onClick={() => onSelect(speaker, sessionTitle)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(speaker, sessionTitle) }}
      aria-label={`View ${speaker.name} details`}
    >
      <div className="speaker-ring">
        <ImageSlot
          src={speakerImage(speaker.slug)}
          alt={speaker.name}
          placeholderLabel={speaker.name}
          className="speaker-photo"
          variant="speaker"
        />
      </div>
      <h3 className="speaker-name">{speaker.name}</h3>
      {speaker.isModerator && (
        <span className="speaker-role-tag speaker-role-tag--mod">Moderator</span>
      )}
      {!speaker.isModerator && (
        <span className="speaker-role-tag speaker-role-tag--spk">Speaker</span>
      )}
    </article>
  )
}

function HomePage() {
  const pageRef = useReveal()
  const [modal, setModal] = useState<ModalState>(null)
  const [docModal, setDocModal] = useState<TeamDocument | null>(null)

  const openModal = useCallback((speaker: Speaker, sessionTitle?: string) => {
    setModal({ speaker, sessionTitle })
  }, [])

  const closeModal = useCallback(() => setModal(null), [])
  const closeDocModal = useCallback(() => setDocModal(null), [])

  return (
    <div className="page" ref={pageRef}>
      {/* Fixed background layers — deepest first */}
      <div className="bg-orbs" aria-hidden="true">
        <div className="bg-orb bg-orb--1" />
        <div className="bg-orb bg-orb--2" />
        <div className="bg-orb bg-orb--3" />
        <div className="bg-orb bg-orb--4" />
      </div>
      <div className="page-dots"    aria-hidden="true" />
      <div className="page-pattern" aria-hidden="true" />
      <div className="page-grain"   aria-hidden="true" />

      <header className="site-header">
        <a className="site-header__brand" href="#top" aria-label="Immunodermatology Masterclass 2026">
          <ImageSlot
            src={ASSETS.logoHeader}
            alt="Immunodermatology Masterclass 2026"
            placeholderLabel="Header logo"
            className="site-header__logo"
            variant="logo"
            priority
          />
        </a>
        <nav className="site-header__nav" aria-label="Primary">
          <a href="#register">Register</a>
          <a href="#program">Program</a>
          <a href="#sponsors">Sponsors</a>
          <a href="#team">Team</a>
        </nav>
      </header>

      {/* 1. Hero — event header */}
      <section className="hero" id="top">
        <div className="org-band reveal" aria-label="Organizing group">
          <div className="org-band__inner">
            <ImageSlot
              src={ASSETS.logoPds}
              alt="Philippine Dermatological Society"
              placeholderLabel="PDS logo"
              className="org-band__logo"
              variant="logo"
            />
            <div className="org-band__identity">
              <p className="org-band__title">Immunodermatology</p>
              <p className="org-band__mid">Subspecialty Core Group of the</p>
              <p className="org-band__org">Philippine Dermatological Society</p>
            </div>
            <ImageSlot
              src={ASSETS.logoCombined}
              alt="Immunodermatology Subspecialty Core Group"
              placeholderLabel="Immunoderm logo"
              className="org-band__logo"
              variant="logo"
            />
          </div>
        </div>

        <div className="hero-titleblock reveal">
          <h1 className="hero-titleblock__heading">
            <span className="hero-titleblock__brand">Immunodermatology</span>
            <span className="hero-titleblock__row">
              <span className="hero-titleblock__master">Masterclass</span>
              <span className="hero-titleblock__year">2026</span>
            </span>
          </h1>
          <div className="hero-titleblock__rule" aria-hidden="true" />
          <p className="hero-titleblock__tagline">
            <strong>{EVENT_META.taglineLead}</strong>{' '}
            <span>{EVENT_META.taglineBody}</span>
          </p>
        </div>

        <div className="event-meta reveal reveal-delay-1" aria-label="Event date and venue">
          <p className="event-meta__primary">
            <span>{EVENT_META.dateDisplay}</span>
            <span className="event-meta__dot" aria-hidden="true" />
            <span>{EVENT_META.timeDisplay}</span>
          </p>
          <p className="event-meta__secondary">
            {EVENT_META.venue}
            <span className="event-meta__dot" aria-hidden="true" />
            {EVENT_META.locationLine}
          </p>
        </div>

        <div className="hero-details reveal reveal-delay-1">
          <div className="hero-meta hero-meta--credits">
            {EVENT_META.credits.map((credit) => (
              <span className="pill pill--outline" key={credit}>{credit}</span>
            ))}
          </div>
        </div>

        <section className="hero-register reveal reveal-delay-2" id="register" aria-label="Registration">
          <h2 className="section-title">
            <span>Register now</span>
          </h2>
          <p className="section-lede">{EVENT_META.earlyRegistration}</p>

          <div className="register-qr">
            <figure className="register-qr__frame">
              <ImageSlot
                src={ASSETS.registerQr}
                alt="Scan to register and pay for Immunodermatology Masterclass 2026"
                placeholderLabel="Registration QR code"
                className="register-qr__image"
                variant="card"
              />
              <figcaption className="register-qr__caption">
                Scan to register &amp; pay
              </figcaption>
            </figure>

            <div className="register-qr__details">
              <p className="register-qr__note">{EVENT_META.paymentNote}</p>
              <ul className="register-rates">
                {EVENT_META.rates.map((rate) => (
                  <li key={rate.label}>
                    <span>{rate.label}</span>
                    <strong>{rate.value}</strong>
                  </li>
                ))}
              </ul>
              <div className="register-bank">
                <p className="register-bank__label">Bank transfer</p>
                <p>{EVENT_META.bank.name}</p>
                <p>{EVENT_META.bank.accountName}</p>
                <p className="register-bank__number">{EVENT_META.bank.accountNumber}</p>
              </div>
            </div>
          </div>

          <p className="hero-cta-note hero-cta-note--register">{EVENT_META.ctaNote}</p>
        </section>
      </section>

      {/* Sponsors (placeholders) */}
      <section className="section sponsors reveal" id="sponsors">
        <p className="section-eyebrow">Partners</p>
        <h2 className="section-title">
          <span>Thank you to our sponsors</span>
        </h2>

        {SPONSOR_TIERS.map((tier) => (
          <div
            className={`sponsor-tier${tier.variant === 'platinum' ? ' sponsor-tier--platinum' : ''}`}
            key={tier.id}
          >
            <p className="tier-label">{tier.label}</p>
            <div
              className={
                tier.variant === 'platinum'
                  ? 'tier-row'
                  : tier.variant === 'silver'
                    ? 'tier-row tier-row-2'
                    : tier.variant === 'bronze'
                      ? 'tier-row tier-row-3'
                      : 'tier-grid-minor'
              }
            >
              {tier.slots.map((slot) => (
                <div
                  className={`tier-card${tier.variant === 'platinum' ? ' tier-card-wide tier-card--glow' : ''}${tier.variant === 'minor' ? ' tier-card-minor' : ''}`}
                  key={slot.src}
                >
                  <ImageSlot
                    src={slot.src}
                    alt={slot.label}
                    placeholderLabel={slot.label}
                    variant="sponsor"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 6. Event program — invite, opening, sessions, closing */}
      <div id="program">
        <section className="section reveal" id="program-invite" aria-label="Program invite">
          <div className="feature-card program-invite">
            <div className="feature-card__glow" aria-hidden="true" />
            <h2 className="section-title">
              <span>{PROGRAM_INVITE.title}</span>
            </h2>
            <p className="section-body">{PROGRAM_INVITE.body}</p>
            <p className="program-invite__meta">
              {EVENT_META.datetime}
              <br />
              {EVENT_META.venue} · {EVENT_META.locationLine}
            </p>
            {PROGRAM_INVITE.downloadReady ? (
              <a
                className="btn btn-yellow btn-shine"
                href={PROGRAM_INVITE.downloadHref}
                download="immunodermatology-masterclass-2026-program.png"
              >
                <span>{PROGRAM_INVITE.downloadLabel}</span>
                <small>{PROGRAM_INVITE.downloadHint}</small>
              </a>
            ) : (
              <span className="btn btn-yellow btn-shine" aria-disabled="true">
                <span>{PROGRAM_INVITE.downloadLabel}</span>
                <small>{PROGRAM_INVITE.downloadHint}</small>
              </span>
            )}
          </div>
        </section>

        <section className="section panel reveal" id="opening">
          <div className="section-eyebrow">Opening remarks</div>
          <div
            className="featured-speaker featured-speaker--clickable"
            onClick={() => openModal(OPENING_SPEAKER)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openModal(OPENING_SPEAKER) }}
            aria-label={`View ${OPENING_SPEAKER.name} details`}
          >
            <div className="speaker-ring">
              <ImageSlot
                src={speakerImage(OPENING_SPEAKER.slug)}
                alt={OPENING_SPEAKER.name}
                placeholderLabel={OPENING_SPEAKER.name}
                className="speaker-photo"
                variant="speaker"
              />
            </div>
            <h2 className="featured-name">{OPENING_SPEAKER.name}</h2>
            <p className="featured-role">{OPENING_SPEAKER.designation}</p>
          </div>
        </section>

        {PROGRAM.map((session, index) => (
          <section className="section reveal" id={session.id} key={session.id}>
            <div className="session-card">
              <p className="section-eyebrow">Session {index + 1}</p>
              <h2 className="section-title section-title-long">
                <span>{session.title}</span>
              </h2>

              <div className="session-group">
                <p className="session-group-label">Speakers</p>
                <div className="speakers speakers--spk">
                  {session.speakers.map((speaker) => (
                    <SpeakerCard
                      key={speaker.slug}
                      speaker={speaker}
                      sessionTitle={session.title}
                      onSelect={openModal}
                    />
                  ))}
                </div>
              </div>

              <div className="session-group">
                <p className="session-group-label">Moderators</p>
                <div className="speakers speakers--grid">
                  {session.moderators.map((mod) => (
                    <SpeakerCard
                      key={mod.slug}
                      speaker={mod}
                      sessionTitle={session.title}
                      onSelect={openModal}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="section reveal" id="closing">
          <div className="section-eyebrow">Closing remarks</div>
          <div
            className="featured-speaker featured-speaker--clickable"
            onClick={() => openModal(CLOSING_SPEAKER)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openModal(CLOSING_SPEAKER) }}
            aria-label={`View ${CLOSING_SPEAKER.name} details`}
          >
            <div className="speaker-ring">
              <ImageSlot
                src={speakerImage(CLOSING_SPEAKER.slug)}
                alt={CLOSING_SPEAKER.name}
                placeholderLabel={CLOSING_SPEAKER.name}
                className="speaker-photo"
                variant="speaker"
              />
            </div>
            <h2 className="featured-name">{CLOSING_SPEAKER.name}</h2>
            {CLOSING_SPEAKER.role && (
              <p className="featured-role">{CLOSING_SPEAKER.role}</p>
            )}
          </div>
        </section>
      </div>

      {/* 7. Meet the team */}
      <section className="section team reveal" id="team">
        <h2 className="section-title">
          <span>Meet the team</span>
        </h2>
        <p className="section-body team-body">
          Our team of dedicated dermatologists brings together expertise,
          compassion, and a commitment to excellence in skin health. United by
          a shared mission to advance dermatologic science and improve patient
          outcomes.
        </p>

        <div className="team-buttons">
          <button
            type="button"
            className="btn btn-yellow btn-team"
            onClick={() => setDocModal(TEAM_DOCS.coreGroup)}
          >
            Immunodermatology Subspecialty Core Group
          </button>
          <button
            type="button"
            className="btn btn-yellow btn-team"
            onClick={() => setDocModal(TEAM_DOCS.directory)}
          >
            Immunodermatology 2026 Directory
          </button>
        </div>

        <div className="team-logos">
          <div className="team-logo-ring">
            <ImageSlot
              src={ASSETS.logoPds}
              alt="PDS logo"
              placeholderLabel="PDS logo"
              className="team-logo"
              variant="logo"
            />
          </div>
          <div className="team-logo-ring">
            <ImageSlot
              src={ASSETS.logoCombined}
              alt="PDS Immunodermatology logo"
              placeholderLabel="pds-immunoderm-logo.png"
              className="team-logo"
              variant="logo"
            />
          </div>
        </div>
      </section>

      <footer className="footer">
        <p className="footer-title">Immunodermatology Masterclass 2026</p>
        <p className="footer-powered">
          Philippine Dermatological Society · Immunodermatology Subspecialty Core
          Group
        </p>
      </footer>

      {modal && (
        <SpeakerModal
          speaker={modal.speaker}
          sessionTitle={modal.sessionTitle}
          onClose={closeModal}
        />
      )}

      {docModal && (
        <DocumentModal
          doc={docModal}
          onClose={closeDocModal}
        />
      )}
    </div>
  )
}
