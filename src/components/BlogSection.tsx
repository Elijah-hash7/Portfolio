'use client';

// ── ARROW ICON ────────────────────────────────────────────────────────────
const ArrowIcon = ({ style }: { style?: React.CSSProperties }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

// ── TERMINAL COMING SOON ──────────────────────────────────────────────────
const TERMINAL_MESSAGE = 'COMING SOON';

function TerminalComingSoon() {
    return (
        <div className="article-coming-soon">
            <div className="terminal-body">
                <div className="terminal-line" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    {TERMINAL_MESSAGE}
                    <span className="terminal-cursor" style={{ color: 'rgba(255,255,255,0.92)' }}>_</span>
                </div>
            </div>
        </div>
    );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function BlogSection() {
    return (
        <>
            <style>{`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.blog-section {
  width: 100%;
  padding: 0 var(--page-gutter) 6rem;
}

.blog-inner {
  width: 100%;
  margin: 0 auto;
}

/* header */
.blog-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 1.25rem;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid rgba(190,242,100,0.06);
}
.blog-section-title {
  font-family: 'Courier New', Courier, monospace;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  color: #e5e7eb;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1;
}
.blog-view-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.1rem;
  border-radius: 9999px;
  border: 1px solid rgba(190,242,100,0.15);
  background: rgba(4,7,12,0.85);
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.25s ease;
  white-space: nowrap;
  backdrop-filter: blur(8px);
  cursor: not-allowed;
  opacity: 0.6;
}
.blog-view-btn:hover {
  border-color: rgba(255,255,255,0.2);
  color: #6b7280;
  box-shadow: none;
}
.blog-view-btn svg { transition: transform 0.25s ease; }
.blog-view-btn:hover svg { transform: none; }

/* article placeholder */
.article-coming-soon {
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(5,7,12,0.55);
  backdrop-filter: blur(12px);
  min-height: 320px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.45);
}
.terminal-body {
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
}
.terminal-line {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.4rem, 5vw, 4.6rem);
  font-weight: 400;
  letter-spacing: 0.08em;
  line-height: 1;
  transition: opacity 0.4s ease, transform 0.4s ease;
  text-transform: uppercase;
  text-align: center;
  text-shadow: none;
  max-width: 14ch;
}
.terminal-cursor {
  animation: terminal-blink 1s steps(1, end) infinite;
}
@keyframes terminal-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

* { box-sizing: border-box; }
      `}</style>

            <section id="article" className="blog-section">
                <div className="blog-inner">
                    <div className="blog-header">
                        <h2 style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            letterSpacing: '0.06em',
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: 1,
                        }}>
                            ARTICLE
                        </h2>
                        <div style={{
                            flex: 1,
                            height: 1,
                            background: 'rgba(255,255,255,0.07)',
                        }} />
                        <a
                            href="/articles"
                            className="nav-link"
                            data-nav
                            style={{
                                fontFamily: "'Geist Mono', 'Space Mono', monospace",
                                fontSize: '0.62rem',
                                letterSpacing: '0.14em',
                                color: 'rgba(255,255,255,0.78)',
                                textDecoration: 'none',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: 999,
                                padding: '0.48rem 0.9rem',
                                lineHeight: 1,
                                whiteSpace: 'nowrap',
                                background: 'rgba(255,255,255,0.03)',
                                cursor: 'pointer',
                            }}
                        >
                            VIEW ALL ARTICLES
                        </a>
                    </div>
                    <TerminalComingSoon />
                </div>
            </section>
        </>
    );
}
