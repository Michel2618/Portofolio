import Link from 'next/link';
import styles from './ProjectsSection.module.css';
import { DotGrid, OutlineSquare, OverlapBoxes } from './DecorativeElements';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProjectCardWrapper from './ProjectCardWrapper';

export default async function ProjectsSection() {
    const projectsSnapshot = await getDocs(collection(db, 'projects'));
    const projects = projectsSnapshot.docs.map(doc => ({
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
    }>;

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
                        <ProjectCardWrapper 
                            key={project.id} 
                            projectId={project.id}
                            className={styles.projectCard}
                        >
                                <div className={styles.projectImage}>
                                    {project.imageUrl ? (
                                        <img 
                                            src={project.imageUrl} 
                                            alt={project.title} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        />
                                    ) : (
                                        /* Placeholder for project image */
                                        <div style={{ width: '100%', height: '100%', backgroundColor: '#2b2b2b' }} />
                                    )}
                                </div>
                                <div className={styles.projectTech}>
                                    {project.techStack}
                                </div>
                                <div className={styles.projectInfo}>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <div className={styles.projectLinks}>
                                        {project.liveLink && (
                                            <a href={project.liveLink} target="_blank" rel="noreferrer" className={styles.primaryBtn}>Live &lt;~&gt;</a>
                                        )}
                                        {project.githubLink && (
                                            <a href={project.githubLink} target="_blank" rel="noreferrer" className={styles.primaryBtn}>GitHub &gt;=</a>
                                        )}
                                    </div>
                                </div>
                        </ProjectCardWrapper>
                    ))
                ) : (
                    <p>No projects found. Check back later!</p>
                )}
            </div>
        </section>
    );
}
