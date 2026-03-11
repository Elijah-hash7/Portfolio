const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const HashNodeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor">
    <g fillRule="evenodd">
      <path d="M17.59 85.53C-5.86 108.99-5.86 147.01 17.59 170.46L85.53 238.41C108.99 261.86 147.01 261.86 170.47 238.41L238.41 170.46C261.86 147.01 261.86 108.99 238.41 85.53L170.47 17.59C147.01-5.86 108.99-5.86 85.53 17.59L17.59 85.53ZM157.72 157.73C174.14 141.31 174.14 114.69 157.72 98.27C141.31 81.86 114.69 81.86 98.27 98.27C81.86 114.69 81.86 141.31 98.27 157.73C114.69 174.14 141.31 174.14 157.73 157.73Z" />
    </g>
  </svg>
);
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Elijah-hash7', Icon: GithubIcon },
  { label: 'X', href: 'https://twitter.com/_elijahemmanuel', Icon: XIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/elijahemmanuel', Icon: LinkedInIcon },
  { label: 'Hashnode', href: 'https://hashnode.com/@elijah-hash', Icon: HashNodeIcon },
];

export default function Footer() {
  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Bebas+Neue&display=swap');
                *, *::before, *::after { box-sizing: border-box; }

                /* ─── FOOTER SHELL ────────────────────────── */
                .ft {
                    width: 100%;
                    padding: 3.5rem var(--page-gutter, 1.5rem) 1.5rem;
                    position: relative;
                    display: grid;
                    grid-template-columns: 1fr auto;
                    grid-template-areas:
                        "border  border"
                        "cta     socials"
                        "meta    socials";
                    column-gap: clamp(1.5rem, 4vw, 3rem);
                    row-gap: 0.45rem;
                    align-items: start;
                    border: 1px solid rgba(190,242,100,0.09);
                    border-radius: 26px;
                    background: rgba(4,7,12,0.28);
                    backdrop-filter: blur(12px);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
                    overflow: hidden;
                }

                /* ─── DECORATIVE TOP RULE ─────────────────── */
                .ft-border {
                    grid-area: border;
                    height: 1px;
                    background: linear-gradient(90deg, rgba(190,242,100,0.2), rgba(190,242,100,0.04) 50%, transparent);
                    margin-bottom: 0.5rem;
                }

                /* ─── CTA BLOCK ───────────────────────────── */
                .ft-cta {
                    grid-area: cta;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.65rem;
                    padding-top: 0.5rem;
                }
                .ft-eyebrow {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.6rem;
                    text-transform: uppercase;
                    letter-spacing: 0.22em;
                    color: rgba(190,242,100,0.5);
                }
                .ft-heading {
                    font-family: Georgia, serif;
                    font-size: clamp(1.8rem, 4vw, 3.2rem);
                    font-weight: 700;
                    color: #fff;
                    letter-spacing: -0.03em;
                    line-height: 1.1;
                    margin: 0;
                }
                .ft-heading span { color: #bef264; }
                .ft-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.55rem;
                    padding: 0.7rem 1.5rem;
                    border-radius: 9999px;
                    border: 1px solid rgba(190,242,100,0.25);
                    background: rgba(190,242,100,0.05);
                    color: #bef264;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.68rem;
                    text-transform: uppercase;
                    letter-spacing: 0.14em;
                    text-decoration: none;
                    cursor: pointer;
                    transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
                    margin-top: 0.25rem;
                }
                .ft-btn:hover {
                    background: rgba(190,242,100,0.1);
                    border-color: rgba(190,242,100,0.45);
                    box-shadow: 0 0 24px rgba(190,242,100,0.08);
                }
                .ft-arr { transition: transform 0.2s ease; }
                .ft-btn:hover .ft-arr { transform: translateX(4px); }

                /* ─── META / COPYRIGHT ────────────────────── */
                .ft-meta {
                    grid-area: meta;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    flex-wrap: wrap;
                    align-self: end;
                    margin-top: -0.25rem;
                    padding-bottom: 0;
                }
                .ft-copy {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.58rem;
                    text-transform: uppercase;
                    letter-spacing: 0.14em;
                    color: rgba(255,255,255,0.22);
                }

                /* ─── SOCIALS COLUMN ──────────────────────── */
                .ft-socials-wrap {
                    grid-area: socials;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    gap: 0.7rem;
                    padding-top: 0.5rem;
                    height: auto;
                    justify-self: end;
                }
                .ft-slabel {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.64rem;
                    text-transform: uppercase;
                    letter-spacing: 0.18em;
                    color: rgba(239,255,244,0.42);
                    text-shadow: 0 0 14px rgba(190,242,100,0.08);
                }
                .ft-socials {
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                }
                .ft-slink {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 48px;
                    height: 48px;
                    border-radius: 11px;
                    border: 1px solid rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.46);
                    text-decoration: none;
                    background: rgba(255,255,255,0.03);
                    transition: all 0.2s ease;
                }
                .ft-slink:hover {
                    border-color: rgba(190,242,100,0.3);
                    color: #bef264;
                    background: rgba(190,242,100,0.07);
                    transform: translateX(-2px);
                    box-shadow: 0 0 18px rgba(190,242,100,0.09);
                }

                /* ─── TABLET (< 900px) ────────────────────── */
                @media (max-width: 899px) {
                    .ft {
                        grid-template-columns: 1fr auto;
                        border-radius: 20px;
                    }
                    .ft-heading { font-size: clamp(1.6rem, 5vw, 2.6rem); }
                }

                /* ─── MOBILE (< 640px) ────────────────────── */
                @media (max-width: 639px) {
                    .ft {
                        grid-template-columns: 1fr auto;
                        grid-template-areas:
                            "border  border"
                            "cta     socials"
                            "meta    socials"
                        row-gap: 1.15rem;
                        padding: 1.15rem 1rem 2.35rem;
                        border-radius: 14px;
                    }
                    .ft-cta {
                        padding-top: 0;
                        gap: 0.95rem;
                    }
                    .ft-eyebrow { font-size: 0.56rem; }
                    .ft-heading { font-size: clamp(1.45rem, 7vw, 2rem); }
                    .ft-socials-wrap {
                        flex-direction: column;
                        align-items: flex-start;
                        justify-self: end;
                        padding-top: 0;
                        gap: 0.7rem;
                    }
                    .ft-socials {
                        flex-direction: column;
                        gap: 0.6rem;
                    }
                    .ft-slink {
                        width: 42px;
                        height: 42px;
                        border-radius: 10px;
                    }
                    .ft-slink:hover { transform: translateY(-2px); }
                    .ft-btn {
                        padding: 0.62rem 1.15rem;
                        font-size: 0.62rem;
                    }
                    .ft-meta {
                        position: static;
                        left: auto;
                        bottom: auto;
                        padding-bottom: 0;
                    }
                }

                /* ─── SMALL MOBILE (< 400px) ──────────────── */
                @media (max-width: 399px) {
                    .ft { padding: 1.05rem 0.9rem 2.15rem; border-radius: 13px; }
                    .ft-cta { gap: 0.85rem; }
                    .ft-heading { font-size: clamp(1.32rem, 8vw, 1.8rem); }
                    .ft-slink { width: 38px; height: 38px; border-radius: 9px; }
                    .ft-btn { padding: 0.58rem 0.95rem; font-size: 0.58rem; }
                    .ft-meta { left: auto; bottom: auto; }
                }
            `}</style>

      <footer className="ft">
        <div className="ft-border" />

        {/* CTA */}
        <div className="ft-cta">
          <span className="ft-eyebrow">Open to opportunities</span>
          <h2 className="ft-heading">
            Got a project?<br /><span>Let's build it.</span>
          </h2>
          <a href="mailto:josephelijah357@gmail.com" className="ft-btn">
            Send a message
            <svg className="ft-arr" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="ft-meta">
          <span className="ft-copy">2026 © Elijah Emmanuel</span>
        </div>

        {/* Socials */}
        <div className="ft-socials-wrap">
          <span className="ft-slabel">Find me</span>
          <div className="ft-socials">
            {SOCIALS.map(({ label, href, Icon }, i) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="ft-slink"
                title={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
