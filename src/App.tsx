export default function App() {
  return (
    <div className="page">
      <section className="hero" id="top">
        <div className="hero-poster-wrap">
          <img
            className="hero-poster"
            src="/images/hero-poster.png"
            alt="2025 Psoriasis Conference Philippines — Transforming Care: The Future of Psoriasis Management"
            width={1449}
            height={2048}
          />
        </div>

        <div className="hero-details">
          <p className="hero-detail-line">
            August 13, 2025, 8:30 AM to 5:00 PM
            <br />
            Velvet Ballroom, Seda BGC, Taguig City, Metro Manila, Philippines
          </p>
          <p className="hero-credits">3 PRC CPD Units · 50 PDS CME Units</p>
          <a className="btn btn-yellow" href="#register">
            Secure your spot now. Limited seats available!
          </a>
        </div>
      </section>

      <section className="section" id="highlights">
        <h2 className="section-title">Highlights</h2>
        <p className="section-lead">
          Free Communication, Great Debate in Psoriasis Treatment, and Plenary
          Lectures
        </p>

        <div className="speakers">
          <article className="speaker">
            <img
              className="speaker-photo"
              src="/images/griffiths.png"
              alt="Prof. Christopher Griffiths"
              width={370}
              height={370}
            />
            <h3 className="speaker-talk">Psoriasis: Road to Cure</h3>
            <p className="speaker-name">Prof. Christopher Griffiths</p>
            <p className="speaker-country">United Kingdom</p>
          </article>

          <article className="speaker">
            <img
              className="speaker-photo"
              src="/images/asawanonda.png"
              alt="Dr. Pravit Asawanonda"
              width={360}
              height={360}
            />
            <h3 className="speaker-talk">
              Role of Phototherapy in the Age of Biologics
            </h3>
            <p className="speaker-name">Dr. Pravit Asawanonda</p>
            <p className="speaker-country">Thailand</p>
          </article>
        </div>

        <a className="btn btn-yellow" href="#register">
          Click To View Event Program
        </a>
      </section>

      <section className="section" id="abstract">
        <h2 className="section-title section-title-long">
          Pioneer Psoriasis Progress: Submit your Research Now
        </h2>
        <p className="section-body">
          Join us in advancing the understanding and management of psoriasis.
          Share your research, clinical insights, or innovative approaches with
          the community. Submit your abstract today and be part of the
          conversation shaping the future of psoriasis care.
        </p>
        <p className="deadline">
          Extended deadline: June 30, 2025 · 12:00 noon
        </p>
        <button className="btn btn-yellow btn-disabled" type="button" disabled>
          Submission Closed
        </button>
      </section>

      <section className="section symposium" id="symposium">
        <div className="symposium-grid">
          <img
            className="symposium-flyer"
            src="/images/novartis-flyer.jpg"
            alt="Novartis Lunch Symposium flyer"
            width={480}
            height={720}
          />
          <div className="symposium-copy">
            <h2 className="symposium-title">
              Are Biologics The ‘New Normal’ In The Management of Psoriatic
              Disease?
            </h2>
            <p className="section-body">
              Uncover real-world insights on the use of biologics in psoriatic
              disease during the Novartis Lunch Symposium at the PDS Psoriasis
              Conference this August 13, 2025 with Dr. Patricia Tinio, Dr.
              Bernardita Policarpio, and special guest Rheumatologist, Dr.
              Genevieve Katigbak.
            </p>
            <p className="symposium-closing">See you there!</p>
          </div>
        </div>
      </section>

      <section className="section sponsors" id="sponsors">
        <h2 className="section-title">Thank you to our sponsors</h2>

        <div className="sponsor-tier">
          <h3 className="tier-label">Platinum sponsor</h3>
          <div className="tier-card tier-card-wide">
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
            <div className="tier-card tier-card-minor">
              <img src="/images/sponsors/minor-1.png" alt="Medilight" />
            </div>
            <div className="tier-card tier-card-minor">
              <img src="/images/sponsors/minor-2.png" alt="Hyphens" />
            </div>
            <div className="tier-card tier-card-minor">
              <img src="/images/sponsors/minor-3.png" alt="Vexxa" />
            </div>
            <div className="tier-card tier-card-minor">
              <img src="/images/sponsors/minor-4.png" alt="Spectrumed" />
            </div>
            <div className="tier-card tier-card-minor">
              <img src="/images/sponsors/minor-5.png" alt="FSPC" />
            </div>
            <div className="tier-card tier-card-minor">
              <img src="/images/sponsors/minor-6.png" alt="Glenmark" />
            </div>
          </div>
        </div>
      </section>

      <section className="section team" id="team">
        <h2 className="section-title">Meet the team</h2>
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
          <img src="/images/logo-photo.png" alt="Photodermatology logo" />
          <img src="/images/logo-pds.png" alt="PDS logo" />
          <img src="/images/logo-immuno.png" alt="Immunodermatology logo" />
        </div>
      </section>

      <footer className="footer" id="register">
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
    </div>
  )
}
