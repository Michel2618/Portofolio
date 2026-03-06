import styles from './Quote.module.css';

export default function Quote() {
    return (
        <section className={`container ${styles.quoteSection}`}>
            <div className={styles.quoteBox}>
                <div className={styles.quoteDecorTop}>"</div>
                <blockquote className={styles.quoteText}>
                    With great power comes great electricity bill
                </blockquote>
                <div className={styles.quoteDecorBottom}>"</div>
                <div className={styles.quoteAuthor}>
                    - Dr. Who
                </div>
            </div>
        </section>
    );
}
