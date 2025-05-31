import { BackgroundDither } from "./components/bg-dither";
import { OverallStats } from "./components/overall-stats";
import { ProductShowcase } from "./components/product-showcase";

export default function Home() {
    return (
        <section className="relative min-h-screen w-full">
            <BackgroundDither />
            <div className="relative z-10 w-full min-h-screen transition-all duration-150 ease-in-out flex items-center justify-center text-white">
                <div className="w-full max-w-4xl mx-auto">
                    <div className="flex flex-col py-16 md:py-24 px-8 md:px-16">
                        <div className="flex items-center gap-3">
                            <img
                                src="/app-icons/originoid-icon-1028.png"
                                className="size-10"
                                alt="Originoid"
                            />
                        </div>

                        <h1 className="md:text-4xl text-3xl text-white font-instrument-serif max-w-2xl mt-6">
                            Originoid LTD creates software and platforms that
                            serve millions worldwide.
                        </h1>

                        <div className="mt-12">
                            <OverallStats />
                        </div>

                        <div className="mt-12">
                            <ProductShowcase />
                        </div>

                        <footer className="flex flex-col md:flex-row text-sm md:justify-between gap-2 text-white/60 mt-12 pt-8">
                            <p>&copy; 2025 Originoid LTD</p>
                            <p>Registered UK Company No. 15988228</p>
                            <p>ICO Reference No. ZB857511</p>
                        </footer>
                    </div>
                </div>
            </div>
        </section>
    );
}
