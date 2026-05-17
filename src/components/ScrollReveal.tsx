'use client';

import { useEffect, useRef } from 'react';

/**
 * Wraps children in a div that becomes `.visible` when scrolled into view.
 * Accepts a CSS module `className` that should contain the reveal animation
 * (e.g. revealLeft, revealRight, revealUp) plus a `visibleClass`.
 */
export default function ScrollReveal({
    children,
    className = '',
    visibleClass = '',
    threshold = 0.15,
}: {
    children: React.ReactNode;
    className?: string;
    visibleClass?: string;
    threshold?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add(visibleClass);
                    observer.unobserve(el);
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [visibleClass, threshold]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
