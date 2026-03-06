import Link from 'next/link';
import styles from './AboutSection.module.css';

export default function AboutSection() {
    return (
        <section className={`container ${styles.aboutSection}`} id="about-me">
            <div className={styles.sectionHeader}>
                <h2 className="font-mono text-2xl">
                    <span className="heading-accent">#</span>about-me
                    <span className={styles.headerLine}></span>
                </h2>
            </div>

            <div className={styles.aboutContent}>
                <div className={styles.aboutText}>
                    <p>Hello, i'm Elias!</p>
                    <br />
                    <p>
                        I'm a self-taught front-end developer based in Kyiv, Ukraine.
                        I can develop responsive websites from scratch and raise them into modern user-friendly web experiences.
                    </p>
                    <br />
                    <p>
                        Transforming my creativity and knowledge into a websites has been my passion for over a year. I have been helping various clients to establish their presence online. I always strive to learn about the newest technologies and frameworks.
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
