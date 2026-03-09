import { Client } from '@notionhq/client';

export const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export interface Project {
    id: string;
    title: string;
    description: string;
    tech: string;
    liveUrl: string | null;
    githubUrl: string | null;
    isFeatured: boolean;
}

export async function getActiveProjects(): Promise<Project[]> {
    const databaseId = process.env.NOTION_PROJECTS_DB_ID;

    if (!databaseId) {
        console.error('NOTION_PROJECTS_DB_ID is not defined');
        return [];
    }

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
        });

        return response.results.map((page: any) => {
            const properties = page.properties;

            return {
                id: page.id,
                title: properties['Name']?.title?.[0]?.plain_text || 'Untitled',
                description: properties['Description']?.rich_text?.[0]?.plain_text || '',
                tech: properties['Tech Stack']?.rich_text?.[0]?.plain_text || '',
                liveUrl: properties['Live Link']?.url || null,
                githubUrl: properties['GitHub Link']?.url || null,
                isFeatured: properties['Is Featured']?.checkbox || false,
            };
        });
    } catch (error) {
        console.error('Error fetching projects from Notion:', error);
        return [];
    }
}

export interface Quote {
    text: string;
    author: string;
}

export async function getQuote(): Promise<Quote | null> {
    const databaseId = process.env.NOTION_QUOTES_DB_ID;

    if (!databaseId) {
        console.error('NOTION_QUOTES_DB_ID is not defined');
        return null;
    }

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
        });

        if (response.results.length === 0) {
            return null;
        }

        // Get a random quote or just the first one. Let's get a random one if there are multiple, or just the first one.
        // The prompt says "fetches a single quote". Picking a random one makes it dynamic if they add many.
        // But picking the first one is also fine. I'll pick a random one for more dynamism.
        const randomIndex = Math.floor(Math.random() * response.results.length);
        const page: any = response.results[randomIndex];
        const properties = page.properties;

        return {
            text: properties['Quote']?.title?.[0]?.plain_text || 'No quote found',
            author: properties['Author']?.rich_text?.[0]?.plain_text || 'Unknown',
        };
    } catch (error) {
        console.error('Error fetching quote from Notion:', error);
        return null;
    }
}

export interface ContactsData {
    sectionTitle: string;
    mainText: string;
    email: string;
    discord: string;
}

export async function getContacts(): Promise<ContactsData | null> {
    const databaseId = process.env.NOTION_CONTACTS_DB_ID;

    if (!databaseId) {
        console.error('NOTION_CONTACTS_DB_ID is not defined');
        return null;
    }

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
        });

        if (response.results.length === 0) {
            return null;
        }

        const page: any = response.results[0]; // Assuming only one config page for contacts
        const properties = page.properties;

        return {
            sectionTitle: properties['Section']?.title?.[0]?.plain_text || 'contacts',
            mainText: properties['Main Text']?.rich_text?.[0]?.plain_text || "I'm interested in freelance opportunities. However, if you have other request or question, don't hesitate to contact me",
            email: properties['Email Address']?.email || 'elias@elias.me',
            discord: properties['Discord Username']?.rich_text?.[0]?.plain_text || '!Elias#3519',
        };
    } catch (error) {
        console.error('Error fetching contacts from Notion:', error);
        return null;
    }
}
