'use client';

// ── ICONS ──────────────────────────────────────────────────────────────────

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const HashNodeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor">
    <g fillRule="evenodd">
      <path d="M17.59 85.53C-5.86 108.99-5.86 147.01 17.59 170.46L85.53 238.41C108.99 261.86 147.01 261.86 170.47 238.41L238.41 170.46C261.86 147.01 261.86 108.99 238.41 85.53L170.47 17.59C147.01-5.86 108.99-5.86 85.53 17.59L17.59 85.53ZM157.72 157.73C174.14 141.31 174.14 114.69 157.72 98.27C141.31 81.86 114.69 81.86 98.27 98.27C81.86 114.69 81.86 141.31 98.27 157.73C114.69 174.14 141.31 174.14 157.73 157.73L157.72 157.73Z" />
    </g>
  </svg>
);

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// ── DATA ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#article' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Elijah-hash7', icon: GithubIcon },
  { label: 'X', href: 'https://twitter.com/_elijahemmanuel', icon: XIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/elijahemmanuel', icon: LinkedInIcon },
  { label: 'Hashnode', href: 'https://hashnode.com/@elijah-hash', icon: HashNodeIcon },
];

// ── COMPONENT ──────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
.footer {
  width: 100%;
  padding: 0 var(--page-gutter) 2.5rem;
  position: relative;
}

.footer-inner {
  width: 100%;
  margin: 0 auto;
  border-top: 1px solid rgba(190,242,100,0.06);
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.20rem;
}

/* top row — name + nav */
.footer-top {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.footer-name {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255,255,255,0.88);
  letter-spacing: -0.01em;
  text-decoration: none;
  transition: color 0.2s ease;
}
.footer-name:hover { color: #ffffff; }

.footer-nav {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  flex-wrap: wrap;
}
.footer-nav-link {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(255,255,255,0.62);
  text-decoration: none;
  transition: color 0.2s ease;
}
.footer-nav-link:hover { color: rgba(255,255,255,0.9); }

/* bottom row — copyright + tagline + socials */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.footer-copyright {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.70rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255,255,255,0.56);
}

.footer-tagline {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.48);
  letter-spacing: 0.06em;
  font-style: italic;
}

/* socials */
.footer-socials {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.62);
  text-decoration: none;
  transition: all 0.2s ease;
  background: rgba(255,255,255,0.02);
}
.footer-social-link:hover {
  border-color: rgba(255,255,255,0.28);
  color: #ffffff;
  background: rgba(255,255,255,0.06);
}

/* status dot */
.footer-status {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255,255,255,0.5);
}
.footer-status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #bef264;
  box-shadow: 0 0 6px rgba(190,242,100,0.6);
  animation: footer-pulse 2.5s ease-in-out infinite;
}
@keyframes footer-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
}

@media (max-width: 540px) {
  .footer-top, .footer-bottom { flex-direction: column; align-items: flex-start; }
}

* { box-sizing: border-box; }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">

          {/* Top — name + nav */}
          <div className="footer-top">
            <a href="/" className="footer-name">Elijah Emmanuel</a>
          </div>

          {/* Bottom — copyright + socials */}
          <div className="footer-bottom">
            <div className="footer-left">
              <span className="footer-copyright">
                © {year} Elijah Emmanuel. All rights reserved.
              </span>
              <span className="footer-tagline">
                If it works, don't touch it. If it doesn't, coffee first.
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div className="footer-socials">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="footer-social-link" title={label}>
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
