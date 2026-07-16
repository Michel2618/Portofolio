import Link from 'next/link';
import styles from './SkillsSection.module.css';
import ScrollReveal from './ScrollReveal';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

/* ── Static skill cards matching the Figma design ── */
const featuredSkills = [
    {
        icon: '🚀',
        title: 'Full Stack Development',
        desc: 'Build performant, responsive web apps from front to back',
    },
    {
        icon: '⚙️',
        title: 'Software Engineering',
        desc: 'Design robust system architectures and scalable solutions',
    },
    {
        icon: '💡',
        title: 'Prototyping & IoT',
        desc: 'Experiment with DIY electronics and smart home automations',
    },
    {
        icon: '🧩',
        title: 'Creative Problem Solving',
        desc: 'Bridge the gap between digital software and physical technology',
    },
];

export default async function SkillsSection() {
    /* ── Fetch skills from Firebase ── */
    let languages = '';
    let databases = '';
    let tools = '';
    let frameworks = '';
    let other = '';

    try {
        const docRef = doc(db, 'skills', 'main');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            languages = data.languages || '';
            databases = data.databases || '';
            tools = data.tools || '';
            frameworks = data.frameworks || '';
            other = data.other || '';
        }
    } catch (error) {
        console.error('Error fetching skills: ', error);
    }

    const skillCategories = [
        { title: 'Languages', skills: languages ? languages.split(',').map((s: string) => s.trim()) : [] },
        { title: 'Databases', skills: databases ? databases.split(',').map((s: string) => s.trim()) : [] },
        { title: 'Tools', skills: tools ? tools.split(',').map((s: string) => s.trim()) : [] },
        { title: 'Frameworks', skills: frameworks ? frameworks.split(',').map((s: string) => s.trim()) : [] },
        { title: 'Other', skills: other ? other.split(',').map((s: string) => s.trim()) : [] },
    ].filter(cat => cat.skills.length > 0);

    const delayClasses = [styles.delay1, styles.delay2, styles.delay3, styles.delay4, styles.delay5];

    return (
        <section className={styles.skillsSection} id="about-me">
            {/* ── Decorative dots ── */}
            <div className={styles.decoDotsTopRight}>
                {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} />
                ))}
            </div>
            <div className={styles.decoDotsBottomLeft}>
                {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} />
                ))}
            </div>
            <span className={styles.decoDotGreen} />
            <span className={styles.decoDotRed} />

            <div className={styles.skillsInner}>
                {/* ── Top Row: Left intro + Right featured cards ── */}
                <div className={styles.skillsTopRow}>
                    {/* Left Column */}
                    <ScrollReveal
                        className={`${styles.skillsLeft} revealLeft`}
                        visibleClass="visible"
                    >
                        <span className={styles.sectionBadge}>My Skills</span>

                        <h2 className={styles.sectionTitle}>
                            Why Hire Me For Your Next{' '}
                            <span className={styles.accent}>Project?</span>
                        </h2>

                        <p className={styles.sectionDesc}>
                            I specialize in Full Stack Development and Software Engineering. My passion lies in solving complex problems through elegant code and hands-on prototyping.
                        </p>

                        <Link href="#contacts" className={styles.hireMeBtn}>
                            Hire Me
                        </Link>
                    </ScrollReveal>

                    {/* Right Column — Featured skill cards */}
                    <div className={styles.skillsRight}>
                        {featuredSkills.map((skill, index) => (
                            <ScrollReveal
                                key={skill.title}
                                className={`${styles.skillCard} revealRight ${delayClasses[index] || ''}`}
                                visibleClass="visible"
                            >
                                <span className={styles.skillIcon}>{skill.icon}</span>
                                <h3 className={styles.skillCardTitle}>{skill.title}</h3>
                                <p className={styles.skillCardDesc}>{skill.desc}</p>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                {/* ── Bottom: Extended Skills from Firebase ── */}
                {skillCategories.length > 0 && (
                    <>
                        <ScrollReveal
                            className="revealUp"
                            visibleClass="visible"
                        >
                            <h3 className={styles.extendedSkillsHeading}>
                                My <span className={styles.accent}>Tech Stack</span>
                            </h3>
                        </ScrollReveal>

                        <div className={styles.extendedSkillsGrid}>
                            {skillCategories.map((category, index) => (
                                <ScrollReveal
                                    key={category.title}
                                    className={`${styles.skillBox} ${index % 2 === 0 ? 'revealLeft' : 'revealRight'} ${delayClasses[index] || ''}`}
                                    visibleClass="visible"
                                >
                                    <h4 className={styles.skillBoxTitle}>{category.title}</h4>
                                    <div className={styles.skillBoxList}>
                                        {category.skills.join(', ')}
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
