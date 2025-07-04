"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamic import for the popup to reduce initial bundle size
const DynamicVintagePriceListPopup = dynamic(
	() => import("@/components/ui/VintagePriceListPopup").then(mod => ({ default: mod.VintagePriceListPopup })),
	{
		ssr: false,
		loading: () => null, // No loading state needed for popup
	}
);

interface PriceListButtonProps {
	text: string;
}

export default function PriceListButton({ text }: PriceListButtonProps) {
	const [isPriceListOpen, setIsPriceListOpen] = useState(false);

	return (
		<>
			<button
				onClick={() => setIsPriceListOpen(true)}
				className={`
          mt-4 mb-8 rounded-lg px-8 py-3 text-lg font-bold
          text-white shadow-lg transition-all duration-300
          hover:shadow-xl hover:scale-105
          md:mb-12
          bg-gradient-to-r from-[#2d5a3d] to-[#4a7c59]
          hover:from-[#4a7c59] hover:to-[#2d5a3d]
          border-3 border-[#2d5a3d]
          font-serif tracking-wider uppercase
          transform
        `}
				aria-label="Open price list"
			>
				{text}
			</button>

			{isPriceListOpen && (
				<DynamicVintagePriceListPopup
					isOpen={isPriceListOpen}
					onClose={() => setIsPriceListOpen(false)}
				/>
			)}
		</>
	);
}
