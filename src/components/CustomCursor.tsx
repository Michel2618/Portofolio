'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './CustomCursor.module.css';

const INTERACTIVE_SELECTORS = 'a, button, [role="button"], input, textarea, select, label[for]';

export default function CustomCursor() {
    const innerRef = useRef<HTMLDivElement>(null);
    const outerRef = useRef<HTMLDivElement>(null);
    const position = useRef({ x: -100, y: -100 });
    const outerPosition = useRef({ x: -100, y: -100 });
    const rafId = useRef<number>(0);
    const [hovering, setHovering] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [hasMouse, setHasMouse] = useState(false);

    // Lerp helper
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Animation loop for the trailing outer ring
    const animateOuter = useCallback(() => {
        outerPosition.current.x = lerp(outerPosition.current.x, position.current.x, 0.12);
        outerPosition.current.y = lerp(outerPosition.current.y, position.current.y, 0.12);

        if (outerRef.current) {
            outerRef.current.style.left = `${outerPosition.current.x}px`;
            outerRef.current.style.top = `${outerPosition.current.y}px`;
        }

        rafId.current = requestAnimationFrame(animateOuter);
    }, []);

    useEffect(() => {
        // Only enable on mouse/pointer devices
        const mediaQuery = window.matchMedia('(pointer: fine)');
        if (!mediaQuery.matches) return;

        setHasMouse(true);

        const onMouseMove = (e: MouseEvent) => {
            position.current.x = e.clientX;
            position.current.y = e.clientY;

            if (innerRef.current) {
                innerRef.current.style.left = `${e.clientX}px`;
                innerRef.current.style.top = `${e.clientY}px`;
            }
        };

        const onMouseEnterViewport = () => setHidden(false);
        const onMouseLeaveViewport = () => setHidden(true);

        const onHoverIn = () => setHovering(true);
        const onHoverOut = () => setHovering(false);

        // Add event listeners for interactive elements
        const addHoverListeners = () => {
            const elements = document.querySelectorAll(INTERACTIVE_SELECTORS);
            elements.forEach((el) => {
                el.addEventListener('mouseenter', onHoverIn);
                el.addEventListener('mouseleave', onHoverOut);
            });
        };

        const removeHoverListeners = () => {
            const elements = document.querySelectorAll(INTERACTIVE_SELECTORS);
            elements.forEach((el) => {
                el.removeEventListener('mouseenter', onHoverIn);
                el.removeEventListener('mouseleave', onHoverOut);
            });
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseenter', onMouseEnterViewport);
        document.addEventListener('mouseleave', onMouseLeaveViewport);

        addHoverListeners();

        // Use MutationObserver to re-bind hover listeners when DOM changes
        const observer = new MutationObserver(() => {
            removeHoverListeners();
            addHoverListeners();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Start the animation loop
        rafId.current = requestAnimationFrame(animateOuter);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseenter', onMouseEnterViewport);
            document.removeEventListener('mouseleave', onMouseLeaveViewport);
            removeHoverListeners();
            observer.disconnect();
            cancelAnimationFrame(rafId.current);
        };
    }, [animateOuter]);

    // Don't render anything on touch devices
    if (!hasMouse) return null;

    const innerClasses = [
        styles.cursorInner,
        hovering ? styles.hovering : '',
        hidden ? styles.hidden : '',
    ]
        .filter(Boolean)
        .join(' ');

    const outerClasses = [
        styles.cursorOuter,
        hovering ? styles.hovering : '',
        hidden ? styles.hidden : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <>
            <div ref={innerRef} className={innerClasses}>
                <span className={styles.cursorDot} />
            </div>
            <div ref={outerRef} className={outerClasses} />
        </>
    );
}
