'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Preloader.module.css';

/** Michel logo paths */
const LOGO_PATHS = [
  {
    d: 'M34 305 C18 240, 14 130, 48 45 C62 14, 98 12, 122 45 L 214 158 L 310 25 L 352 64 L 412 16',
    delay: '0.1s',
  },
  {
    d: 'M96 305 C82 245, 80 160, 95 105 L 172 202 C188 222, 222 222, 238 202 L 282 148',
    delay: '0.4s',
  },
  { d: 'M324 116 L 408 205 L 320 298', delay: '0.8s' },
];

type Phase = 'loading' | 'entering' | 'exiting' | 'idle';

export default function Preloader() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('loading');
  const [mode, setMode] = useState<'initial' | 'route'>('initial');

  const phaseRef = useRef<Phase>('loading');
  const pathRef = useRef(pathname);
  const initialDoneRef = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const go = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };
  const later = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
    return t;
  };
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  /* 1. First page load */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    const minDuration = 1800;
    const start = performance.now();
    let loaded = document.readyState === 'complete';
    let raf = 0;
    let finished = false;

    const onLoad = () => (loaded = true);
    window.addEventListener('load', onLoad);
    const failsafe = setTimeout(() => (loaded = true), 8000);

    const finish = () => {
      if (finished) return;
      finished = true;
      go('exiting');
      later(() => {
        html.style.overflow = prevHtml;
        body.style.overflow = prevBody;
        initialDoneRef.current = true;
        go('idle');
      }, 700);
    };

    const tick = (now: number) => {
      const t = Math.min((now - start) / minDuration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const p = Math.min(eased, loaded ? 1 : 0.94);
      if (p >= 1) finish();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
      window.removeEventListener('load', onLoad);
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* 2. Route transitions */
  const startRoute = () => {
    if (!initialDoneRef.current || phaseRef.current === 'entering') return;
    clearTimers();
    setMode('route');
    go('entering');
    // Safety: never get stuck if navigation stalls
    later(() => {
      go('exiting');
      later(() => go('idle'), 600);
    }, 3800);
  };

  // Page changed → fade out
  useEffect(() => {
    if (pathRef.current === pathname) return;
    pathRef.current = pathname;
    if (!initialDoneRef.current) return;

    clearTimers();
    later(() => {
      go('exiting');
      later(() => go('idle'), 600);
    }, 150);
  }, [pathname]);

  // Detect navigation
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement)?.closest('a');
      if (!a || a.target === '_blank') return;

      const href = a.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      if (/^(mailto:|tel:|javascript:)/.test(href)) return;

      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.search === window.location.search) return;
        startRoute();
      } catch { }
    };

    const onCustom = () => startRoute();
    const onPop = () => {
      // Ignore hash-only back/forward
      if (window.location.pathname !== pathRef.current) startRoute();
    };

    document.addEventListener('click', onClick, { capture: true });
    window.addEventListener('portfolio:route-start', onCustom);
    window.addEventListener('popstate', onPop);
    return () => {
      document.removeEventListener('click', onClick, { capture: true });
      window.removeEventListener('portfolio:route-start', onCustom);
      window.removeEventListener('popstate', onPop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => clearTimers, []);

  if (phase === 'idle') return null;

  const isInitial = mode === 'initial';

  return (
    <div
      className={[
        styles.root,
        phase === 'exiting' ? styles.exiting : '',
        phase === 'entering' ? styles.entering : '',
      ].join(' ')}
      role="status"
      aria-live="polite"
      aria-label={isInitial ? 'Loading portfolio' : 'Navigating'}
    >
      <div className={styles.content}>
        <svg
          className={`${styles.logo} ${isInitial ? '' : styles.logoPulse}`}
          viewBox="-15 -10 465 340"
          aria-hidden="true"
        >
          {LOGO_PATHS.map((p, i) => (
            <g key={i}>
              <path d={p.d} className={styles.track} />
              <path
                d={p.d}
                pathLength={100}
                className={isInitial ? styles.draw : styles.drawn}
                style={isInitial ? { animationDelay: p.delay } : undefined}
              />
            </g>
          ))}
        </svg>

      </div>
    </div>
  );
}