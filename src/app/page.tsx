import Link from "next/link"
// import { Metadata } from "next/types"
import { BackgroundDither } from "./components/bg-dither";

type Project = {
	name: string
	description: string
	link: string
	stats: string
	icon: string
	release: string
	backgroundUrl?: string
}



const projectsList: Project[] = [
	{
		name: "Originoid",
		description:
			"Originoid is a platform built for creators: share and link any type of content, fully customizable, while your work is kept secure and protected.",
		link: "https://originoid.co?ref=originoidltd",
		stats: "26,100+ Waitlisted",
		icon: "/app-icons/originoid-icon-1028.png",
		release: "Releasing 2025",
	},
	{
		name: "wanderer.moe",
		description:
			"wanderer.moe is a completely free to use centralized database website for easily searching and downloading thousands of assets across various games.",
		link: "https://wanderer.moe?ref=originoidltd",
		stats: "300,000+ MAU",
		icon: "/app-icons/wanderer-moe-icon-1028.png",
		release: "Founded 2023",
		backgroundUrl:
			"https://cdn.marcel.best/ShareX/2025/03/wanderer-moe-card-zoom.png",
	},
]

export default function Home() {
	return (
		<section className="relative min-h-screen w-full">
			<BackgroundDither />
			<div className="relative z-10 w-full min-h-screen flex items-center justify-center text-white">
				<div className="md:py-12 md:px-16 py-10 px-8 w-full max-w-4xl mx-auto">
					<div className="flex flex-col gap-6 mb-12">
						<div className="flex items-center gap-3">
							<img
								src="/app-icons/originoid-icon-1028.png"
								className="size-10"
								alt="Originoid"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<p className="text-xl text-zinc-400 tracking-tight">
								Originoid LTD makes software and platforms that
								serve millions of users worldwide.
							</p>

							<p className="text-zinc-400 text-sm">
								Hiring Site & Discord Staff:{" "}
								<Link
									href="/apply"
									target="_blank"
									className="text-white hover:text-zinc-600 transition-all duration-150 ease-in-out"
								>
									Apply Here
								</Link>
							</p>
						</div>
					</div>

					<div className="mb-12">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{projectsList.map((project, index) => (
								<Link
									href={project.link}
									target="_blank"
									key={
										index +
										"-" +
										project.name
											.replace(" ", "-")
											.toLowerCase()
											.replace(".", "-")
									}
									rel="noopener noreferrer"
									className="rounded-md overflow-hidden h-[450px] relative group transition-all duration-150 ease-in-out"
								>
									
									<div
										className={`
											absolute inset-0 z-0
											transition-all duration-200
											origin-center
											${project.backgroundUrl ? '' : 'bg-gradient-to-br from-[#040606] to-[#2C3D44]'}
											${project.backgroundUrl ? 'bg-cover bg-center' : ''}
											group-hover:scale-110
										`}
										style={{
											backgroundImage: project.backgroundUrl
												? `url(${project.backgroundUrl})`
												: undefined,
										}}
									/>

									
									<div className="relative z-10 p-6 flex justify-between items-start h-full flex-col transition-all duration-200 bg-black/10">
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
							))}
						</div>
					</div>

					<div className="flex flex-col md:flex-row text-sm md:justify-between gap-2 text-zinc-600 pt-4">
						<p> 2025 Originoid LTD</p>
						<p>Registered UK Company No. 15988228</p>
						<p>ICO Reference No. ZB857511</p>
					</div>
				</div>
			</div>
		</section>
	)
}
