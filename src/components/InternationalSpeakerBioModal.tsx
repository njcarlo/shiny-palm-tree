import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { InternationalSpeaker } from '../data/event'
import { speakerImage } from '../data/images'
import { ImageSlot } from './ImageSlot'

type Props = {
  speaker: InternationalSpeaker
  onClose: () => void
}

export function InternationalSpeakerBioModal({ speaker, onClose }: Props) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const content = (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intl-bio-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal-panel bio-modal-panel">
        <button className="modal-close" onClick={onClose} aria-label="Close biography">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="bio-modal__header">
          <div className="bio-modal__photo-wrap">
            <ImageSlot
              src={speakerImage(speaker.slug)}
              alt={speaker.name}
              placeholderLabel={speaker.name}
              className="bio-modal__photo"
              variant="speaker"
            />
          </div>
          <div className="bio-modal__identity">
            <p className="bio-modal__eyebrow">Biography sketch</p>
            <h2 id="intl-bio-title" className="bio-modal__name">
              {speaker.name}
            </h2>
            <p className="bio-modal__meta">
              {speaker.title}
              <span aria-hidden="true"> · </span>
              {speaker.location}
            </p>
          </div>
        </div>

        <div className="bio-modal__body">
          {speaker.biography.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
