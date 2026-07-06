import styles from './SkillsSectionDark.module.css';
import { DotGrid, OutlineSquare, OverlapBoxes } from './DecorativeElements';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function SkillsSectionDark() {
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
        console.error("Error fetching skills: ", error);
    }

    const skillCategories = [
        {
            title: 'Languages',
            skills: languages ? languages.split(',').map(s => s.trim()) : []
        },
        {
            title: 'Databases',
            skills: databases ? databases.split(',').map(s => s.trim()) : []
        },
        {
            title: 'Tools',
            skills: tools ? tools.split(',').map(s => s.trim()) : []
        },
        {
            title: 'Other',
            skills: other ? other.split(',').map(s => s.trim()) : []
        },
        {
            title: 'Frameworks',
            skills: frameworks ? frameworks.split(',').map(s => s.trim()) : []
        }
    ];

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
