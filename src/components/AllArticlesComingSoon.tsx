'use client';

export default function AllArticlesComingSoon() {
  return (
    <>
      <style>{`
        .aa-cs-page {
          min-height: 100vh;
          padding: 4rem var(--page-gutter) 8rem;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: transparent;
        }
        .aa-cs-back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'Geist Mono', 'Courier New', monospace;
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.25);
          text-decoration: none;
          margin-bottom: 3rem;
          transition: color 0.2s ease;
        }
        .aa-cs-back:hover { color: rgba(255,255,255,0.7); }
        .aa-cs-title {
          font-family: 'Bebas Neue', 'Impact', sans-serif;
          font-size: clamp(3rem, 8vw, 5rem);
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.92);
          line-height: 1;
          margin-bottom: 1rem;
        }
        .aa-cs-msg {
          font-family: 'Geist Mono', 'Courier New', monospace;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.4);
        }
      `}</style>
      <div className="aa-cs-page">
        <a href="/" className="aa-cs-back">← Back to home</a>
        <h1 className="aa-cs-title">ARTICLE_LOG</h1>
        <p className="aa-cs-msg">Coming soon</p>
      </div>
    </>
  );
}
