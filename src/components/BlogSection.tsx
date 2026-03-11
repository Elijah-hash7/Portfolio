'use client';

import { useEffect, useRef, useState } from 'react';

// ── TERMINAL COMING SOON ──────────────────────────────────────────────────
function TerminalComingSoon({ isVisible }: { isVisible: boolean }) {
  return (
    <div className={`bs-coming-soon${isVisible ? ' is-revealed' : ''}`}>
      <div className="bs-terminal-body">
        <span className="bs-terminal-line">
          COMING SOON
          <span className="bs-cursor">_</span>
        </span>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(Boolean(entry?.isIntersecting));
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -12% 0px',
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@400;500&display=swap');

                @keyframes bs-blink {
                    0%, 49% { opacity: 1; }
                    50%, 100% { opacity: 0; }
                }

                /* ─── SECTION ─────────────────────────────── */
                .bs-section {
                    width: 100%;
                    padding: 0 var(--page-gutter, 1.5rem) 6rem;
                }

                /* ─── HEADER ──────────────────────────────── */
                .bs-header {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    padding-bottom: 1.5rem;
                    margin-bottom: 2.5rem;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    flex-wrap: nowrap;
                    width: 100%;
                }
                .bs-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(2rem, 5vw, 3.5rem);
                    letter-spacing: 0.06em;
                    color: rgba(255,255,255,0.9);
                    line-height: 1;
                    white-space: nowrap;
                    flex-shrink: 0;
                    opacity: 0;
                    transform: translateX(-28px);
                    transition:
                        opacity 600ms cubic-bezier(0.22, 1, 0.36, 1),
                        transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
                }
                .bs-title.is-revealed {
                    opacity: 1;
                    transform: translateX(0);
                }
                .bs-rule {
                    flex: 1;
                    height: 1px;
                    background: rgba(255,255,255,0.07);
                    min-width: 0;
                }
                .bs-cta {
                    font-family: 'Geist Mono', 'Courier New', monospace;
                    font-size: 0.62rem;
                    letter-spacing: 0.14em;
                    color: rgba(255,255,255,0.78);
                    text-decoration: none;
                    border: 1px solid rgba(255,255,255,0.2);
                    border-radius: 999px;
                    padding: 0.48rem 0.9rem;
                    line-height: 1;
                    white-space: nowrap;
                    background: rgba(255,255,255,0.02);
                    flex-shrink: 0;
                    margin-left: auto;
                    transition: border-color 0.2s, color 0.2s;
                    cursor: pointer;
                }
                .bs-cta:hover {
                    border-color: rgba(255,255,255,0.4);
                    color: rgba(255,255,255,1);
                }

                /* ─── COMING SOON BLOCK ───────────────────── */
                .bs-coming-soon {
                    position: relative;
                    overflow: hidden;
                    border-radius: 14px;
                    border: 1px solid rgba(255,255,255,0.08);
                    background: rgba(5,7,12,0.55);
                    backdrop-filter: blur(12px);
                    min-height: 320px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.45);
                    opacity: 0;
                    transform: translateY(42px) scale(0.97);
                    filter: blur(6px);
                    transition:
                        opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
                        transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
                        filter 700ms cubic-bezier(0.22, 1, 0.36, 1);
                }
                .bs-coming-soon.is-revealed {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                    filter: blur(0);
                }
                .bs-terminal-body {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 320px;
                    padding: 2rem;
                }
                .bs-terminal-line {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(2.4rem, 6vw, 4.6rem);
                    letter-spacing: 0.08em;
                    line-height: 1;
                    color: rgba(255,255,255,0.92);
                    text-align: center;
                }
                .bs-cursor {
                    animation: bs-blink 1s steps(1, end) infinite;
                }

                /* ─── MOBILE (< 768px) ────────────────────── */
                @media (max-width: 767px) {
                    .bs-section {
                        padding: 0 1rem 4rem;
                    }
                    .bs-header {
                        gap: 0.75rem;
                        margin-bottom: 1.5rem;
                        padding-bottom: 1.25rem;
                    }
                    .bs-rule { display: none; }
                    .bs-title { font-size: clamp(1.8rem, 8vw, 2.5rem); }
                    .bs-cta {
                        font-size: 0.5rem;
                        padding: 0.32rem 0.62rem;
                        letter-spacing: 0.12em;
                    }
                    .bs-coming-soon { min-height: 240px; border-radius: 12px; }
                    .bs-terminal-body { min-height: 240px; }
                    .bs-terminal-line { font-size: clamp(2rem, 10vw, 3rem); }
                }

                /* ─── SMALL MOBILE (< 480px) ──────────────── */
                @media (max-width: 479px) {
                    .bs-section { padding: 0 0.75rem 3rem; }
                    .bs-title { font-size: clamp(1.6rem, 9vw, 2.2rem); }
                    .bs-coming-soon { min-height: 200px; border-radius: 10px; }
                    .bs-terminal-body { min-height: 200px; }
                    .bs-terminal-line { font-size: clamp(1.8rem, 11vw, 2.6rem); }
                }
      `}</style>

      <section id="article" className="bs-section" ref={sectionRef}>
        <div className="bs-header">
          <h2 className={`bs-title${isVisible ? ' is-revealed' : ''}`}>BLOG</h2>
          <div className="bs-rule" />
          <a className="bs-cta" href="/articles" data-nav>VIEW ALL ARTICLES</a>
        </div>
        <div>
          <TerminalComingSoon isVisible={isVisible} />
        </div>
      </section>
    </>
  );
}
