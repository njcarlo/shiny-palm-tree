import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { ImageSlot } from './components/ImageSlot'
import { SpeakerModal } from './components/SpeakerModal'
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
      <div className="page-pattern" aria-hidden="true" />
      <div className="page-grain" aria-hidden="true" />

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
            <span className="pill">Immunodermatology Masterclass 2026</span>
            <span className="pill pill--outline">Program & registration</span>
          </div>

          <p className="hero-detail-line">
            Philippine Dermatological Society
            <br />
            Immunodermatology Subspecialty Core Group
          </p>

          <a className="btn btn-yellow btn-shine" href="#register">
            <span>Register now</span>
            <small>Regular registration open</small>
          </a>
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
              <p className="session-group-label">Moderators</p>
              <div className="speakers speakers--mods">
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

            <div className="session-group">
              <p className="session-group-label">Speakers</p>
              <div className="speakers speakers--grid">
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

      <section className="section team reveal" id="team">
        <div className="section-eyebrow">Organized by</div>
        <h2 className="section-title">
          <span>Immunodermatology Subspecialty Core Group</span>
        </h2>

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
