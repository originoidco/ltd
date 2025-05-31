"use client";
import { Dithering } from "@paper-design/shaders-react";

export function BackgroundDither() {
	return (
		<div className="absolute inset-0 h-full w-full">
			<Dithering 
				style={{ height: "100%", width: "100%", opacity: 0.1 }}
				color1="#0c0a09" // bg
				color2="#dcddd7" // fg
				shape="warp"
				pxSize={2}
				speed={0.5}
			/>
		</div>
	);
};
