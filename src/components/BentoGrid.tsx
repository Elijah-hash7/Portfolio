'use client';

import { useState, useEffect, useRef, type ComponentType, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { LinkedIn } from './icons/Linkedln';

type ClassValue = string | false | null | undefined;
type IconProps = { className?: string; style?: CSSProperties };
type BadgeClassName = { component?: string; icon?: string };

function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(' ');
}

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

const UserIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const QuoteIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
  </svg>
);

const SignalIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M2 20h.01M7 20v-4M12 20V10M17 20V4M22 20v-8" />
  </svg>
);

// ── BADGE ──────────────────────────────────────────────────────────────────

function BentoBadge({
  icon: Icon,
  text,
  className = {},
}: {
  icon: ComponentType<IconProps>;
  text?: string;
  className?: BadgeClassName;
}) {
  return (
    <div className={cn(
      'z-10 flex items-center gap-2 shrink-0 bento-badge',
      text ? 'py-1.5 pl-3 pr-4 rounded-full' : 'p-2 rounded-full',
      className.component
    )}>
      <Icon className={cn('size-3.5', className.icon)} />
      {text && <span className="text-[10px] uppercase tracking-[0.15em] text-zinc-500" style={{ fontFamily: 'var(--font-mono)' }}>{text}</span>}
    </div>
  );
}

// ── CARD SHELL ─────────────────────────────────────────────────────────────

function BentoCard({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={cn('card group rounded-2xl', className)} style={style}>
      <div className="card-content absolute inset-px rounded-2xl flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// ── CARD 1: MOTTO ─────────────────────────────────────────────────────────

function BentoItemMotto() {
  return (
    <div className="relative flex h-full flex-col justify-between p-5 overflow-hidden">
      <div className="absolute -bottom-4 -right-2 font-black select-none pointer-events-none leading-none"
        style={{ fontSize: "9rem", color: "rgba(190,242,100,0.04)", fontFamily: 'var(--font-display)', lineHeight: 1 }}>
        "
      </div>
      <BentoBadge icon={QuoteIcon} text="Mantra" className={{ component: "w-fit" }} />
      <div className="space-y-3">
        <p className="text-slate-100 leading-snug" style={{ fontFamily: 'var(--font-display)', fontSize: "1.05rem", letterSpacing: "-0.01em" }}>
          "Build systems that don't wake you up at 3am."
        </p>
        <div className="h-px w-8" style={{ background: "rgba(190,242,100,0.25)" }} />
        <p className="text-[9px] uppercase tracking-[0.2em]" style={{ color: "#4a8a4c", fontFamily: 'var(--font-mono)' }}>
          Elijah Emmanuel
        </p>
      </div>
    </div>
  );
}

// ── CARD 2: ABOUT ME ──────────────────────────────────────────────────────

function BentoItemAbout() {
  return (
    <div className="relative flex h-full flex-col justify-between p-6 overflow-hidden">
      <div className="absolute bottom-0 right-0 pointer-events-none" style={{
        width: 220, height: 220,
        background: "radial-gradient(circle, rgba(190,242,100,0.04) 0%, transparent 70%)",
      }} />
      <div className="flex items-start justify-between">
        <BentoBadge icon={UserIcon} text="About" className={{ component: "w-fit" }} />
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-white font-semibold" style={{ fontFamily: 'var(--font-display)', fontSize: "1.6rem", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Versatile Developer
          </p>
        </div>
        <p className="text-slate-400 leading-relaxed" style={{ fontSize: "0.82rem", fontFamily: 'var(--font-sans)' }}>
          I'm a backend-focused developer who enjoys building APIs, experimenting with Web3,
          and figuring out how systems actually work behind the scenes.
          Most of my time goes into learning, building projects, and turning ideas into
          working software.
        </p>
        <div className="grid grid-cols-3 gap-3 pt-1">
          {[
            { value: "2+", label: "Years Building" },
            { value: "Web3", label: "Ecosystem" },
            { value: "24/7", label: "Active" },
          ].map(({ value, label }) => (
            <div key={label} className="rounded-xl p-3 space-y-0.5" style={{ background: "rgba(190,242,100,0.03)", border: "1px solid rgba(190,242,100,0.07)" }}>
              <p className="text-slate-100 font-bold" style={{ fontFamily: 'var(--font-display)', fontSize: "1.1rem", letterSpacing: "-0.02em" }}>{value}</p>
              <p className="text-[9px] uppercase tracking-wider" style={{ color: "#4a8a4c", fontFamily: 'var(--font-mono)' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── CARD 3: AVAILABILITY ──────────────────────────────────────────────────

function BentoItemUptime() {
  const [now, setNow] = useState(new Date());
  const EMMANUEL_TIMEZONE = "Africa/Lagos";
  const visitorTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const emmanuelHour = new Date(
    now.toLocaleString("en-US", { timeZone: EMMANUEL_TIMEZONE })
  ).getHours();

  const formatTime = (tz: string) =>
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: true, timeZone: tz,
    }).format(now);

  const getShortTZ = (tz: string) => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZoneName: "short", timeZone: tz,
    }).formatToParts(now);
    return parts.find((p) => p.type === "timeZoneName")?.value || tz;
  };

  const status = (() => {
    const h = emmanuelHour;
    if (h >= 9 && h < 18) return { dot: "#00e5a0", label: "Elijah is likely awake", sub: "Probably shipping something right now.", color: "#bef264" };
    if (h >= 18 && h < 21) return { dot: "#fbbf24", label: "Elijah just closed his laptop", sub: "Might still reply. Might not. 50/50.", color: "#fbbf24" };
    if (h >= 21 || h < 3) return { dot: "#9d7fff", label: "Elijah is most likely coding", sub: "The best bugs get fixed at midnight. Don't ask why.", color: "#c4b5fd" };
    if (h >= 3 && h < 6) return { dot: "#94a3b8", label: "Elijah is definitely asleep", sub: "Even backend devs need sleep. Allegedly.", color: "#cbd5e1" };
    return { dot: "#fb923c", label: "Elijah is making coffee", sub: "First commit of the day incoming.", color: "#fb923c" };
  })();

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-5">
      <span className="absolute right-3 bottom-1 select-none pointer-events-none font-bold leading-none"
        style={{ fontSize: "5.6rem", color: "rgba(190,242,100,0.04)", fontFamily: 'var(--font-display)' }}>
        24/7
      </span>
      <BentoBadge icon={SignalIcon} text="Availability" className={{ component: "w-fit" }} />
      <div className="flex items-center justify-between gap-3 mt-4">

        {/* Visitor side */}
        <div className="flex flex-col gap-1.5">
          <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#4a7a4b", fontFamily: 'var(--font-mono)' }}>Your Time</p>
          <p className="font-semibold text-white leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: "1.35rem", letterSpacing: "-0.035em" }}>
            {formatTime(visitorTZ)}
          </p>
          <p className="text-[10px] tracking-wide" style={{ color: "#6aaa6b", fontFamily: 'var(--font-mono)' }}>{getShortTZ(visitorTZ)}</p>
        </div>

        {/* Arrow divider */}
        <div className="flex flex-col items-center gap-1.5 pb-1">
          <div className="h-px w-6" style={{ background: "rgba(190,242,100,0.2)" }} />
          <span style={{ color: "#4a7a4b", fontSize: "12px", fontFamily: 'var(--font-mono)' }}>→</span>
          <div className="h-px w-6" style={{ background: "rgba(190,242,100,0.2)" }} />
        </div>

        {/* Elijah side — unknown TZ with smile */}
        <div className="flex flex-col gap-1.5 items-end">
          <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#4a7a4b", fontFamily: 'var(--font-mono)' }}>Elijah's Time</p>
          <p className="font-semibold leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: "1.35rem", letterSpacing: "-0.035em", color: status.color }}>
            {formatTime(EMMANUEL_TIMEZONE)}
          </p>
          <p className="text-[10px] tracking-wide" style={{ color: "#6aaa6b", fontFamily: 'var(--font-mono)' }}>Unknown :)</p>
        </div>

      </div>

      {/* Status */}
      <div className="flex flex-col gap-1.5 mt-3">
        <div className="flex items-center gap-2.5">
          <span className="availability-dot" style={{
            width: 8, height: 8, borderRadius: "50%",
            background: status.dot, boxShadow: `0 0 10px ${status.dot}`,
            display: "inline-block", flexShrink: 0,
          }} />
          <p className="font-semibold" style={{ color: status.color, fontFamily: 'var(--font-sans)', fontSize: "0.85rem", letterSpacing: "-0.01em" }}>
            {status.label}
          </p>
        </div>
        <p className="italic pl-5" style={{ color: "#6aaa6b", fontFamily: 'var(--font-mono)', fontSize: "0.72rem" }}>{status.sub}</p>
      </div>
    </div>
  );
}

// ── CARD 4: NOW PLAYING ───────────────────────────────────────────────────

// ── PLACEHOLDER — replace with real Spotify API data when you get Premium
const SPOTIFY_PLACEHOLDER = {
  isPlaying: false,
  title: "Late Nights In Paris",
  artist: "Jaz Donell, 2Jayz",
  albumArt: "/album-art/late-night.png" as string | null,
  songUrl: "https://open.spotify.com",
};

function BentoItemNowPlaying() {
  const { isPlaying, title, artist, albumArt, songUrl } = SPOTIFY_PLACEHOLDER;

  return (
    <a
      href={songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group/sp relative flex h-full flex-col p-5 gap-3.5"
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] tracking-widest uppercase" style={{ color: "#a3b0c2", fontFamily: 'var(--font-mono)' }}>
          {isPlaying ? "● Now playing" : "Last played"}
        </span>
        <div className="bento-badge p-2 rounded-full">
          <SpotifyIcon className="size-3.5 transition-colors duration-300 group-hover/sp:text-green-400" />
        </div>
      </div>

      {/* Album art + track info */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 64, height: 64 }}>
          {albumArt ? (
            <img src={albumArt} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 50%, #16213e 100%)",
            }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5 overflow-hidden min-w-0">
          <p className="font-semibold text-slate-100 truncate" style={{ fontFamily: 'var(--font-display)', fontSize: "1.08rem", letterSpacing: "-0.025em" }}>
            {title}
          </p>
          <p className="truncate uppercase" style={{ fontFamily: 'var(--font-mono)', fontSize: "0.79rem", letterSpacing: "0.12em", color: "#a8b4c4" }}>
            {artist}
          </p>
        </div>
      </div>
    </a>
  );
}

// ── CARD 5: GITHUB ACTIVITY ───────────────────────────────────────────────

const WEEKS = 26;
const TODAY = new Date();
const FAKE_CELLS = Array.from({ length: WEEKS * 7 }, (_, i) => {
  const date = new Date(TODAY);
  date.setDate(TODAY.getDate() - (WEEKS * 7 - 1 - i));
  const r = Math.random();
  const count = r < 0.35 ? 0 : r < 0.55 ? Math.floor(Math.random() * 2) + 1
    : r < 0.75 ? Math.floor(Math.random() * 4) + 2
      : r < 0.90 ? Math.floor(Math.random() * 5) + 5
        : Math.floor(Math.random() * 8) + 8;
  return {
    count,
    date: date.toLocaleDateString("en-US", { month: "long", day: "numeric" }),
    level: count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4,
  };
});
const GH_PALETTE = ["#0d1f0e", "#173d19", "#1e5c21", "#26a62b", "#4ade50"];

type GhCell = { count: number; date: string; level: number };

function BentoItemGithubActivity() {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [ghData, setGhData] = useState<{
    cells: GhCell[];
    totalContributions: number;
    lastContributionDate: string | null;
  } | null>(null);

  useEffect(() => {
    const url = typeof window !== 'undefined'
      ? new URL('/api/github-contributions.json', window.location.origin).href
      : '/api/github-contributions.json';
    fetch(url)
      .then((r) => r.json())
      .then((data: { fallback?: boolean; cells?: GhCell[]; totalContributions?: number; lastContributionDate?: string | null }) => {
        if (data.fallback || !data.cells) {
          const total = FAKE_CELLS.reduce((s, c) => s + c.count, 0);
          setGhData({ cells: FAKE_CELLS, totalContributions: total, lastContributionDate: null });
        } else {
          setGhData({
            cells: data.cells,
            totalContributions: data.totalContributions ?? data.cells.reduce((s, c) => s + c.count, 0),
            lastContributionDate: data.lastContributionDate ?? null,
          });
        }
      })
      .catch(() => {
        const total = FAKE_CELLS.reduce((s, c) => s + c.count, 0);
        setGhData({ cells: FAKE_CELLS, totalContributions: total, lastContributionDate: null });
      });
  }, []);

  const cells = ghData?.cells ?? FAKE_CELLS;
  const totalContributions = ghData?.totalContributions ?? FAKE_CELLS.reduce((s, c) => s + c.count, 0);
  const lastPushText = ghData?.lastContributionDate
    ? new Date(ghData.lastContributionDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : null;

  return (
    <div className="flex h-full flex-col gap-3 p-5 relative">
      <div className="flex items-center justify-between">
        <BentoBadge icon={GithubIcon} text="Github activity" className={{ component: "w-fit" }} />
        <span className="text-[9px] tracking-widest" style={{ color: tooltip ? "#bef264" : "#4a7a4b", fontFamily: 'var(--font-mono)', transition: 'color 0.15s' }}>
          {tooltip ? tooltip.text : `${totalContributions.toLocaleString()} contributions · last year`}
        </span>
      </div>

      <div className="flex-1 flex items-center overflow-x-auto overflow-y-hidden min-h-0 gh-grid-scroll">
        <div className="flex-shrink-0" style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.ceil(cells.length / 7)}, 24px)`,
          gridTemplateRows: "repeat(7, 24px)",
          gap: 5,
        }}>
          {cells.map((cell, i) => (
            <div
              key={i}
              className="rounded-[2px] cursor-pointer transition-all duration-100 hover:brightness-150 hover:scale-110 flex-shrink-0"
              style={{ background: GH_PALETTE[cell.level] }}
              onMouseEnter={(e) => {
                const label = cell.count === 0
                  ? `No contributions on ${cell.date || "—"}`
                  : `${cell.count} contribution${cell.count > 1 ? "s" : ""} on ${cell.date}`;
                setTooltip({ text: label, x: e.clientX, y: e.clientY });
              }}
              onMouseMove={(e) => setTooltip(t => t ? { ...t, x: e.clientX, y: e.clientY } : t)}
              onMouseLeave={() => setTooltip(null)}
            />
          ))}
        </div>
      </div>

      <p className="text-[9px] tracking-wider" style={{ color: "#4a7a4b", fontFamily: 'var(--font-mono)' }}>
        {lastPushText ? `Last pushed · ${lastPushText}` : "Last pushed · —"}
      </p>

      {tooltip && typeof document !== 'undefined' && createPortal(
        <div className="fixed z-[9999] pointer-events-none px-2.5 py-1.5 rounded-lg text-[10px] font-medium"
          style={{
            left: tooltip.x + 12, top: tooltip.y - 36,
            background: "#0d1a0e", border: "1px solid rgba(190,242,100,0.25)",
            color: "#bef264", fontFamily: 'var(--font-mono)',
            whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(0,0,0,0.7)",
          }}>
          {tooltip.text}
        </div>,
        document.body
      )}
    </div>
  );
}

// ── CARD 6: TECH STACK ────────────────────────────────────────────────────

// Add/remove techs from this array freely
const TECH_STACK = [
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

const MARQUEE_ITEMS = [...TECH_STACK, ...TECH_STACK]; // duplicate for seamless loop

function TechStackMarquee() {
    return (
      <div
        className="relative w-full overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
      >
        <div className="flex gap-5 tech-marquee">
          {MARQUEE_ITEMS.map((tech, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 group/tech"
              style={{ minWidth: 44 }}
            >
              <div
                className="tech-tile flex items-center justify-center rounded-xl transition-all duration-300 group-hover/tech:scale-110"
                style={{
                  width: 40, height: 40,
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(190,242,100,0.1)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                <img
                  className="tech-tile-icon"
                  src={tech.icon}
                  alt={tech.name}
                  style={{
                    width: 20,
                    height: 20,
                    objectFit: 'contain',
                    filter: 'grayscale(1) brightness(1.9) contrast(1.05)',
                    opacity: 0.9,
                  }}
                />
              </div>
              {/* Tech name fades in on hover */}
              <span
                className="text-[8px] tracking-wide opacity-0 group-hover/tech:opacity-100 transition-opacity duration-200"
                style={{ color: "#8fbe91", fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
}

function BentoItemTechStack() {
    return (
      <div className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <BentoBadge icon={StackIcon} text="Tech stack" className={{ component: "w-fit" }} />
        </div>
        <div className="flex-grow flex items-center overflow-hidden">
          <TechStackMarquee />
        </div>
        <p className="text-[0.92rem] leading-relaxed" style={{ color: "#aab5c5", fontFamily: 'var(--font-sans)' }}>
        Primarily working within the JavaScript ecosystem — but always open to whatever stack gets the job done.
        </p>
      </div>
    );
}

// ── CARD 7: CTA ───────────────────────────────────────────────────────────

function BentoItemCTA() {
    return (
      <a href="/projects" className="group/cta nav-link flex size-full items-center justify-between px-5 py-4" data-nav>
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] mb-0.5" style={{ color: "#4a7a4b", fontFamily: 'var(--font-mono)' }}>Work</p>
          <p className="text-slate-300 text-sm font-medium" style={{ fontFamily: 'var(--font-display)', letterSpacing: "-0.02em" }}>Discover more projects</p>
        </div>
        <div className="flex items-center justify-center rounded-full transition-all duration-300 group-hover/cta:scale-110"
          style={{ width: 34, height: 34, border: "1px solid rgba(190,242,100,0.12)" }}>
          <ArrowRightIcon className="size-4 text-slate-600 transition-all duration-300 group-hover/cta:-rotate-45 group-hover/cta:text-lime-400" />
        </div>
      </a>
    );
}

// ── MAIN ───────────────────────────────────────────────────────────────────

export default function BentoGrid() {
    const bentoRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const bento = bentoRef.current;
      if (!bento) return;
      const onMove = (e: MouseEvent) => {
        for (const card of Array.from(bento.getElementsByClassName("card") as HTMLCollectionOf<HTMLElement>)) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
      };
      bento.addEventListener("mousemove", onMove);
      return () => bento.removeEventListener("mousemove", onMove);
    }, []);

    const socialMedias = [
      { icon: XIcon, href: 'https://twitter.com/_elijahemmanuel' },
      { icon: LinkedIn, href: 'https://linkedin.com/in/elijahemmanuel' },
      { icon: HashNode, href: 'https://hashnode.com/@elijah-hash' },
    ];

    return (
      <>
        <style>{`
:root {
  --lime:         #bef264;
  --card-bg:      #04070c;
  --card-border:  #0e1a0f;
  --font-sans:    'Geist', system-ui, sans-serif;
  --font-display: 'Geist', system-ui, sans-serif;
  --font-mono:    'Geist Mono', 'JetBrains Mono', monospace;
}

.card {
  background: var(--card-bg);
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.25s ease;
}
.card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-image:
    linear-gradient(rgba(190,242,100,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(190,242,100,0.025) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
  z-index: 1;
}
.card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  border-radius: inherit;
  pointer-events: none;
  transition: opacity 0.35s ease;
  background: radial-gradient(
    600px circle at var(--mx, 50%) var(--my, 50%),
    rgba(190,242,100,0.07),
    transparent 50%
  );
  z-index: 3;
}
.card:hover::before { opacity: 1; }
.card:hover {
  box-shadow:
    0 0 0 1px rgba(190,242,100,0.18),
    0 0 50px rgba(190,242,100,0.04),
    0 12px 48px rgba(0,0,0,0.7);
  transform: translateY(-1.5px);
}
.card > .card-content {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: inherit;
  flex-grow: 1;
  inset: 1px;
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 2;
}
.bento-badge {
  background: rgba(4,7,12,0.92);
  border: 1px solid rgba(190,242,100,0.1);
  backdrop-filter: blur(12px);
}
.social-icon { color: rgba(255,255,255,0.82); transition: color 0.2s ease; }
.card:hover .social-icon { color: #ffffff; }

@keyframes vinyl-spin { to { transform: rotate(360deg); } }
.vinyl-playing { animation: vinyl-spin 6s linear infinite; }

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
.availability-dot { animation: pulse-dot 2s ease-in-out infinite; }

.tech-tile {
  transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.tech-tile-icon {
  transition: filter 0.25s ease, opacity 0.25s ease, transform 0.25s ease;
}

.group\\/tech:hover .tech-tile {
  background: rgba(190,242,100,0.06);
  border-color: rgba(190,242,100,0.22);
  box-shadow: 0 0 20px rgba(190,242,100,0.08), inset 0 1px 0 rgba(255,255,255,0.05);
}

.group\\/tech:hover .tech-tile-icon {
  filter: grayscale(1) brightness(2.15) contrast(1.08);
  opacity: 1;
  transform: scale(1.04);
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.tech-marquee {
  animation: marquee 30s linear infinite;
  width: max-content;
}
.tech-marquee:hover { animation-play-state: paused; }

.gh-grid-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(190,242,100,0.3) rgba(255,255,255,0.04);
}
.gh-grid-scroll::-webkit-scrollbar { height: 6px; }
.gh-grid-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 3px; }
.gh-grid-scroll::-webkit-scrollbar-thumb { background: rgba(190,242,100,0.3); border-radius: 3px; }
.gh-grid-scroll::-webkit-scrollbar-thumb:hover { background: rgba(190,242,100,0.5); }

* { box-sizing: border-box; }
      `}</style>

      <div id="about" style={{ width: "100%", padding: `0 var(--page-gutter) 0.75rem`, paddingTop: "0.5rem" }}>
        <div
          ref={bentoRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, minmax(0,1fr))",
              gridTemplateRows: "160px 160px 96px 110px 110px",
              gap: "0.65rem",
              width: "100%",
              margin: "0 auto",
            }}
          >
            {/* ── ROW 1 ── */}
            <BentoCard style={{ gridColumn: "1 / 4", gridRow: "1 / 3" }}>
              <BentoItemMotto />
            </BentoCard>

            <BentoCard style={{ gridColumn: "4 / 9", gridRow: "1 / 3" }}>
              <BentoItemAbout />
            </BentoCard>

            <BentoCard style={{ gridColumn: "9 / 13", gridRow: "1 / 2" }}>
              <BentoItemNowPlaying />
            </BentoCard>

            {/* ── ROW 2 ── */}
            <div style={{ gridColumn: "1 / 4", gridRow: "3 / 4", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.55rem" }}>
              {socialMedias.map(({ icon: Icon, href }) => (
                <BentoCard key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="flex size-full items-center justify-center rounded-2xl">
                    <Icon className="size-7 social-icon" />
                  </a>
                </BentoCard>
              ))}
            </div>

            <BentoCard style={{ gridColumn: "4 / 9", gridRow: "3 / 4" }}>
              <BentoItemCTA />
            </BentoCard>

            <BentoCard style={{ gridColumn: "9 / 13", gridRow: "2 / 4" }}>
              <BentoItemUptime />
            </BentoCard>

            {/* ── ROW 3 ── */}
            <BentoCard style={{ gridColumn: "1 / 7", gridRow: "4 / 6" }}>
              <BentoItemGithubActivity />
            </BentoCard>

            <BentoCard style={{ gridColumn: "7 / 13", gridRow: "4 / 6" }}>
              <BentoItemTechStack />
            </BentoCard>
          </div>
        </div>
      </>
    );
  }
