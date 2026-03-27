import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import styles from './CVButton.module.css';

export default async function CVButton() {
    let cvUrl: string | null = null;
    try {
        const docRef = doc(db, 'contact', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            cvUrl = docSnap.data()?.cvUrl ?? null;
        }
    } catch (error) {
        console.error('CVButton: Error fetching CV URL from Firebase:', error);
    }

    if (!cvUrl) return null;

    return (
        <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cvButton}
        >
            <span className={styles.icon}>↓</span>
            Download CV
        </a>
    );
}
