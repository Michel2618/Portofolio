import type { Metadata } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProjectsExplorer, { ProjectItem } from './ProjectsExplorer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
    title: 'All Projects | Michel Ruwishka',
    description: 'Explore all technical projects, software systems, and experiments built by Michel Ruwishka.',
};

export default async function AllProjectsPage() {
    let projects: ProjectItem[] = [];

    try {
        const snapshot = await getDocs(collection(db, 'projects'));
        projects = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title || 'Untitled Project',
                description: data.description || '',
                techStack: data.techStack || '',
                liveLink: data.liveLink || '',
                githubLink: data.githubLink || '',
                isFeatured: Boolean(data.isFeatured),
                imageUrl: data.imageUrl || '',
            };
        }).sort((a, b) => {
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            return 0;
        });
    } catch (error) {
        console.error('Failed to fetch projects for archive:', error);
    }

    return <ProjectsExplorer projects={projects} />;
}
