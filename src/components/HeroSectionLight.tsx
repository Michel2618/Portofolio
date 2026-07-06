import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import styles from './HeroSectionLight.module.css';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';

export default async function HeroSection() {
    // ── Fetch current project status from 'timeline' collection ──
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

    // ── Fetch CV download URL from 'contact/main' ──
    let cvUrl: string | null = null;
    try {
        const docRef = doc(db, 'contact', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            cvUrl = docSnap.data()?.cvUrl ?? null;
        }
    } catch (error) {
        console.error('Error fetching CV URL from Firebase:', error);
    }

    return (
        <section className={styles.heroWrapper} id="home">
            {/* ── Floating Colored Dots Decoration ── */}
            <span className={`${styles.floatingDot} ${styles.dotGreen1}`} />
            <span className={`${styles.floatingDot} ${styles.dotGreen2}`} />
            <span className={`${styles.floatingDot} ${styles.dotGreen3}`} />
            <span className={`${styles.floatingDot} ${styles.dotGreen4}`} />
            <span className={`${styles.floatingDot} ${styles.dotBlue1}`} />
            <span className={`${styles.floatingDot} ${styles.dotBlue2}`} />
            <span className={`${styles.floatingDot} ${styles.dotBlue3}`} />
            <span className={`${styles.floatingDot} ${styles.dotRed1}`} />
            <span className={`${styles.floatingDot} ${styles.dotRed2}`} />
            <span className={`${styles.floatingDot} ${styles.dotYellow1}`} />
            <span className={`${styles.floatingDot} ${styles.dotYellow2}`} />
            <span className={`${styles.floatingDot} ${styles.dotCoral1}`} />

            {/* ── Main Hero Content ── */}
            <div className={styles.heroMain}>
                {/* Left Column: Text & CTAs */}
                <div className={styles.heroLeft}>
                    <span className={styles.welcomeBadge}>Welcome</span>

                    <h1 className={styles.heroTitle}>
                        I have <span className="heading-accent">Creative</span>{' '}
                        <span className="heading-accent">Design</span> Experience
                    </h1>

                    <p className={styles.heroDescription}>
                        I&apos;m Michel, a creative Product Designer. I&apos;ve been helping
                        businesses to solve their problems with my design for 2 years.
                    </p>

                    <div className={styles.ctaGroup}>
                        <Link href="#contacts" className={styles.ctaPrimary}>
                            Contact Me
                        </Link>

                        <Link href="#projects" className={styles.ctaSecondary}>
                            View Portfolio{' '}
                            <span className={styles.ctaArrow}>↗</span>
                        </Link>
                    </div>

                    {/* Current status snippet */}
                    <div className={styles.statusSnippet}>
                        <span className={styles.statusDot} />
                        <span>
                            Currently working on <strong>{currentProject}</strong>
                        </span>
                    </div>
                </div>

                {/* Right Column: Photo Frame + Social Strip */}
                <div className={styles.heroRight}>
                    <div className={styles.photoFrame}>
                        <div className={styles.photoGreenBg} />
                        <div className={styles.photoBlackBorder} />
                        <div className={styles.profileImageWrapper}>
                            <Image
                                src="/profile_pic.png"
                                alt="Michel Ruwishka"
                                width={300}
                                height={360}
                                className={styles.profileImage}
                                priority
                            />
                        </div>
                    </div>

                    {/* ── Follow Me On: Social Strip ── */}
                    <div className={styles.socialStrip}>
                        <span className={styles.followText}>Follow me on:</span>
                        <span className={styles.followLine} />
                        <div className={styles.socialIcons}>
                            <a
                                href="https://www.facebook.com/share/1CHxczWhCt/?mibextid=wwXIfr"
                                className={styles.socialIconLink}
                                aria-label="Facebook"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href="https://www.instagram.com/mr_ruwishka"
                                className={styles.socialIconLink}
                                aria-label="Instagram"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/michel-ruwishka/"
                                className={styles.socialIconLink}
                                aria-label="LinkedIn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Stats Bar ── */}
            <div className={styles.statsBar}>
                <div className={styles.statItem}>
                    <div className={styles.statNumber}>80+</div>
                    <div className={styles.statLabel}>Satisfied clients</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statNumber}>200+</div>
                    <div className={styles.statLabel}>Projects completed</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statNumber}>99+</div>
                    <div className={styles.statLabel}>Reviews given</div>
                </div>
            </div>
        </section>
    );
}
