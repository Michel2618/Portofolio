import { Github, Dribbble, Figma, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
import styles from './SocialSidebar.module.css';

export default function SocialSidebar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.line}></div>
            <div className={styles.icons}>
                <a href="#" className={styles.iconLink} aria-label="Github: Add your link here">
                    <Github size={24} />
                </a>
                <a href="#" className={styles.iconLink} aria-label="Dribbble: Add your link here">
                    <Dribbble size={24} />
                </a>
                <a href="#" className={styles.iconLink} aria-label="Figma: Add your link here">
                    <Figma size={24} />
                </a>
                <a href="#" className={styles.iconLink} aria-label="LinkedIn: Add your link here">
                    <Linkedin size={24} />
                </a>
                <a href="#" className={styles.iconLink} aria-label="Instagram: Add your link here">
                    <Instagram size={24} />
                </a>
                <a href="#" className={styles.iconLink} aria-label="Facebook: Add your link here">
                    <Facebook size={24} />
                </a>
                <a href="#" className={styles.iconLink} aria-label="Youtube: Add your link here">
                    <Youtube size={24} />
                </a>
            </div>
        </div>
    );
}
