"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollToTop.module.css";

export default function ScrollToTop() {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(pct);
            setVisible(scrollTop > 200);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // SVG circle maths
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (progress / 100) * circumference;

    return (
        <button
            className={`${styles.btn} ${visible ? styles.visible : ""}`}
            onClick={scrollToTop}
            aria-label="Back to top"
        >
            {/* Progress ring */}
            <svg
                className={styles.ring}
                width="56"
                height="56"
                viewBox="0 0 56 56"
                aria-hidden="true"
            >
                {/* Track */}
                <circle
                    cx="28"
                    cy="28"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="3"
                />
                {/* Progress */}
                <circle
                    cx="28"
                    cy="28"
                    r={radius}
                    fill="none"
                    stroke="var(--accent-green)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    transform="rotate(-90 28 28)"
                />
            </svg>

            {/* Arrow icon */}
            <svg
                className={styles.arrow}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <polyline points="18 15 12 9 6 15" />
            </svg>
        </button>
    );
}
