import { Github, Dribbble, Figma, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
import styles from './SocialSidebar.module.css';

export default function SocialSidebar() {
    return (
        <div className={styles.sidebar}>
            {/* L-shaped connector: horizontal arm → vertical arm → icons */}
            <div className={styles.lConnector}>
                <div className={styles.lineH}></div>
                <div className={styles.lineV}></div>
            </div>
            <div className={styles.icons}>
                <a href="https://github.com/Michel2618" className={styles.iconLink} aria-label="Github: https://github.com/Michel2618">
                    <Github size={24} />
                </a>
                <a href="#" className={styles.iconLink} aria-label="Dribbble: Add your link here">
                    <Dribbble size={24} />
                </a>
                <a href="https://www.figma.com/@michelruwishka1" className={styles.iconLink} aria-label="Figma: https://www.figma.com/@michelruwishka1">
                    <Figma size={24} />
                </a>
                <a href="https://www.linkedin.com/in/michel-ruwishka/" className={styles.iconLink} aria-label="LinkedIn: https://www.linkedin.com/in/michel-ruwishka/">
                    <Linkedin size={24} />
                </a>
                <a href="https://www.instagram.com/mr_ruwishka?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className={styles.iconLink} aria-label="Instagram: https://www.instagram.com/mr_ruwishka?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                    <Instagram size={24} />
                </a>
                <a href="https://www.facebook.com/share/1CHxczWhCt/?mibextid=wwXIfr" className={styles.iconLink} aria-label="Facebook: https://www.facebook.com/share/1CHxczWhCt/?mibextid=wwXIfr">
                    <Facebook size={24} />
                </a>
                <a href="#" className={styles.iconLink} aria-label="Youtube: Add your link here">
                    <Youtube size={24} />
                </a>
            </div>
        </div>
    );
}
