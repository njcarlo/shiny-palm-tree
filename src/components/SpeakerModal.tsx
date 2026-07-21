import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Speaker } from '../data/program'
import { speakerImage } from '../data/images'
import { ImageSlot } from './ImageSlot'

type Props = {
  speaker: Speaker
  sessionTitle?: string
  onClose: () => void
}

export function SpeakerModal({ speaker, sessionTitle, onClose }: Props) {
  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Close on Escape
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
      aria-label={speaker.name}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-panel">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="modal-photo-wrap">
          <div className="modal-ring">
            <ImageSlot
              src={speakerImage(speaker.slug)}
              alt={speaker.name}
              placeholderLabel={speaker.name}
              className="modal-photo"
              variant="speaker"
            />
          </div>
        </div>

        <div className="modal-body">
          {speaker.isModerator ? (
            <span className="modal-badge modal-badge--mod">Moderator</span>
          ) : speaker.role ? (
            <span className="modal-badge modal-badge--role">{speaker.role}</span>
          ) : (
            <span className="modal-badge modal-badge--spk">Speaker</span>
          )}

          <h2 className="modal-name">{speaker.name}</h2>

          {speaker.credentials && (
            <p className="modal-credentials">{speaker.credentials}</p>
          )}

          {speaker.designation && !speaker.isModerator && (
            <p className="modal-designation">{speaker.designation}</p>
          )}

          {sessionTitle && (
            <p className="modal-session">
              <span className="modal-session-label">Session</span>
              {sessionTitle}
            </p>
          )}

          {speaker.country && (
            <p className="modal-country">{speaker.country}</p>
          )}
        </div>
      </div>
    </div>
  )

  // Portal into document.body — bypasses ALL parent stacking contexts
  return createPortal(content, document.body)
}
