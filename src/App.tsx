import { useEffect, useRef, useState, type RefObject } from 'react'

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

function useParallax() {
  const heroPosterRef = useRef<HTMLDivElement | null>(null)
  const heroDetailsRef = useRef<HTMLDivElement | null>(null)
  const glowTopRef = useRef<HTMLDivElement | null>(null)
  const glowMidRef = useRef<HTMLDivElement | null>(null)
  const textureRef = useRef<HTMLDivElement | null>(null)
  const symposiumRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let ticking = false

    const update = () => {
      const y = window.scrollY

      if (heroPosterRef.current) {
        heroPosterRef.current.style.transform = `translate3d(0, ${y * 0.28}px, 0) scale(${1 + y * 0.00008})`
      }
      if (heroDetailsRef.current) {
        heroDetailsRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`
        heroDetailsRef.current.style.opacity = `${Math.max(0, 1 - y / 700)}`
      }
      if (glowTopRef.current) {
        glowTopRef.current.style.transform = `translate3d(-50%, ${y * 0.15}px, 0)`
      }
      if (glowMidRef.current) {
        glowMidRef.current.style.transform = `translate3d(0, ${y * -0.08}px, 0)`
      }
      if (textureRef.current) {
        textureRef.current.style.transform = `translate3d(0, ${y * 0.05}px, 0)`
      }
      if (symposiumRef.current) {
        const rect = symposiumRef.current.getBoundingClientRect()
        const center = rect.top + rect.height / 2 - window.innerHeight / 2
        symposiumRef.current.style.transform = `translate3d(0, ${center * -0.06}px, 0)`
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return {
    heroPosterRef,
    heroDetailsRef,
    glowTopRef,
    glowMidRef,
    textureRef,
    symposiumRef,
  }
}

function useStickyRegister() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const registerEl = document.getElementById('register')
    const heroEl = document.getElementById('top')

    const update = () => {
      const heroBottom = heroEl?.getBoundingClientRect().bottom ?? 0
      const registerTop = registerEl?.getBoundingClientRect().top ?? Infinity
      const show = heroBottom < 0 && registerTop > window.innerHeight * 0.5
      setVisible(show)
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

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 11) % 94}%`,
  delay: `${(i % 6) * 0.7}s`,
  duration: `${4 + (i % 5)}s`,
  size: `${4 + (i % 4)}px`,
}))

export default function App() {
  const pageRef = useReveal()
  const parallax = useParallax()
  const stickyVisible = useStickyRegister()

  return (
    <div className="page" ref={pageRef}>
      <div
        className="page-glow page-glow--top"
        ref={parallax.glowTopRef}
        aria-hidden="true"
      />
      <div
        className="page-glow page-glow--mid"
        ref={parallax.glowMidRef}
        aria-hidden="true"
      />
      <div
        className="page-texture"
        ref={parallax.textureRef}
        aria-hidden="true"
      />

      <section className="hero" id="top">
        <div className="hero-particles" aria-hidden="true">
          {PARTICLES.map((p) => (
            <span
              key={p.id}
              className="hero-particle"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                width: p.size,
                height: p.size,
              }}
            />
          ))}
        </div>

        <div className="hero-poster-wrap reveal">
          <div className="hero-poster-parallax" ref={parallax.heroPosterRef}>
            <div className="hero-poster-glow" aria-hidden="true" />
            <div className="hero-shine" aria-hidden="true" />
            <img
              className="hero-poster"
              src="/images/hero-poster.png"
              alt="2025 Psoriasis Conference Philippines — Transforming Care: The Future of Psoriasis Management"
              width={1449}
              height={2048}
            />
          </div>
        </div>

        <div className="hero-details reveal reveal-delay-1">
          <div className="hero-details-parallax" ref={parallax.heroDetailsRef}>
          <div className="hero-meta">
            <span className="pill">August 13, 2025</span>
            <span className="pill pill--outline">8:30 AM – 5:00 PM</span>
          </div>

          <p className="hero-detail-line">
            Velvet Ballroom, Seda BGC
            <br />
            Taguig City, Metro Manila, Philippines
          </p>

          <div className="hero-badges">
            <div className="credit-badge">
              <strong>3</strong>
              <span>PRC CPD Units</span>
            </div>
            <div className="credit-badge">
              <strong>50</strong>
              <span>PDS CME Units</span>
            </div>
          </div>

          <a className="btn btn-yellow btn-shine" href="#register">
            <span>Secure your spot now</span>
            <small>Limited seats available</small>
          </a>
          </div>
        </div>
      </section>

      <section className="section panel reveal" id="highlights">
        <div className="section-eyebrow">Featured sessions</div>
        <h2 className="section-title">
          <span>Highlights</span>
        </h2>
        <p className="section-lead">
          Free Communication, Great Debate in Psoriasis Treatment, and Plenary
          Lectures from world-renowned experts.
        </p>

        <div className="speakers">
          <article className="speaker-card reveal reveal-delay-1">
            <div className="speaker-ring">
              <img
                className="speaker-photo"
                src="/images/griffiths.png"
                alt="Prof. Christopher Griffiths"
                width={370}
                height={370}
              />
            </div>
            <p className="speaker-tag">Keynote</p>
            <h3 className="speaker-talk">Psoriasis: Road to Cure</h3>
            <p className="speaker-name">Prof. Christopher Griffiths</p>
            <p className="speaker-country">United Kingdom</p>
          </article>

          <article className="speaker-card reveal reveal-delay-2">
            <div className="speaker-ring">
              <img
                className="speaker-photo"
                src="/images/asawanonda.png"
                alt="Dr. Pravit Asawanonda"
                width={360}
                height={360}
              />
            </div>
            <p className="speaker-tag">Plenary</p>
            <h3 className="speaker-talk">
              Role of Phototherapy in the Age of Biologics
            </h3>
            <p className="speaker-name">Dr. Pravit Asawanonda</p>
            <p className="speaker-country">Thailand</p>
          </article>
        </div>

        <a className="btn btn-yellow btn-outline-hover" href="#register">
          Click To View Event Program
        </a>
      </section>

      <section className="section reveal" id="abstract">
        <div className="feature-card">
          <div className="feature-card__glow" aria-hidden="true" />
          <h2 className="section-title section-title-long">
            Pioneer Psoriasis Progress: Submit your Research Now
          </h2>
          <p className="section-body">
            Join us in advancing the understanding and management of psoriasis.
            Share your research, clinical insights, or innovative approaches
            with the community — and help shape the future of psoriasis care.
          </p>
          <p className="deadline">
            Extended deadline: June 30, 2025 · 12:00 noon
          </p>
          <button className="btn btn-yellow btn-disabled" type="button" disabled>
            Submission Closed
          </button>
        </div>
      </section>

      <section className="section symposium reveal" id="symposium">
        <div className="symposium-grid">
          <div className="symposium-visual" ref={parallax.symposiumRef}>
            <div className="symposium-frame">
              <img
                className="symposium-flyer"
                src="/images/novartis-flyer.jpg"
                alt="Novartis Lunch Symposium flyer"
                width={480}
                height={720}
              />
            </div>
            <span className="symposium-badge">Lunch Symposium</span>
          </div>

          <div className="symposium-copy">
            <p className="section-eyebrow section-eyebrow--left">Novartis</p>
            <h2 className="symposium-title">
              Are Biologics The ‘New Normal’ In The Management of Psoriatic
              Disease?
            </h2>
            <p className="section-body section-body--left">
              Uncover real-world insights on the use of biologics in psoriatic
              disease during the Novartis Lunch Symposium at the PDS Psoriasis
              Conference this August 13, 2025.
            </p>
            <ul className="panelists">
              <li>Dr. Patricia Tinio</li>
              <li>Dr. Bernardita Policarpio</li>
              <li>
                Dr. Genevieve Katigbak
                <em>Rheumatologist · special guest</em>
              </li>
            </ul>
            <p className="symposium-closing">See you there!</p>
          </div>
        </div>
      </section>

      <section className="section sponsors reveal" id="sponsors">
        <div className="section-eyebrow">Our partners</div>
        <h2 className="section-title">
          <span>Thank you to our sponsors</span>
        </h2>

        <div className="sponsor-tier sponsor-tier--platinum">
          <h3 className="tier-label">Platinum sponsor</h3>
          <div className="tier-card tier-card-wide tier-card--glow">
            <img
              src="/images/sponsors-platinum.jpg"
              alt="Novartis — Platinum sponsor"
            />
          </div>
        </div>

        <div className="sponsor-tier">
          <h3 className="tier-label">Silver sponsors</h3>
          <div className="tier-row tier-row-2">
            <div className="tier-card">
              <img src="/images/sponsors/silver-1.jpg" alt="Galderma" />
            </div>
            <div className="tier-card">
              <img src="/images/sponsors/silver-2.jpg" alt="Sun Pharma" />
            </div>
          </div>
        </div>

        <div className="sponsor-tier">
          <h3 className="tier-label">Bronze sponsors</h3>
          <div className="tier-row tier-row-3">
            <div className="tier-card">
              <img
                src="/images/sponsors/bronze-jnj.jpg"
                alt="Johnson & Johnson"
              />
            </div>
            <div className="tier-card">
              <img src="/images/sponsors/bronze-zuellig.jpg" alt="Zuellig Pharma" />
            </div>
            <div className="tier-card">
              <img src="/images/sponsors/bronze-dermasia.jpg" alt="DermAsia" />
            </div>
          </div>
        </div>

        <div className="sponsor-tier">
          <h3 className="tier-label">Minor sponsors</h3>
          <div className="tier-grid-minor">
            {[
              ['minor-1.png', 'Medilight'],
              ['minor-2.png', 'Hyphens'],
              ['minor-3.png', 'Vexxa'],
              ['minor-4.png', 'Spectrumed'],
              ['minor-5.png', 'FSPC'],
              ['minor-6.png', 'Glenmark'],
            ].map(([file, name]) => (
              <div className="tier-card tier-card-minor" key={file}>
                <img src={`/images/sponsors/${file}`} alt={name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section team reveal" id="team">
        <div className="section-eyebrow">Organizers</div>
        <h2 className="section-title">
          <span>Meet the team</span>
        </h2>
        <p className="section-body team-body">
          Our team of dedicated dermatologists brings together expertise,
          compassion, and a commitment to excellence in skin health — united
          by a shared mission to advance dermatologic science and improve
          patient outcomes.
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
          <div className="team-logo-ring">
            <img src="/images/logo-photo.png" alt="Photodermatology logo" />
          </div>
          <div className="team-logo-ring team-logo-ring--center">
            <img src="/images/logo-pds.png" alt="PDS logo" />
          </div>
          <div className="team-logo-ring">
            <img src="/images/logo-immuno.png" alt="Immunodermatology logo" />
          </div>
        </div>
      </section>

      <section className="cta-banner reveal" id="register">
        <div className="cta-banner__inner">
          <p className="cta-banner__label">Don’t miss out</p>
          <h2 className="cta-banner__title">
            Join the brightest minds reshaping psoriasis care
          </h2>
          <p className="cta-banner__text">
            August 13, 2025 · Velvet Ballroom, Seda BGC · 3 PRC CPD · 50 PDS CME
          </p>
          <a className="btn btn-yellow btn-shine" href="#top">
            Register for the conference
          </a>
        </div>
      </section>

      <footer className="footer">
        <p className="footer-title">2025 Psoriasis Conference Philippines</p>
        <p className="footer-powered">
          Powered by Matt and Phoebe Creative Productions
        </p>
        <a
          className="footer-link"
          href="https://www.mattandphoebe-prod.com"
          target="_blank"
          rel="noreferrer"
        >
          www.mattandphoebe-prod.com
        </a>
      </footer>

      <aside
        className={`sticky-register${stickyVisible ? ' sticky-register--visible' : ''}`}
        aria-label="Quick registration"
      >
        <div className="sticky-register__inner">
          <div className="sticky-register__copy">
            <strong>Aug 13, 2025</strong>
            <span>Velvet Ballroom · Seda BGC</span>
          </div>
          <a className="btn btn-yellow btn-shine sticky-register__btn" href="#register">
            Register now
          </a>
        </div>
      </aside>
    </div>
  )
}
