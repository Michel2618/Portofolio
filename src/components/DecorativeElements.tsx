import styles from './DecorativeElements.module.css';

/** A 5×5 grid of dots */
export function DotGrid({ className = '' }: { className?: string }) {
    return (
        <div className={`${styles.dotGrid} ${className}`}>
            {Array.from({ length: 25 }).map((_, i) => (
                <span key={i} className={styles.dot} />
            ))}
        </div>
    );
}

/** A single outlined square */
export function OutlineSquare({
    size = 80,
    color = 'secondary',
    className = '',
}: {
    size?: number;
    color?: 'secondary' | 'green' | 'purple';
    className?: string;
}) {
    return (
        <div
            className={`${styles.outlineSquare} ${styles[`color-${color}`]} ${className}`}
            style={{ width: size, height: size }}
        />
    );
}

/** Two overlapping outlined rectangles (the bracket/L-shape element) */
export function OverlapBoxes({
    className = '',
    color = 'green',
}: {
    className?: string;
    color?: 'green' | 'purple' | 'secondary';
}) {
    return (
        <div className={`${styles.overlapBoxes} ${styles[`color-${color}`]} ${className}`}>
            <div className={styles.overlapOuter} />
            <div className={styles.overlapInner} />
        </div>
    );
}
