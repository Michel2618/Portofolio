import styles from './ContactsSection.module.css';
import { DotGrid, OutlineSquare, OverlapBoxes } from './DecorativeElements';

export default function ContactsSection() {
    return (
        <section className={`container ${styles.contactsSection}`} id="contacts">
            {/* Decorative elements */}
            <DotGrid className={styles.bgDots1} />
            <OutlineSquare size={90} color="secondary" className={styles.bgSquare1} />
            <OverlapBoxes color="purple" className={styles.bgOverlap1} />

            <div className={styles.sectionHeader}>
                <h2 className="font-mono text-2xl">
                    <span className="heading-accent">#</span>contacts
                    <span className={styles.headerLine}></span>
                </h2>
            </div>

            <div className={styles.contactsContent}>
                <div className={styles.contactsText}>
                    <p>
                        I&apos;m actively looking for new opportunities in software engineering. Whether you want to collaborate on a digital platform, talk about smart home integrations, or discuss a freelance project, my inbox is always open.
                    </p>
                </div>

                <div className={styles.contactsBox}>
                    <h3 className={styles.boxTitle}>Message me here</h3>
                    <div className={styles.contactMethods}>
                        <a href="mailto:elias@elias-dev.ml" className={styles.contactItem}>
                            <span className={styles.icon}>@</span> elias@elias-dev.ml
                        </a>
                        <a href="#" className={styles.contactItem}>
                            <span className={styles.icon}>#</span> Elias#4321
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
