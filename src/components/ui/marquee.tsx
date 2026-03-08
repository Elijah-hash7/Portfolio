'use client';

import type { ReactNode } from 'react';

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
};

export default function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
}: MarqueeProps) {
  const trackClass = [
    'marquee-track',
    reverse ? 'marquee-reverse' : '',
    pauseOnHover ? 'marquee-pause-on-hover' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`marquee-root ${className ?? ''}`}>
      <div className={trackClass}>{children}</div>
      <div aria-hidden className={trackClass}>
        {children}
      </div>

      <style>{`
        .marquee-root {
          display: flex;
          overflow: hidden;
          width: 100%;
          --gap: 1rem;
          --duration: 20s;
        }

        .marquee-track {
          display: flex;
          align-items: center;
          gap: var(--gap);
          min-width: max-content;
          animation: marquee-scroll var(--duration) linear infinite;
          will-change: transform;
          padding-right: var(--gap);
        }

        .marquee-reverse {
          animation-direction: reverse;
        }

        .marquee-pause-on-hover {
          animation-play-state: running;
        }

        .marquee-root:hover .marquee-pause-on-hover {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - var(--gap)));
          }
        }
      `}</style>
    </div>
  );
}
