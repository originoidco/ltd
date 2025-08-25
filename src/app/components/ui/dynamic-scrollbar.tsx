"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

export function DynamicScrollbar() {
    const [colorMix, setColorMix] = useState(0); // 0 = dark theme, 1 = light theme

    useEffect(() => {
        const handleScroll = () => {
            // Get all sections
            const heroSection = document.getElementById("hero");
            const statsSection = document.getElementById("stats");
            const projectsSection = document.getElementById("projects");
            const socialsSection = document.getElementById("socials");

            if (
                !heroSection ||
                !statsSection ||
                !projectsSection ||
                !socialsSection
            )
                return;

            // Get additional sections
            const visionSection = document.getElementById("vision");
            const teamSection = document.getElementById("team");

            if (
                !heroSection ||
                !statsSection ||
                !projectsSection ||
                !visionSection ||
                !teamSection ||
                !socialsSection
            )
                return;

            // Use viewport center for scrollbar detection
            const viewportCenter = window.innerHeight / 2;

            let targetTheme = 0; // default to light scrollbar

            const heroRect = heroSection.getBoundingClientRect();
            const statsRect = statsSection.getBoundingClientRect();
            const projectsRect = projectsSection.getBoundingClientRect();
            const visionRect = visionSection.getBoundingClientRect();
            const teamRect = teamSection.getBoundingClientRect();
            const socialsRect = socialsSection.getBoundingClientRect();

            if (
                viewportCenter >= heroRect.top &&
                viewportCenter <= heroRect.bottom
            ) {
                targetTheme = 0; // light scrollbar for dark hero section
            } else if (
                viewportCenter >= statsRect.top &&
                viewportCenter <= statsRect.bottom
            ) {
                targetTheme = 1; // dark scrollbar for light stats section
            } else if (
                viewportCenter >= projectsRect.top &&
                viewportCenter <= projectsRect.bottom
            ) {
                targetTheme = 0; // light scrollbar for dark projects section
            } else if (
                viewportCenter >= visionRect.top &&
                viewportCenter <= visionRect.bottom
            ) {
                targetTheme = 1; // dark scrollbar for light vision section
            } else if (
                viewportCenter >= teamRect.top &&
                viewportCenter <= teamRect.bottom
            ) {
                targetTheme = 0; // light scrollbar for dark team section
            } else if (
                viewportCenter >= socialsRect.top &&
                viewportCenter <= socialsRect.bottom
            ) {
                targetTheme = 1; // dark scrollbar for light socials section
            }

            // only animate if theme actually changed
            if (Math.abs(targetTheme - colorMix) > 0.1) {
                gsap.to(
                    { mix: colorMix },
                    {
                        mix: targetTheme,
                        duration: 0.3,
                        ease: "power2.out",
                        onUpdate: function () {
                            setColorMix(this.targets()[0].mix);
                        },
                    },
                );
            }
        };

        // use requestAnimationFrame for smooth updates
        let ticking = false;
        const optimizedScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", optimizedScroll, { passive: true });
        window.addEventListener("resize", optimizedScroll, { passive: true });
        handleScroll(); // initial call

        return () => {
            window.removeEventListener("scroll", optimizedScroll);
            window.removeEventListener("resize", optimizedScroll);
        };
    }, [colorMix]);

    // Color interpolation function (same as nav)
    const interpolateColor = (
        darkColor: string,
        lightColor: string,
        mix: number,
    ) => {
        const dark = {
            r: parseInt(darkColor.slice(1, 3), 16),
            g: parseInt(darkColor.slice(3, 5), 16),
            b: parseInt(darkColor.slice(5, 7), 16),
        };
        const light = {
            r: parseInt(lightColor.slice(1, 3), 16),
            g: parseInt(lightColor.slice(3, 5), 16),
            b: parseInt(lightColor.slice(5, 7), 16),
        };

        const r = Math.round(dark.r + (light.r - dark.r) * mix);
        const g = Math.round(dark.g + (light.g - dark.g) * mix);
        const b = Math.round(dark.b + (light.b - dark.b) * mix);

        return `rgb(${r}, ${g}, ${b})`;
    };

    // Dynamic scrollbar colors
    const scrollbarTrackColor = interpolateColor(
        "#1F1F1F",
        "#E5E5E5",
        colorMix,
    );
    const scrollbarThumbColor = interpolateColor(
        "#F8F8F8",
        "#0C0A09",
        colorMix,
    );
    const scrollbarThumbHoverColor = interpolateColor(
        "#FFFFFF",
        "#000000",
        colorMix,
    );

    useEffect(() => {
        // Update CSS custom properties for scrollbar
        document.documentElement.style.setProperty(
            "--scrollbar-track",
            scrollbarTrackColor,
        );
        document.documentElement.style.setProperty(
            "--scrollbar-thumb",
            scrollbarThumbColor,
        );
        document.documentElement.style.setProperty(
            "--scrollbar-thumb-hover",
            scrollbarThumbHoverColor,
        );
    }, [scrollbarTrackColor, scrollbarThumbColor, scrollbarThumbHoverColor]);

    return null; // This component only manages CSS variables
}
