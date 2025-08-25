"use client";

import React from "react";
import { gsap } from "gsap";
import { InfiniteSlider } from "../ui/InfiniteSlider";

interface MenuItemProps {
    link: string;
    text: string;
    secondaryText?: string;
    image?: string;
}

export interface FlowingMenuProps {
    items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
    return (
        <div className="w-full h-full overflow-hidden">
            <nav className="flex flex-col h-full m-0 p-0">
                {items.map((item, idx) => (
                    <MenuItem key={idx} {...item} />
                ))}
            </nav>
        </div>
    );
};

const MenuItem: React.FC<MenuItemProps> = ({
    link,
    text,
    secondaryText,
    image,
}) => {
    const itemRef = React.useRef<HTMLDivElement>(null);
    const marqueeRef = React.useRef<HTMLDivElement>(null);
    const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

    const animationDefaults = { duration: 0.3, ease: "expo" };

    const findClosestEdge = (
        mouseX: number,
        mouseY: number,
        width: number,
        height: number,
    ): "top" | "bottom" => {
        const topEdgeDist =
            Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
        const bottomEdgeDist =
            Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
        return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
    };

    const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
            return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(
            ev.clientX - rect.left,
            ev.clientY - rect.top,
            rect.width,
            rect.height,
        );

        // kill any existing animations first
        gsap.killTweensOf([marqueeRef.current, marqueeInnerRef.current]);

        // find the marquee animation element
        const marqueeAnimElement = marqueeInnerRef.current?.querySelector(
            ".animate-marquee",
        ) as HTMLElement;

        const tl = gsap.timeline({ defaults: animationDefaults });
        tl.set(marqueeRef.current, {
            y: edge === "top" ? "-101%" : "101%",
            visibility: "visible",
        })
            .set(marqueeInnerRef.current, {
                y: edge === "top" ? "101%" : "-101%",
                opacity: 1,
            })
            .to([marqueeRef.current, marqueeInnerRef.current], {
                y: "0%",
                ease: "power2.easeOut",
                onComplete: () => {
                    // ensure css animation continues smoothly
                    const marqueeElement =
                        marqueeInnerRef.current?.querySelector(
                            ".animate-marquee",
                        ) as HTMLElement;
                    if (marqueeElement) {
                        marqueeElement.style.animationPlayState = "running";
                    }
                },
            });
    };

    const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
            return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(
            ev.clientX - rect.left,
            ev.clientY - rect.top,
            rect.width,
            rect.height,
        );

        // kill any existing animations first
        gsap.killTweensOf([marqueeRef.current, marqueeInnerRef.current]);

        const tl = gsap.timeline({ defaults: animationDefaults });
        tl.to(marqueeRef.current, {
            y: edge === "top" ? "-101%" : "101%",
            ease: "power2.easeIn",
        })
            .to(
                marqueeInnerRef.current,
                {
                    y: edge === "top" ? "101%" : "-101%",
                    ease: "power2.easeIn",
                },
                "<",
            )
            .set(marqueeRef.current, {
                visibility: "hidden",
            });
    };

    const marqueeText = secondaryText || text;

    return (
        <div
            className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#0C0A09]"
            ref={itemRef}
        >
            <a
                className="flex items-center justify-center h-full relative cursor-pointer no-underline font-instrument-serif text-[#0C0A09] text-[3vh]"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {text}
            </a>
            <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-[#0C0A09] translate-y-[101%] invisible"
                ref={marqueeRef}
            >
                <div className="h-full flex items-center" ref={marqueeInnerRef}>
                    <InfiniteSlider
                        speed={80}
                        gap={64}
                        className="h-full flex items-center"
                    >
                        {Array.from({ length: 20 }).map((_, idx) => (
                            <span
                                key={idx}
                                className="text-[#F8F8F8] font-instrument-serif font-normal text-[3vh] leading-[1.2] whitespace-nowrap flex-shrink-0 flex items-center h-full"
                            >
                                {marqueeText}
                            </span>
                        ))}
                    </InfiniteSlider>
                </div>
            </div>
        </div>
    );
};

export default FlowingMenu;
