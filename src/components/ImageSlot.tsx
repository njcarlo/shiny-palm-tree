import { useState } from 'react'

type ImageSlotVariant = 'hero' | 'speaker' | 'logo' | 'card' | 'sponsor' | 'flyer'

type ImageSlotProps = {
  src: string
  alt: string
  placeholderLabel: string
  className?: string
  width?: number
  height?: number
  variant?: ImageSlotVariant
  priority?: boolean
}

export function ImageSlot({
  src,
  alt,
  placeholderLabel,
  className = '',
  width,
  height,
  variant = 'card',
  priority = false,
}: ImageSlotProps) {
  const [missing, setMissing] = useState(!src)

  if (missing || !src) {
    return (
      <div
        className={`image-slot image-slot--${variant} ${className}`.trim()}
        role="img"
        aria-label={alt}
      >
        <div className="image-slot__frame">
          <svg
            className="image-slot__icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="8.5" cy="10" r="1.75" fill="currentColor" />
            <path
              d="M3 16l4.5-4.5 3 3L14 11l7 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {variant !== 'speaker' && variant !== 'sponsor' && (
            <p className="image-slot__label">{placeholderLabel}</p>
          )}
          {variant !== 'speaker' && variant !== 'logo' && variant !== 'sponsor' && (
            <p className="image-slot__path">Drop file at: {src}</p>
          )}
          {variant === 'sponsor' && (
            <p className="image-slot__label">{placeholderLabel}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setMissing(true)}
    />
  )
}
