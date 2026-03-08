'use client';

import { useState } from 'react';
import { PROJECTS_DATA, type ProjectData } from './projectsData';

// ── TYPES ──────────────────────────────────────────────────────────────────
const ALL_FILTERS = ['All', 'ACTIVE', 'COMPLETED', 'ARCHIVED'];
const VISIBLE_TAGS = 3;

// ── ICONS ──────────────────────────────────────────────────────────────────

const ArrowIcon = ({ size = 12, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const GithubIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CheckIcon = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChevronDownIcon = ({ size = 10, open }: { size?: number; open: boolean }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

// ── STATUS CONFIG ──────────────────────────────────────────────────────────
const STATUS_STYLES: Record<ProjectData['status'], { bg: string; color: string }> = {
  ACTIVE:    { bg: 'rgba(74,222,128,0.12)',  color: '#4ade80' },
  COMPLETED: { bg: 'rgba(251,191,36,0.12)',  color: '#fbbf24' },
  ARCHIVED:  { bg: 'rgba(148,163,184,0.10)', color: '#94a3b8' },
};

// ── PROJECT CARD ───────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const [hovered,      setHovered]   = useState(false);
  const [tagsOpen,     setTagsOpen]  = useState(false);
  const [ghHovered,    setGHovered]  = useState(false);
  const [linkHovered,  setLHovered]  = useState(false);

  const s     = STATUS_STYLES[project.status];
  const extra = project.tags.length - VISIBLE_TAGS;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered ? 'rgba(255,255,255,0.025)' : 'rgba(5,7,12,0.7)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 8,
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? '0 8px 40px rgba(0,0,0,0.5)' : 'none',
        animationDelay: `${index * 80}ms`,
      }}
      className="ap-card"
    >
      {/* grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
      }} />

      {/* top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: hovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.06)',
        transition: 'background 0.3s ease',
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '1.75rem 2rem' }}>

        {/* TOP ROW — year + status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <p style={{
              fontFamily: "'Geist Mono', 'Courier New', monospace",
              fontSize: '0.55rem', letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.25)', marginBottom: 4, textTransform: 'uppercase',
            }}>
              Year
            </p>
            <p style={{
              fontFamily: "'Geist Mono', 'Courier New', monospace",
              fontSize: '0.72rem', letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.5)',
            }}>
              {project.year}
            </p>
          </div>
          <span style={{
            fontFamily: "'Geist Mono', 'Courier New', monospace",
            fontSize: '0.6rem', letterSpacing: '0.15em',
            padding: '3px 10px',
            border: `1px solid ${s.color}`,
            color: s.color, background: s.bg, borderRadius: 2,
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
          }}>
            {project.status === 'ACTIVE' && (
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: s.color, display: 'inline-block',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }} />
            )}
            {project.status}
          </span>
        </div>

        {/* DIVIDER */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: '1.5rem' }} />

        {/* BODY — title/desc left, highlights right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginBottom: '1.5rem' }}>

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              lineHeight: 1.05, letterSpacing: '0.02em',
              color: hovered ? '#ffffff' : 'rgba(255,255,255,0.88)',
              transition: 'color 0.3s ease', margin: 0,
            }}>
              {project.title}
            </h2>

            {/* left accent + short desc */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ width: 2, background: 'rgba(255,255,255,0.1)', borderRadius: 1, flexShrink: 0 }} />
              <p style={{
                fontFamily: "'Geist Mono', 'Courier New', monospace",
                fontSize: '0.75rem', lineHeight: 1.75,
                color: 'rgba(255,255,255,0.4)', fontStyle: 'italic',
              }}>
                {project.description}
              </p>
            </div>

            {/* long desc */}
            <p style={{
              fontFamily: "'Geist Mono', 'Courier New', monospace",
              fontSize: '0.72rem', lineHeight: 1.8,
              color: 'rgba(255,255,255,0.25)',
              paddingLeft: '0.75rem',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
            }}>
              {project.longDescription}
            </p>
          </div>

          {/* RIGHT — highlights */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.9rem' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
                <rect x="7" y="7" width="10" height="10" rx="1" />
                <path d="M12 2v5M12 17v5M2 12h5M17 12h5" />
              </svg>
              <span style={{
                fontFamily: "'Geist Mono', 'Courier New', monospace",
                fontSize: '0.55rem', letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase',
              }}>
                Core Highlights
              </span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {project.highlights.map((h, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckIcon size={11} />
                  <span style={{
                    fontFamily: "'Geist Mono', 'Courier New', monospace",
                    fontSize: '0.7rem', lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.4)',
                  }}>
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FOOTER — stack + links */}
        <div style={{
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap',
        }}>

          {/* Stack tags */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginRight: '0.25rem' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
                <rect x="7" y="7" width="10" height="10" rx="1" />
                <path d="M12 2v5M12 17v5M2 12h5M17 12h5" />
              </svg>
              <span style={{
                fontFamily: "'Geist Mono', 'Courier New', monospace",
                fontSize: '0.52rem', letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase',
              }}>
                Stack
              </span>
            </div>

            {(tagsOpen ? project.tags : project.tags.slice(0, VISIBLE_TAGS)).map(tag => (
              <span key={tag} style={{
                fontFamily: "'Geist Mono', 'Courier New', monospace",
                fontSize: '0.55rem', letterSpacing: '0.12em',
                padding: '4px 10px',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.4)',
                borderRadius: 2, whiteSpace: 'nowrap',
              }}>
                {tag}
              </span>
            ))}

            {/* +N expand */}
            {extra > 0 && !tagsOpen && (
              <button
                onClick={() => setTagsOpen(true)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  fontFamily: "'Geist Mono', 'Courier New', monospace",
                  fontSize: '0.55rem', letterSpacing: '0.12em',
                  padding: '4px 10px',
                  border: '1px solid rgba(190,242,100,0.25)',
                  color: '#bef264', background: 'rgba(190,242,100,0.06)',
                  borderRadius: 2, cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(190,242,100,0.12)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(190,242,100,0.45)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(190,242,100,0.06)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(190,242,100,0.25)';
                }}
              >
                +{extra} more <ChevronDownIcon open={false} />
              </button>
            )}

            {tagsOpen && (
              <button
                onClick={() => setTagsOpen(false)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  fontFamily: "'Geist Mono', 'Courier New', monospace",
                  fontSize: '0.55rem', letterSpacing: '0.12em',
                  padding: '4px 10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.3)', background: 'transparent',
                  borderRadius: 2, cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                collapse <ChevronDownIcon open={true} />
              </button>
            )}
          </div>

          {/* Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {project.github && (
              <a
                href={project.github} target="_blank" rel="noopener noreferrer"
                onMouseEnter={() => setGHovered(true)}
                onMouseLeave={() => setGHovered(false)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                  fontFamily: "'Geist Mono', 'Courier New', monospace",
                  fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: ghHovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.28)',
                  textDecoration: 'none', transition: 'color 0.25s ease',
                }}
              >
                <GithubIcon size={13} /> Source
              </a>
            )}

            {project.link ? (
              <a
                href={project.link} target="_blank" rel="noopener noreferrer"
                onMouseEnter={() => setLHovered(true)}
                onMouseLeave={() => setLHovered(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  fontFamily: "'Geist Mono', 'Courier New', monospace",
                  fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: linkHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.28)',
                  textDecoration: 'none', transition: 'color 0.3s ease',
                }}
              >
                Open_Live
                <ArrowIcon size={12} style={{ transform: linkHovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.3s ease' }} />
              </a>
            ) : (
              <span style={{
                fontFamily: "'Geist Mono', 'Courier New', monospace",
                fontSize: '0.6rem', letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.12)', textTransform: 'uppercase',
              }}>
                No_Live_Demo
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ───────────────────────────────────────────────────────────────────
export default function AllProjects() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.status === filter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@400;500&display=swap');

        .ap-page {
          min-height: 100vh;
          background: transparent;
          padding: 4rem var(--page-gutter) 8rem;
          position: relative;
        }
        .ap-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 0;
        }
        .ap-inner {
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .ap-back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'Geist Mono', 'Courier New', monospace;
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.25);
          text-decoration: none;
          margin-bottom: 2.5rem;
          display: block;
          transition: color 0.2s ease;
        }
        .ap-back:hover { color: rgba(255,255,255,0.7); }
        .ap-page-title {
          font-family: 'Bebas Neue', 'Impact', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.92);
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .ap-page-sub {
          font-family: 'Geist Mono', 'Courier New', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.25);
          margin-bottom: 2.5rem;
        }
        .ap-filters {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ap-filter-btn {
          font-family: 'Geist Mono', 'Courier New', monospace;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent;
          color: rgba(255,255,255,0.3);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ap-filter-btn:hover {
          color: rgba(255,255,255,0.8);
          border-color: rgba(255,255,255,0.3);
        }
        .ap-filter-btn.active {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.85);
        }
        .ap-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .ap-card {
          animation: ap-fade-up 0.45s ease both;
        }
        @keyframes ap-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 640px) {
          .ap-card > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
        * { box-sizing: border-box; }
      `}</style>

      <div className="ap-page">
        <div className="ap-inner">

          {/* Header */}
          <a href="/" className="ap-back">← Back to home</a>
          <h1 className="ap-page-title">PROJECT_LOG</h1>
          <p className="ap-page-sub">{PROJECTS_DATA.length} entries · Systems built, shipped, and maintained</p>

          {/* Filters */}
          <div className="ap-filters">
            {ALL_FILTERS.map(f => (
              <button
                key={f}
                className={`ap-filter-btn${filter === f ? ' active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'All'
                  ? `All (${PROJECTS_DATA.length})`
                  : `${f} (${PROJECTS_DATA.filter(p => p.status === f).length})`}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="ap-list">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
