"use client";
import { projectsList } from "../../constants/projects";
import { ProjectCard } from "../ui/project-card";

export function Projects() {
    return (
        <section
            className="w-full bg-[#0C0A09] text-white mx-auto text-center py-16 px-6"
            id="projects"
        >
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 font-instrument-serif">
                Current Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {projectsList.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </section>
    );
}
