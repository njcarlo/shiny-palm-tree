import { useEffect, useRef, useState, type RefObject } from 'react'

function useReveal(): RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const targets = node.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return ref
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pageRef = useReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div ref={pageRef}>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#top" className="nav-brand" onClick={closeMenu}>
            Psoriasis Conference 2025
          </a>
          <button
            className="nav-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
          </button>
          <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
            <li>
              <a href="#highlights" onClick={closeMenu}>
                Highlights
              </a>
            </li>
            <li>
              <a href="#abstract" onClick={closeMenu}>
                Abstracts
              </a>
            </li>
            <li>
              <a href="#symposium" onClick={closeMenu}>
                Symposium
              </a>
            </li>
            <li>
              <a href="#sponsors" onClick={closeMenu}>
                Sponsors
              </a>
            </li>
            <li>
              <a href="#register" className="btn btn-nav" onClick={closeMenu}>
                Register
              </a>
            </li>
          </ul>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-media" aria-hidden="true">
            <img
              src="/images/hero.jpg"
              alt=""
              width={1920}
              height={1280}
            />
            <div className="hero-overlay" />
          </div>
          <div className="hero-content">
            <h1 className="hero-brand">
              <span>Philippines 2025</span>
              Psoriasis Conference
            </h1>
            <p className="hero-headline">
              “Transforming Care: The Future of Psoriasis Management”
            </p>
            <p className="hero-support">
              Join leading dermatologists for a full day of plenary lectures,
              debates, and breakthrough research reshaping psoriasis care.
            </p>
            <div className="hero-ctas" id="register">
              <a className="btn btn-primary" href="#details">
                Secure your spot
              </a>
              <a className="btn btn-secondary" href="#highlights">
                View highlights
              </a>
            </div>
          </div>
        </section>

        <section className="details" id="details">
          <div className="container details-grid">
            <div className="detail-item reveal">
              <span className="detail-label">When</span>
              <h3>August 13, 2025</h3>
              <p>8:30 AM – 5:00 PM</p>
            </div>
            <div className="detail-item reveal reveal-delay-1">
              <span className="detail-label">Where</span>
              <h3>Velvet Ballroom, Seda BGC</h3>
              <p>Taguig City, Metro Manila, Philippines</p>
            </div>
            <div className="detail-item reveal reveal-delay-2">
              <span className="detail-label">Credits</span>
              <h3>3 PRC CPD Units</h3>
              <p>50 PDS CME Units · Limited seats</p>
            </div>
          </div>
        </section>

        <section className="section highlights" id="highlights">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-label">Highlights</span>
              <h2>Voices shaping the future of care</h2>
              <p>
                Free communication sessions, a great debate in psoriasis
                treatment, and plenary lectures from international experts.
              </p>
            </div>

            <div className="speakers">
              <article className="speaker reveal">
                <div className="speaker-photo">
                  <img
                    src="/images/speaker-1.jpg"
                    alt="Portrait placeholder for Prof. Christopher Griffiths"
                    width={800}
                    height={1200}
                  />
                </div>
                <div className="speaker-meta">
                  <h3>Prof. Christopher Griffiths</h3>
                  <p className="speaker-role">United Kingdom</p>
                  <p className="speaker-talk">Psoriasis: Road to Cure</p>
                </div>
              </article>

              <article className="speaker reveal reveal-delay-1">
                <div className="speaker-photo">
                  <img
                    src="/images/speaker-2.jpg"
                    alt="Portrait placeholder for Dr. Pravit Asawanonda"
                    width={800}
                    height={1200}
                  />
                </div>
                <div className="speaker-meta">
                  <h3>Dr. Pravit Asawanonda</h3>
                  <p className="speaker-role">Thailand</p>
                  <p className="speaker-talk">
                    Role of Phototherapy in the Age of Biologics
                  </p>
                </div>
              </article>
            </div>

            <div className="session-list reveal">
              <span>Free Communication</span>
              <span>Great Debate in Psoriasis Treatment</span>
              <span>Plenary Lectures</span>
            </div>

            <div className="program-cta reveal">
              <p>Explore the full day program</p>
              <a className="btn btn-dark" href="#register">
                View event program
              </a>
            </div>
          </div>
        </section>

        <section className="section abstract" id="abstract">
          <div className="container">
            <div className="reveal">
              <span className="section-label">Call for abstracts</span>
              <h2>Pioneer psoriasis progress</h2>
              <p>
                Share your research, clinical insights, or innovative approaches
                with the community. Submit your abstract and help shape the
                future of psoriasis care.
              </p>
              <p className="deadline">
                Extended deadline: June 30, 2025 · 12:00 noon
              </p>
              <a className="btn btn-primary" href="#register">
                Learn about submissions
              </a>
            </div>
            <div className="abstract-status reveal reveal-delay-1">
              <strong>Submission closed</strong>
              <p>
                Thank you to everyone who contributed. Accepted abstracts will
                be featured in the free communication sessions.
              </p>
            </div>
          </div>
        </section>

        <section className="section symposium" id="symposium">
          <div className="container symposium-layout">
            <div className="symposium-visual reveal">
              <img
                src="/images/symposium.jpg"
                alt="Conference symposium atmosphere"
                width={1200}
                height={800}
              />
            </div>
            <div className="symposium-copy reveal reveal-delay-1">
              <span className="section-label">Novartis Lunch Symposium</span>
              <h2>
                Are biologics the ‘new normal’ in the management of psoriatic
                disease?
              </h2>
              <p>
                Uncover real-world insights on the use of biologics in psoriatic
                disease during the Novartis Lunch Symposium at the PDS Psoriasis
                Conference.
              </p>
              <ul className="panelists">
                <li>Dr. Patricia Tinio</li>
                <li>Dr. Bernardita Policarpio</li>
                <li>Dr. Genevieve Katigbak — Rheumatologist, special guest</li>
              </ul>
              <p>See you there — August 13, 2025.</p>
            </div>
          </div>
        </section>

        <section className="section sponsors" id="sponsors">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-label">Partners</span>
              <h2>Thank you to our sponsors</h2>
              <p>
                This conference is made possible by the generous support of our
                industry partners across every tier.
              </p>
            </div>

            <div className="sponsor-tiers">
              <div className="tier platinum reveal">
                <h3>Platinum sponsor</h3>
                <div className="tier-logos">
                  <div className="logo-placeholder">Platinum Partner</div>
                </div>
              </div>
              <div className="tier silver reveal reveal-delay-1">
                <h3>Silver sponsors</h3>
                <div className="tier-logos">
                  <div className="logo-placeholder">Silver Partner</div>
                  <div className="logo-placeholder">Silver Partner</div>
                </div>
              </div>
              <div className="tier bronze reveal reveal-delay-2">
                <h3>Bronze sponsors</h3>
                <div className="tier-logos">
                  <div className="logo-placeholder">Bronze Partner</div>
                  <div className="logo-placeholder">Bronze Partner</div>
                  <div className="logo-placeholder">Bronze Partner</div>
                </div>
              </div>
              <div className="tier reveal reveal-delay-3">
                <h3>Minor sponsors</h3>
                <div className="tier-logos">
                  <div className="logo-placeholder">Supporting Partner</div>
                  <div className="logo-placeholder">Supporting Partner</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section team" id="team">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-label">Meet the team</span>
              <h2>Organized by dedicated subspecialty core groups</h2>
              <p>
                Our team of dermatologists brings together expertise, compassion,
                and a commitment to advancing dermatologic science and patient
                outcomes.
              </p>
            </div>
            <div className="team-grid">
              <div className="team-group reveal">
                <h3>Photodermatology Subspecialty Core Group</h3>
                <p>
                  Advancing light-based therapies and evidence-based phototherapy
                  practice across the Philippines.
                </p>
              </div>
              <div className="team-group reveal reveal-delay-1">
                <h3>Immunodermatology Subspecialty Core Group</h3>
                <p>
                  Driving research and clinical excellence in immune-mediated
                  skin disease, including psoriasis.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <p className="footer-brand">2025 Psoriasis Conference Philippines</p>
              <p>
                Transforming Care: The Future of Psoriasis Management — August
                13, 2025 at Velvet Ballroom, Seda BGC.
              </p>
            </div>
            <div className="footer-share">
              <h4>Share this event</h4>
              <div className="share-links">
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https://mattphoebeproducti.wixsite.com/matt-1/event-details/psoriasis-conference-2025-transforming-care-the-future-of-psoriasis-management"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com/intent/tweet?text=Psoriasis%20Conference%202025"
                  target="_blank"
                  rel="noreferrer"
                >
                  X
                </a>
                <a
                  href="https://www.linkedin.com/sharing/share-offsite/?url=https://mattphoebeproducti.wixsite.com/matt-1/event-details/psoriasis-conference-2025-transforming-care-the-future-of-psoriasis-management"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Powered by Matt and Phoebe Creative Productions</p>
            <p>© 2025 Psoriasis Conference Philippines</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
