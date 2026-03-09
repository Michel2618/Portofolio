import Link from 'next/link';
import styles from './ProjectsSection.module.css';
import { DotGrid, OutlineSquare, OverlapBoxes } from './DecorativeElements';
import { getActiveProjects } from '../lib/notion';

export default async function ProjectsSection() {
    const projects = await getActiveProjects();

    return (
        <section className={`container ${styles.projectsSection}`} id="works">
            {/* Decorative elements */}
            <OutlineSquare size={110} color="secondary" className={styles.bgSquare1} />
            <DotGrid className={styles.bgDots1} />
            <OverlapBoxes color="green" className={styles.bgOverlap1} />
            <DotGrid className={styles.bgDots2} />
            <OutlineSquare size={70} color="secondary" className={styles.bgSquare2} />

            <div className={styles.sectionHeader}>
                <h2 className="font-mono text-2xl">
                    <span className="heading-accent">#</span>projects
                    <span className={styles.headerLine}></span>
                </h2>
                <Link href="#works" className={styles.viewAll}>
                    View all ~~&gt;
                </Link>
            </div>

            <div className={styles.projectsGrid}>
                {projects.length > 0 ? (
                    projects.map(project => (
                        <div key={project.id} className={styles.projectCard}>
                            <div className={styles.projectImage}>
                                {/* Placeholder for project image */}
                            </div>
                            <div className={styles.projectTech}>
                                {project.tech}
                            </div>
                            <div className={styles.projectInfo}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <p className={styles.projectDesc}>{project.description}</p>
                                <div className={styles.projectLinks}>
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.primaryBtn}>Live &lt;~&gt;</a>
                                    )}
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className={styles.primaryBtn}>GitHub &gt;=</a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No projects found. Check back later!</p>
                )}
            </div>
        </section>
    );
}
