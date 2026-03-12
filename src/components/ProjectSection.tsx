// src/components/ProjectSection.tsx

import { useEffect, useRef, useState } from 'react';
import { PROJECTS_DATA } from './projectsData';

const FEATURED_INDICES = [0, 2, 3];
const PROJECTS = FEATURED_INDICES.map(i => PROJECTS_DATA[i]).filter(Boolean);
const COL_COUNT = PROJECTS.length;

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
    ACTIVE: { bg: 'rgba(74,222,128,0.12)', color: '#4ade80' },
    COMPLETED: { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24' },
    ARCHIVED: { bg: 'rgba(148,163,184,0.10)', color: '#94a3b8' },
};

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

function ProjectCard({ project, index, isVisible }: {
    project: typeof PROJECTS[0];
    index: number;
    isVisible: boolean;
}) {
    const [hovered, setHovered] = useState(false);
    const [tagsOpen, setTagsOpen] = useState(false);
    const [githubHovered, setGHovered] = useState(false);
    const [linkHovered, setLHovered] = useState(false);
    const [hoverEnabled, setHoverEnabled] = useState(false);

    useEffect(() => {
        const query = window.matchMedia('(hover: hover) and (pointer: fine)');
        const updateHoverState = (matches: boolean) => {
            setHoverEnabled(matches);
            if (!matches) {
                setHovered(false);
                setGHovered(false);
                setLHovered(false);
            }
        };

        updateHoverState(query.matches);
        const onChange = (event: MediaQueryListEvent) => updateHoverState(event.matches);
        query.addEventListener('change', onChange);

        return () => query.removeEventListener('change', onChange);
    }, []);

    const VISIBLE = 3;
    const extra = project.tags.length - VISIBLE;

    return (
        <div
            className={`ps-card${isVisible ? ' is-revealed' : ''}`}
            onMouseEnter={() => hoverEnabled && setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                background: hovered ? 'rgba(255,255,255,0.025)' : 'rgba(5,7,12,0.55)',
                backdropFilter: 'blur(12px)',
                transitionDelay: `${index * 120}ms`,
                cursor: 'default',
            }}
        >
            {/* Top accent line */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: hovered ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.08)',
                transition: 'background 0.3s ease',
            }} />

            {/* YEAR + STATUS */}
            <div className="ps-meta" style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center',
            }}>
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
            <h2 className="ps-title" style={{
                fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                lineHeight: 1.05, letterSpacing: '0.02em',
                color: hovered ? '#ffffff' : 'rgba(255,255,255,0.88)',
                transition: 'color 0.3s ease',
                margin: 0,
            }}>
                {project.title}
            </h2>

            {/* LEFT ACCENT + DESCRIPTION */}
            <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                <div style={{
                    width: 2, background: 'rgba(255,255,255,0.12)',
                    borderRadius: 1, flexShrink: 0,
                }} />
                <p className="ps-desc" style={{
                    fontFamily: "'Geist Mono', 'Courier New', monospace",
                    lineHeight: 1.75,
                    color: 'rgba(255,255,255,0.45)', fontStyle: 'italic',
                    margin: 0,
                }}>
                    {project.description}
                </p>
            </div>

            {/* STACK */}
            <div style={{ position: 'relative', zIndex: 2 }}>
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
                                if (!hoverEnabled) return;
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

            {/* FOOTER */}
            <div className="ps-footer" style={{
                borderTop: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', gap: '1rem',
                position: 'relative', zIndex: 2,
            }}>
                {project.github ? (
                    <a
                        href={project.github}
                        target="_blank" rel="noopener noreferrer"
                        onMouseEnter={() => hoverEnabled && setGHovered(true)}
                        onMouseLeave={() => setGHovered(false)}
                        title="View source on GitHub"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                            fontFamily: "'Geist Mono', 'Courier New', monospace",
                            fontSize: '0.6rem', letterSpacing: '0.14em',
                            color: githubHovered ? 'rgba(255,255,255,0.93)' : 'rgba(255,255,255,0.55)',
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
                        onMouseEnter={() => hoverEnabled && setLHovered(true)}
                        onMouseLeave={() => setLHovered(false)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            fontFamily: "'Geist Mono', 'Courier New', monospace",
                            fontSize: '0.65rem', letterSpacing: '0.18em',
                            color: linkHovered ? '#ffffff' : 'rgba(255,255,255,0.55)',
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
                        color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
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
                threshold: 0.16,
                rootMargin: '0px 0px -14% 0px',
            },
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@400;500&display=swap');

                @keyframes ps-pulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.4; }
                }

                /* ─── SECTION ─────────────────────────────── */
                .ps-section {
                    width: 100%;
                    padding: 4rem var(--page-gutter, 1.5rem);
                    position: relative;
                }

                /* ─── HEADER ──────────────────────────────── */
                .ps-header {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                    flex-wrap: nowrap;
                    width: 100%;
                }
                .ps-header-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(2rem, 5vw, 3.5rem);
                    letter-spacing: 0.06em;
                    color: rgba(255,255,255,0.9);
                    line-height: 1;
                    white-space: nowrap;
                    flex-shrink: 0;
                    opacity: 0;
                    transform: translateX(-40px);
                    transition:
                        opacity 600ms cubic-bezier(0.22, 1, 0.36, 1),
                        transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
                }
                .ps-header-title.is-revealed {
                    opacity: 1;
                    transform: translateX(0);
                }
                .ps-header-rule {
                    flex: 1;
                    height: 1px;
                    background: rgba(255,255,255,0.07);
                    min-width: 0;
                }
                .ps-header-cta {
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
                    background: rgba(255,255,255,0.03);
                    flex-shrink: 0;
                    margin-left: auto;
                    transition: border-color 0.2s, color 0.2s;
                }
                @media (hover: hover) and (pointer: fine) {
                    .ps-header-cta:hover {
                        border-color: rgba(255,255,255,0.4);
                        color: rgba(255,255,255,1);
                    }
                }

                /* ─── GRID ────────────────────────────────── */
                /* CRITICAL: grid-template-columns is here in CSS,
                   NOT inline — so media queries can override it  */
                .ps-grid {
                    display: grid;
                    grid-template-columns: repeat(${COL_COUNT}, 1fr);
                    border-top: 1px solid rgba(255,255,255,0.08);
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    border-radius: 8px;
                    overflow: hidden;
                }

                /* ─── CARD ────────────────────────────────── */
                .ps-card {
                    min-height: 420px;
                    padding: 2rem 2.2rem;
                    border-left: 1px solid rgba(255,255,255,0.08);
                    gap: 0;
                    opacity: 0;
                    transform: translateY(60px) scale(0.96);
                    filter: blur(6px);
                    transition:
                        opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
                        transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
                        filter 700ms cubic-bezier(0.22, 1, 0.36, 1),
                        background 200ms ease,
                        box-shadow 200ms ease;
                }
                .ps-card.is-revealed {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                    filter: blur(0);
                }
                .ps-card:last-child {
                    border-right: 1px solid rgba(255,255,255,0.08);
                }
                @media (hover: hover) and (pointer: fine) {
                    .ps-card:hover {
                        transform: translateY(-6px) scale(1.01);
                    }
                }
                .ps-meta  { margin-bottom: 1.6rem; }
                .ps-title { font-size: clamp(1.6rem, 2.5vw, 2.1rem); margin-bottom: 1.2rem; }
                .ps-desc  { font-size: 0.78rem; }
                .ps-footer { margin-top: 2rem; padding-top: 1.2rem; }

                /* ─── Stack section spacing ───────────────── */
                .ps-card > div:nth-child(4) { margin-top: 2rem; }

                /* ─── TABLET (768px – 1023px) ─────────────── */
                @media (max-width: 1023px) {
                    .ps-grid {
                        grid-template-columns: repeat(2, 1fr);
                        border-radius: 12px;
                    }
                    /* If odd number of cards, last one spans full width */
                    .ps-card:last-child:nth-child(odd) {
                        grid-column: 1 / -1;
                        border-right: 1px solid rgba(255,255,255,0.08);
                    }
                    .ps-card { min-height: 360px; }
                    .ps-title { font-size: clamp(1.4rem, 3vw, 1.9rem); }
                }

                /* ─── MOBILE (< 768px) ────────────────────── */
                @media (max-width: 767px) {
                    .ps-section { padding: 2.5rem 1rem; }

                    .ps-header { gap: 0.75rem; margin-bottom: 1.5rem; }
                    .ps-header-rule { display: none; }
                    .ps-header-title { font-size: clamp(1.8rem, 8vw, 2.5rem); }
                    .ps-header-cta {
                        font-size: 0.5rem;
                        padding: 0.34rem 0.62rem;
                        letter-spacing: 0.12em;
                        margin-left: auto;
                    }

                    .ps-grid {
                        grid-template-columns: 1fr;
                        border-radius: 12px;
                    }
                    .ps-card {
                        min-height: unset;
                        padding: 1.5rem 1.25rem;
                        border-left: 1px solid rgba(255,255,255,0.08);
                        border-right: 1px solid rgba(255,255,255,0.08);
                        border-bottom: 1px solid rgba(255,255,255,0.06);
                    }
                    /* Remove double border between stacked cards */
                    .ps-card:not(:last-child) { border-bottom: none; }

                    .ps-title { font-size: clamp(1.5rem, 7vw, 2rem); margin-bottom: 1rem; }
                    .ps-desc  { font-size: 0.75rem; }
                    .ps-meta  { margin-bottom: 1.2rem; }
                    .ps-footer { flex-direction: row; }
                }

                /* ─── SMALL MOBILE (< 480px) ──────────────── */
                @media (max-width: 479px) {
                    .ps-section { padding: 2rem 0.75rem; }
                    .ps-card    { padding: 1.25rem 1rem; }
                    .ps-title   { font-size: clamp(1.3rem, 8vw, 1.8rem); }
                    .ps-desc    { font-size: 0.72rem; }
                    .ps-header-title { font-size: clamp(1.5rem, 9vw, 2rem); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .ps-card,
                    .ps-header-title {
                        opacity: 1 !important;
                        transform: none !important;
                        filter: none !important;
                        transition: none !important;
                    }
                }
            `}</style>

            <section id="projects" className="ps-section" ref={sectionRef}>

                {/* Header */}
                <div className="ps-header">
                    <h2 className={`ps-header-title${isVisible ? ' is-revealed' : ''}`}>
                        PROJECT_LOG
                    </h2>
                    <div className="ps-header-rule" />
                    <a
                        href="/projects"
                        className="nav-link ps-header-cta"
                        data-nav
                    >
                        VIEW ALL PROJECTS
                    </a>
                </div>

                {/* Cards */}
                <div className="ps-grid">
                    {PROJECTS.map((project, i) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={i}
                            isVisible={isVisible}
                        />
                    ))}
                </div>

            </section>
        </>
    );
}
