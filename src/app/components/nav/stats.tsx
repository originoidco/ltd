"use client";
import CountUp from "../motion/count-up";

const stats = [
    {
        value: "300000",
        label: "Monthly Active Users",
    },
    {
        value: "5000000000",
        label: "Social Impressions",
    },
    {
        value: "150",
        label: "Countries Reached",
    },
];

export function Stats() {
    return (
        <section
            className="w-full bg-[#ffffff] text-[#0C0A09] mx-auto text-center py-16 px-6 selection:bg-[#0C0A09] selection:text-[#ffffff]"
            id="stats"
        >
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 font-instrument-serif">
                Metrics & Impressions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <CountUp
                            from={0}
                            to={parseInt(stat.value)}
                            separator=","
                            suffix="+"
                            direction="up"
                            duration={1}
                            className="text-3xl md:text-4xl font-semibold font-instrument-serif"
                        />
                        <p className="mt-2 text-lg">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
