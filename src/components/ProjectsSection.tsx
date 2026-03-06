import Link from 'next/link';
import styles from './ProjectsSection.module.css';
import { DotGrid, OutlineSquare, OverlapBoxes } from './DecorativeElements';

const projects = [
    {
        id: 1,
        title: 'ChertNodes',
        tech: 'HTML SCSS Python Flask',
        description: 'Minecraft servers hosting',
        liveUrl: '#',
    },
    {
        id: 2,
        title: 'ProtectX',
        tech: 'React Express Discord.js Node.js',
        description: 'Discord anti-crash bot',
        liveUrl: '#',
    },
    {
        id: 3,
        title: 'Kahoot Answers',
        tech: 'CSS Express Node.js',
        description: 'Get answers to your kahoot quiz',
        liveUrl: '#',
    }
];

export default function ProjectsSection() {
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
                {projects.map(project => (
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
                                <a href={project.liveUrl} className={styles.primaryBtn}>Live &lt;~&gt;</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
