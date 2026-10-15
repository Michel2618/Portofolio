'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './Preloader.module.css';

interface TypedPart {
  text: string;
  type: 'plain' | 'token' | 'tokenGreen' | 'tokenBlue';
}

interface TerminalLine {
  prompt: string;
  parts: TypedPart[];
  typed: string; // how many chars have been typed so far
}

type RawLine = Omit<TerminalLine, 'typed'>;

/* ──────────────────────────────────────────────
   Terminal lines to "type" in sequence
   ────────────────────────────────────────────── */
const LINES: RawLine[] = [
  { prompt: '~$', parts: [{ text: 'whoami', type: 'tokenGreen' }] },
  { prompt: '  ', parts: [{ text: 'Michel Ruwishka — Full-Stack Developer', type: 'plain' }] },
  { prompt: '~$', parts: [{ text: 'loading', type: 'tokenGreen' }, { text: ' portfolio', type: 'plain' }, { text: '.tsx', type: 'token' }] },
  { prompt: '  ', parts: [{ text: '✓ ', type: 'tokenGreen' }, { text: 'dependencies resolved', type: 'plain' }] },
  { prompt: '  ', parts: [{ text: '✓ ', type: 'tokenGreen' }, { text: 'firebase initialized', type: 'plain' }] },
  { prompt: '  ', parts: [{ text: '→ ', type: 'tokenBlue' }, { text: 'ready  ', type: 'tokenGreen' }] },
];

/** Chars per second for the typing animation */
const TYPING_SPEED = 38;
/** Pause between lines in ms */
const LINE_PAUSE = 180;

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [termLines, setTermLines] = useState<TerminalLine[]>([
    { ...LINES[0], typed: '' },
  ]);

  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Typing engine ── */
  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;

    const fullText = (line: (typeof LINES)[0]) =>
      line.parts.map((p) => p.text).join('');

    const tick = () => {
      const currentLine = LINES[lineIdx];
      const full = fullText(currentLine);

      if (charIdx < full.length) {
        charIdx++;
        const typed = full.slice(0, charIdx);

        setTermLines((prev) => {
          const updated = [...prev];
          updated[lineIdx] = { ...currentLine, typed };
          return updated;
        });

        // progress mapped to lines
        const totalChars = LINES.reduce((s, l) => s + fullText(l).length, 0);
        const doneChars = LINES.slice(0, lineIdx).reduce((s, l) => s + fullText(l).length, 0) + charIdx;
        setProgress(Math.round((doneChars / totalChars) * 100));

        animRef.current = setTimeout(tick, 1000 / TYPING_SPEED);
      } else if (lineIdx < LINES.length - 1) {
        // move to next line
        lineIdx++;
        charIdx = 0;
        setTermLines((prev) => [
          ...prev,
          { ...LINES[lineIdx], typed: '' },
        ]);
        animRef.current = setTimeout(tick, LINE_PAUSE);
      } else {
        // all done — wait then fade out
        setProgress(100);
        animRef.current = setTimeout(() => {
          setVisible(false);
          setTimeout(() => setHidden(true), 650);
        }, 600);
      }
    };

    animRef.current = setTimeout(tick, 400);
    return () => {
      if (animRef.current) clearTimeout(animRef.current);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`${styles.overlay} ${!visible ? styles.hidden : ''}`}
      aria-label="Loading portfolio"
      role="status"
    >
      {/* Soft glow behind terminal */}
      <div className={styles.glow} />

      {/* Terminal window */}
      <div className={styles.terminal}>
        {/* Title bar */}
        <div className={styles.titleBar}>
          <span className={`${styles.dot} ${styles.red}`} />
          <span className={`${styles.dot} ${styles.yellow}`} />
          <span className={`${styles.dot} ${styles.green}`} />
          <span className={styles.titleText}>michel@portfolio ~ bash</span>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {termLines.map((line, i) => {
            const isLastLine = i === termLines.length - 1;
            const isFinished = !visible; // after done flag

            /* Render typed chars back into coloured parts */
            let charsLeft = line.typed.length;
            const renderedParts: React.ReactNode[] = [];
            for (let p = 0; p < line.parts.length; p++) {
              const part = line.parts[p];
              const slice = part.text.slice(0, charsLeft);
              charsLeft -= slice.length;

              if (!slice) break;

              const cls =
                part.type === 'token'
                  ? styles.token
                  : part.type === 'tokenGreen'
                  ? styles.tokenGreen
                  : part.type === 'tokenBlue'
                  ? styles.tokenBlue
                  : styles.lineText;

              renderedParts.push(
                <span key={p} className={cls}>
                  {slice}
                </span>
              );
            }

            return (
              <div key={i} className={styles.line}>
                <span className={styles.prompt}>{line.prompt}</span>
                {renderedParts}
                {/* cursor only on actively-typing last line */}
                {isLastLine && !isFinished && (
                  <span className={styles.cursor} aria-hidden />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div className={styles.progressRow}>
        <span className={styles.progressLabel}>{progress}%</span>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
