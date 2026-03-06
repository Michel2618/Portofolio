import styles from './SkillsSection.module.css';
import { DotGrid, OutlineSquare, OverlapBoxes } from './DecorativeElements';

const skillCategories = [
    {
        title: 'Languages',
        skills: ['TypeScript', 'Lua', 'Python', 'JavaScript']
    },
    {
        title: 'Databases',
        skills: ['SQLite', 'PostgreSQL', 'Mongo']
    },
    {
        title: 'Tools',
        skills: ['VSCode', 'Neovim', 'Linux', 'Figma', 'Git']
    },
    {
        title: 'Other',
        skills: ['HTML', 'CSS', 'SCSS', 'REST', 'Jinja']
    },
    {
        title: 'Frameworks',
        skills: ['React', 'Next.js', 'Vue', 'Flask', 'Express.js']
    }
];

export default function SkillsSection() {
    return (
        <section className={`container ${styles.skillsSection}`} id="about-me">
            {/* Decorative elements */}
            <OutlineSquare size={120} color="secondary" className={styles.bgSquare1} />
            <DotGrid className={styles.bgDots1} />
            <OverlapBoxes color="purple" className={styles.bgOverlap1} />
            <OutlineSquare size={65} color="secondary" className={styles.bgSquare2} />

            <div className={styles.sectionHeader}>
                <h2 className="font-mono text-2xl">
                    <span className="heading-accent">#</span>skills
                    <span className={styles.headerLine}></span>
                </h2>
            </div>

            <div className={styles.skillsContent}>
                <div className={styles.skillsVisual}>
                    <div className={styles.decorativeBoxes}>
                        <div className={styles.box1}></div>
                        <div className={styles.box2}></div>
                        <div className={styles.box3}></div>
                        <div className={styles.box4}></div>
                    </div>
                </div>

                <div className={styles.skillsGrid}>
                    {skillCategories.map((category, index) => (
                        <div key={index} className={styles.skillBox}>
                            <h3 className={styles.skillTitle}>{category.title}</h3>
                            <div className={styles.skillList}>
                                {category.skills.join(', ')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
