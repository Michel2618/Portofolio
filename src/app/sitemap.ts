import type { MetadataRoute } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://michel.is-a.dev';

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
    ];

    let projectRoutes: MetadataRoute.Sitemap = [];
    try {
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        projectRoutes = projectsSnapshot.docs.map((doc) => ({
            url: `${baseUrl}/projects/${doc.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        }));
    } catch (error) {
        console.error('Error generating dynamic sitemap project routes:', error);
    }

    return [...staticRoutes, ...projectRoutes];
}