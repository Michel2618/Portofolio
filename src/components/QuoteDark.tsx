import styles from './QuoteDark.module.css';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function QuoteDark() {
    let quoteData: any = null;
    try {
        const querySnapshot = await getDocs(collection(db, 'quotes'));
        if (!querySnapshot.empty) {
            quoteData = querySnapshot.docs[0].data();
        }
    } catch (error) {
        console.error("Error fetching quote from Firebase:", error);
    }

    // Fallback to the original quote if not found
    const text = quoteData?.quoteText || 'We are not free in what we do, because we are not free in what we want.';
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

