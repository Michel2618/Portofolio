import styles from './Quote.module.css';
import { getQuote } from '../lib/notion';

export default async function Quote() {
    const quoteData = await getQuote();

    // Fallback to the original quote if not found
    const text = quoteData?.text || 'We are not free in what we do, because we are not free in what we want.';
    const author = quoteData?.author || 'Arthur Schopenhauer';

    return (
        <section className={`container ${styles.quoteSection}`}>
            <div className={styles.quoteBox}>
                <div className={styles.quoteDecorTop}>"</div>
                <blockquote className={styles.quoteText}>
                    {text}
                </blockquote>
                <div className={styles.quoteDecorBottom}>"</div>
                <div className={styles.quoteAuthor}>
                    - {author}
                </div>
            </div>
        </section>
    );
}

