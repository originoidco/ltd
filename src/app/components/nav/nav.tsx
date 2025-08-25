"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export type PillNavItem = {
    label: string;
    href: string;
    ariaLabel?: string;
};

export interface PillNavProps {
    logo: string;
    logoAlt?: string;
    logoHref?: string;
    items: PillNavItem[];
    activeHref?: string;
    className?: string;
    ease?: string;
    baseColor?: string;
    pillColor?: string;
    hoveredPillTextColor?: string;
    pillTextColor?: string;
    onMobileMenuClick?: () => void;
    initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
    logo,
    logoAlt = "Logo",
    logoHref = "/#hero",
    items,
    activeHref,
    className = "",
    ease = "power3.easeOut",
    baseColor = "#fff",
    pillColor = "#060010",
    hoveredPillTextColor = "#060010",
    pillTextColor,
    onMobileMenuClick,
    initialLoadAnimation = true,
}) => {
    const resolvedPillTextColor = pillTextColor ?? baseColor;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [colorMix, setColorMix] = useState(0); // 0 = dark theme, 1 = light theme
    const navRef = useRef<HTMLElement>(null);
    const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
    const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
    const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
    const logoImgRef = useRef<HTMLImageElement | null>(null);
    const logoTweenRef = useRef<gsap.core.Tween | null>(null);
    const hamburgerRef = useRef<HTMLButtonElement | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const navItemsRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef<HTMLAnchorElement | HTMLElement | null>(null);

    // exact navbar position-based theme detection
    useEffect(() => {
        const handleScroll = () => {
            if (!navRef.current) return;

            const navRect = navRef.current.getBoundingClientRect();
            const navCenter = navRect.top + navRect.height / 2;

            // get all sections
            const heroSection = document.getElementById("hero");
            const statsSection = document.getElementById("stats");
            const projectsSection = document.getElementById("projects");
            const visionSection = document.getElementById("vision");
            const teamSection = document.getElementById("team");
            const socialsSection = document.getElementById("socials");

            if (
                !heroSection ||
                !statsSection ||
                !projectsSection ||
                !visionSection ||
                !teamSection ||
                !socialsSection
            )
                return;

            // check which section the navbar center is over
            let targetTheme = 0; // default to light navbar

            const heroRect = heroSection.getBoundingClientRect();
            const statsRect = statsSection.getBoundingClientRect();
            const projectsRect = projectsSection.getBoundingClientRect();
            const visionRect = visionSection.getBoundingClientRect();
            const teamRect = teamSection.getBoundingClientRect();
            const socialsRect = socialsSection.getBoundingClientRect();

            if (navCenter >= heroRect.top && navCenter <= heroRect.bottom) {
                targetTheme = 0; // light navbar for dark hero section
            } else if (
                navCenter >= statsRect.top &&
                navCenter <= statsRect.bottom
            ) {
                targetTheme = 1; // dark navbar for light stats section
            } else if (
                navCenter >= projectsRect.top &&
                navCenter <= projectsRect.bottom
            ) {
                targetTheme = 0; // light navbar for dark projects section
            } else if (
                navCenter >= visionRect.top &&
                navCenter <= visionRect.bottom
            ) {
                targetTheme = 1; // dark navbar for light vision section
            } else if (
                navCenter >= teamRect.top &&
                navCenter <= teamRect.bottom
            ) {
                targetTheme = 0; // light navbar for dark team section
            } else if (
                navCenter >= socialsRect.top &&
                navCenter <= socialsRect.bottom
            ) {
                targetTheme = 1; // dark navbar for light socials section
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

    useEffect(() => {
        const layout = () => {
            circleRefs.current.forEach((circle) => {
                if (!circle?.parentElement) return;

                const pill = circle.parentElement as HTMLElement;
                const rect = pill.getBoundingClientRect();
                const { width: w, height: h } = rect;
                const R = ((w * w) / 4 + h * h) / (2 * h);
                const D = Math.ceil(2 * R) + 2;
                const delta =
                    Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) +
                    1;
                const originY = D - delta;

                circle.style.width = `${D}px`;
                circle.style.height = `${D}px`;
                circle.style.bottom = `-${delta}px`;

                gsap.set(circle, {
                    xPercent: -50,
                    scale: 0,
                    transformOrigin: `50% ${originY}px`,
                });

                const label = pill.querySelector<HTMLElement>(".pill-label");
                const white =
                    pill.querySelector<HTMLElement>(".pill-label-hover");

                if (label) gsap.set(label, { y: 0 });
                if (white) gsap.set(white, { y: h + 12, opacity: 0 });

                const index = circleRefs.current.indexOf(circle);
                if (index === -1) return;

                tlRefs.current[index]?.kill();
                const tl = gsap.timeline({ paused: true });

                tl.to(
                    circle,
                    {
                        scale: 1.2,
                        xPercent: -50,
                        duration: 2,
                        ease,
                        overwrite: "auto",
                    },
                    0,
                );

                if (label) {
                    tl.to(
                        label,
                        { y: -(h + 8), duration: 2, ease, overwrite: "auto" },
                        0,
                    );
                }

                if (white) {
                    gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
                    tl.to(
                        white,
                        {
                            y: 0,
                            opacity: 1,
                            duration: 2,
                            ease,
                            overwrite: "auto",
                        },
                        0,
                    );
                }

                tlRefs.current[index] = tl;
            });
        };

        layout();

        const onResize = () => layout();
        window.addEventListener("resize", onResize);

        if (document.fonts) {
            document.fonts.ready.then(layout).catch(() => {});
        }

        const menu = mobileMenuRef.current;
        if (menu) {
            gsap.set(menu, {
                visibility: "hidden",
                opacity: 0,
                scaleY: 1,
                y: 0,
            });
        }

        if (initialLoadAnimation) {
            const logo = logoRef.current;
            const navItems = navItemsRef.current;

            if (logo) {
                gsap.set(logo, { scale: 0 });
                gsap.to(logo, {
                    scale: 1,
                    duration: 0.6,
                    ease,
                });
            }

            if (navItems) {
                gsap.set(navItems, { width: 0, overflow: "hidden" });
                gsap.to(navItems, {
                    width: "auto",
                    duration: 0.6,
                    ease,
                });
            }
        }

        return () => window.removeEventListener("resize", onResize);
    }, [items, ease, initialLoadAnimation]);

    const handleEnter = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        const circle = circleRefs.current[i];
        const pill = circle?.parentElement as HTMLElement;

        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
            duration: 0.3,
            ease,
            overwrite: "auto",
            onUpdate: function () {
                if (pill && this.progress() > 0.35) {
                    pill.style.background = "var(--base, #0C0A09)";
                }
            },
        });
    };

    const handleLeave = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        const circle = circleRefs.current[i];
        const pill = circle?.parentElement as HTMLElement;

        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(0, {
            duration: 0.2,
            ease,
            overwrite: "auto",
            onStart: () => {
                if (pill) {
                    pill.style.background = "var(--pill-bg, #fff)";
                }
            },
        });
    };

    const handleLogoEnter = () => {
        // no animation
    };

    const toggleMobileMenu = () => {
        const newState = !isMobileMenuOpen;
        setIsMobileMenuOpen(newState);

        const hamburger = hamburgerRef.current;
        const menu = mobileMenuRef.current;

        if (hamburger) {
            const lines = hamburger.querySelectorAll(".hamburger-line");
            if (newState) {
                gsap.to(lines[0], {
                    rotation: 45,
                    y: 3,
                    duration: 0.2,
                    ease: "power2.out",
                });
                gsap.to(lines[1], {
                    rotation: -45,
                    y: -3,
                    duration: 0.2,
                    ease: "power2.out",
                });
            } else {
                gsap.to(lines[0], {
                    rotation: 0,
                    y: 0,
                    duration: 0.15,
                    ease: "power2.out",
                });
                gsap.to(lines[1], {
                    rotation: 0,
                    y: 0,
                    duration: 0.15,
                    ease: "power2.out",
                });
            }
        }

        if (menu) {
            if (newState) {
                gsap.set(menu, { visibility: "visible" });
                gsap.fromTo(
                    menu,
                    { opacity: 0, y: 10, scaleY: 1 },
                    {
                        opacity: 1,
                        y: 0,
                        scaleY: 1,
                        duration: 0.3,
                        ease,
                        transformOrigin: "top center",
                    },
                );
            } else {
                gsap.to(menu, {
                    opacity: 0,
                    y: 10,
                    scaleY: 1,
                    duration: 0.2,
                    ease,
                    transformOrigin: "top center",
                    onComplete: () => {
                        gsap.set(menu, { visibility: "hidden" });
                    },
                });
            }
        }

        onMobileMenuClick?.();
    };

    const isExternalLink = (href: string) =>
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#");

    const isRouterLink = (href?: string) => href && !isExternalLink(href);

    // smooth color interpolation using mix value (0 = dark theme, 1 = light theme)
    const interpolateColor = (
        darkColor: string,
        lightColor: string,
        mix: number,
    ) => {
        // simple rgb interpolation
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

    // smooth dynamic colors based on colorMix (flipped: 0 = light theme, 1 = dark theme)
    const dynamicBaseColor = interpolateColor("#F8F8F8", "#0C0A09", colorMix);
    const dynamicPillColor = interpolateColor("#0C0A09", "#F8F8F8", colorMix);
    const dynamicHoverTextColor = interpolateColor(
        "#0C0A09",
        "#F8F8F8",
        colorMix,
    );
    const dynamicPillTextColor = interpolateColor(
        "#F8F8F8",
        "#0C0A09",
        colorMix,
    );

    // svg inversion logic - invert when background is dark (since default svg is dark)
    const shouldInvertSvg = colorMix > 0.5;

    const cssVars = {
        ["--base"]: dynamicBaseColor,
        ["--pill-bg"]: dynamicPillColor,
        ["--hover-text"]: dynamicHoverTextColor,
        ["--pill-text"]: dynamicPillTextColor,
        ["--nav-h"]: "42px",
        ["--logo"]: "36px",
        ["--pill-pad-x"]: "18px",
        ["--pill-gap"]: "3px",
    } as React.CSSProperties;

    return (
        <div className="fixed top-[1em] left-1/2 transform -translate-x-1/2 z-[1000] w-full md:w-auto px-4 md:px-0">
            <nav
                ref={navRef}
                className={`w-full md:w-max flex items-center justify-between md:justify-start box-border ${className}`}
                aria-label="Primary"
                style={cssVars}
            >
                {isRouterLink(logoHref) ? (
                    <Link
                        href={logoHref}
                        aria-label="Home"
                        onMouseEnter={handleLogoEnter}
                        role="menuitem"
                        ref={(el) => {
                            logoRef.current = el;
                        }}
                        className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
                        style={{
                            width: "var(--nav-h)",
                            height: "var(--nav-h)",
                            background: "var(--base, #0C0A09)",
                        }}
                    >
                        <img
                            src={logo}
                            alt={logoAlt}
                            ref={logoImgRef}
                            className={`w-full h-full object-cover block transition-all duration-75 ${shouldInvertSvg ? "invert" : ""}`}
                        />
                    </Link>
                ) : (
                    <a
                        href={logoHref}
                        aria-label="Home"
                        onMouseEnter={handleLogoEnter}
                        ref={(el) => {
                            logoRef.current = el;
                        }}
                        className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
                        style={{
                            width: "var(--nav-h)",
                            height: "var(--nav-h)",
                            background: "var(--base, #0C0A09)",
                        }}
                    >
                        <img
                            src={logo}
                            alt={logoAlt}
                            ref={logoImgRef}
                            className={`w-full h-full object-cover block transition-all duration-75 ${shouldInvertSvg ? "invert" : ""}`}
                        />
                    </a>
                )}

                <div
                    ref={navItemsRef}
                    className="relative items-center rounded-full hidden md:flex ml-2"
                    style={{
                        height: "var(--nav-h)",
                        background: "var(--base, #0C0A09)",
                    }}
                >
                    <ul
                        role="menubar"
                        className="list-none flex items-stretch m-0 p-[3px] h-full"
                        style={{ gap: "var(--pill-gap)" }}
                    >
                        {items.map((item, i) => {
                            const isActive = activeHref === item.href;

                            const pillStyle: React.CSSProperties = {
                                background: "var(--pill-bg, #fff)",
                                color: "var(--pill-text, var(--base, #0C0A09))",
                                paddingLeft: "var(--pill-pad-x)",
                                paddingRight: "var(--pill-pad-x)",
                            };

                            const PillContent = (
                                <>
                                    <span
                                        className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                                        style={{
                                            background: "var(--base, #0C0A09)",
                                            willChange: "transform",
                                        }}
                                        aria-hidden="true"
                                        ref={(el) => {
                                            circleRefs.current[i] = el;
                                        }}
                                    />
                                    <span className="label-stack relative inline-block leading-[1] z-[2]">
                                        <span
                                            className="pill-label relative z-[2] inline-block leading-[1]"
                                            style={{ willChange: "transform" }}
                                        >
                                            {item.label}
                                        </span>
                                        <span
                                            className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                                            style={{
                                                color: "var(--hover-text, #fff)",
                                                willChange:
                                                    "transform, opacity",
                                            }}
                                            aria-hidden="true"
                                        >
                                            {item.label}
                                        </span>
                                    </span>
                                    {isActive && (
                                        <span
                                            className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-2 h-2 rounded-full z-[4]"
                                            style={{
                                                background:
                                                    "var(--base, #0C0A09)",
                                            }}
                                            aria-hidden="true"
                                        />
                                    )}
                                </>
                            );

                            const basePillClasses =
                                "relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border text-[18px] leading-[0] font-instrument-serif  whitespace-nowrap cursor-pointer px-0";

                            return (
                                <li
                                    key={item.href}
                                    role="none"
                                    className="flex h-full"
                                >
                                    {isRouterLink(item.href) ? (
                                        <Link
                                            role="menuitem"
                                            href={item.href}
                                            className={basePillClasses}
                                            style={pillStyle}
                                            aria-label={
                                                item.ariaLabel || item.label
                                            }
                                            onMouseEnter={() => handleEnter(i)}
                                            onMouseLeave={() => handleLeave(i)}
                                        >
                                            {PillContent}
                                        </Link>
                                    ) : (
                                        <a
                                            role="menuitem"
                                            href={item.href}
                                            className={basePillClasses}
                                            style={pillStyle}
                                            aria-label={
                                                item.ariaLabel || item.label
                                            }
                                            onMouseEnter={() => handleEnter(i)}
                                            onMouseLeave={() => handleLeave(i)}
                                        >
                                            {PillContent}
                                        </a>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <button
                    ref={hamburgerRef}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                    className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative"
                    style={{
                        width: "var(--nav-h)",
                        height: "var(--nav-h)",
                        background: "var(--base, #0C0A09)",
                    }}
                >
                    <span
                        className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                        style={{ background: "var(--pill-bg, #fff)" }}
                    />
                    <span
                        className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                        style={{ background: "var(--pill-bg, #fff)" }}
                    />
                </button>
            </nav>

            <div
                ref={mobileMenuRef}
                className="md:hidden absolute top-[3em] left-0 right-0 rounded-[27px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-[998] origin-top"
                style={{
                    ...cssVars,
                    background: "var(--base, #f0f0f0)",
                }}
            >
                <ul className="list-none m-0 p-[3px] flex flex-col gap-[3px]">
                    {items.map((item) => {
                        const defaultStyle: React.CSSProperties = {
                            background: "var(--pill-bg, #fff)",
                            color: "var(--pill-text, #fff)",
                        };
                        const hoverIn = (
                            e: React.MouseEvent<HTMLAnchorElement>,
                        ) => {
                            e.currentTarget.style.background = "var(--base)";
                            e.currentTarget.style.color =
                                "var(--hover-text, #fff)";
                        };
                        const hoverOut = (
                            e: React.MouseEvent<HTMLAnchorElement>,
                        ) => {
                            e.currentTarget.style.background =
                                "var(--pill-bg, #fff)";
                            e.currentTarget.style.color =
                                "var(--pill-text, #fff)";
                        };

                        const linkClasses =
                            "block py-3 px-4 text-[16px] font-instrument-serif rounded-[50px] transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]";

                        return (
                            <li key={item.href}>
                                {isRouterLink(item.href) ? (
                                    <Link
                                        href={item.href}
                                        className={linkClasses}
                                        style={defaultStyle}
                                        onMouseEnter={hoverIn}
                                        onMouseLeave={hoverOut}
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <a
                                        href={item.href}
                                        className={linkClasses}
                                        style={defaultStyle}
                                        onMouseEnter={hoverIn}
                                        onMouseLeave={hoverOut}
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        {item.label}
                                    </a>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default PillNav;
