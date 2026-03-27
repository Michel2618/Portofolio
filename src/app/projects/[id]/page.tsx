import Link from 'next/link';
import styles from './ProjectDetail.module.css';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ProjectDetailPageProps {
    params: Promise<{ id: string }>;
}

// ---------------------------------------------------------------------------
// Page Component (Server Component)
// ---------------------------------------------------------------------------
export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const { id } = await params;
    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return (
            <main>
                <div className={`container ${styles.pageWrapper}`}>
                    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                        <h1>Project not found</h1>
                        <Link href="/" className={styles.btnPrimary} style={{ marginTop: '2rem', display: 'inline-flex' }}>
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const project = docSnap.data();

    // Data Mapping
    const title = project.title || 'Project Name';
    const techStack = project.techStack || 'Tech Stack not found';
    const imageUrl = project.imageUrl || 'https://placehold.co/1200x525/2c313a/ABB2BF?text=Project+Cover+Image';
    const liveLink = project.liveLink || '';
    const githubLink = project.githubLink || '';
    const description = project.description || 'No description available.';

    return (
        <main>
            <div className={`container ${styles.pageWrapper}`}>

                {/* ── Back link ─────────────────────────────────────────── */}
                <Link href="/" className={styles.backLink}>
                    <span className={styles.backArrow}>←</span>
                    Back to Home
                </Link>

                {/* ── Hero image (frosted-glass card) ───────────────────── */}
                <div className={styles.heroCard}>
                    <img
                        src={imageUrl}
                        alt={`${title} cover image`}
                        className={styles.heroImage}
                    />
                </div>

                {/* ── Project header ────────────────────────────────────── */}
                <header className={styles.projectHeader}>
                    <h1 className={styles.projectTitle}>{title}</h1>
                    <span className={styles.techBadge}>
                        {techStack}
                    </span>
                </header>

                {/* ── Action buttons ────────────────────────────────────── */}
                <div className={styles.actionRow}>
                    {liveLink && (
                        <a
                            href={liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.btnPrimary}
                        >
                            {/* External link icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            View Live Site
                        </a>
                    )}

                    {githubLink && (
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.btnSecondary}
                        >
                            {/* GitHub icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub Repository
                        </a>
                    )}
                </div>

                <hr className={styles.divider} />

                {/* ── Long-form description ─────────────────────────────── */}
                <section className={styles.contentSection}>
                    <h2 className={styles.contentHeading}># overview</h2>

                    <div className={styles.contentBody}>
                        <p>{description}</p>
                    </div>
                </section>

            </div>
        </main>
    );
}
