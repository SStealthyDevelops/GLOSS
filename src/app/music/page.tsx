// app/music/page.tsx (or wherever your MusicPage is)

"use client";

import HexagonSlider from "@/components/hexagon-slider";
import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MusicPage = () => {
    const [masterVolume, setMasterVolume] = useState(70);

    return (
        <div className='h-screen w-screen bg-gloss-navy flex flex-col'>
            {/* Master Volume Control */}
            <div className="w-full p-6 flex items-center justify-center">
                <div className="flex items-center gap-4 bg-white bg-opacity-10 rounded-lg px-6 py-4 backdrop-blur-sm shadow-lg">
                    <VolumeX className="w-5 h-5 text-white opacity-60" />

                    <div className="relative w-64 h-2 bg-white bg-opacity-20 rounded-full">
                        {/* Progress bar */}
                        <div
                            className="absolute left-0 top-0 h-full bg-gradient-to-r from-gloss-gold to-yellow-500 rounded-full transition-all duration-200"
                            style={{ width: `${masterVolume}%` }}
                        ></div>

                        {/* Slider input */}
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={masterVolume}
                            onChange={(e) => setMasterVolume(Number(e.target.value))}
                            className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                            aria-label="Master volume"
                        />

                        {/* Slider thumb */}
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg pointer-events-none transition-all duration-200"
                            style={{ left: `calc(${masterVolume}% - 8px)` }}
                        ></div>
                    </div>

                    <Volume2 className="w-5 h-5 text-white" />

                    <span className="text-white font-medium text-lg min-w-[3ch] text-right">
                        {masterVolume}
                    </span>
                </div>
            </div>

            {/* Hexagon Slider */}
            <div className="flex-1 flex items-center justify-center">
                <HexagonSlider
                    soundLocation='piano/piano_01_A.mp3'
                    masterVolume={masterVolume / 100}
                />
            </div>
        </div>
    );
}

export default MusicPage;