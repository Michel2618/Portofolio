"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface ProjectCardWrapperProps {
    children: ReactNode;
    projectId: string;
    className?: string;
}

export default function ProjectCardWrapper({ children, projectId, className }: ProjectCardWrapperProps) {
    const router = useRouter();

    return (
        <div 
            className={className} 
            onClick={() => router.push(`/projects/${projectId}`)}
            style={{ cursor: 'pointer' }}
        >
            {children}
        </div>
    );
}

export function ProjectLink({ href, children, className }: { href: string, children: ReactNode, className?: string }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noreferrer" 
            className={className} 
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </a>
    );
}
