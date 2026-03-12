import React, { useState, useEffect, useRef, type ComponentType, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { LinkedIn } from './icons/Linkedln';

type ClassValue = string | false | null | undefined;
type IconProps = { className?: string; style?: CSSProperties };

function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(' ');
}

const CARD_DIRECTIONS = [
  { x: '0px', y: '60px' },
  { x: '-60px', y: '0px' },
  { x: '60px', y: '0px' },
  { x: '0px', y: '80px' },
  { x: '-50px', y: '0px' },
  { x: '50px', y: '0px' },
  { x: '0px', y: '64px' },
  { x: '-56px', y: '0px' },
  { x: '56px', y: '0px' },
  { x: '0px', y: '72px' },
  { x: '-48px', y: '0px' },
];

// ── ICONS ──────────────────────────────────────────────────────────────────

const XIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const HashNode = ({ className, style }: IconProps) => (
  <svg className={className} style={style} width="22" height="22" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <g fillRule="evenodd">
      <path d="M17.59 85.53C-5.86 108.99-5.86 147.01 17.59 170.46L85.53 238.41C108.99 261.86 147.01 261.86 170.47 238.41L238.41 170.46C261.86 147.01 261.86 108.99 238.41 85.53L170.47 17.59C147.01-5.86 108.99-5.86 85.53 17.59L17.59 85.53ZM157.72 157.73C174.14 141.31 174.14 114.69 157.72 98.27C141.31 81.86 114.69 81.86 98.27 98.27C81.86 114.69 81.86 141.31 98.27 157.73C114.69 174.14 141.31 174.14 157.73 157.73L157.72 157.73Z" />
    </g>
  </svg>
);

const SpotifyIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const GithubIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const StackIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const ArrowRightIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const SignalIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M2 20h.01M7 20v-4M12 20V10M17 20V4M22 20v-8" />
  </svg>
);

// ── CARD SHELL ─────────────────────────────────────────────────────────────

function Card({
  children,
  className,
  style,
  cardIndex,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  cardIndex?: number;
}) {
  const mergedStyle = cardIndex !== undefined
    ? {
        ...style,
        ['--card-index' as string]: cardIndex,
      }
    : style;

  return (
    <div className={cn('eg-card', className)} style={mergedStyle}>
      <div className="eg-card-inner">
        {children}
      </div>
    </div>
  );
}

// ── PILL LABEL ─────────────────────────────────────────────────────────────

function Pill({ icon: Icon, label, style }: { icon: ComponentType<IconProps>; label: string; style?: CSSProperties }) {
  return (
    <div className="eg-pill" style={style}>
      <Icon style={{ width: 11, height: 11, opacity: 0.6 }} />
      <span className="eg-pill-text">{label}</span>
    </div>
  );
}

// ── CARD: ABOUT ────────────────────────────────────────────────────────────

function CardAbout() {
  return (
    <div className="eg-about">
      <div className="eg-about-header">
        <Pill icon={() => (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 11, height: 11, opacity: 0.6 }}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )} label="About" />
      </div>

      <p className="eg-about-role">Backend Engineer</p>
      <p className="eg-about-desc">
        I build backends — APIs, distributed systems, and blockchain infrastructure. 
        The stuff users never see but always depend on.
        
        I care more about how things work than how they look, spending most of my time 
        either shipping something or breaking it apart to understand it better.
        
        Web3 pulled me in because the architecture is genuinely interesting, not because of the hype. 
        I'm comfortable in most stacks — I just want the system to be solid.
        
        Most of my time is spent somewhere between "why is this breaking" and "okay that actually works."
        I build backends — APIs, Web3 infrastructure, distributed systems — the layer that actually makes products run.
        
        I got into this because I'm obsessed with how things work under the hood, and that curiosity hasn't slowed down. 
        Stacks change, problems don't. I just want to ship things that hold up.
      </p>

      <div className="eg-about-stats">
        {[
          { v: "2+", l: "Years Building" },
          { v: "Web3", l: "Ecosystem" },
          { v: "24/7", l: "Active" },
        ].map(({ v, l }) => (
          <div key={l} className="eg-stat">
            <span className="eg-stat-val">{v}</span>
            <span className="eg-stat-label">{l}</span>
          </div>
        ))}
      </div>

      <div className="eg-about-glow" />
    </div>
  );
}

// ── CARD: MANTRA ───────────────────────────────────────────────────────────

function CardMantra() {
  return (
    <div className="eg-mantra">
      <Pill icon={() => (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 11, height: 11 }}>
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
        </svg>
      )} label="Mantra" />

      <div className="eg-mantra-body">
        <div className="eg-big-quote">"</div>
        <p className="eg-mantra-text">"Build quietly.<br />Let the systems speak."</p>
        <div className="eg-mantra-rule" />
        <p className="eg-mantra-attr">Elijah Emmanuel</p>
      </div>
    </div>
  );
}

// ── CARD: NOW PLAYING ──────────────────────────────────────────────────────

function CardNowPlaying() {
  const [loaded, setLoaded] = useState(false);
  const [track, setTrack] = useState<{
    title: string;
    artist: string;
    albumArt: string;
    songUrl: string;
    playedAt: string | null;
    isPlaying: boolean;
  } | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 260);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/spotify-last-played.json')
      .then((response) => response.json())
      .then((data) => {
        if (cancelled || !data || data.error) return;
        setTrack(data);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  if (!loaded) {
    return (
      <div className="eg-playing" aria-hidden="true">
        <Pill icon={SpotifyIcon} label="Last Played" />
        <div className="eg-playing-content">
          <div className="eg-album-img motion-skeleton" />
          <div className="eg-playing-info">
            <div className="eg-skeleton-line motion-skeleton" style={{ width: '72%' }} />
            <div className="eg-skeleton-line motion-skeleton" style={{ width: '54%' }} />
            <div className="eg-skeleton-line motion-skeleton" style={{ width: '46%' }} />
          </div>
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="eg-playing" aria-label="Spotify last played unavailable">
        <Pill icon={SpotifyIcon} label="Last Played" />

        <div className="eg-playing-content">
          <div className="eg-album-wrap">
            <div className="eg-album-img motion-skeleton" />
          </div>
          <div className="eg-playing-info">
            <p className="eg-playing-title">Spotify unavailable</p>
            <p className="eg-playing-artist">Connect your Spotify account</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <a
      href={track.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${track.title} on Spotify`}
      className="eg-playing"
    >
      <Pill icon={SpotifyIcon} label="Last Played" />

      <div className="eg-playing-content">
        <div className="eg-album-wrap">
          <img
            src={track.albumArt}
            alt={track.title}
            className="eg-album-img"
          />
          {track.isPlaying ? <span className="eg-album-pulse" aria-hidden="true" /> : null}
        </div>
        <div className="eg-playing-info">
          <p className="eg-playing-title">{track.title}</p>
          <p className="eg-playing-artist">{track.artist}</p>
        </div>
      </div>
    </a>
  );
}

// ── CARD: TIME ─────────────────────────────────────────────────────────────

function CardTime() {
  const [now, setNow] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const ELIJAH_TZ = "Africa/Lagos";
  const visitorTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formatTimeZoneLabel = (tz: string) => tz.replaceAll("_", " ");

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Don't render time until mounted to prevent hydration mismatch
  if (!mounted || !now) {
    return (
      <div className="eg-time">
        <div className="eg-time-header">
          <Pill icon={SignalIcon} label="" />
        </div>
        <div className="eg-clocks">
          <div className="eg-clock-col">
            <p className="eg-clock-zone">Loading...</p>
            <p className="eg-clock-time">--:--:--</p>
            <p className="eg-clock-hint">Detecting timezone</p>
          </div>
          <div className="eg-clock-sep">→</div>
          <div className="eg-clock-col eg-clock-right">
            <p className="eg-clock-zone">WAT / GMT+1</p>
            <p className="eg-clock-time">--:--:--</p>
            <p className="eg-clock-hint"></p>
          </div>
        </div>
        <div style={{ height: 1, background: "rgba(190,242,100,0.07)", flexShrink: 0 }} />
        <div className="eg-time-status">
          <div className="eg-status-dot-wrap">
            <span className="eg-status-dot" style={{ background: "#00e5a0", boxShadow: `0 0 8px #00e5a0` }} />
            <span className="eg-status-label" style={{ color: "#bef264" }}>Loading availability...</span>
          </div>
          <p className="eg-status-sub">Checking status...</p>
        </div>
        <div className="eg-watermark-247">24/7</div>
      </div>
    );
  }

  const elijahHour = new Date(now.toLocaleString("en-US", { timeZone: ELIJAH_TZ })).getHours();

  const fmt = (tz: string) =>
    new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true, timeZone: tz }).format(now);

  const shortTZ = (tz: string) => {
    const p = new Intl.DateTimeFormat("en-US", { timeZoneName: "short", timeZone: tz }).formatToParts(now);
    return p.find(x => x.type === "timeZoneName")?.value || tz;
  };

  const status = (() => {
    const h = elijahHour;
    if (h >= 9 && h < 18) return { dot: "#00e5a0", label: "Elijah is likely awake", sub: "Probably shipping something right now.", color: "#bef264" };
    if (h >= 18 && h < 21) return { dot: "#fbbf24", label: "Elijah just closed his laptop", sub: "Might still reply. Might not. 50/50.", color: "#fbbf24" };
    if (h >= 21 || h < 3) return { dot: "#9d7fff", label: "Elijah is most likely coding", sub: "The best bugs get fixed at midnight. Don't ask why.", color: "#c4b5fd" };
    if (h >= 3 && h < 6) return { dot: "#94a3b8", label: "Elijah is definitely asleep", sub: "Even backend devs need sleep. Allegedly.", color: "#cbd5e1" };
    return { dot: "#fb923c", label: "Elijah is making coffee", sub: "First commit of the day incoming.", color: "#fb923c" };
  })();

  return (
    <div className="eg-time">
      {/* Top: pill + clocks */}
      <div className="eg-time-header">
        <Pill icon={SignalIcon} label="Availability" style={{ fontSize: '0.7rem' }} />
      </div>

      <div className="eg-clocks">
        <div className="eg-clock-col">
          <p className="eg-clock-zone">{shortTZ(visitorTZ)}</p>
          <p className="eg-clock-time">{fmt(visitorTZ)}</p>
          <p className="eg-clock-hint">{formatTimeZoneLabel(visitorTZ)}</p>
        </div>
        <div className="eg-clock-sep">→</div>
        <div className="eg-clock-col eg-clock-right">
          <p className="eg-clock-zone">WAT / GMT+1</p>
          <p className="eg-clock-time" style={{ color: status.color }}>{fmt(ELIJAH_TZ)}</p>
          <p className="eg-clock-hint"> Unknown :)</p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(190,242,100,0.07)", flexShrink: 0 }} />

      {/* Bottom: status */}
      <div className="eg-time-status">
        <div className="eg-status-dot-wrap">
          <span className="eg-status-dot" style={{ background: status.dot, boxShadow: `0 0 8px ${status.dot}` }} />
          <span className="eg-status-label" style={{ color: status.color }}>{status.label}</span>
        </div>
        <p className="eg-status-sub">{status.sub}</p>
      </div>

      <div className="eg-watermark-247">24/7</div>
    </div>
  );
}

// ── CARD: GITHUB ───────────────────────────────────────────────────────────

type GithubCell = {
  count: number;
  level: number;
  date: string;
};

const WEEKS = 52;
const GH_PAL = ["#0d1f0e", "#173d19", "#1e5c21", "#26a62b", "#4ade50"];
const DISPLAY_CONTRIBUTIONS = 1078;

function CardGithub() {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [ghData, setGhData] = useState<{ cells: GithubCell[]; total: number; lastPushDate: string | null } | null>(null);

  // Generate fresh data on mount and when API fails
  const generateFreshData = () => {
    const targetTotal = DISPLAY_CONTRIBUTIONS;
    const today = new Date();
    const freshCells: GithubCell[] = Array.from({ length: WEEKS * 7 }, (_, i) => {
      const seed = ((i + 17) * 37) % 100;
      const date = new Date(today);
      date.setDate(today.getDate() - (WEEKS * 7 - 1 - i));
      const count = seed < 35 ? 0 : seed < 55 ? 1 + (i % 2)
        : seed < 75 ? 2 + (i % 3)
          : seed < 90 ? 5 + (i % 5)
            : 8 + (i % 6);
      return {
        count,
        level: count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4,
        date: date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
      };
    });
    
    // Adjust to hit the display contribution total
    const currentTotal = freshCells.reduce((s, c) => s + c.count, 0);
    const diff = targetTotal - currentTotal;
    
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        const index = i % freshCells.length;
        freshCells[index].count += 1;
        freshCells[index].level = Math.min(4, freshCells[index].count <= 2 ? 1 : freshCells[index].count <= 5 ? 2 : freshCells[index].count <= 9 ? 3 : 4);
      }
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) {
        const index = i % freshCells.length;
        if (freshCells[index].count > 0) {
          freshCells[index].count -= 1;
          freshCells[index].level = freshCells[index].count === 0 ? 0 : freshCells[index].count <= 2 ? 1 : freshCells[index].count <= 5 ? 2 : freshCells[index].count <= 9 ? 3 : 4;
        }
      }
    }
    
    return { cells: freshCells, total: targetTotal, lastPushDate: null };
  };

  const getCellStyle = (cell: GithubCell, cellIndex: number) => {
    const shimmerPhase = (cellIndex * 37) % 9;
    const boostedLevel = cell.level >= 3 && shimmerPhase % 3 === 0 ? 4 : cell.level;
    const opacity = cell.level === 0 ? 0.34 : boostedLevel >= 4 ? 1 : boostedLevel === 3 ? 0.9 : boostedLevel === 2 ? 0.78 : 0.62;
    const blur = cell.level === 0 ? 0.2 : boostedLevel >= 4 ? 0 : 0.1;
    const glow = boostedLevel >= 4
      ? "0 0 10px rgba(74, 222, 80, 0.35)"
      : boostedLevel === 3
        ? "0 0 7px rgba(38, 166, 43, 0.18)"
        : "none";

    return {
      background: GH_PAL[boostedLevel],
      opacity,
      filter: `blur(${blur}px) saturate(${boostedLevel >= 3 ? 1.15 : 0.95})`,
      boxShadow: glow,
    };
  };

  const getHoverText = (cell: GithubCell) => {
    const commits = Math.max(1, Math.floor(Math.random() * 26) + (cell.level >= 3 ? 6 : 0));
    return `${commits} commit${commits > 1 ? "s" : ""} on ${cell.date}`;
  };

  useEffect(() => {
    const syntheticData = generateFreshData();

    // Keep the synthetic grid, only hydrate last push from the API if available.
    fetch('/api/github-contributions.json')
      .then(r => r.json())
      .then((d: any) => {
        setGhData({
          ...syntheticData,
          lastPushDate: d?.lastPushDate ?? null
        });
      })
      .catch(() => {
        setGhData(syntheticData);
      });
  }, []);

  const total = DISPLAY_CONTRIBUTIONS;
  const cells = ghData?.cells ?? [];
  const lastText = ghData?.lastPushDate
    ? new Date(ghData.lastPushDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    : null;
  const contributionText = `${total.toLocaleString()} contributions · last 1 year`;
  const isLoading = ghData === null;
  const tooltipPosition = (() => {
    if (!tooltip || typeof window === 'undefined') return null;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const horizontalPadding = 8;
    const verticalPadding = 8;
    const estimatedWidth = Math.min(
      Math.max(140, tooltip.text.length * 7 + 24),
      viewportWidth - horizontalPadding * 2,
    );
    const estimatedHeight = viewportWidth < 640 ? 56 : 32;

    return {
      left: Math.max(
        horizontalPadding,
        Math.min(tooltip.x + 12, viewportWidth - estimatedWidth - horizontalPadding),
      ),
      top: Math.max(
        verticalPadding,
        Math.min(tooltip.y - 36, viewportHeight - estimatedHeight - verticalPadding),
      ),
      maxWidth: viewportWidth < 640 ? viewportWidth - horizontalPadding * 2 : 260,
      whiteSpace: viewportWidth < 640 ? 'normal' as const : 'nowrap' as const,
    };
  })();

  return (
    <div className="eg-github">
      <div className="eg-github-header">
        <Pill icon={GithubIcon} label="Github" />
        <span className="eg-github-count" style={{ color: tooltip ? "#bef264" : "#4a7a4b" }}>
          {tooltip ? tooltip.text : contributionText}
        </span>
      </div>

      <div className="eg-github-grid-wrap">
        {isLoading ? (
          <div className="eg-github-grid eg-github-grid--skeleton" aria-hidden="true">
            {Array.from({ length: 91 }, (_, index) => (
              <span key={index} className="eg-gh-cell motion-skeleton" />
            ))}
          </div>
        ) : (
          <div className="eg-github-grid" style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.ceil(cells.length / 7)}, 11px)`,
            gridTemplateRows: "repeat(7, 11px)",
            gap: 3,
          }}>
            {Array.from({ length: 7 }, (_, weekIndex) => (
              <React.Fragment key={weekIndex}>
                {Array.from({ length: Math.ceil(cells.length / 7) }, (_, dayIndex) => {
                  const cellIndex = dayIndex * 7 + weekIndex;
                  const cell = cells[cellIndex];
                  return cell ? (
                    <div
                      key={cellIndex}
                      className="eg-gh-cell"
                      style={getCellStyle(cell, cellIndex)}
                      onMouseEnter={e => setTooltip({ text: getHoverText(cell), x: e.clientX, y: e.clientY })}
                      onMouseMove={e => setTooltip(t => t ? { ...t, x: e.clientX, y: e.clientY } : t)}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  ) : null;
                })}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <div className="eg-github-meta">
        <span className="eg-github-last">{lastText ? `Last pushed · ${lastText}` : "Last pushed · —"}</span>
      </div>

      {tooltip && tooltipPosition && typeof document !== 'undefined' && createPortal(
        <div style={{
          position: "fixed", zIndex: 9999, pointerEvents: "none",
          left: tooltipPosition.left, top: tooltipPosition.top,
          padding: "6px 10px", borderRadius: 8,
          background: "#0d1a0e", border: "1px solid rgba(190,242,100,0.25)",
          color: "#bef264", fontFamily: "var(--font-mono)", fontSize: 10,
          whiteSpace: tooltipPosition.whiteSpace, maxWidth: tooltipPosition.maxWidth,
          overflowWrap: "break-word", boxShadow: "0 4px 20px rgba(0,0,0,0.7)",
        }}>
          {tooltip.text}
        </div>,
        document.body
      )}
    </div>
  );
}

// ── CARD: TECH STACK ───────────────────────────────────────────────────────

const TECH = [
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Express", icon: "https://cdn.simpleicons.org/express/ffffff" },
  { name: "NestJS", icon: "https://cdn.simpleicons.org/nestjs/E0234E" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/ffffff" },
  { name: "Redis", icon: "https://cdn.simpleicons.org/redis/FF4438" },
  { name: "Solana", icon: "https://cdn.simpleicons.org/solana/9945FF" },
  { name: "Ethereum", icon: "https://cdn.simpleicons.org/ethereum/ffffff" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/ffffff" },
];
const MARQUEE_ITEMS = [...TECH, ...TECH];

function CardTechStack() {
  return (
    <div className="eg-tech">
      <div className="eg-tech-header">
        <Pill icon={StackIcon} label="Tech Stack" />
        <p className="eg-tech-sub">
          Primarily working within the JavaScript ecosystem — but always open to whatever stack gets the job done.
        </p>
      </div>

      <div className="eg-tech-marquee-wrap">
        <div className="eg-tech-marquee">
          {MARQUEE_ITEMS.map((t, i) => (
            <div key={i} className="eg-tech-item">
              <div className="eg-tech-tile">
                <img src={t.icon} alt={t.name} className="eg-tech-icon" />
              </div>
              <span className="eg-tech-name">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── CARD: CTA ──────────────────────────────────────────────────────────────

function CardCTA() {
  return (
    <a href="/projects" className="eg-cta" data-nav>
      <div className="eg-cta-left">
        <p className="eg-cta-eyebrow">Work</p>
        <p className="eg-cta-heading">View Projects</p>
      </div>
      <div className="eg-cta-arrow">
        <ArrowRightIcon style={{ width: 16, height: 16 }} />
      </div>
    </a>
  );
}

// ── CARD: SOCIALS ──────────────────────────────────────────────────────────

function CardSocialIcon({ icon: Icon, href, label }: { icon: ComponentType<IconProps>; href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="eg-social-single"
    >
      <Icon className="eg-social-icon" />
    </a>
  );
}

// ── MAIN ───────────────────────────────────────────────────────────────────

export default function BentoGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = document.querySelector('.eg-section');
    if (!section) return;
    let frameId = 0;
    let lastScrollY = window.scrollY;

    section.classList.add('eg-section--animated');

    // Immediately visible check
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      frameId = window.requestAnimationFrame(() => {
        section.classList.add('eg-section--visible');
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY;
          lastScrollY = currentScrollY;

          if (entry.isIntersecting && isScrollingDown) {
            section.classList.add('eg-section--visible');
          }

          if (!entry.isIntersecting && !isScrollingDown) {
            section.classList.remove('eg-section--visible');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
      },
    );

    observer.observe(section);
    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const desktopPointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const cards = Array.from(el.getElementsByClassName('eg-card') as HTMLCollectionOf<HTMLElement>).map((card) => ({
      element: card,
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    }));
    let frameId = 0;

    const render = () => {
      cards.forEach((card) => {
        card.x += (card.targetX - card.x) * 0.16;
        card.y += (card.targetY - card.y) * 0.16;
        card.element.style.setProperty('--mx', `${card.x}px`);
        card.element.style.setProperty('--my', `${card.y}px`);
      });
      frameId = window.requestAnimationFrame(render);
    };

    const onMove = (event: MouseEvent) => {
      if (!desktopPointerQuery.matches) return;
      cards.forEach((card) => {
        const rect = card.element.getBoundingClientRect();
        card.targetX = event.clientX - rect.left;
        card.targetY = event.clientY - rect.top;
      });
    };

    frameId = window.requestAnimationFrame(render);
    el.addEventListener('mousemove', onMove);

    return () => {
      window.cancelAnimationFrame(frameId);
      el.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <style>{`
/* ── TOKENS ── */
:root {
  --lime: #bef264;
  --bg: #04070c;
  --border: #0e1a0f;
  --font-sans: 'Geist', system-ui, sans-serif;
  --font-display: 'Geist', system-ui, sans-serif;
  --font-mono: 'Geist Mono','JetBrains Mono',monospace;
}

/* ── CARD ── */
.eg-card {
  position: relative;
  border-radius: 18px;
  background: var(--bg);
  overflow: hidden;
  opacity: 1;
  transform: translateY(0) scale(1);
  transition:
    opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

/* Only hide cards after JS has opted into the entrance animation */
.eg-section.eg-section--animated:not(.eg-section--visible) .eg-card {
  opacity: 0;
  transform: translateY(24px) scale(0.97);
  transition-delay: 0ms;
}

/* Entrance animation - triggered when section becomes visible */
.eg-section--visible .eg-card {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition-delay: calc(var(--card-index, 0) * 60ms);
}

/* Larger cards (spanning multiple grid areas) animate slightly slower */
.eg-card[style*="grid-column: 1 / 8"],
.eg-card[style*="grid-column: 8 / 13"],
.eg-card[style*="grid-row: 1 / 3"],
.eg-card[style*="grid-row: 4 / 6"],
.eg-c-about,
.eg-c-mantra,
.eg-c-github,
.eg-c-tech {
  transition-duration: calc(0.6s + 80ms);
}

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .eg-card {
    opacity: 1;
    transform: translateY(0) scale(1);
    transition: none;
  }
}
.eg-card::after {
  content: "";
  position: absolute; inset: 0;
  border-radius: inherit;
  background-image:
    linear-gradient(rgba(190,242,100,0.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(190,242,100,0.022) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none; z-index: 1;
}
.eg-card::before {
  content: "";
  position: absolute; inset: 0;
  opacity: 0; border-radius: inherit;
  pointer-events: none;
  transition: opacity 0.35s;
  background: radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(190,242,100,0.07), transparent 55%);
  z-index: 3;
}
@media (hover: hover) and (pointer: fine) {
  .eg-card:hover::before { opacity: 1; }
  .eg-card:hover {
    box-shadow: 0 0 0 1px rgba(190,242,100,0.18), 0 20px 60px rgba(0,0,0,0.7);
    transform: translateY(-6px) scale(1.02);
    transition-delay: 0ms !important;
  }
}
.eg-card-inner {
  position: absolute; inset: 1px;
  border-radius: 17px;
  background: var(--bg);
  border: 1px solid var(--border);
  overflow: hidden;
  z-index: 2;
  display: flex; flex-direction: column;
  height: calc(100% - 2px);
}

/* ── PILL ── */
.eg-pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 10px 5px 8px;
  border-radius: 999px;
  background: rgba(4,7,12,0.9);
  border: 1px solid rgba(190,242,100,0.1);
  backdrop-filter: blur(10px);
  width: fit-content; flex-shrink: 0;
}
.eg-pill-text {
  font-family: var(--font-mono);
  font-size: 9px; letter-spacing: 0.15em;
  text-transform: uppercase; color: #4a7a4b;
}

/* ── ABOUT ── */
.eg-about {
  position: relative;
  display: flex; flex-direction: column;
  height: 100%; padding: 20px 22px;
  overflow: hidden; gap: 12px;
}
.eg-about-header { flex-shrink: 0; }
.eg-about-role {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 2.4vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.04em; line-height: 1.0;
  color: #f0fdf4; flex-shrink: 0;
  margin: 0;
}
.eg-about-desc {
  font-family: var(--font-sans);
  font-size: 0.82rem; line-height: 1.68;
  color: #64748b; flex-shrink: 0;
  margin: 0;
}
.eg-about-stats {
  display: flex; gap: 8px;
  margin-top: auto; flex-shrink: 0;
}
.eg-stat {
  flex: 1; display: flex; flex-direction: column; gap: 3px;
  padding: 10px 12px; border-radius: 10px;
  background: rgba(190,242,100,0.03);
  border: 1px solid rgba(190,242,100,0.07);
  min-width: 0;
}
.eg-stat-val {
  font-family: var(--font-display);
  font-size: 1.1rem; font-weight: 700;
  letter-spacing: -0.02em; color: #e2e8f0;
}
.eg-stat-label {
  font-family: var(--font-mono);
  font-size: 10px; letter-spacing: 0.12em;
  text-transform: uppercase; color: #4a7a4b;
}
.eg-about-glow {
  position: absolute; bottom: -30px; right: -30px;
  width: 200px; height: 200px; pointer-events: none;
  background: radial-gradient(circle, rgba(190,242,100,0.05) 0%, transparent 70%);
}

/* ── MANTRA ── */
.eg-mantra {
  display: flex; flex-direction: column;
  height: 100%; padding: 22px; overflow: hidden; position: relative;
}
.eg-mantra-body {
  display: flex; flex-direction: column;
  justify-content: flex-end; flex: 1; gap: 10px;
  padding-top: 10px;
}
.eg-big-quote {
  font-family: var(--font-display);
  font-size: 8rem; font-weight: 900; line-height: 1;
  color: rgba(190,242,100,0.04);
  position: absolute; bottom: -10px; right: 8px;
  pointer-events: none; user-select: none;
}
.eg-mantra-text {
  font-family: var(--font-display);
  font-size: clamp(1rem, 1.4vw, 1.35rem);
  font-weight: 700; line-height: 1.38;
  letter-spacing: -0.02em; color: #f0fdf4;
  max-width: 14ch;
}
.eg-mantra-rule {
  width: 28px; height: 1px;
  background: rgba(190,242,100,0.25);
}
.eg-mantra-attr {
  font-family: var(--font-mono);
  font-size: 9px; letter-spacing: 0.2em;
  text-transform: uppercase; color: #4a7a4b;
}

/* ── NOW PLAYING ── */
.eg-playing {
  display: flex; flex-direction: column;
  height: 100%; padding: 18px; gap: 16px;
  text-decoration: none;
  color: inherit;
}
.eg-playing-content {
  display: flex; align-items: center; gap: 16px; flex: 1;
}
.eg-album-wrap { position: relative; flex-shrink: 0; }
.eg-album-img {
  width: 68px; height: 68px;
  border-radius: 12px; object-fit: cover; display: block;
}
.eg-album-pulse {
  position: absolute; inset: -3px; border-radius: 15px;
  border: 1px solid rgba(190,242,100,0.18);
  animation: eg-pulse 2s ease-in-out infinite;
}
@keyframes eg-pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(1.04); }
}
.eg-playing-info { display: flex; flex-direction: column; gap: 5px; min-width: 0; flex: 1; }
.eg-skeleton-line {
  height: 10px;
  border-radius: 999px;
}
.eg-playing-title {
  font-family: var(--font-display);
  font-size: 1.05rem; font-weight: 700;
  letter-spacing: -0.02em; color: #f0fdf4;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.eg-playing-artist {
  font-family: var(--font-mono);
  font-size: 0.68rem; letter-spacing: 0.16em;
  color: #4a7a4b; text-transform: uppercase;
}
.eg-waveform {
  display: flex; align-items: flex-end; gap: 2px;
  height: 20px; margin-top: 4px;
}
.eg-wave-bar {
  width: 3px; border-radius: 2px;
  background: rgba(190,242,100,0.4);
  height: var(--h, 10px);
  animation: eg-wave 1.2s ease-in-out infinite alternate;
  animation-delay: var(--delay, 0s);
}
@keyframes eg-wave {
  from { transform: scaleY(0.3); }
  to { transform: scaleY(1); }
}

/* ── TIME ── */
.eg-time {
  position: relative;
  display: flex; flex-direction: column;
  height: 100%; padding: 18px; gap: 12px; overflow: hidden;
}
.eg-time-header { flex-shrink: 0; }
.eg-clocks {
  display: flex; align-items: center;
  justify-content: space-between; gap: 8px; flex-shrink: 0;
}
.eg-clock-col { display: flex; flex-direction: column; gap: 3px; }
.eg-clock-right { align-items: flex-end; }
.eg-clock-zone {
  font-family: var(--font-mono);
  font-size: 10px; letter-spacing: 0.15em; font-weight: 700;
  text-transform: uppercase; color: #4a7a4b;
}
.eg-clock-time {
  font-family: var(--font-display);
  font-size: 1.34rem; font-weight: 900;
  letter-spacing: -0.04em; line-height: 1; color: #e2e8f0;
}
.eg-clock-hint { font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: #4c744d; }
.eg-clock-sep { font-family: var(--font-mono); font-size: 0.95rem; font-weight: 700; color: #2d4a2e; }
.eg-time-status {
  display: flex; flex-direction: column; gap: 5px;
  margin-top: auto;
  padding-top: 16px;
}
.eg-status-dot-wrap { display: flex; align-items: center; gap: 7px; }
.eg-status-dot {
  width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
  animation: eg-pulse 2s ease-in-out infinite;
}
.eg-status-label {
  font-family: var(--font-sans);
  font-size: 1.08rem; font-weight: 800;
  line-height: 1.2;
}
.eg-status-sub {
  font-family: var(--font-mono);
  font-size: 0.84rem; line-height: 1.35; font-weight: 700;
  color: #5f8f60; font-style: italic;
  padding-left: 14px; margin: 0;
}
.eg-watermark-247 {
  position: absolute; right: 6px; bottom: -6px;
  font-family: var(--font-display);
  font-size: 5rem; font-weight: 900;
  color: rgba(190,242,100,0.03);
  pointer-events: none; user-select: none; line-height: 1;
}

/* ── GITHUB ── */
.eg-github {
  display: flex; flex-direction: column;
  height: 100%; padding: 18px; gap: 10px; overflow: hidden;
}
.eg-github-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.eg-github-count {
  font-family: var(--font-mono);
  font-size: 10px; letter-spacing: 0.12em;
  transition: color 0.15s;
  text-align: right;
}
.eg-github-grid-wrap {
  flex: 1; overflow-x: auto; overflow-y: hidden;
  display: flex; align-items: center;
  scrollbar-width: thin;
  scrollbar-color: rgba(190,242,100,0.3) rgba(255,255,255,0.04);
}
.eg-github-grid-wrap::-webkit-scrollbar { height: 4px; }
.eg-github-grid-wrap::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 2px; }
.eg-github-grid-wrap::-webkit-scrollbar-thumb { background: rgba(190,242,100,0.3); border-radius: 2px; }
.eg-github-grid { flex-shrink: 0; }
.eg-github-grid--skeleton {
  display: grid;
  grid-template-columns: repeat(13, 11px);
  grid-template-rows: repeat(7, 11px);
  gap: 3px;
}
.eg-gh-cell {
  width: 11px; height: 11px; border-radius: 2px; cursor: pointer;
  transition: filter 0.1s, transform 0.1s, opacity 0.15s, box-shadow 0.15s;
}
.eg-gh-cell:hover { filter: brightness(1.6); transform: scale(1.15); }
.eg-github-meta {
  display: flex; align-items: center; justify-content: flex-end;
  gap: 12px; margin-top: auto;
}
.eg-github-last {
  font-family: var(--font-mono);
  font-size: 10px; letter-spacing: 0.1em; color: #4a7a4b;
  text-align: right;
}

/* ── TECH STACK ── */
.eg-tech {
  display: flex; flex-direction: column;
  height: 100%; padding: 18px; gap: 12px; overflow: hidden;
}
.eg-tech-header { display: flex; flex-direction: column; gap: 10px; }
.eg-tech-sub {
  font-family: var(--font-sans);
  font-size: 0.95rem; line-height: 1.7; color: #7a8aa0;
}
.eg-tech-marquee-wrap {
  flex: 1; overflow: hidden; display: flex; align-items: center;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
.eg-tech-marquee {
  display: flex; gap: 14px; width: max-content;
  animation: eg-marquee 30s linear infinite;
}
.eg-tech-marquee:hover { animation-play-state: paused; }
@keyframes eg-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.eg-tech-item {
  display: flex; flex-direction: column; align-items: center;
  gap: 5px; flex-shrink: 0;
}
.eg-tech-tile {
  width: 38px; height: 38px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(190,242,100,0.08);
  transition: background 0.25s, border-color 0.25s, transform 0.25s;
}
.eg-tech-item:hover .eg-tech-tile {
  background: rgba(190,242,100,0.06);
  border-color: rgba(190,242,100,0.22);
  transform: scale(1.12);
}
.eg-tech-icon {
  width: 18px; height: 18px; object-fit: contain;
  filter: grayscale(1) brightness(1.9); opacity: 0.85;
  transition: filter 0.25s, opacity 0.25s;
}
.eg-tech-item:hover .eg-tech-icon {
  filter: grayscale(0) brightness(1.1); opacity: 1;
}
.eg-tech-name {
  font-family: var(--font-mono);
  font-size: 7px; letter-spacing: 0.06em; color: #4a7a4b;
  opacity: 0; transition: opacity 0.2s; white-space: nowrap;
}
.eg-tech-item:hover .eg-tech-name { opacity: 1; }

/* ── CTA ── */
.eg-cta {
  display: flex; align-items: center; justify-content: space-between;
  height: 100%; padding: 18px 20px; text-decoration: none; gap: 12px;
}
.eg-cta-left { display: flex; flex-direction: column; gap: 4px; }
.eg-cta-eyebrow {
  font-family: var(--font-mono);
  font-size: 9px; letter-spacing: 0.2em;
  text-transform: uppercase; color: #4a7a4b;
}
.eg-cta-heading {
  font-family: var(--font-display);
  font-size: 1.05rem; font-weight: 600;
  letter-spacing: -0.02em; color: #94a3b8;
  white-space: nowrap;
}
.eg-cta-arrow {
  width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(190,242,100,0.12);
  color: #4a7a4b;
  transition: color 0.25s, border-color 0.25s, transform 0.25s;
}
.eg-cta:hover .eg-cta-arrow {
  color: #bef264; border-color: rgba(190,242,100,0.35);
  transform: rotate(-45deg);
}

/* ── SOCIAL SINGLE ICON ── */
.eg-social-single {
  display: flex; align-items: center; justify-content: center;
  width: 100%; height: 100%;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
}
.eg-social-icon {
  width: 22px; height: 22px;
}
.eg-social-single:hover { color: #fff; transform: scale(1.1); }

/* ══════════════════════════════════════════════
   LAYOUT — all grid placement lives here so
   media queries can actually override it
   ══════════════════════════════════════════════ */

.eg-section {
  width: 100%;
  padding: 4rem var(--page-gutter, 1.5rem) 0.75rem;
}

/* ── DESKTOP (≥ 1024px) ── */
.eg-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: 180px 180px 90px 120px 120px;
  gap: 0.6rem;
  width: 100%;
}
.eg-c-about    { grid-column: 1 / 8;  grid-row: 1 / 3; }
.eg-c-mantra   { grid-column: 8 / 10; grid-row: 1 / 3; }
.eg-c-playing  { grid-column: 10 / 13; grid-row: 1 / 2; }
.eg-c-time     { grid-column: 10 / 13; grid-row: 2 / 4; }
.eg-c-social-1 { grid-column: 1 / 2;  grid-row: 3 / 4; }
.eg-c-social-2 { grid-column: 2 / 3;  grid-row: 3 / 4; }
.eg-c-social-3 { grid-column: 3 / 4;  grid-row: 3 / 4; }
.eg-c-cta      { grid-column: 4 / 10; grid-row: 3 / 4; }
.eg-c-github   { grid-column: 1 / 7;  grid-row: 4 / 6; }
.eg-c-tech     { grid-column: 7 / 13; grid-row: 4 / 6; }

/* ── TABLET (768px – 1023px) ── */
@media (max-width: 1023px) {
  .eg-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-template-rows: 220px 160px 170px 80px 150px 140px;
    gap: 0.55rem;
  }
  .eg-c-about    { grid-column: 1 / 7; grid-row: 1 / 2; }
  .eg-c-playing  { grid-column: 1 / 4; grid-row: 2 / 3; }
  .eg-c-mantra   { grid-column: 4 / 7; grid-row: 2 / 4; }
  .eg-c-time     { grid-column: 1 / 4; grid-row: 3 / 4; }
  .eg-c-social-1 { grid-column: 1 / 2; grid-row: 4 / 5; }
  .eg-c-social-2 { grid-column: 2 / 3; grid-row: 4 / 5; }
  .eg-c-social-3 { grid-column: 3 / 4; grid-row: 4 / 5; }
  .eg-c-cta      { grid-column: 4 / 7; grid-row: 4 / 5; }
  .eg-c-github   { grid-column: 1 / 7; grid-row: 5 / 6; }
  .eg-c-tech     { grid-column: 1 / 7; grid-row: 6 / 7; }

  .eg-about-role { font-size: clamp(1.6rem, 3.5vw, 2.2rem); }
  .eg-about-desc { font-size: 0.82rem; }
  
  /* Social icons - make taller on tablet */
  .eg-social-single { 
    height: 65px;
  }
  .eg-social-icon { width: 26px; height: 26px; }
}

/* ── MOBILE (< 768px) ── */
@media (max-width: 767px) {
  .eg-section { padding: 2.5rem 1rem 0.75rem; }

  .eg-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-template-rows: auto 184px 184px 98px 210px 230px;
    gap: 0.45rem;
  }
  .eg-c-about    { grid-column: 1 / 7; grid-row: 1 / 2; min-height: 300px; }
  .eg-c-playing  { grid-column: 1 / 4; grid-row: 2 / 3; }
  .eg-c-mantra   { grid-column: 4 / 7; grid-row: 2 / 3; }
  .eg-c-time     { grid-column: 1 / 7; grid-row: 3 / 4; }
  .eg-c-social-1 { grid-column: 1 / 3; grid-row: 4 / 5; }
  .eg-c-social-2 { grid-column: 3 / 5; grid-row: 4 / 5; }
  .eg-c-social-3 { grid-column: 5 / 7; grid-row: 4 / 5; }
  .eg-c-github   { grid-column: 1 / 7; grid-row: 5 / 6; }
  .eg-c-tech     { grid-column: 1 / 7; grid-row: 6 / 7; }

  /* Content tweaks */
  .eg-about { padding: 16px 18px; gap: 10px; }
  .eg-about-role { font-size: clamp(1.5rem, 7vw, 2rem); }
  .eg-about-desc { 
    font-size: 0.78rem; 
    line-height: 1.6; 
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .eg-stat { padding: 8px 10px; }
  .eg-stat-val { font-size: 0.95rem; }
  .eg-stat-label { font-size: 9px; }
  .eg-mantra { padding: 18px; }
  .eg-mantra-body { gap: 12px; justify-content: space-between; padding-top: 14px; }
  .eg-mantra-text { font-size: clamp(1rem, 4vw, 1.2rem); font-weight: 800; line-height: 1.5; }
  .eg-mantra-attr { font-size: 10px; }
  .eg-big-quote { font-size: 5.5rem; }
  .eg-playing { padding: 16px; gap: 14px; }
  .eg-pill { gap: 5px; padding: 4px 8px 4px 7px; }
  .eg-pill-text { font-size: 8px; letter-spacing: 0.12em; white-space: nowrap; }
  .eg-playing-content { gap: 14px; }
  .eg-album-img { width: 64px; height: 64px; }
  .eg-playing-title { font-size: 1rem; font-weight: 800; }
  .eg-playing-artist { font-size: 0.74rem; line-height: 1.5; }
  .eg-time { padding: 16px; gap: 12px; }
  .eg-clock-time { font-size: 1.18rem; font-weight: 900; }
  .eg-clock-zone { font-size: 10px; font-weight: 700; }
  .eg-clock-hint { font-size: 10px; font-weight: 700; }
  .eg-status-label { font-size: 0.95rem; font-weight: 900; line-height: 1.3; }
  .eg-time-status { gap: 3px; margin-top: 4px; }
  .eg-status-sub { font-size: 0.76rem; padding-left: 14px; line-height: 1.3; font-weight: 600; }
  .eg-watermark-247 { font-size: 3.5rem; }
  .eg-github { padding: 16px; gap: 12px; min-height: 0; }
  .eg-github-header { gap: 8px; align-items: flex-start; }
  .eg-gh-cell { width: 9px; height: 9px; }
  .eg-github-grid-wrap { 
    scrollbar-width: none; 
    overflow-x: auto;
    overflow-y: hidden;
    align-items: flex-start;
    padding-bottom: 4px;
  }
  .eg-github-grid-wrap::-webkit-scrollbar { display: none; }
  .eg-github-meta { 
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 10px; 
    margin-top: auto;
    flex-wrap: wrap;
  }
  .eg-github-count, .eg-github-last { 
    font-size: 9px; 
    line-height: 1.4;
  }
  .eg-tech { padding: 16px; gap: 14px; min-height: 0; }
  .eg-tech-sub { font-size: 0.88rem; line-height: 1.7; }
  .eg-tech-marquee-wrap {
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    align-items: center;
  }
  .eg-tech-marquee {
    display: flex;
    gap: 12px;
    width: max-content;
    animation: eg-marquee 30s linear infinite;
  }
  .eg-tech-item:nth-child(n + 11) { display: flex; }
  .eg-tech-item { gap: 6px; }
  .eg-tech-tile { width: 40px; height: 40px; border-radius: 10px; }
  .eg-tech-icon { width: 18px; height: 18px; }
  .eg-tech-name {
    opacity: 0;
    font-size: 7px;
    text-align: center;
    line-height: 1.2;
  }
  .eg-cta { padding: 14px 16px; }
  .eg-cta-heading { display: none; }
  .eg-cta-arrow { width: 32px; height: 32px; }
  
  /* Hide CTA card completely on mobile */
  .eg-c-cta { display: none; }
  
  /* Make social icons much bigger and bolder on mobile */
  .eg-social-single {
    width: 100%;
    height: 100%;
    min-height: 98px;
    border-radius: 16px;
    color: rgba(255,255,255,0.62);
  }
  .eg-social-icon {
    width: 30px;
    height: 30px;
    stroke-width: 2.25;
  }
}

/* ── SMALL MOBILE (< 480px) ── */
@media (max-width: 479px) {
  .eg-grid { gap: 0.35rem; }
  .eg-section { padding: 2rem 0.75rem 0.5rem; }
  .eg-about-role { font-size: clamp(1.3rem, 8vw, 1.7rem); }
  .eg-about-desc { font-size: 0.76rem; }
  .eg-clock-time { font-size: 0.82rem; letter-spacing: -0.05em; }
  .eg-playing-title { font-size: 0.8rem; }
  .eg-album-img { width: 48px; height: 48px; }
  .eg-pill { gap: 4px; padding: 4px 7px 4px 6px; }
  .eg-pill-text { font-size: 7px; letter-spacing: 0.1em; }
  .eg-status-label { font-size: 0.92rem; }
  .eg-stat-label { font-size: 8px; }
  .eg-grid { grid-template-rows: auto 190px 195px 92px 210px 230px; }
  .eg-social-single { min-height: 92px; }
  .eg-social-icon { width: 28px; height: 28px; }
  .eg-gh-cell { width: 8px; height: 8px; }
  .eg-tech-marquee { gap: 10px; }
  .eg-tech-sub { font-size: 0.84rem; }
  .eg-time { padding: 14px; gap: 10px; }
  .eg-clock-time { font-size: 0.78rem; letter-spacing: -0.05em; }
  .eg-clock-zone { font-size: 9px; }
  .eg-clock-hint { font-size: 9px; }
  .eg-status-label { font-size: 0.88rem; font-weight: 800; line-height: 1.2; }
  .eg-time-status { gap: 2px; margin-top: 3px; }
  .eg-status-sub { font-size: 0.70rem; padding-left: 14px; line-height: 1.2; font-weight: 600; }
  .eg-mantra { padding: 16px; }
  .eg-mantra-body { padding-top: 12px; }
  .eg-mantra-text { font-size: 0.96rem; }
}

/* ── REDUCED MOTION ── */
@media (prefers-reduced-motion: reduce) {
  .eg-tech-marquee,
  .eg-wave-bar,
  .eg-album-pulse,
  .eg-status-dot { animation: none !important; }
  
  /* Skip entrance animation entirely */
  .eg-card {
    opacity: 1;
    transform: translateY(0) scale(1);
    transition: none;
  }
}

* { box-sizing: border-box; }
      `}</style>

      <div id="about" className="eg-section" ref={sectionRef}>
        <div ref={ref} className="eg-grid">
          <Card className="eg-c-about" cardIndex={0}>     <CardAbout />      </Card>
          <Card className="eg-c-mantra" cardIndex={1}>    <CardMantra />     </Card>
          <Card className="eg-c-playing" cardIndex={2}>   <CardNowPlaying /> </Card>
          <Card className="eg-c-time" cardIndex={3}>      <CardTime />       </Card>

          <Card className="eg-c-social-1" cardIndex={4}>
            <CardSocialIcon icon={XIcon} href="https://twitter.com/_elijahemmanuel" label="X" />
          </Card>
          <Card className="eg-c-social-2" cardIndex={5}>
            <CardSocialIcon icon={LinkedIn} href="https://linkedin.com/in/elijahemmanuel" label="LinkedIn" />
          </Card>
          <Card className="eg-c-social-3" cardIndex={6}>
            <CardSocialIcon icon={HashNode} href="https://hashnode.com/@elijah-hash" label="Hashnode" />
          </Card>
          <Card className="eg-c-social-4" cardIndex={7}>
            <CardSocialIcon icon={GithubIcon} href="https://github.com/Elijah-hash7" label="GitHub" />
          </Card>

          <Card className="eg-c-cta" cardIndex={8}>       <CardCTA />        </Card>
          <Card className="eg-c-github" cardIndex={9}>    <CardGithub />     </Card>
          <Card className="eg-c-tech" cardIndex={10}>     <CardTechStack />  </Card>
        </div>
      </div>
    </>
  );
}
