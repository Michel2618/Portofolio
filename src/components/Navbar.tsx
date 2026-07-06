'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
    const [visible, setVisible] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const lastScrollY = useRef(0);
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            // Show when scrolling up OR near top of page
            if (currentY < lastScrollY.current || currentY < 80) {
                setVisible(true);
            } else {
                setVisible(false);
                setMobileOpen(false); // close mobile menu when hiding
            }
            lastScrollY.current = currentY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${visible ? styles.headerVisible : styles.headerHidden}`}>
            <div className={styles.navContainer}>
                <div className={styles.logo}>
                    <Link href="/" className={styles.logoLink}>
                        <Image
                            src="/michel_site_logo.png"
                            alt="Michel Logo"
                            width={70}
                            height={70}
                            className={styles.logoImage}
                        />
                        Michel
                    </Link>
                </div>

                <nav className={`${styles.navLinks} ${mobileOpen ? styles.navLinksOpen : ''}`}>
                    <Link href="#home" onClick={() => setMobileOpen(false)}>
                        <span className="heading-accent">#</span>home
                    </Link>
                    <Link href="#works" onClick={() => setMobileOpen(false)}>
                        <span className="heading-accent">#</span>works
                    </Link>
                    <Link href="#about-me" onClick={() => setMobileOpen(false)}>
                        <span className="heading-accent">#</span>about-me
                    </Link>
                    <Link href="#contacts" onClick={() => setMobileOpen(false)}>
                        <span className="heading-accent">#</span>contacts
                    </Link>

                    <div className={styles.languageSelector}>
                        EN <span className={styles.dropdownArrow}>▼</span>
                    </div>

                    <button 
                        onClick={toggleTheme} 
                        aria-label="Toggle theme"
                        style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '16px' }}
                    >
                        {mounted ? (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />) : <Sun size={20} style={{ opacity: 0 }} />}
                    </button>
                </nav>

                <button
                    className={styles.mobileMenuBtn}
                    aria-label="Toggle menu"
                    onClick={() => setMobileOpen(prev => !prev)}
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </header>
    );
}
