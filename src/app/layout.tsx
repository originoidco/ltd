import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Open_Sans, Instrument_Serif } from "next/font/google";
import PillNav from "./components/nav/nav";

const geistSans = GeistSans;

const openSans = Open_Sans({
    weight: ["500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-open-sans",
});

const instrumentSerif = Instrument_Serif({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
    title: "Originoid LTD",
    description:
        "We build digital platforms that serve millions of users worldwide.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${openSans.variable} ${instrumentSerif.variable} antialiased w-full`}
            >
                <PillNav
                    logo={"/originoid-dark.svg"}
                    logoAlt="logo"
                    // initialLoadAnimation={true}
                    items={[
                        { label: "Home", href: "/#" },
                        { label: "Projects", href: "/#projects" },
                        {
                            label: "Socials",
                            href: "/#socials",
                        },
                    ]}
                    activeHref="/"
                    className="custom-nav"
                    ease="power2.easeOut"
                    baseColor="#ffffff"
                    pillColor="#0C0A09"
                    hoveredPillTextColor="#0C0A09"
                    pillTextColor="#ffffff"
                />
                {children}
            </body>
        </html>
    );
}
