import Link from "next/link";
import { Project } from "../../types";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const isLeftLayout = project.layout === "left";

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div
                className={`flex flex-col md:flex-row md:items-center gap-8 md:gap-12 ${isLeftLayout ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
                <div className="flex-1 md:aspect-[800/365] flex flex-col md:justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center gap-2 p-0 m-0">
                        <img
                            src={project.icon}
                            className="size-16 rounded-xl"
                            alt={project.name}
                        />
                        <div>
                            <h3 className="text-xl text-[#F8F8F8] font-instrument-serif">
                                {project.name}
                            </h3>
                            <p className="text-[#F8F8F8]/70">
                                {project.release}
                            </p>
                        </div>
                    </div>

                    <p className="text-[#F8F8F8]/80">{project.description}</p>

                    <div className="flex items-center gap-4">
                        <div className="inline-block bg-[#F8F8F8] text-[#0C0A09] rounded-full px-6 py-2 text-sm font-medium selection:bg-[#0C0A09] selection:text-[#F8F8F8]">
                            {project.stats}
                        </div>
                        <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#F8F8F8]/20 text-[#F8F8F8] rounded-full px-6 py-2 text-sm font-medium hover:bg-[#F8F8F8]/30 transition-colors"
                        >
                            View →
                        </Link>
                    </div>
                </div>

                <div className="flex-1">
                    <div
                        className={`aspect-[800/365] border-zinc-800 border rounded-lg overflow-hidden ${project.demoUrl ? "bg-[#0C0A09]" : "bg-[#F8F8F8]"}`}
                    >
                        {project.demoUrl ? (
                            <img
                                src={project.demoUrl}
                                alt={`${project.name} demo`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-[#F8F8F8]" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
