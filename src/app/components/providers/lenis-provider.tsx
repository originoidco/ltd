"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode } from "react";

interface LenisProviderProps {
    children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
    const lenis = useLenis(({ scroll }) => {});

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.2,
                smoothWheel: true,
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}
