import styles from './ContactsSection.module.css';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import CVButton from './CVButton';
import ScrollReveal from './ScrollReveal';

export default async function ContactsSection() {
    let contactsData: any = null;
    try {
        const docRef = doc(db, 'contact', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            contactsData = docSnap.data();
        }
    } catch (error) {
        console.error("Error fetching contact info from Firebase:", error);
    }

    // Fallbacks to original content in case Firebase is empty or fails
    const sectionTitle = contactsData?.sectionTitle || 'contacts';
    const mainText = contactsData?.mainDescription || "I'm actively looking for new opportunities in software engineering. Whether you want to collaborate on a digital platform, talk about smart home integrations, or discuss a freelance project, my inbox is always open.";
    const email = contactsData?.email || 'michelruwishka@gmail.com';
    const WhatsApp = contactsData?.whatsappNumber || '+94 71 110 8984';

    return (
        <section className={`container ${styles.contactsSection}`} id="contacts">
            {/* ── Decorative dots ── */}
            <div className={styles.decoDotsTopRight}>
                {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} />
                ))}
            </div>
            <div className={styles.decoDotsBottomLeft}>
                {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} />
                ))}
            </div>
            <span className={styles.decoDotPurple} />
            <span className={styles.decoDotGreen} />

            <div className={styles.contactsInner}>
                <div className={styles.contactsContent}>
                    <ScrollReveal className={`${styles.contactsText} revealLeft delay1`} visibleClass="visible">
                        <span className={styles.sectionBadge}>Contact</span>
                        <h2 className={styles.sectionTitle}>
                            Get in <span className={styles.accent}>Touch</span>
                        </h2>
                        <div className={styles.sectionDesc}>
                            <p>
                                {mainText}
                            </p>
                        </div>
                        <div className={styles.cvButtonWrapper}>
                            <CVButton />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className={`${styles.contactsBox} revealRight delay2`} visibleClass="visible">
                        <h3 className={styles.boxTitle}>Message me here</h3>
                        <div className={styles.contactMethods}>
                            <a href={`mailto:${email}`} className={styles.contactItem}>
                                <span className={styles.icon}>@</span> {email}
                            </a>
                            <a href="https://wa.me/94711108984" className={styles.contactItem}>
                                <span className={styles.icon}>✆</span> {WhatsApp}
                            </a>

                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
