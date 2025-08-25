"use client";
import { projectsList } from "../../constants/projects";
import { ProjectCard } from "../ui/project-card";

export function Projects() {
    return (
        <section
            className="w-full bg-[#0C0A09] text-[#F8F8F8] mx-auto py-20 mb-20 px-6"
            id="projects"
        >
            <h2 className="text-3xl md:text-4xl mb-20 font-instrument-serif text-center">
                Current Projects
            </h2>
            <div className="space-y-32">
                {projectsList.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </section>
    );
}
