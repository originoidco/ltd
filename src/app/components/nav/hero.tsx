"use client";
import AnimatedButton from "../ui/animated-button";
import { PiArrowDownBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import Dither from "../motion/dither";

export default function Hero() {
    const router = useRouter();

    return (
        <section className="relative h-screen w-full" id="hero">
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <div className="flex flex-col items-center justify-center">
                    <img
                        src="/app-icons/originoid-icon-1028.png"
                        className="size-12 mb-4"
                    />
                    <h1 className="text-[#F8F8F8] text-4xl md:text-5xl font-instrument-serif text-center px-4 max-w-3xl pointer-events-auto select-text">
                        Originoid LTD creates software & platforms that serve
                        millions worldwide.
                    </h1>
                    <AnimatedButton
                        className="mt-6 p-2 pointer-events-auto"
                        onClick={() => {
                            router.push("#stats");
                        }}
                    >
                        <PiArrowDownBold />
                    </AnimatedButton>
                </div>
            </div>
            <section className="w-full h-full absolute">
                <Dither />
            </section>
        </section>
    );
}
