import styles from './ContactsSection.module.css';

export default function ContactsSection() {
    return (
        <section className={`container ${styles.contactsSection}`} id="contacts">
            <div className={styles.sectionHeader}>
                <h2 className="font-mono text-2xl">
                    <span className="heading-accent">#</span>contacts
                    <span className={styles.headerLine}></span>
                </h2>
            </div>

            <div className={styles.contactsContent}>
                <div className={styles.contactsText}>
                    <p>
                        I'm interested in freelance opportunities. However, if you have other request or question, don't hesitate to contact me.
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
