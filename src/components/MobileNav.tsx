import { useState, useEffect, useRef } from 'react';

// ── ICONS ──────────────────────────────────────────────────────────────────

const WorkIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="size-5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
);

const ArticlesIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="size-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
);



// ── NAV ITEMS ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
    {
        id: 'work',
        label: 'Work',
        icon: WorkIcon,
        href: '/projects',
        external: false,
    },
    {
        id: 'articles',
        label: 'Articles',
        icon: ArticlesIcon,
        href: 'https://hashnode.com/@elijah-hash',
        external: true,
    },
];

// ── COMPONENT ──────────────────────────────────────────────────────────────

export default function MobileNav() {
    const [active, setActive] = useState<string | null>(null);
    const [visible, setVisible] = useState(true);   // fully visible
    const [peeking, setPeeking] = useState(false);   // just peeking (head out)
    const [suppressOnHero, setSuppressOnHero] = useState(true);
    const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetIdleTimer = () => {
        // Clear any existing timer
        if (idleTimer.current) clearTimeout(idleTimer.current);

        // Show fully
        setVisible(true);
        setPeeking(false);

        // After 4.5s of no interaction → peek mode
        idleTimer.current = setTimeout(() => {
            setVisible(false);
            setPeeking(true);
        }, 4500);
    };

    useEffect(() => {
        const syncActiveItem = () => {
            const { pathname, hostname } = window.location;

            const matchedItem = NAV_ITEMS.find((item) => {
                if (!item.external) return item.href === pathname;

                try {
                    return new URL(item.href).hostname === hostname;
                } catch {
                    return false;
                }
            });

            setActive(matchedItem?.id ?? null);
        };

        syncActiveItem();
        window.addEventListener('popstate', syncActiveItem);

        const onScroll = () => {
            // Going up or any scroll — show nav
            resetIdleTimer();
        };

        const onTouch = () => resetIdleTimer();
        const onPointer = () => resetIdleTimer();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('touchstart', onTouch, { passive: true });
        window.addEventListener('pointermove', onPointer, { passive: true });

        // Start the timer on mount
        resetIdleTimer();

        return () => {
            window.removeEventListener('popstate', syncActiveItem);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('touchstart', onTouch);
            window.removeEventListener('pointermove', onPointer);
            if (idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, []);

    useEffect(() => {
        const hero = document.getElementById('hero');
        if (!hero) {
            setSuppressOnHero(false);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry) return;
                setSuppressOnHero(entry.isIntersecting);
            },
            {
                threshold: 0.2,
            }
        );

        observer.observe(hero);

        return () => observer.disconnect();
    }, []);

    // translateY values
    // visible  → 0          (fully up)
    // peeking  → calc(100% - 10px)  (just the top edge visible)
    // hidden   → 100%       (fully gone) — we don't use this, peeking is the resting state
    const translateY = suppressOnHero
        ? 'calc(100% + 24px)'
        : visible
            ? '0px'
            : 'calc(100% - 10px)';

    return (
        <>
            {/* Only show on mobile */}
            <nav
                className="mobile-nav-root"
                style={{
                    transform: `translateY(${translateY})`,
                    transition: suppressOnHero
                        ? 'transform 0.25s ease'
                        : visible
                            ? 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'  // bouncy on show
                            : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',        // smooth on hide
                }}
                onPointerEnter={resetIdleTimer}
                onTouchStart={resetIdleTimer}
            >
                {/* Peek indicator — the little nub that sticks out */}
                <div className="nav-peek-nub" />

                {/* Main pill */}
                <div className="nav-pill">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = active === item.id;

                        return (
                            <a
                                key={item.id}
                                href={item.href}
                                target={item.external ? '_blank' : undefined}
                                rel={item.external ? 'noopener noreferrer' : undefined}
                                className={`nav-item ${isActive ? 'nav-item--active' : ''}`}
                                onClick={() => {
                                    resetIdleTimer();
                                }}
                            >
                                {/* Active background glow */}
                                {isActive && <span className="nav-item-bg" />}

                                <span className="nav-item-icon">
                                    <Icon />
                                </span>
                                <span className="nav-item-label">{item.label}</span>

                                {/* Active dot */}
                                {isActive && <span className="nav-item-dot" />}
                            </a>
                        );
                    })}
                </div>
            </nav>

            <style>{`
        /* ── Only render on mobile ── */
        .mobile-nav-root {
          display: none;
        }

        @media (max-width: 768px) {
          .mobile-nav-root {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1200;
            padding-bottom: env(safe-area-inset-bottom, 12px);
            pointer-events: none; /* let clicks through to the pill only */
            will-change: transform;
          }

          /* The little nub that peeks out when hidden */
          .nav-peek-nub {
            width: 34px;
            height: 3px;
            border-radius: 2px;
            background: rgba(190, 242, 100, 0.35);
            margin-bottom: 6px;
            flex-shrink: 0;
          }

          /* Main pill container */
          .nav-pill {
            pointer-events: all;
            display: flex;
            align-items: center;
            gap: 3px;
            padding: 5px 6px;
            border-radius: 9999px;
            background: rgba(4, 7, 12, 0.92);
            border: 1px solid rgba(190, 242, 100, 0.12);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-shadow:
              0 0 0 1px rgba(190, 242, 100, 0.06),
              0 8px 32px rgba(0, 0, 0, 0.6),
              0 2px 8px rgba(0, 0, 0, 0.4);
            margin-bottom: 10px;
            width: min(calc(100vw - 5rem), 16.5rem);
            justify-content: space-between;
          }

          /* Each nav item */
          .nav-item {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2px;
            padding: 7px 10px;
            border-radius: 9999px;
            text-decoration: none;
            color: rgba(255, 255, 255, 0.4);
            transition: color 0.2s ease;
            min-width: 52px;
            flex: 1 1 0;
            will-change: transform;
          }

          .nav-item:active {
            transform: scale(0.94);
            transition: transform 0.1s ease;
          }

          /* Active glow bg */
          .nav-item-bg {
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            background: rgba(190, 242, 100, 0.08);
            border: 1px solid rgba(190, 242, 100, 0.14);
          }

          .nav-item--active {
            color: #bef264;
          }

          .nav-item-icon {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          .nav-item--active .nav-item-icon {
            transform: translateY(-1px) scale(1.08);
            filter: drop-shadow(0 0 6px rgba(190, 242, 100, 0.5));
          }

          .nav-item-label {
            position: relative;
            z-index: 1;
            font-size: 8px;
            font-family: 'Geist Mono', 'JetBrains Mono', monospace;
            font-weight: 500;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            transition: opacity 0.2s ease;
          }

          .nav-item-icon svg {
            width: 18px;
            height: 18px;
          }

          /* Active green dot indicator */
          .nav-item-dot {
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%);
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background: #bef264;
            box-shadow: 0 0 6px rgba(190, 242, 100, 0.8);
            animation: dot-pulse 2s ease-in-out infinite;
          }

          @keyframes dot-pulse {
            0%, 100% { opacity: 1; box-shadow: 0 0 6px rgba(190, 242, 100, 0.8); }
            50% { opacity: 0.5; box-shadow: 0 0 2px rgba(190, 242, 100, 0.3); }
          }
        }
      `}</style>
        </>
    );
}
