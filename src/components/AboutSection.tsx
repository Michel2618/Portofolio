import Link from 'next/link';
import styles from './AboutSection.module.css';
import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
    return (
        <section className={`container ${styles.aboutSection}`} id="about-me">
            {/* ── Decorative dots ── */}
            <div className={styles.decoDotsTopRight}>
                {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} />
                ))}
            </div>
            <div className={styles.decoDotsBottomLeft}>
                {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} />
                ))}
            </div>
            <span className={styles.decoDotPurple} />
            <span className={styles.decoDotGreen} />

            <div className={styles.aboutContent}>
                <ScrollReveal className={`${styles.aboutText} revealLeft delay1`} visibleClass="visible">
                    <span className={styles.sectionBadge}>About Me</span>
                    <h2 className={styles.sectionTitle}>
                        Hello, I&apos;m <span className={styles.accent}>Michel!</span>
                    </h2>
                    <div className={styles.sectionDesc}>
                        <p>
                            I&apos;m a second-year Software Engineering student at IIT Sri Lanka, passionate about bridging the gap between digital design and physical technology.
                        </p>
                        <br />
                        <p>
                            When I&apos;m not writing code for modern web applications or leading group development projects, you can usually find me building DIY electronics and experimenting with smart home automations. I love exploring how software and hardware interact to solve real-world problems, and I am always eager to take on new technical challenges.
                        </p>
                        </div>
                        <Link href="#about" className={styles.readMoreBtn}>
                            Read more
                        </Link>
                </ScrollReveal>

                <ScrollReveal className={`${styles.aboutVisual} revealRight delay2`} visibleClass="visible">
                    {/* Abstract visual representation instead of image */}
                    <div className={`${styles.abstractGraphic} animate-float`}>
                        <div className={styles.grid}></div>
                        <div className={`${styles.dot} animate-pulse`}></div>
                        <div className={`${styles.dot2} animate-pulse delay1`}></div>
                        <div className={`${styles.dot3} animate-pulse delay2`}></div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
