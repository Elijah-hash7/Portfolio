'use client';

import { useEffect, useState } from 'react';

export default function AllArticlesComingSoon() {
  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@400;500&display=swap');

                @keyframes aa-blink {
                    0%, 49% { opacity: 1; }
                    50%, 100% { opacity: 0; }
                }

                @keyframes aa-rise-in {
                    from {
                        opacity: 0;
                        transform: translateY(22px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* ─── PAGE ────────────────────────────────── */
                .aa-page {
                    min-height: 100vh;
                    padding: 4rem var(--page-gutter, 1.5rem) 8rem;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: transparent;
                }

                /* ─── BACK LINK ───────────────────────────── */
                .aa-back {
                    position: absolute;
                    top: 2rem;
                    left: var(--page-gutter, 1.5rem);
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-family: 'Geist Mono', 'Courier New', monospace;
                    font-size: 0.62rem;
                    text-transform: uppercase;
                    letter-spacing: 0.16em;
                    color: rgba(255,255,255,0.25);
                    text-decoration: none;
                    transition: color 0.2s ease;
                    z-index: 2;
                }
                .aa-back:hover { color: rgba(255,255,255,0.7); }

                /* ─── CONTENT ─────────────────────────────── */
                .aa-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                    text-align: center;
                    animation: aa-rise-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
                }
                .aa-eyebrow {
                    font-family: 'Geist Mono', 'Courier New', monospace;
                    font-size: 0.6rem;
                    text-transform: uppercase;
                    letter-spacing: 0.22em;
                    color: rgba(190,242,100,0.4);
                }
                .aa-title {
                    font-family: 'Bebas Neue', 'Impact', sans-serif;
                    font-size: clamp(3rem, 8vw, 5rem);
                    letter-spacing: 0.06em;
                    color: rgba(255,255,255,0.92);
                    line-height: 1;
                    margin: 0;
                }
                .aa-cursor {
                    animation: aa-blink 1s steps(1, end) infinite;
                    color: #bef264;
                }
                .aa-msg {
                    font-family: 'Geist Mono', 'Courier New', monospace;
                    font-size: 0.75rem;
                    letter-spacing: 0.12em;
                    color: rgba(255,255,255,0.3);
                    line-height: 1.7;
                    max-width: 38ch;
                }

                /* ─── MOBILE (< 768px) ────────────────────── */
                @media (max-width: 767px) {
                    .aa-page { padding: 3rem 1rem 6rem; }
                    .aa-back { top: 1.25rem; left: 1rem; }
                    .aa-title { font-size: clamp(2.4rem, 12vw, 3.5rem); }
                    .aa-msg { font-size: 0.72rem; }
                }

                /* ─── SMALL MOBILE (< 480px) ──────────────── */
                @media (max-width: 479px) {
                    .aa-page { padding: 2.5rem 0.75rem 5rem; }
                    .aa-back { left: 0.75rem; }
                    .aa-title { font-size: clamp(2rem, 13vw, 3rem); }
                }
            `}</style>

      <div className="aa-page">
        <a href="/" className="aa-back">← Back to home</a>
        <div className="aa-content">
          <span className="aa-eyebrow">Writing in progress</span>
          <h1 className="aa-title">
            ARTICLE_LOG<span className="aa-cursor">_</span>
          </h1>
          <p className="aa-msg">
            Articles, breakdowns, and technical write-ups are coming.<br />
            Check back soon.
          </p>
        </div>
      </div>
    </>
  );
}
