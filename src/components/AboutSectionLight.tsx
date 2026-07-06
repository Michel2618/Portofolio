import Link from 'next/link';
import styles from './AboutSectionLight.module.css';
import { DotGrid, OutlineSquare, OverlapBoxes } from './DecorativeElements';

export default function AboutSectionLight() {
    return (
        <section className={`container ${styles.aboutSection}`} id="about-me">
            {/* Decorative elements */}
            <DotGrid className={styles.bgDots1} />
            <OutlineSquare size={105} color="secondary" className={styles.bgSquare1} />
            <OutlineSquare size={60} color="secondary" className={styles.bgSquare2} />

            <div className={styles.sectionHeader}>
                <h2 className="font-mono text-2xl">
                    <span className="heading-accent">#</span>about-me
                    <span className={styles.headerLine}></span>
                </h2>
            </div>

            <div className={styles.aboutContent}>
                <div className={styles.aboutText}>
                    <p>Hello, i&apos;m Michel!</p>
                    <br />
                    <p>
                        I&apos;m a second-year Software Engineering student at IIT Sri Lanka, passionate about bridging the gap between digital design and physical technology.
                    </p>
                    <br />
                    <p>
                        When I&apos;m not writing code for modern web applications or leading group development projects, you can usually find me building DIY electronics and experimenting with smart home automations. I love exploring how software and hardware interact to solve real-world problems, and I am always eager to take on new technical challenges.
                    </p>
                    <Link href="#about" className={styles.readMoreBtn}>
                        Read more -&gt;
                    </Link>
                </div>

                <div className={styles.aboutVisual}>
                    {/* Abstract visual representation instead of image */}
                    <div className={styles.abstractGraphic}>
                        <div className={styles.grid}></div>
                        <div className={styles.dot}></div>
                        <div className={styles.dot2}></div>
                        <div className={styles.dot3}></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
