import Link from "next/link";
import { Project } from "../../types";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link
            href={project.link}
            target="_blank"
            key={project.name.replace(/[\s.]/g, "-").toLowerCase()}
            rel="noopener noreferrer"
            className="rounded-md text-left overflow-hidden h-[450px] relative group transition-all duration-150 ease-in-out"
        >
            <div
                className={`absolute inset-0 z-0 transition-all duration-150 ease-in-out origin-center
                ${project.backgroundUrl ? "bg-cover bg-center" : "bg-gradient-to-br from-[#040606] to-[#2C3D44]"}`}
                style={{
                    backgroundImage: project.backgroundUrl
                        ? `url(${project.backgroundUrl})`
                        : undefined,
                    backgroundPosition: "center",
                }}
            />

            <div className="relative z-10 p-6 flex justify-between items-start h-full flex-col transition-all duration-200 bg-black/30 hover:bg-black/20">
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img
                            src={project.icon}
                            className="size-12 rounded-xl"
                            alt={project.name}
                        />
                        <div>
                            <p className="font-medium text-lg text-white">
                                {project.name}
                            </p>
                            <p className="text-sm text-white/80">
                                {project.release}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-auto">
                    <p className="text-white mb-4 max-w-xs">
                        {project.description}
                    </p>

                    <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white">
                        {project.stats}
                    </div>
                </div>
            </div>
        </Link>
    );
}
