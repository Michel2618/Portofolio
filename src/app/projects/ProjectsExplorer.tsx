'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ExternalLink, Github, ArrowLeft, Sparkles, X } from 'lucide-react';
import styles from './Projects.module.css';
import ProjectCardWrapper from '@/components/ProjectCardWrapper';

export interface ProjectItem {
    id: string;
    title: string;
    description: string;
    techStack: string;
    liveLink?: string;
    githubLink?: string;
    isFeatured?: boolean;
    imageUrl?: string;
}

interface ProjectsExplorerProps {
    projects: ProjectItem[];
}

export default function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');

    // Extract unique tech tags from all projects
    const availableTags = useMemo(() => {
        const tagSet = new Set<string>();
        projects.forEach(project => {
            if (project.techStack) {
                project.techStack
                    .split(',')
                    .map(t => t.trim())
                    .filter(Boolean)
                    .forEach(tag => tagSet.add(tag));
            }
        });
        return ['All', ...Array.from(tagSet)];
    }, [projects]);

    // Filter projects based on search query and selected tag
    const filteredProjects = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return projects.filter(project => {
            const matchesTag =
                selectedTag === 'All' ||
                (project.techStack &&
                    project.techStack
                        .split(',')
                        .map(t => t.trim().toLowerCase())
                        .includes(selectedTag.toLowerCase()));

            const matchesQuery =
                !query ||
                project.title.toLowerCase().includes(query) ||
                (project.description && project.description.toLowerCase().includes(query)) ||
                (project.techStack && project.techStack.toLowerCase().includes(query));

            return matchesTag && matchesQuery;
        });
    }, [projects, searchQuery, selectedTag]);

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedTag('All');
    };

    return (
        <main className={styles.pageWrapper}>
            {/* ── Back Navigation ── */}
            <Link href="/" className={styles.backLink}>
                <ArrowLeft size={16} />
                <span>Back to Home</span>
            </Link>

            {/* ── Header ── */}
            <header className={styles.header}>
                <span className={styles.badge}>
                    #works / archive
                </span>
                <h1 className={styles.title}>
                    All Projects &amp; <span className={styles.accent}>Creations</span>
                </h1>
                <p className={styles.subtitle}>
                    A complete catalog of my engineering projects, IoT systems, full-stack web applications, and technical experiments.
                </p>
            </header>

            {/* ── Search & Filter Controls ── */}
            <section className={styles.controlsWrapper} aria-label="Project filters">
                <div className={styles.searchBar}>
                    <Search className={styles.searchIcon} size={18} />
                    <input
                        type="text"
                        placeholder="Search by project title, tech (e.g. ESP32, React, Node), or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            aria-label="Clear search"
                            style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-secondary)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {availableTags.length > 1 && (
                    <div className={styles.filterTagsRow}>
                        <span className={styles.filterLabel}>Filter by:</span>
                        {availableTags.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => setSelectedTag(tag)}
                                className={`${styles.filterBtn} ${selectedTag === tag ? styles.filterBtnActive : ''}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}
            </section>

            {/* ── Status Row ── */}
            <div className={styles.statusRow}>
                <span>
                    Showing <strong>{filteredProjects.length}</strong> of {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                </span>
                {(searchQuery || selectedTag !== 'All') && (
                    <button
                        type="button"
                        onClick={handleClearFilters}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary-green)',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontFamily: 'inherit',
                            textDecoration: 'underline',
                        }}
                    >
                        Reset filters
                    </button>
                )}
            </div>

            {/* ── Projects Grid ── */}
            <div className={styles.projectsGrid}>
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <ProjectCardWrapper
                            key={project.id}
                            projectId={project.id}
                            className={styles.card}
                        >
                            <div className={styles.imageWrapper}>
                                {project.isFeatured && (
                                    <span className={styles.featuredPill}>
                                        <Sparkles size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                                        Featured
                                    </span>
                                )}

                                {project.imageUrl ? (
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className={styles.cardImage}
                                    />
                                ) : (
                                    <div className={styles.imagePlaceholder}>
                                        No preview available
                                    </div>
                                )}
                            </div>

                            <div className={styles.cardBody}>
                                <h2 className={styles.cardTitle}>{project.title}</h2>

                                {project.description && (
                                    <p className={styles.cardDesc}>{project.description}</p>
                                )}

                                {project.techStack && (
                                    <div className={styles.techStack}>
                                        {project.techStack
                                            .split(',')
                                            .map((t) => t.trim())
                                            .filter(Boolean)
                                            .map((tech) => (
                                                <span
                                                    key={tech}
                                                    className={styles.techChip}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedTag(tech);
                                                    }}
                                                    title={`Filter by ${tech}`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                    </div>
                                )}

                                <div className={styles.cardFooter}>
                                    <div className={styles.linksGroup}>
                                        {project.liveLink && (
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.actionBtn}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink size={13} />
                                                <span>Live</span>
                                            </a>
                                        )}
                                        {project.githubLink && (
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.actionBtn}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Github size={13} />
                                                <span>GitHub</span>
                                            </a>
                                        )}
                                    </div>

                                    <span className={styles.detailPrompt}>
                                        View Details &rarr;
                                    </span>
                                </div>
                            </div>
                        </ProjectCardWrapper>
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        <h3 className={styles.emptyTitle}>No matching projects</h3>
                        <p className={styles.emptyText}>
                            We couldn&apos;t find any projects matching &ldquo;{searchQuery || selectedTag}&rdquo;. Try another keyword or clear the filters.
                        </p>
                        <button
                            type="button"
                            onClick={handleClearFilters}
                            className={styles.resetBtn}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
