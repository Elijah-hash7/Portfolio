import { useEffect, useRef } from "react";

export default function TileSurface() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const desktopPointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const maybeCanvas = canvasRef.current;
    if (!maybeCanvas) return;
    const canvas: HTMLCanvasElement = maybeCanvas;

    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    const SIZE = 28;
    const GAP = 4;
    const STEP = SIZE + GAP;
    const CURSOR_FOLLOW_EASE = 0.3;
    const GLOW_RESPONSE_EASE = 0.24;
    const C1 = { r: 163, g: 230, b: 53 };
    const C2 = { r: 132, g: 204, b: 22 };

    let W: number, H: number;
    let plates: { x: number; y: number; glow: number; phase: number }[] = [];

    let mouse = { x: -9999, y: -9999 };
    let smooth = { x: -9999, y: -9999 };
    let hasMouseEntered = false;
    let cursorFollowEnabled = desktopPointerQuery.matches;

    let time = 0;
    let rafId: number;

    // Sweep state
    let sweepX = -1;
    let sweepActive = false;
    let lastSweep = 0;
    const SWEEP_INTERVAL = 7000;
    const SWEEP_SPEED = 1.5;
    const SWEEP_WIDTH = 220;

    function build() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const cols = Math.ceil(W / STEP) + 2;
      const rows = Math.ceil(H / STEP) + 2;
      plates = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          plates.push({
            x: c * STEP,
            y: r * STEP,
            glow: 0,
            phase: c * 0.3 + r * 0.5,
          });
        }
      }
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function tick(timestamp: number) {
      rafId = requestAnimationFrame(tick);
      time += 0.012;

      // Snap smooth to mouse on very first movement — no lerp lag
      if (hasMouseEntered && smooth.x === -9999) {
        smooth.x = mouse.x;
        smooth.y = mouse.y;
      }
      smooth.x = lerp(smooth.x, mouse.x, CURSOR_FOLLOW_EASE);
      smooth.y = lerp(smooth.y, mouse.y, CURSOR_FOLLOW_EASE);

      // Trigger sweep every SWEEP_INTERVAL ms
      if (!sweepActive && timestamp - lastSweep > SWEEP_INTERVAL) {
        sweepActive = true;
        sweepX = -60;
        lastSweep = timestamp;
      }
      if (sweepActive) {
        sweepX += SWEEP_SPEED;
        if (sweepX > W + 60) {
          sweepActive = false;
          lastSweep = timestamp; // start the 7s rest timer RIGHT when it finishes
        }
      }

      ctx.fillStyle = "#070707";
      ctx.fillRect(0, 0, W, H);

      const REACH = 180;

      for (const p of plates) {
        const cx = p.x + SIZE * 0.5;
        const cy = p.y + SIZE * 0.5;

        // Cursor proximity
        const dx = cx - smooth.x;
        const dy = cy - smooth.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const prox = dist < REACH ? Math.pow(1 - dist / REACH, 2) : 0;
        p.glow = lerp(p.glow, prox, GLOW_RESPONSE_EASE);

        // Sweep contribution — bell curve across sweep front
        let sweepGlow = 0;
        if (sweepActive) {
          const sdx = cx - sweepX;
          sweepGlow = Math.max(0, 1 - Math.abs(sdx) / SWEEP_WIDTH);
          sweepGlow = Math.pow(sweepGlow, 2) * 0.55;
        }

        const totalGlow = Math.min(1, p.glow + sweepGlow);

        // Idle wave
        const wave = Math.sin(time * 0.9 + p.phase) * 0.5 + 0.5;
        const idleOpacity = 0.028 + wave * 0.016;
        const opacity = idleOpacity + totalGlow * 0.72;

        const r = Math.round(lerp(200, lerp(C1.r, C2.r, totalGlow), Math.min(1, totalGlow * 3)));
        const g = Math.round(lerp(200, lerp(C1.g, C2.g, totalGlow), Math.min(1, totalGlow * 3)));
        const b = Math.round(lerp(200, lerp(C1.b, C2.b, totalGlow), Math.min(1, totalGlow * 3)));

        const inset = totalGlow * 2.5;

        // Radial bloom
        if (totalGlow > 0.08) {
          const spread = SIZE * (1 + totalGlow * 0.7);
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, spread);
          grad.addColorStop(0, `rgba(${C1.r},${C1.g},${C1.b},${totalGlow * 0.14})`);
          grad.addColorStop(1, `rgba(${C1.r},${C1.g},${C1.b},0)`);
          ctx.fillStyle = grad;
          ctx.fillRect(cx - spread, cy - spread, spread * 2, spread * 2);
        }

        // Plate fill
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity * 0.13})`;
        ctx.fillRect(p.x + inset, p.y + inset, SIZE - inset * 2, SIZE - inset * 2);

        // Plate border
        ctx.strokeStyle = `rgba(${r},${g},${b},${opacity})`;
        ctx.lineWidth = 0.6 + totalGlow * 0.9;
        ctx.strokeRect(
          p.x + inset + 0.5,
          p.y + inset + 0.5,
          SIZE - inset * 2 - 1,
          SIZE - inset * 2 - 1,
        );

        // Corner accent
        if (totalGlow > 0.12) {
          ctx.strokeStyle = `rgba(${C1.r},${C1.g},${C1.b},${totalGlow * 0.55})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x + inset + 2, p.y + inset + SIZE * 0.35);
          ctx.lineTo(p.x + inset + 2, p.y + inset + 2);
          ctx.lineTo(p.x + inset + SIZE * 0.35, p.y + inset + 2);
          ctx.stroke();
        }
      }

      
      if (sweepActive) {
        const sg = ctx.createLinearGradient(sweepX - SWEEP_WIDTH, 0, sweepX + SWEEP_WIDTH, 0);
        sg.addColorStop(0, "rgba(163,230,53,0)");
        sg.addColorStop(0.45, "rgba(163,230,53,0.018)");
        sg.addColorStop(0.5, "rgba(200,255,80,0.045)");
        sg.addColorStop(0.55, "rgba(163,230,53,0.018)");
        sg.addColorStop(1, "rgba(163,230,53,0)");
        ctx.fillStyle = sg;
        ctx.fillRect(0, 0, W, H);
      }
    }

    // Listen on WINDOW — not canvas — so pointer-events:none on the wrapper never breaks it
    const resetPointerState = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      smooth.x = -9999;
      smooth.y = -9999;
      hasMouseEntered = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!cursorFollowEnabled) return;
      if (!hasMouseEntered) {
        // Snap on very first movement so there's zero lerp delay
        smooth.x = e.clientX;
        smooth.y = e.clientY;
        hasMouseEntered = true;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      if (!cursorFollowEnabled) return;
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => build();
    const onPointerCapabilityChange = (event: MediaQueryListEvent) => {
      cursorFollowEnabled = event.matches;
      if (!cursorFollowEnabled) resetPointerState();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);
    desktopPointerQuery.addEventListener("change", onPointerCapabilityChange);

    build();
    // First sweep fires 1.5 s after load — not immediate
    lastSweep = performance.now() - SWEEP_INTERVAL + 1500;
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      desktopPointerQuery.removeEventListener("change", onPointerCapabilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}
