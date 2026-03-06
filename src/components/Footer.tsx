import Link from 'next/link';
import Image from 'next/image';
import { Github, Figma, Linkedin, MessageSquare } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
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
                        <p className={styles.title}>Web designer and front-end developer</p>
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
