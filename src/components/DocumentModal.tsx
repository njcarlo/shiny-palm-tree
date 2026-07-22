import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export type TeamDocument = {
  title: string
  src: string
  downloadName: string
}

type Props = {
  doc: TeamDocument
  onClose: () => void
}

export function DocumentModal({ doc, onClose }: Props) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
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
      aria-label={doc.title}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-panel modal-panel--document">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <h2 className="document-modal__title">{doc.title}</h2>

        <div className="document-modal__frame">
          <img
            className="document-modal__image"
            src={doc.src}
            alt={doc.title}
            loading="eager"
            decoding="async"
          />
        </div>

        <a
          className="btn btn-yellow btn-shine document-modal__download"
          href={doc.src}
          download={doc.downloadName}
        >
          <span>Download</span>
          <small>Save a high-quality copy</small>
        </a>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
