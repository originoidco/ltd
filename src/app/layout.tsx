import type { Metadata } from "next"
import "./globals.css"
import { GeistSans } from "geist/font/sans"
import { Instrument_Serif } from "next/font/google"

const geistSans = GeistSans

const instrumentSerif = Instrument_Serif({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--font-instrument-serif",
})

export const metadata: Metadata = {
	title: "Originoid LTD",
	description:
		"We build digital platforms that serve millions of users worldwide.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${instrumentSerif.variable} antialiased w-full`}
			>
				{children}
			</body>
		</html>
	)
}
