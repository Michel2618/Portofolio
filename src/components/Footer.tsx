import Link from 'next/link';
import Image from 'next/image';
import { Github, Figma, MessageSquare } from 'lucide-react';
import styles from './Footer.module.css';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function Footer() {
    let cvUrl: string | null = null;
    try {
        const docRef = doc(db, 'contact', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            cvUrl = docSnap.data()?.cvUrl ?? '#';
        }
    } catch (error) {
        console.error('Error fetching CV URL from Firebase:', error);
        cvUrl = '#';
    }

    // Ensure we always have a fallback so the component renders
    if (!cvUrl) cvUrl = '#';

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>
                <div className={styles.footerTop}>
                    <div className={styles.footerInfo}>
                        <div className={styles.footerIdentity}>
                            <div className={styles.logoWrapper}>
                                <Image src="/michel_site_logo.png" alt="Michel Logo" width={32} height={32} />
                            </div>
                            <span className={styles.name}>Michel</span>
                            <span className={styles.email}>michelruwishka@gmail.com</span>
                        </div>
                        <p className={styles.title}>Web designer and full-stack developer</p>
                        {cvUrl && (
                            <div className={styles.cvLinkWrapper}>
                                <a href={cvUrl} target="_blank" rel="noopener noreferrer" className={styles.cvLink}>
                                    Download the CV
                                </a>
                            </div>
                        )}
                    </div>

                    <div className={styles.footerMedia}>
                        <h3 className={styles.mediaTitle}>Media</h3>
                        <div className={styles.socialLinks}>
                            <a href="https://github.com/Michel2618" aria-label="Github"><Github size={20} /></a>
                            <a href="#" aria-label="Figma"><Figma size={20} /></a>
                            <a href="#" aria-label="Discord"><MessageSquare size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>© Copyright 2026. Made by Michel</p>
                </div>
            </div>
        </footer>
    );
}
