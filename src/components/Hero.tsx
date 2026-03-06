import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={`container ${styles.hero}`} id="home">
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
