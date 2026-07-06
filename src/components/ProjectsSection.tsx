import Link from 'next/link';
import styles from './ProjectsSection.module.css';
import ScrollReveal from './ScrollReveal';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProjectCardWrapper, { ProjectLink } from './ProjectCardWrapper';

export default async function ProjectsSection() {
    const projectsSnapshot = await getDocs(collection(db, 'projects'));
    const projects = (projectsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as Array<{
        id: string;
        title: string;
        description: string;
        techStack: string;
        liveLink: string;
        githubLink: string;
        isFeatured: boolean;
        imageUrl: string;
    }>).sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
    });

    const delayClasses = [styles.delay1, styles.delay2, styles.delay3, styles.delay4, styles.delay5, styles.delay6];

    return (
        <section className={styles.projectsSection} id="works">
            {/* ── Decorative dots ── */}
            <div className={styles.decoDotsRight}>
                {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} />
                ))}
            </div>
            <div className={styles.decoDotsLeft}>
                {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} />
                ))}
            </div>
            <span className={styles.decoDotBlue} />
            <span className={styles.decoDotGreen} />

            <div className={styles.projectsInner}>
                <div className={styles.projectsTopRow}>
                    {/* ── Left Column: Intro ── */}
                    <ScrollReveal
                        className={`${styles.projectsLeft} ${styles.revealLeft}`}
                        visibleClass={styles.visible}
                    >
                        <span className={styles.sectionBadge}>Portfolio</span>

                        <h2 className={styles.sectionTitle}>
                            My Creative Works Latest{' '}
                            <span className={styles.accent}>Projects</span>
                        </h2>

                        <p className={styles.sectionDesc}>
                            I have selected and mentioned here some of
                            my latest projects to share with you.
                        </p>

                        <Link href="#works" className={styles.showMoreBtn}>
                            Show More
                        </Link>
                    </ScrollReveal>

                    {/* ── Right Column: Project Cards ── */}
                    <div className={styles.projectsRight}>
                        <div className={styles.projectsGrid}>
                            {projects.length > 0 ? (
                                projects.map((project, index) => (
                                    <ScrollReveal
                                        key={project.id}
                                        className={`${styles.revealUp} ${delayClasses[index % delayClasses.length]} ${project.isFeatured ? styles.featuredCard : ''}`}
                                        visibleClass={styles.visible}
                                    >
                                        <ProjectCardWrapper
                                            projectId={project.id}
                                            className={styles.projectCard}
                                        >
                                            <div className={styles.projectImage}>
                                                {project.imageUrl ? (
                                                    <img
                                                        src={project.imageUrl}
                                                        alt={project.title}
                                                    />
                                                ) : (
                                                    <div className={styles.projectImagePlaceholder}>
                                                        No preview available
                                                    </div>
                                                )}
                                            </div>

                                            <div className={styles.projectBody}>
                                                <h3 className={styles.projectTitle}>{project.title}</h3>

                                                <div className={styles.projectTech}>
                                                    {project.techStack
                                                        .split(',')
                                                        .map((tech: string) => tech.trim())
                                                        .filter(Boolean)
                                                        .map((tech: string) => (
                                                            <span key={tech} className={styles.techTag}>
                                                                {tech}
                                                            </span>
                                                        ))}
                                                </div>

                                                <div className={styles.projectLinks}>
                                                    {project.liveLink && (
                                                        <ProjectLink href={project.liveLink} className={styles.linkBtn}>
                                                            <span className={styles.linkIcon}>🔗</span> Live
                                                        </ProjectLink>
                                                    )}
                                                    {project.githubLink && (
                                                        <ProjectLink href={project.githubLink} className={styles.linkBtn}>
                                                            <span className={styles.linkIcon}>⌨</span> GitHub
                                                        </ProjectLink>
                                                    )}
                                                </div>
                                            </div>
                                        </ProjectCardWrapper>
                                    </ScrollReveal>
                                ))
                            ) : (
                                <p className={styles.emptyMessage}>
                                    No projects found. Check back later!
                                </p>
                            )}
                        </div>

                        {/* Navigation arrow */}
                        {projects.length > 0 && (
                            <div className={styles.navArrow}>
                                <Link href="#works" className={styles.arrowBtn} aria-label="See more projects">
                                    →
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
