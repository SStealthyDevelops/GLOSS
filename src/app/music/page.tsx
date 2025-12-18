"use client";

import HexagonSlider from "@/components/hexagon-slider";
import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MusicPage = () => {
    const [masterVolume, setMasterVolume] = useState(70);

    return (
        <div className='h-screen w-screen bg-gloss-navy relative'>
            <div className="h-full w-full flex items-center justify-center">
                <HexagonSlider
                    soundLocation='piano/piano_01_A.mp3'
                    imageLocation='/images/piano-icon.jpg'
                    masterVolume={masterVolume / 100}
                />
            </div>

            <div className="absolute bottom-8 left-8">
                <div className="flex items-center gap-4 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg px-6 py-4 backdrop-blur-sm shadow-2xl border border-gloss-gold border-opacity-30">
                    <VolumeX className="w-5 h-5 text-gloss-gold opacity-70" />

                    <div className="relative w-48 h-3 bg-slate-900 bg-opacity-60 rounded-full shadow-inner">
                        <div
                            className="absolute left-0 top-0 h-full bg-gradient-to-r from-gloss-gold via-yellow-500 to-gloss-gold rounded-full transition-all duration-200 shadow-md"
                            style={{ width: `${masterVolume}%` }}
                        ></div>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={masterVolume}
                            onChange={(e) => setMasterVolume(Number(e.target.value))}
                            className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                            aria-label="Master volume"
                        />

                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-yellow-300 to-gloss-gold rounded-full shadow-lg border-2 border-slate-900 pointer-events-none transition-all duration-200"
                            style={{ left: `calc(${masterVolume}% - 10px)` }}
                        ></div>
                    </div>

                    <Volume2 className="w-5 h-5 text-gloss-gold" />

                    <div className="flex flex-col items-center min-w-[3ch]">
                        <span className="text-gloss-gold font-bold text-xl">
                            {masterVolume}
                        </span>
                        <span className="text-gloss-gold text-xs opacity-70">
                            VOL
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicPage;