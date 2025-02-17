import Link from "next/link"
// import { Metadata } from "next/types"

type Project = {
	name: string
	description: string
	link: string
	stats: string
	icon: string
}

const projectsList: Project[] = [
	{
		name: "Originoid",
		description: "Creators-first sharing platform",
		link: "https://originoid.co?ref=originoidltd",
		stats: "18,700+ creators on waitlist",
		icon: "/app-icons/originoid-icon-1028.png",
	},
	{
		name: "wanderer.moe",
		description: "Centralized game asset database",
		link: "https://wanderer.moe?ref=originoidltd",
		stats: "300,000+ monthly active users",
		icon: "/app-icons/wanderer-moe-icon-1028.png",
	},
]

export default function Home() {
	return (
		<div className="w-full min-h-screen flex items-center justify-center">
			<div className="md:py-24 md:px-16 py-16 px-8">
				<div className="flex flex-col gap-8 max-w-4xl mx-auto">
					<img
						src="/app-icons/originoid-icon-1028.png"
						className="size-16"
					/>

					<div className="flex flex-col gap-6 text-xl">
						<p className="text-4xl font-bold text-white font-instrument-serif">
							Originoid LTD builds digital platforms that serve
							millions of users worldwide.
						</p>

						<div className="space-y-4 text-zinc-400 tracking-tight">
							<p>
								We exclusively make tools that benefit creators
								and solve real-world problems that millions face
								day to day.
							</p>
							<p>
								While others pursue quick wins, we are committed
								to the long haul, and here to stay.
							</p>
							<p>
								Want to partner? Reach out to{" "}
								<Link
									href="mailto:partnerships@originoid.co"
									target="_blank"
									rel="noopener noreferrer"
									className="text-white hover:text-zinc-600 transition-all duration-150"
								>
									partnerships@originoid.co
								</Link>
							</p>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-8 text-white z-10">
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
								className="group hover:scale-105 p-4 rounded-lg w-full transition-all duration-200"
							>
								<div className="flex flex-row gap-4 items-center">
									<img
										src={project.icon}
										className="size-20 rounded-lg transition-transform duration-200"
									/>
									<div className="flex flex-col gap-1">
										<p className="font-bold text-lg">
											{project.name}
										</p>
										<p className="">
											{project.description}
										</p>
										<p className="text-xs">
											{project.stats}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
					<div className="flex flex-col md:flex-row text-sm md:justify-between gap-2 text-zinc-400">
						<p> 2025 Originoid LTD</p>
						<p>Registered UK Company No. 15988228</p>
						<p>ICO Reference No. ZB857511</p>
						{/* <p>124 City Road, London, England, EC1V 2NX</p> */}
					</div>
				</div>
			</div>
		</div>
	)
}
