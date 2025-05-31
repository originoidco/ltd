import React from "react";
import { SectionHeader } from "./ui/section-header";

export function OverallStats() {
    return (
        <div className="w-full py-8">
            <div className="max-w-4xl mx-auto">
                <SectionHeader>Metrics & Impressions</SectionHeader>
                <div className="flex flex-col md:flex-row justify-between w-full gap-8">
                    <div className="flex flex-col gap-2">
                        <p className="text-2xl md:text-3xl text-white font-instrument-serif">
                            300K+
                        </p>
                        <p className="text-zinc-400 text-sm">
                            Monthly Active Users
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-2xl md:text-3xl text-white font-instrument-serif">
                            5B+
                        </p>
                        <p className="text-zinc-400 text-sm">
                            Social Media Impressions
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-2xl md:text-3xl text-white font-instrument-serif">
                            150+
                        </p>
                        <p className="text-zinc-400 text-sm">
                            Countries Served
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
