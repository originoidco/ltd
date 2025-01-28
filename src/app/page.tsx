import Link from "next/link"
import { Metadata } from "next/types"

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
		description: "Creators-first content sharing platform",
		link: "https://originoid.co",
		stats: "17,600+ creators on waitlist",
		icon: "/app-icons/originoid-icon-1028.png",
	},
	{
		name: "wanderer.moe",
		description: "Centralized game asset database",
		link: "https://wanderer.moe",
		stats: "300,000+ monthly active users",
		icon: "/app-icons/wanderer-moe-icon-1028.png",
	},
]

export const metadata: Metadata = {
	title: "Originoid LTD",
	description:
		"We build digital platforms that serve millions of users worldwide.",
}

export default function Home() {
	return (
		<div className="md:py-24 md:px-16 py-16 px-8 flex items-center justify-center min-h-screen w-full">
			<div className="flex flex-col gap-8 max-w-4xl">
				<img
					src="/app-icons/originoid-icon-1028.png"
					className="size-16"
				/>

				<div className="flex flex-col gap-6 text-xl">
					<p className="text-3xl font-bold text-white">
						Originoid LTD builds digital platforms that serve
						millions of users worldwide.
					</p>

					<div className="space-y-4">
						<p>
							We are a fully independent software company,
							consisting of one full-time developer and a diverse
							group of volunteer creatives. This a deliberate
							choice that allows us to focus on what truly
							matters.
						</p>
						<p>
							Passion and purpose drive every aspect of our work.
							Each platform we create stands as a testament to
							what can be achieved when a team remains focused to
							its mission.
						</p>
						<p>
							Our goal is straightforward: to develop tools that
							genuinely benefit creators. While others pursue
							quick wins, we are committed to the long haul.
						</p>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row gap-8 text-white">
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
									<p className="">{project.description}</p>
									<p className="text-xs">{project.stats}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
				<div className="flex flex-col md:flex-row text-sm md:justify-between gap-2">
					<p>© 2025 Originoid LTD</p>
					<p>Registered UK Company No. 15988228</p>
					<p>ICO Reference No. ZB857511</p>
					<p>124 City Road, London, England, EC1V 2NX</p>
				</div>
			</div>
		</div>
	)
}
