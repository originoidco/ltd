import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Open_Sans, Instrument_Serif } from "next/font/google";
import PillNav from "./components/nav/nav";
import LenisProvider from "./components/providers/lenis-provider";
import { DynamicScrollbar } from "./components/ui/dynamic-scrollbar";

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
                <LenisProvider>
                    <DynamicScrollbar />
                    <PillNav
                        logo={"/originoid-dark.svg"}
                        logoAlt="logo"
                        items={[
                            { label: "Projects", href: "/#projects" },
                            {
                                label: "Vision",
                                href: "/#vision",
                            },
                            {
                                label: "Team",
                                href: "/#team",
                            },
                        ]}
                        activeHref="/"
                        className="custom-nav"
                        ease="power2.easeOut"
                        initialLoadAnimation={false}
                    />
                    {children}
                </LenisProvider>
            </body>
        </html>
    );
}
