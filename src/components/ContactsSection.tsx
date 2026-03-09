import styles from './ContactsSection.module.css';
import { DotGrid, OutlineSquare, OverlapBoxes } from './DecorativeElements';
import { getContacts } from '../lib/notion';

export default async function ContactsSection() {
    const contactsData = await getContacts();

    // Fallbacks to original content in case Notion is empty or fails
    const sectionTitle = contactsData?.sectionTitle || 'contacts';
    const mainText = contactsData?.mainText || "I'm actively looking for new opportunities in software engineering. Whether you want to collaborate on a digital platform, talk about smart home integrations, or discuss a freelance project, my inbox is always open.";
    const email = contactsData?.email || 'michelruwishka@gmail.com';
    const discord = contactsData?.discord || 'michel0468';

    return (
        <section className={`container ${styles.contactsSection}`} id="contacts">
            {/* Decorative elements */}
            <DotGrid className={styles.bgDots1} />
            <OutlineSquare size={90} color="secondary" className={styles.bgSquare1} />
            <OverlapBoxes color="purple" className={styles.bgOverlap1} />

            <div className={styles.sectionHeader}>
                <h2 className="font-mono text-2xl">
                    <span className="heading-accent">#</span>{sectionTitle.toLowerCase()}
                    <span className={styles.headerLine}></span>
                </h2>
            </div>

            <div className={styles.contactsContent}>
                <div className={styles.contactsText}>
                    <p>
                        {mainText}
                    </p>
                </div>

                <div className={styles.contactsBox}>
                    <h3 className={styles.boxTitle}>Message me here</h3>
                    <div className={styles.contactMethods}>
                        <a href={`mailto:${email}`} className={styles.contactItem}>
                            <span className={styles.icon}>@</span> {email}
                        </a>
                        <a href="#" className={styles.contactItem}>
                            <span className={styles.icon}>#</span> {discord}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
