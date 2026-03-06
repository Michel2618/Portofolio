import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { Menu } from 'lucide-react';

export default function Navbar() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.navContainer}`}>
                <div className={styles.logo}>
                    <Link href="/" className={styles.logoLink}>
                        <Image src="/michel_site_logo.png" alt="Michel Logo" width={50} height={50} className={styles.logoImage} />
                        Michel
                    </Link>
                </div>

                <nav className={styles.navLinks}>
                    <Link href="#home"><span className="heading-accent">#</span>home</Link>
                    <Link href="#works"><span className="heading-accent">#</span>works</Link>
                    <Link href="#about-me"><span className="heading-accent">#</span>about-me</Link>
                    <Link href="#contacts"><span className="heading-accent">#</span>contacts</Link>

                    <div className={styles.languageSelector}>
                        EN <span className={styles.dropdownArrow}>▼</span>
                    </div>
                </nav>

                <button className={styles.mobileMenuBtn} aria-label="Toggle menu">
                    <Menu size={24} />
                </button>
            </div>
        </header>
    );
}
