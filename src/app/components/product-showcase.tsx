import { projectsList } from "../constants/projects";
import { ProjectCard } from "./project-card";
import { SectionHeader } from "./ui/section-header";

export function ProductShowcase() {
    return (
        <div className="mb-12">
            <SectionHeader>Current Projects</SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectsList.map((project) => (
                    <ProjectCard
                        key={project.name.replace(/[\s.]/g, "-").toLowerCase()}
                        project={project}
                    />
                ))}
            </div>
        </div>
    );
}
