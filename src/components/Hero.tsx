import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';
import { DotGrid, OutlineSquare, OverlapBoxes } from './DecorativeElements';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

export default async function Hero() {
    let currentProject = 'my next big idea';
    try {
        const q = query(
            collection(db, 'timeline'),
            where('isActive', '==', true),
            limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            currentProject = querySnapshot.docs[0].data().title;
        }
    } catch (error) {
        console.error('Error fetching current timeline project:', error);
    }

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
                    I am Michel Ruwishka, a <span className="heading-accent">software engineering</span> student and <span className="heading-accent">full-Stack developer</span>
                </h1>
                <p className={styles.subtitle}>
                    From leading full-stack software projects to building custom smart home automations, I love turning complex problems into elegant, responsive solutions.
                </p>
                <Link href="#contacts" className={styles.ctaButton}>
                    Contact me!!
                </Link>
            </div>

            <div className={styles.heroVisual}>
                <div className={styles.abstractGraphic}>
                    <div className={styles.shape1}></div>
                    <div className={styles.shape2}></div>
                    <div className={styles.profileImageWrapper}>
                        <Image
                            src="/profile_pic.png"
                            alt="Michel Ruwishka"
                            width={300}
                            height={300}
                            className={styles.profileImage}
                            priority
                        />
                    </div>
                </div>
                <div className={styles.codeSnippet}>
                    <span className={styles.codeGreenDot}></span>
                    <code>Currently working on <strong>{currentProject}</strong></code>
                </div>
            </div>
        </section>
    );
}
