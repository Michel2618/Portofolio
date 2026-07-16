import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import styles from './HeroSection.module.css';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import ScrollReveal from './ScrollReveal';

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
            <span className={`${styles.floatingDot} ${styles.dotGreen1} animate-pulse`} />
            <span className={`${styles.floatingDot} ${styles.dotGreen2} animate-float delay1`} />
            <span className={`${styles.floatingDot} ${styles.dotGreen3} animate-pulse delay2`} />
            <span className={`${styles.floatingDot} ${styles.dotGreen4} animate-float delay3`} />
            <span className={`${styles.floatingDot} ${styles.dotBlue1} animate-pulse`} />
            <span className={`${styles.floatingDot} ${styles.dotBlue2} animate-float delay2`} />
            <span className={`${styles.floatingDot} ${styles.dotBlue3} animate-pulse delay1`} />
            <span className={`${styles.floatingDot} ${styles.dotRed1} animate-float`} />
            <span className={`${styles.floatingDot} ${styles.dotRed2} animate-pulse delay3`} />
            <span className={`${styles.floatingDot} ${styles.dotYellow1} animate-float delay1`} />
            <span className={`${styles.floatingDot} ${styles.dotYellow2} animate-pulse delay2`} />
            <span className={`${styles.floatingDot} ${styles.dotCoral1} animate-float`} />

            {/* ── Main Hero Content ── */}
            <div className={styles.heroMain}>
                {/* Left Column: Text & CTAs */}
                <ScrollReveal className="revealLeft" visibleClass="visible">
                    <div className={styles.heroLeft}>
                        <span className={styles.welcomeBadge}>Welcome</span>

                        <h1 className={styles.heroTitle}>
                            I build <span className="heading-accent">Innovative</span>{' '}
                            <span className="heading-accent">Software</span> Solutions
                        </h1>

                        <p className={styles.heroDescription}>
                            I&apos;m Michel, a Software Engineer and Full Stack Developer with a passion for hardware prototyping. I&apos;ve been helping teams build scalable applications and bring creative technical ideas to life.
                        </p>

                        <div className={styles.ctaGroup}>
                            <Link href="#contacts" className={styles.ctaPrimary}>
                                Contact Me
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
                </ScrollReveal>

                {/* Right Column: Photo Frame + Social Strip */}
                <ScrollReveal className="revealRight delay1" visibleClass="visible">
                    <div className={styles.heroRight}>
                        <div className={`${styles.photoFrame} animate-float`}>
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
                                    href="https://www.instagram.com/m.ruwishka/"
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
                </ScrollReveal>
            </div>


        </section>
    );
}
