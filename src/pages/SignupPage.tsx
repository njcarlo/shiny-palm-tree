import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ASSETS } from '../data/images'
import { ImageSlot } from '../components/ImageSlot'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const SPECIALTIES = [
  'Dermatology',
  'Internal Medicine',
  'Allergy & Immunology',
  'Pediatrics',
  'Pediatric Dermatology',
  'Rheumatology',
  'General Practice',
  'Other',
]

// Replace with your Formspree form ID: https://formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

export default function SignupPage() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState('submitting')
    setErrorMsg('')

    const data = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setFormState('success')
      } else {
        const json = await res.json().catch(() => ({}))
        setErrorMsg((json as { error?: string }).error ?? 'Submission failed. Please try again.')
        setFormState('error')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setFormState('error')
    }
  }

  return (
    <div className="page signup-page">
      <div className="page-pattern" aria-hidden="true" />

      <header className="signup-header">
        <Link to="/" className="signup-back" aria-label="Back to home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </Link>
        <div className="signup-header-logo">
          <ImageSlot
            src={ASSETS.logoCombined}
            alt="Immunodermatology Masterclass 2026"
            placeholderLabel="PDS Immunoderm logo"
            className="signup-logo-img"
            variant="logo"
            priority
          />
        </div>
      </header>

      <main className="signup-main">
        {formState === 'success' ? (
          <div className="signup-success">
            <div className="signup-success__icon" aria-hidden="true">✓</div>
            <h1 className="signup-success__title">You're registered!</h1>
            <p className="signup-success__body">
              Thank you for signing up for the <strong>Immunodermatology Masterclass 2026</strong>.
              A confirmation will be sent to your email shortly.
            </p>
            <Link to="/" className="btn btn-yellow btn-shine">
              Back to home
            </Link>
          </div>
        ) : (
          <div className="signup-card">
            <div className="signup-card__header">
              <p className="section-eyebrow">Regular Registration</p>
              <h1 className="signup-card__title">
                Immunodermatology<br />Masterclass 2026
              </h1>
              <p className="signup-card__sub">
                Philippine Dermatological Society<br />
                Immunodermatology Subspecialty Core Group
              </p>
            </div>

            <form className="signup-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group form-group--full">
                  <label className="form-label" htmlFor="full_name">
                    Full name <span className="form-required">*</span>
                  </label>
                  <input
                    className="form-input"
                    id="full_name"
                    name="full_name"
                    type="text"
                    placeholder="Dr. Juan dela Cruz"
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="form-row form-row--2">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email address <span className="form-required">*</span>
                  </label>
                  <input
                    className="form-input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Contact number <span className="form-required">*</span>
                  </label>
                  <input
                    className="form-input"
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+63 9XX XXX XXXX"
                    required
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="form-row form-row--2">
                <div className="form-group">
                  <label className="form-label" htmlFor="specialty">
                    Medical specialty <span className="form-required">*</span>
                  </label>
                  <select
                    className="form-input form-select"
                    id="specialty"
                    name="specialty"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>Select specialty</option>
                    {SPECIALTIES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="institution">
                    Hospital / Institution <span className="form-required">*</span>
                  </label>
                  <input
                    className="form-input"
                    id="institution"
                    name="institution"
                    type="text"
                    placeholder="Hospital or clinic name"
                    required
                  />
                </div>
              </div>

              <div className="form-row form-row--2">
                <div className="form-group">
                  <label className="form-label" htmlFor="prc_no">
                    PRC License No. <span className="form-required">*</span>
                  </label>
                  <input
                    className="form-input"
                    id="prc_no"
                    name="prc_no"
                    type="text"
                    placeholder="0012345"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="pds_no">
                    PDS Membership No. <span className="form-label--optional">(optional)</span>
                  </label>
                  <input
                    className="form-input"
                    id="pds_no"
                    name="pds_no"
                    type="text"
                    placeholder="PDS-XXXXX"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group form-group--full">
                  <label className="form-label" htmlFor="notes">
                    Special requirements <span className="form-label--optional">(optional)</span>
                  </label>
                  <textarea
                    className="form-input form-textarea"
                    id="notes"
                    name="notes"
                    placeholder="Dietary restrictions, accessibility needs, etc."
                    rows={3}
                  />
                </div>
              </div>

              <input type="hidden" name="registration_type" value="Regular" />

              {formState === 'error' && (
                <p className="form-error" role="alert">{errorMsg}</p>
              )}

              <div className="form-submit">
                <button
                  type="submit"
                  className={`btn btn-yellow btn-shine${formState === 'submitting' ? ' btn-disabled' : ''}`}
                  disabled={formState === 'submitting'}
                >
                  {formState === 'submitting' ? 'Submitting…' : (
                    <>
                      <span>Submit registration</span>
                      <small>Regular slot · Immunodermatology Masterclass 2026</small>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
