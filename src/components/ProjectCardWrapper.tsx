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

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.closest('a')) {
            return;
        }
        router.push(`/projects/${projectId}`);
    };

    return (
        <div 
            className={className} 
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            {children}
        </div>
    );
}
