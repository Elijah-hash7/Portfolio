// src/components/ProjectSection.tsx
'use client';

import { useState } from 'react';
import { PROJECTS_DATA } from './projectsData';

// ────────────────────────────────────────────────────────────────────────────
// 👇 PICK WHICH PROJECTS SHOW ON THE HOMEPAGE — change these indices
//    0 = first project in projectsData, 1 = second, 2 = third, etc.
//    Example: [0, 2, 3] shows projects 1, 3 and 4 from your data file
// ────────────────────────────────────────────────────────────────────────────
const FEATURED_INDICES = [0, 1, 3];

const PROJECTS = FEATURED_INDICES.map(i => PROJECTS_DATA[i]).filter(Boolean);

// ── Icons ──────────────────────────────────────────────────────────────────

const GithubIcon = ({ size = 13 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const ArrowIcon = ({ size = 12, hovered }: { size?: number; hovered?: boolean }) => (
    <svg
        width={size} height={size}
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.3s ease' }}
    >
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

const ChevronDownIcon = ({ size = 10, open }: { size?: number; open: boolean }) => (
    <svg
        width={size} height={size}
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
    >
        <path d="M6 9l6 6 6-6" />
    </svg>
);

// ── Status badge ───────────────────────────────────────────────────────────

type Status = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';

const STATUS_STYLES: Record<Status, { bg: string; color: string }> = {
    ACTIVE:    { bg: 'rgba(74,222,128,0.12)',  color: '#4ade80' },
    COMPLETED: { bg: 'rgba(251,191,36,0.12)',  color: '#fbbf24' },
    ARCHIVED:  { bg: 'rgba(148,163,184,0.10)', color: '#94a3b8' },
};

const TITLE_ROW_MIN_HEIGHT = '5.5rem';
const DESCRIPTION_ROW_MIN_HEIGHT = '8rem';

function StatusBadge({ status }: { status: Status }) {
    const s = STATUS_STYLES[status];
    return (
        <span style={{
            fontFamily: "'Geist Mono', 'Courier New', monospace",
            fontSize: '0.6rem', letterSpacing: '0.15em',
            padding: '3px 10px',
            border: `1px solid ${s.color}`,
            color: s.color, background: s.bg, borderRadius: 2,
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
        }}>
            {status === 'ACTIVE' && (
                <span style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: s.color, display: 'inline-block',
                    animation: 'ps-pulse 2s ease-in-out infinite',
                }} />
            )}
            {status}
        </span>
    );
}

// ── Tag chip ───────────────────────────────────────────────────────────────

function Tag({ label }: { label: string }) {
    return (
        <span style={{
            fontFamily: "'Geist Mono', 'Courier New', monospace",
            fontSize: '0.55rem', letterSpacing: '0.12em',
            padding: '4px 10px',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.45)',
            borderRadius: 2, whiteSpace: 'nowrap',
        }}>
            {label}
        </span>
    );
}

// ── Project card ───────────────────────────────────────────────────────────

function ProjectCard({ project, index, total }: {
    project: typeof PROJECTS[0];
    index: number;
    total: number;
}) {
    const [hovered,       setHovered]  = useState(false);
    const [tagsOpen,      setTagsOpen] = useState(false);
    const [githubHovered, setGHovered] = useState(false);
    const [linkHovered,   setLHovered] = useState(false);

    const VISIBLE = 3;
    const extra   = project.tags.length - VISIBLE;

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative',
                display: 'grid',
                gridTemplateRows: `auto minmax(${TITLE_ROW_MIN_HEIGHT}, auto) minmax(${DESCRIPTION_ROW_MIN_HEIGHT}, auto) auto auto`,
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                borderRight: index === total - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                padding: '2rem 2.2rem',
                background: hovered ? 'rgba(255,255,255,0.025)' : 'rgba(5,7,12,0.55)',
                backdropFilter: 'blur(12px)',
                transition: 'background 0.3s ease',
                cursor: 'default',
                minHeight: 420,
            }}
        >
            {/* Top accent line */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: hovered ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.08)',
                transition: 'background 0.3s ease',
            }} />

            {/* YEAR + STATUS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.6rem' }}>
                <div>
                    <p style={{
                        fontFamily: "'Geist Mono', 'Courier New', monospace",
                        fontSize: '0.55rem', letterSpacing: '0.18em',
                        color: 'rgba(255,255,255,0.25)', marginBottom: 4, textTransform: 'uppercase',
                    }}>Year</p>
                    <p style={{
                        fontFamily: "'Geist Mono', 'Courier New', monospace",
                        fontSize: '0.72rem', letterSpacing: '0.1em',
                        color: 'rgba(255,255,255,0.5)',
                    }}>{project.year}</p>
                </div>
                <StatusBadge status={project.status} />
            </div>

            {/* TITLE */}
            <h2 style={{
                fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                fontSize: 'clamp(1.6rem, 2.5vw, 2.1rem)',
                lineHeight: 1.05, letterSpacing: '0.02em',
                color: hovered ? '#ffffff' : 'rgba(255,255,255,0.88)',
                marginBottom: '1.2rem',
                transition: 'color 0.3s ease',
                minHeight: TITLE_ROW_MIN_HEIGHT,
            }}>
                {project.title}
            </h2>

            {/* LEFT ACCENT + DESCRIPTION */}
            <div style={{ display: 'flex', gap: '1rem', minHeight: DESCRIPTION_ROW_MIN_HEIGHT }}>
                <div style={{
                    width: 2, background: 'rgba(255,255,255,0.12)',
                    borderRadius: 1, flexShrink: 0, alignSelf: 'stretch',
                }} />
                <p style={{
                    fontFamily: "'Geist Mono', 'Courier New', monospace",
                    fontSize: '0.78rem', lineHeight: 1.75,
                    color: 'rgba(255,255,255,0.45)', fontStyle: 'italic',
                }}>
                    {project.description}
                </p>
            </div>

            {/* STACK */}
            <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2, alignSelf: 'start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
                        <rect x="7" y="7" width="10" height="10" rx="1" />
                        <path d="M12 2v5M12 17v5M2 12h5M17 12h5" />
                    </svg>
                    <span style={{
                        fontFamily: "'Geist Mono', 'Courier New', monospace",
                        fontSize: '0.55rem', letterSpacing: '0.2em',
                        color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase',
                    }}>Stack</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
                    {(tagsOpen ? project.tags : project.tags.slice(0, VISIBLE)).map(tag => (
                        <Tag key={tag} label={tag} />
                    ))}

                    {/* +N expandable — CLICKABLE */}
                    {extra > 0 && !tagsOpen && (
                        <button
                            onClick={e => { e.stopPropagation(); setTagsOpen(true); }}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                fontFamily: "'Geist Mono', 'Courier New', monospace",
                                fontSize: '0.55rem', letterSpacing: '0.12em',
                                padding: '4px 10px',
                                border: '1px solid rgba(190,242,100,0.25)',
                                color: '#bef264', background: 'rgba(190,242,100,0.06)',
                                borderRadius: 2, cursor: 'pointer',
                                transition: 'all 0.2s ease', whiteSpace: 'nowrap',
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

                    {/* Collapse */}
                    {tagsOpen && (
                        <button
                            onClick={e => { e.stopPropagation(); setTagsOpen(false); }}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                fontFamily: "'Geist Mono', 'Courier New', monospace",
                                fontSize: '0.55rem', letterSpacing: '0.12em',
                                padding: '4px 10px',
                                border: '1px solid rgba(255,255,255,0.12)',
                                color: 'rgba(255,255,255,0.35)', background: 'transparent',
                                borderRadius: 2, cursor: 'pointer', whiteSpace: 'nowrap',
                            }}
                        >
                            collapse <ChevronDownIcon open={true} />
                        </button>
                    )}
                </div>
            </div>

            {/* FOOTER — github + open resource */}
            <div style={{
                marginTop: '2rem', paddingTop: '1.2rem',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', gap: '1rem',
                position: 'relative', zIndex: 2,
            }}>
                {project.github ? (
                    <a
                        href={project.github}
                        target="_blank" rel="noopener noreferrer"
                        onMouseEnter={() => setGHovered(true)}
                        onMouseLeave={() => setGHovered(false)}
                        title="View source on GitHub"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                            fontFamily: "'Geist Mono', 'Courier New', monospace",
                            fontSize: '0.6rem', letterSpacing: '0.14em',
                            color: githubHovered ? 'rgba(255, 255, 255, 0.93)' : 'rgba(255, 255, 255, 0.78)',
                            textDecoration: 'none', transition: 'color 0.25s ease',
                            textTransform: 'uppercase',
                        }}
                    >
                        <GithubIcon size={13} /> Source
                    </a>
                ) : <span />}

                {project.link ? (
                    <a
                        href={project.link}
                        target={project.link.startsWith('http') ? '_blank' : undefined}
                        rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        onMouseEnter={() => setLHovered(true)}
                        onMouseLeave={() => setLHovered(false)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            fontFamily: "'Geist Mono', 'Courier New', monospace",
                            fontSize: '0.65rem', letterSpacing: '0.18em',
                            color: linkHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255, 255, 255, 0.78)',
                            textDecoration: 'none', transition: 'color 0.3s ease',
                            textTransform: 'uppercase',
                        }}
                    >
                        Open_Live <ArrowIcon hovered={linkHovered} />
                    </a>
                ) : (
                    <span style={{
                        fontFamily: "'Geist Mono', 'Courier New', monospace",
                        fontSize: '0.6rem', letterSpacing: '0.14em',
                        color: 'rgba(255, 255, 255, 0.78)', textTransform: 'uppercase',
                    }}>
                        No_Live_Demo
                    </span>
                )}
            </div>
        </div>
    );
}

// ── Main export ────────────────────────────────────────────────────────────

export default function ProjectSection() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@400;500&display=swap');
                @keyframes ps-pulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.4; }
                }
            `}</style>

            <section
                id="projects"
                style={{
                    width: '100%',
                    margin: '0 auto',
                    padding: '4rem var(--page-gutter)',
                    position: 'relative',
                }}
            >
                {/* Section header */}
                <div style={{
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '1.5rem',
                }}>
                    <h2 style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        letterSpacing: '0.06em',
                        color: 'rgba(255,255,255,0.9)',
                        lineHeight: 1,
                    }}>
                        PROJECT_LOG
                    </h2>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
                    <a
                        href="/projects"
                        className="nav-link"
                        data-nav
                        style={{
                            fontFamily: "'Geist Mono', 'Courier New', monospace",
                            fontSize: '0.62rem', letterSpacing: '0.14em',
                            color: 'rgba(255,255,255,0.78)',
                            textDecoration: 'none',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: 999,
                            padding: '0.48rem 0.9rem',
                            lineHeight: 1, whiteSpace: 'nowrap',
                            background: 'rgba(255,255,255,0.03)',
                        }}
                    >
                        VIEW ALL PROJECTS
                    </a>
                </div>

                {/* Cards grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${PROJECTS.length}, 1fr)`,
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    overflow: 'hidden',
                }}>
                    {PROJECTS.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} total={PROJECTS.length} />
                    ))}
                </div>
            </section>
        </>
    );
}
