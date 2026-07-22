import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { ImageSlot } from './components/ImageSlot'
import { SpeakerModal } from './components/SpeakerModal'
import {
  ABSTRACTS_CTA,
  EVENT_META,
  HIGHLIGHTS,
  SPONSOR_TIERS,
  SYMPOSIUM,
} from './data/event'
import { ASSETS, speakerImage } from './data/images'
import { CLOSING_SPEAKER, OPENING_SPEAKER, PROGRAM, type Speaker } from './data/program'
import SignupPage from './pages/SignupPage'

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

function useStickyRegister() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const registerEl = document.getElementById('register')
    const heroEl = document.getElementById('top')

    const update = () => {
      const heroBottom = heroEl?.getBoundingClientRect().bottom ?? 0
      const registerTop = registerEl?.getBoundingClientRect().top ?? Infinity
      setVisible(heroBottom < 0 && registerTop > window.innerHeight * 0.5)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('has-sticky-bar', visible)
    return () => document.body.classList.remove('has-sticky-bar')
  }, [visible])

  return visible
}

type ModalState = { speaker: Speaker; sessionTitle?: string } | null

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
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
  const stickyVisible = useStickyRegister()
  const [modal, setModal] = useState<ModalState>(null)

  const openModal = useCallback((speaker: Speaker, sessionTitle?: string) => {
    setModal({ speaker, sessionTitle })
  }, [])

  const closeModal = useCallback(() => setModal(null), [])

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
        <a className="site-header__brand" href="#top">Immunodermatology</a>
        <nav className="site-header__nav" aria-label="Primary">
          <a href="#highlights">Highlights</a>
          <a href="#program">Program</a>
          <a href="#sponsors">Sponsors</a>
          <a href="#register">Register</a>
          <a href="#team">Team</a>
        </nav>
      </header>

      {/* 1. Hero — event header */}
      <section className="hero" id="top">
        <div className="hero-logos reveal">
          <ImageSlot
            src={ASSETS.logoCombined}
            alt="PDS Immunodermatology Masterclass 2026"
            placeholderLabel="PDS + Immunoderm logo"
            className="hero-logo hero-logo--main"
            variant="logo"
          />
        </div>

        <h1 className="hero-brand-title reveal">Immunodermatology</h1>
        <p className="hero-brand-sub reveal">Masterclass 2026</p>

        <div className="hero-poster-wrap reveal">
          <ImageSlot
            src={ASSETS.hero}
            alt="Immunodermatology Masterclass 2026"
            placeholderLabel="Hero artwork (full color)"
            className="hero-poster"
            variant="hero"
            width={1520}
            height={469}
            priority
          />
        </div>

        <div className="hero-details reveal reveal-delay-1">
          <div className="hero-meta">
            <span className="pill">{EVENT_META.name}</span>
            <span className="pill pill--outline">Program & registration</span>
          </div>

          <p className="hero-detail-line">
            {EVENT_META.datetime}
            <br />
            {EVENT_META.venue}
            <br />
            {EVENT_META.locationLine}
          </p>

          <div className="hero-meta hero-meta--credits">
            {EVENT_META.credits.map((credit) => (
              <span className="pill pill--outline" key={credit}>{credit}</span>
            ))}
          </div>

          <p className="hero-cta-note">{EVENT_META.ctaNote}</p>

          <a className="btn btn-yellow btn-shine" href="#register">
            <span>Register now</span>
            <small>Regular registration open</small>
          </a>
        </div>
      </section>

      {/* 2. Highlights */}
      <section className="section reveal" id="highlights">
        <p className="section-eyebrow">Highlights</p>
        <h2 className="section-title">
          <span>Program highlights</span>
        </h2>
        <p className="section-lede">
          Plenary sessions spanning complications, urticaria, and blistering disease.
        </p>

        <div className="highlights-grid">
          {HIGHLIGHTS.map((item) => (
            <article className="highlight-card" key={item.id}>
              {item.speakerSlug && (
                <div className="speaker-ring highlight-card__photo">
                  <ImageSlot
                    src={speakerImage(item.speakerSlug)}
                    alt={item.speakerName ?? item.title}
                    placeholderLabel={item.speakerName ?? item.title}
                    className="speaker-photo"
                    variant="speaker"
                  />
                </div>
              )}
              <p className="highlight-card__subtitle">{item.subtitle}</p>
              <h3 className="highlight-card__title">{item.title}</h3>
              {item.speakerName && (
                <p className="highlight-card__speaker">{item.speakerName}</p>
              )}
            </article>
          ))}
        </div>

        <a className="btn btn-yellow btn-shine" href="#program">
          <span>View event program</span>
          <small>Opening, sessions & closing</small>
        </a>
      </section>

      {/* 3. Abstracts CTA (placeholder) */}
      <section className="section reveal" id="abstracts">
        <div className="feature-card">
          <div className="feature-card__glow" aria-hidden="true" />
          <p className="section-eyebrow">{ABSTRACTS_CTA.eyebrow}</p>
          <h2 className="section-title">
            <span>{ABSTRACTS_CTA.title}</span>
          </h2>
          <p className="section-body">{ABSTRACTS_CTA.body}</p>
          <p className="deadline">{ABSTRACTS_CTA.deadline}</p>
          <span className="btn btn-yellow btn-shine" aria-disabled="true">
            <span>{ABSTRACTS_CTA.status}</span>
            <small>Placeholder — details coming soon</small>
          </span>
        </div>
      </section>

      {/* 4. Symposium (placeholder) */}
      <section className="section symposium reveal" id="symposium">
        <p className="section-eyebrow">{SYMPOSIUM.eyebrow}</p>
        <div className="symposium-grid">
          <div className="symposium-visual">
            <div className="symposium-frame">
              <ImageSlot
                src={SYMPOSIUM.flyerSrc}
                alt="Symposium flyer placeholder"
                placeholderLabel="Symposium flyer"
                className="symposium-flyer"
                variant="flyer"
              />
            </div>
            <span className="symposium-badge">{SYMPOSIUM.badge}</span>
          </div>
          <div className="symposium-copy">
            <h2 className="symposium-title">{SYMPOSIUM.title}</h2>
            <p className="section-body section-body--left">{SYMPOSIUM.body}</p>
            <ul className="panelists">
              {SYMPOSIUM.panelists.map((p) => (
                <li key={p.name + p.role}>
                  {p.name}
                  <em>{p.role}</em>
                </li>
              ))}
            </ul>
            <p className="symposium-closing">{SYMPOSIUM.closing}</p>
          </div>
        </div>
      </section>

      {/* 5. Sponsors (placeholders) */}
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

      {/* 6. Event program — opening, sessions, closing */}
      <div id="program">
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

      {/* 7. Event details */}
      <section className="section panel reveal" id="details">
        <p className="section-eyebrow">Event details</p>
        <h2 className="section-title">
          <span>{EVENT_META.name}</span>
        </h2>
        <p className="section-body">{EVENT_META.tagline}</p>

        <div className="event-info">
          <div className="event-info__block">
            <p className="event-info__label">Time &amp; location</p>
            <p className="event-info__value">{EVENT_META.datetime}</p>
            <p className="event-info__value">{EVENT_META.venue}</p>
            <p className="event-info__value">{EVENT_META.locationLine}</p>
          </div>
          <div className="event-info__block">
            <p className="event-info__label">Share this event</p>
            <p className="event-info__value event-info__value--muted">
              Sharing links coming soon
            </p>
          </div>
        </div>
      </section>

      {/* 8. Registration */}
      <section className="section reveal" id="register">
        <div className="section-eyebrow">Registration</div>
        <h2 className="section-title">
          <span>Regular Registration</span>
        </h2>

        <div className="register-single">
          <figure className="register-card">
            <ImageSlot
              src={ASSETS.registerRegular}
              alt="Regular registration"
              placeholderLabel="registerpost-regular-01.png"
              className="register-image"
              variant="flyer"
            />
          </figure>
          <Link to="/signup" className="btn btn-yellow btn-shine">
            <span>Register now</span>
            <small>Secure your slot today</small>
          </Link>
        </div>
      </section>

      {/* 9. Meet the team */}
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
          <a className="btn btn-yellow btn-team" href="#team">
            Photodermatology Subspecialty Core Group
          </a>
          <a className="btn btn-yellow btn-team" href="#team">
            Immunodermatology Subspecialty Core Group
          </a>
        </div>

        <div className="team-logos">
          <div className="team-logo-ring team-logo-ring--center">
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

      <aside
        className={`sticky-register${stickyVisible ? ' sticky-register--visible' : ''}`}
        aria-label="Quick registration"
      >
        <div className="sticky-register__inner">
          <div className="sticky-register__copy">
            <strong>Masterclass 2026</strong>
            <span>Register today</span>
          </div>
          <Link to="/signup" className="btn btn-yellow btn-shine sticky-register__btn">
            Register now
          </Link>
        </div>
      </aside>

      {modal && (
        <SpeakerModal
          speaker={modal.speaker}
          sessionTitle={modal.sessionTitle}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
