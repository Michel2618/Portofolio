import styles from './Quote.module.css';

export default function Quote() {
    return (
        <section className={`container ${styles.quoteSection}`}>
            <div className={styles.quoteBox}>
                <div className={styles.quoteDecorTop}>"</div>
                <blockquote className={styles.quoteText}>
                    We are not free in what we do, because we are not free in what we want.
                </blockquote>
                <div className={styles.quoteDecorBottom}>"</div>
                <div className={styles.quoteAuthor}>
                    - Arthur Schopenhauer
                </div>
            </div>
        </section>
    );
}
