'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
    const [visible, setVisible] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const lastScrollY = useRef(0);
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

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

    // Smoothly scroll if navigating to a hash target from an external route
    useEffect(() => {
        if (pathname === '/' && typeof window !== 'undefined' && window.location.hash) {
            const targetId = window.location.hash.replace('#', '');
            if (targetId === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const el = document.getElementById(targetId);
                if (el) {
                    setTimeout(() => {
                        el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            }
        }
    }, [pathname]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        setMobileOpen(false);
        if (pathname === '/') {
            e.preventDefault();
            if (targetId === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.pushState(null, '', '/');
            } else {
                const el = document.getElementById(targetId);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', `#${targetId}`);
                }
            }
        }
    };

    return (
        <header className={`${styles.header} ${visible ? styles.headerVisible : styles.headerHidden} ${styles.headerAnimate}`}>
            <div className={styles.navContainer}>
                <div className={styles.logo}>
                    <Link 
                        href="/" 
                        className={styles.logoLink}
                        onClick={(e) => {
                            if (pathname === '/') {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                window.history.pushState(null, '', '/');
                            }
                        }}
                    >
                        <Image
                            src="/michel_site_logo.png"
                            alt="Michel Logo"
                            width={70}
                            height={70}
                            priority
                            className={styles.logoImage}
                        />
                        Michel
                    </Link>
                </div>

                <nav className={`${styles.navLinks} ${mobileOpen ? styles.navLinksOpen : ''}`}>
                    <Link href="/#home" onClick={(e) => handleNavClick(e, 'home')}>
                        <span className="heading-accent">#</span>home
                    </Link>
                    <Link href="/#works" onClick={(e) => handleNavClick(e, 'works')}>
                        <span className="heading-accent">#</span>works
                    </Link>
                    <Link href="/#about-me" onClick={(e) => handleNavClick(e, 'about-me')}>
                        <span className="heading-accent">#</span>about-me
                    </Link>
                    <Link href="/#contacts" onClick={(e) => handleNavClick(e, 'contacts')}>
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
