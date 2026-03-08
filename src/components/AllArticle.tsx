'use client';

import { useState } from 'react';

// ── TYPES ──────────────────────────────────────────────────────────────────
interface Article {
  id: string;
  title: string;
  excerpt: string;
  body: string; // teaser of full content
  date: string;
  readTime: number;
  tags: string[];
  href: string;
}

// ── DATA — swap with MDX / CMS ────────────────────────────────────────────
const articles: Article[] = [
  {
    id: 'ART_001',
    title: 'Building a Zero Trust Private Cloud From Scratch',
    excerpt: 'Most teams bolt security on after the fact. Here\'s how I designed a self-hosted cloud where distrust is the default.',
    body: 'When your infrastructure runs on someone else\'s machine, you\'re inheriting someone else\'s threat model. I wanted something different — a system where every service assumes every other service is hostile until proven otherwise. That meant Authelia for SSO, Cloudflare WAF at the edge, and Nginx Proxy Manager as the last line before traffic reaches anything real...',
    date: '18 Feb 2026',
    readTime: 9,
    tags: ['Infrastructure', 'Security', 'Self-Hosting'],
    href: '#',
  },
  {
    id: 'ART_002',
    title: 'Why I Replaced RabbitMQ With Redis Streams',
    excerpt: 'Redis Streams does more than most people realise. A deep dive into the architecture shift that stopped our 3am alerts.',
    body: 'RabbitMQ is powerful, but it\'s also operationally heavy. Managing queues, exchanges, bindings, vhosts — it adds up. When we started hitting scaling issues and the dead-letter handling became fragile, I started evaluating alternatives. Redis Streams emerged as the clear winner for our workload — not because it\'s new, but because it fits...',
    date: '30 Jan 2026',
    readTime: 7,
    tags: ['Redis', 'Node.js', 'Architecture'],
    href: '#',
  },
  {
    id: 'ART_003',
    title: 'The Case for Boring API Design',
    excerpt: 'REST is not dead. GraphQL is not always the answer. A defence of predictability, idempotency, and clean versioning.',
    body: 'Every few years the industry collectively decides that the way we\'ve been building APIs is wrong, and something new will save us. SOAP, REST, GraphQL, tRPC, gRPC — the carousel keeps spinning. Meanwhile, the APIs that cause the least production incidents are the ones that are boringly predictable. Versioned, documented, idempotent where it matters...',
    date: '12 Jan 2026',
    readTime: 6,
    tags: ['API Design', 'Backend', 'Engineering'],
    href: '#',
  },
  {
    id: 'ART_004',
    title: 'Debugging Kubernetes: A Field Guide',
    excerpt: 'CrashLoopBackOff, OOMKilled, Pending — systematic approaches that surface root causes, not symptoms.',
    body: 'The first time you see CrashLoopBackOff you Google it. The second time you try kubectl describe. By the tenth time you\'ve built a mental model of what Kubernetes is actually trying to tell you. This is that mental model, written down. Starting from pod states, working through resource constraints, image issues, config errors, and networking...',
    date: '28 Dec 2025',
    readTime: 11,
    tags: ['Kubernetes', 'DevOps', 'Debugging'],
    href: '#',
  },
];

const ALL_TAGS = ['All', ...Array.from(new Set(articles.flatMap(a => a.tags)))];

// ── ICONS ─────────────────────────────────────────────────────────────────
const ArrowIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ── ARTICLE ROW ───────────────────────────────────────────────────────────
function ArticleRow({ article, index }: { article: Article; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="aa-row"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {/* Left — meta */}
      <div className="aa-meta">
        <span className="aa-read-time">{article.readTime} min read</span>
        <span className="aa-date">{article.date}</span>
        <span className="aa-id">{article.id}</span>
      </div>

      {/* Center — content */}
      <div className="aa-content">
        <h3 className="aa-title">{article.title}</h3>
        <p className="aa-excerpt">{article.excerpt}</p>

        {/* Expandable teaser */}
        {expanded && (
          <div className="aa-body">
            <div className="aa-body-divider" />
            <p>{article.body}</p>
            <a href={article.href} className="aa-full-link">
              Read full article
              <ArrowIcon style={{ width: 12, height: 12 }} />
            </a>
          </div>
        )}

        {/* Tags */}
        <div className="aa-tags">
          {article.tags.map(tag => (
            <span key={tag} className="aa-tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Right — action */}
      <div className="aa-actions">
        <button
          className="aa-expand-btn"
          onClick={() => setExpanded(e => !e)}
          title={expanded ? 'Collapse' : 'Preview'}
        >
          {expanded ? '−' : '+'}
        </button>
        <a href={article.href} className="aa-read-btn">
          Read
          <ArrowIcon style={{ width: 11, height: 11 }} />
        </a>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────
export default function AllArticles() {
  const [activeTag, setActiveTag] = useState('All');

  const filtered = activeTag === 'All'
    ? articles
    : articles.filter(a => a.tags.includes(activeTag));

  return (
    <>
      <style>{`
/* ── PAGE ──────────────────────────── */
.aa-page {
  min-height: 100vh;
  background: #04070c;
  padding: 4rem 1.5rem 8rem;
  position: relative;
}
.aa-page::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(190,242,100,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(190,242,100,0.018) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
  z-index: 0;
}
.aa-inner {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* ── HEADER ─────────────────────────── */
.aa-header { margin-bottom: 3rem; }
.aa-back {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #2d4030;
  text-decoration: none;
  margin-bottom: 2rem;
  transition: color 0.2s ease;
}
.aa-back:hover { color: #bef264; }
.aa-page-title {
  font-family: 'Courier New', Courier, monospace;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700;
  color: #e5e7eb;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1;
  margin-bottom: 0.75rem;
}
.aa-page-sub {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.72rem;
  color: #2d4030;
  letter-spacing: 0.08em;
}

/* ── TAG FILTERS ─────────────────────── */
.aa-filters {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(190,242,100,0.06);
}
.aa-filter {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.58rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 0.35rem 0.8rem;
  border-radius: 9999px;
  border: 1px solid rgba(190,242,100,0.08);
  background: transparent;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}
.aa-filter:hover { color: #bef264; border-color: rgba(190,242,100,0.25); }
.aa-filter.active {
  background: rgba(190,242,100,0.07);
  border-color: rgba(190,242,100,0.25);
  color: #bef264;
}

/* ── ARTICLE ROWS ────────────────────── */
.aa-list { display: flex; flex-direction: column; }

.aa-row {
  display: grid;
  grid-template-columns: 110px 1fr 90px;
  gap: 2rem;
  padding: 1.75rem 0.5rem;
  border-bottom: 1px solid rgba(190,242,100,0.05);
  position: relative;
  animation: aa-fade-up 0.45s ease both;
  transition: background 0.2s ease;
}
.aa-row:hover { background: rgba(190,242,100,0.015); }

/* lime left accent on hover */
.aa-row::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: #bef264;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.3s ease;
  border-radius: 2px;
}
.aa-row:hover::before { transform: scaleY(1); }

/* ── LEFT COL ────────────────────────── */
.aa-meta {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-top: 0.1rem;
}
.aa-read-time {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #4b5563;
  transition: color 0.25s ease;
}
.aa-row:hover .aa-read-time { color: #bef264; }
.aa-date {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.58rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #1e3320;
}
.aa-id {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  color: #1a2e1b;
  margin-top: 0.25rem;
}

/* ── CENTER COL ──────────────────────── */
.aa-content { display: flex; flex-direction: column; gap: 0.6rem; }
.aa-title {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: clamp(0.95rem, 1.8vw, 1.15rem);
  font-weight: 600;
  color: #d1d5db;
  line-height: 1.35;
  letter-spacing: -0.01em;
  margin: 0;
  transition: color 0.25s ease;
}
.aa-row:hover .aa-title { color: #f9fafb; }
.aa-excerpt {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.7rem;
  line-height: 1.75;
  color: #2d4030;
  font-style: italic;
  transition: color 0.25s ease;
}
.aa-row:hover .aa-excerpt { color: #374151; }

/* expandable body */
.aa-body {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.7rem;
  line-height: 1.85;
  color: #374151;
  margin-top: 0.25rem;
}
.aa-body-divider {
  height: 1px;
  background: rgba(190,242,100,0.07);
  margin-bottom: 0.75rem;
}
.aa-full-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #bef264;
  text-decoration: none;
  margin-top: 0.75rem;
  transition: gap 0.2s ease;
}
.aa-full-link:hover { gap: 0.6rem; }

.aa-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.25rem; }
.aa-tag {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #374151;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  border: 1px solid rgba(190,242,100,0.07);
  background: rgba(190,242,100,0.02);
}

/* ── RIGHT COL ───────────────────────── */
.aa-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 0.5rem;
  padding-top: 0.1rem;
}
.aa-expand-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(190,242,100,0.1);
  background: transparent;
  color: #4b5563;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  line-height: 1;
}
.aa-expand-btn:hover { border-color: rgba(190,242,100,0.3); color: #bef264; }
.aa-read-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.58rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #2d4030;
  text-decoration: none;
  transition: color 0.2s ease;
  white-space: nowrap;
}
.aa-read-btn:hover { color: #bef264; }
.aa-read-btn svg { transition: transform 0.2s ease; }
.aa-read-btn:hover svg { transform: translateX(3px); }

/* ── RESPONSIVE ──────────────────────── */
@media (max-width: 600px) {
  .aa-row { grid-template-columns: 80px 1fr; }
  .aa-actions { flex-direction: row; grid-column: 2; }
}

@keyframes aa-fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

* { box-sizing: border-box; }
      `}</style>

      <div className="aa-page">
        <div className="aa-inner">

          {/* Header */}
          <div className="aa-header">
            <a href="/" className="aa-back">
              <ArrowIcon style={{ width: 12, height: 12, transform: 'rotate(180deg)' }} />
              Back to home
            </a>
            <h1 className="aa-page-title">WRITE_LOG</h1>
            <p className="aa-page-sub">
              {articles.length} entries · Engineering notes, breakdowns, and opinions
            </p>
          </div>

          {/* Tag filters */}
          <div className="aa-filters">
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                className={`aa-filter${activeTag === tag ? ' active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Article list */}
          <div className="aa-list">
            {filtered.map((article, i) => (
              <ArticleRow key={article.id} article={article} index={i} />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}