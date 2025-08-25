"use client";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

interface CountUpProps {
    to: number;
    from?: number;
    direction?: "up" | "down";
    delay?: number;
    duration?: number;
    className?: string;
    startWhen?: boolean;
    separator?: string;
    suffix?: string;
    onStart?: () => void;
    onEnd?: () => void;
}

export default function CountUp({
    to,
    from = 0,
    direction = "up",
    delay = 0,
    duration = 2,
    className = "",
    startWhen = true,
    separator = "",
    suffix = "",
    onStart,
    onEnd,
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(direction === "down" ? to : from);

    const numberSize = Math.abs(to - from);
    const normalizedDuration = duration;

    const baseDamping = 30;
    const baseStiffness = 120;

    const damping = baseDamping * (normalizedDuration / 1);
    const stiffness = baseStiffness / (normalizedDuration / 1);

    const springValue = useSpring(motionValue, {
        damping,
        stiffness,
    });

    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const getDecimalPlaces = (num: number): number => {
        const str = num.toString();
        if (str.includes(".")) {
            const decimals = str.split(".")[1];
            if (parseInt(decimals) !== 0) {
                return decimals.length;
            }
        }
        return 0;
    };

    const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

    useEffect(() => {
        if (ref.current) {
            ref.current.textContent =
                String(direction === "down" ? to : from) + suffix;
        }
    }, [from, to, direction, suffix]);

    useEffect(() => {
        if (isInView && startWhen) {
            if (typeof onStart === "function") {
                onStart();
            }

            const timeoutId = setTimeout(() => {
                motionValue.set(direction === "down" ? from : to);
            }, delay * 1000);

            const durationTimeoutId = setTimeout(
                () => {
                    if (typeof onEnd === "function") {
                        onEnd();
                    }
                },
                delay * 1000 + duration * 1000,
            );

            return () => {
                clearTimeout(timeoutId);
                clearTimeout(durationTimeoutId);
            };
        }
    }, [
        isInView,
        startWhen,
        motionValue,
        direction,
        from,
        to,
        delay,
        onStart,
        onEnd,
        duration,
    ]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                const hasDecimals = maxDecimals > 0;

                const options: Intl.NumberFormatOptions = {
                    useGrouping: !!separator,
                    minimumFractionDigits: hasDecimals ? maxDecimals : 0,
                    maximumFractionDigits: hasDecimals ? maxDecimals : 0,
                };

                const formattedNumber = Intl.NumberFormat(
                    "en-US",
                    options,
                ).format(latest);

                const displayNumber = separator
                    ? formattedNumber.replace(/,/g, separator)
                    : formattedNumber;

                ref.current.textContent = displayNumber + suffix;
            }
        });

        return () => unsubscribe();
    }, [springValue, separator, maxDecimals]);

    return <span className={className} ref={ref} />;
}
