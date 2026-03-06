import Link from 'next/link';
import styles from './Hero.module.css';
import { DotGrid, OutlineSquare, OverlapBoxes } from './DecorativeElements';

export default function Hero() {
    return (
        <section className={`container ${styles.hero}`} id="home">
            {/* Background decorative scatter */}
            <DotGrid className={styles.bgDots1} />
            <OutlineSquare size={100} color="secondary" className={styles.bgSquare1} />
            <OverlapBoxes color="green" className={styles.bgOverlap1} />
            <DotGrid className={styles.bgDots2} />
            <OutlineSquare size={60} color="secondary" className={styles.bgSquare2} />

            <div className={styles.heroContent}>
                <h1 className={styles.title}>
                    Elias is a <span className="heading-accent">web designer</span> and <span className="heading-accent">front-end developer</span>
                </h1>
                <p className={styles.subtitle}>
                    He crafts responsive websites where technologies meet creativity
                </p>
                <Link href="#contacts" className={styles.ctaButton}>
                    Contact me!!
                </Link>
            </div>

            <div className={styles.heroVisual}>
                <div className={styles.abstractGraphic}>
                    <div className={styles.shape1}></div>
                    <div className={styles.shape2}></div>
                    {/* Decorative ascii or simple shapes to emulate the style */}
                    <div className={styles.codeSnippet}>
                        <code>{`const me = {\n  design: true,\n  code: true\n};`}</code>
                    </div>
                </div>
            </div>
        </section>
    );
}
