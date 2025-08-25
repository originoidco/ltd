"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export interface AnimatedButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
    style?: React.CSSProperties;
    backgroundColor?: string;
    textColor?: string;
    hoverBackgroundColor?: string;
    hoverTextColor?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
    children,
    onClick,
    href,
    className = "",
    style = {},
    backgroundColor = "white",
    textColor = "#0C0A09",
    hoverBackgroundColor = "#0C0A09",
    hoverTextColor = "white",
    disabled = false,
    type = "button",
}) => {
    const circleRef = useRef<HTMLSpanElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(
        null,
    );
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const activeTweenRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const circle = circleRef.current;
        const button = buttonRef.current;

        if (!circle || !button || disabled) return;

        const layout = () => {
            const rect = button.getBoundingClientRect();
            const { width: w, height: h } = rect;
            const R = ((w * w) / 4 + h * h) / (2 * h);
            const D = Math.ceil(2 * R) + 2;
            const delta =
                Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
            const originY = D - delta;

            circle.style.width = `${D}px`;
            circle.style.height = `${D}px`;
            circle.style.bottom = `-${delta}px`;

            gsap.set(circle, {
                xPercent: -50,
                scale: 0,
                transformOrigin: `50% ${originY}px`,
            });

            const textSpan = button.querySelector("span:last-child");

            tlRef.current?.kill();
            const tl = gsap.timeline({ paused: true });

            tl.to(
                circle,
                {
                    scale: 1.2,
                    xPercent: -50,
                    duration: 2,
                    ease: "power3.easeOut",
                    overwrite: "auto",
                },
                0,
            );

            if (textSpan) {
                tl.to(
                    textSpan,
                    {
                        color: hoverTextColor,
                        duration: 2,
                        ease: "power3.easeOut",
                        overwrite: "auto",
                    },
                    0,
                );
            }

            tlRef.current = tl;
        };

        layout();

        const onResize = () => layout();
        window.addEventListener("resize", onResize);

        if (document.fonts) {
            document.fonts.ready.then(layout).catch(() => {});
        }

        return () => window.removeEventListener("resize", onResize);
    }, [disabled, hoverTextColor]);

    const handleEnter = () => {
        if (disabled) return;
        const tl = tlRef.current;
        const button = buttonRef.current;
        if (!tl) return;
        activeTweenRef.current?.kill();
        activeTweenRef.current = tl.tweenTo(tl.duration(), {
            duration: 0.3,
            ease: "power3.easeOut",
            overwrite: "auto",
            onUpdate: function () {
                if (button && this.progress() > 0.35) {
                    (button as HTMLElement).style.backgroundColor =
                        hoverBackgroundColor;
                }
            },
        });
    };

    const handleLeave = () => {
        if (disabled) return;
        const tl = tlRef.current;
        const button = buttonRef.current;
        if (!tl) return;
        activeTweenRef.current?.kill();
        activeTweenRef.current = tl.tweenTo(0, {
            duration: 0.2,
            ease: "power3.easeOut",
            overwrite: "auto",
            onStart: () => {
                if (button) {
                    (button as HTMLElement).style.backgroundColor =
                        backgroundColor;
                }
            },
        });
    };

    const baseClasses =
        "relative overflow-hidden font-semibold rounded-full transition-opacity duration-200";
    const combinedClasses = `${baseClasses} ${className}`;
    const combinedStyle = {
        backgroundColor,
        color: textColor,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        ...style,
    };

    const content = (
        <>
            <span
                ref={circleRef}
                className="absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                style={{
                    background: hoverBackgroundColor,
                    willChange: "transform",
                }}
            />
            <span className="relative z-[2]">{children}</span>
        </>
    );

    // if href is provided, render as link
    if (href && !disabled) {
        return (
            <Link
                href={href}
                ref={(el) => {
                    buttonRef.current = el;
                }}
                className={combinedClasses}
                style={combinedStyle}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
            >
                {content}
            </Link>
        );
    }

    // otherwise render as button
    return (
        <button
            ref={(el) => {
                buttonRef.current = el;
            }}
            type={type}
            className={combinedClasses}
            style={combinedStyle}
            onClick={disabled ? undefined : onClick}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            disabled={disabled}
        >
            {content}
        </button>
    );
};

export default AnimatedButton;
