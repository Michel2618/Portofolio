import styles from './ContactsSectionLight.module.css';
import { DotGrid, OutlineSquare, OverlapBoxes } from './DecorativeElements';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import CVButton from './CVButton';

export default async function ContactsSectionLight() {
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
                    <div className={styles.cvButtonWrapper}>
                        <CVButton />
                    </div>
                </div>

                <div className={styles.contactsBox}>
                    <h3 className={styles.boxTitle}>Message me here</h3>
                    <div className={styles.contactMethods}>
                        <a href={`mailto:${email}`} className={styles.contactItem}>
                            <span className={styles.icon}>@</span> {email}
                        </a>
                        <a href="https://wa.me/94711108984" className={styles.contactItem}>
                            <span className={styles.icon}>✆</span> {WhatsApp}
                        </a>

                    </div>
                </div>
            </div>
        </section>
    );
}
