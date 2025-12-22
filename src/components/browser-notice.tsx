"use client";

import { useIsChromium } from "@/hooks/use-chrome";

export default function BrowserNotice() {
    const isChromium = useIsChromium();

    // Avoid hydration mismatch
    if (isChromium === null) return null;

    if (isChromium) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gloss-dark text-white p-6">
            <div className="max-w-md text-center">
                <h1 className="text-5xl font-bold mb-10">Unsupported Browser</h1>
                <p className="text-2xl mb-4">
                    This website currently works only on
                    <strong> Chrome or Chromium-based browsers</strong>.
                </p>
                <p className="text-lg opacity-75">
                    Please switch to Chrome, Edge, Brave, Arc, etc. for the best experience.
                </p>
            </div>
        </div>
    );
}