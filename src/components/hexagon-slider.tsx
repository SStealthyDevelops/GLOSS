// components/hexagon-slider.tsx

import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { globalSoundUtils } from "@/lib/sound-utils";
import { cn } from "@/lib/utils";

interface HexagonSliderProps {
    soundLocation: string;
    masterVolume?: number;
}

const HexagonSlider = ({ soundLocation, masterVolume = 1 }: HexagonSliderProps) => {
    const [pitchRaw, setPitchRaw] = useState(50);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentEnd, setCurrentEnd] = useState<(() => void) | null>(null);

    // Update global sound utils when master volume changes
    useEffect(() => {
        globalSoundUtils.setMasterVolume(masterVolume);
    }, [masterVolume]);

    const playSound = async () => {
        // Stop previous sound if still playing
        if (currentEnd) {
            currentEnd();
            setCurrentEnd(null);
        }

        setIsPlaying(true);

        try {
            const audioContext = new AudioContext();
            const response = await fetch(`/sounds/${soundLocation}`);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            const { end } = globalSoundUtils.playSample(
                audioContext,
                audioBuffer,
                pitchRaw
            );

            setCurrentEnd(() => end);

            // Wait for sound to finish or be stopped
            setTimeout(() => {
                setIsPlaying(false);
                setCurrentEnd(null);
                audioContext.close();
            }, (audioBuffer.duration / (pitchRaw / 50)) * 1000);

        } catch (error) {
            console.error('Error playing sound:', error);
            setIsPlaying(false);
            setCurrentEnd(null);
        }
    };

    return (
        <div className="inline-flex items-center justify-center p-4">
            <div className="relative w-48 h-96">
                <button
                    className={cn(
                        "absolute inset-0 flex items-center justify-center focus:outline-none transition-all",
                        !isPlaying && "hover:scale-105"
                    )}
                    onClick={playSound}
                    aria-label="Play sound"
                >
                    <svg
                        viewBox="0 0 200 400"
                        className="w-full h-full"
                        style={{ filter: 'drop-shadow(0 4px 12px rgba(30, 58, 95, 0.2))' }}
                    >
                        <defs>
                            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#6b9bd1', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#1e3a5f', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>

                        <polygon
                            points="100,15 175,60 175,340 100,385 25,340 25,60"
                            fill="url(#hexGradient)"
                            stroke="#d4af37"
                            strokeWidth="3"
                            className={cn(
                                "transition-opacity duration-200",
                                isPlaying && "opacity-80"
                            )}
                        />

                        <polygon
                            points="100,25 155,55 155,115 100,145 45,115 45,55"
                            fill="#4a7ba7"
                            opacity="0.8"
                        />
                    </svg>
                </button>

                <div className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none">
                    <Volume2
                        className={cn(
                            "w-10 h-10 text-white transition-transform duration-200",
                            isPlaying && "scale-110"
                        )}
                        strokeWidth={2.5}
                    />
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 top-40 h-44">
                    <div className="relative w-8 h-full">
                        {/* Background track */}
                        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gloss-offwhite bg-opacity-30 rounded-full"></div>

                        {/* Active track */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 w-1 bg-gloss-gold bg-opacity-80 rounded-full transition-all duration-200 bottom-0"
                            style={{ height: `${pitchRaw}%` }}
                        ></div>

                        {/* Tick marks */}
                        <div className="absolute left-1/2 -translate-x-1/2 w-full h-full flex flex-col justify-between py-1 pointer-events-none">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="flex justify-center">
                                    <div className={cn(
                                        "w-3 h-0.5 bg-gloss-offwhite opacity-50",
                                        i === 5 ? 'w-5' : ''
                                    )}></div>
                                </div>
                            ))}
                        </div>

                        {/* Slider input */}
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={pitchRaw}
                            onChange={(e) => setPitchRaw(Number(e.target.value))}
                            className="absolute left-1/2 -translate-x-1/2 w-full h-full opacity-0 cursor-pointer z-10"
                            style={{
                                // @ts-ignore For some reason, they throw errors but it works perfectly fine!
                                writingMode: 'bt-lr',
                                WebkitAppearance: 'slider-vertical',
                                // @ts-ignore
                                appearance: 'slider-vertical'
                            }}
                            aria-label="Pitch slider"
                        />

                        {/* Slider thumb */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-200"
                            style={{
                                bottom: `calc(${pitchRaw}% - 16px)`,
                            }}
                        >
                            <div className="relative">
                                <div className="w-10 h-2 bg-gradient-to-b from-gloss-gold to-yellow-600 rounded-t"></div>

                                <div className="w-10 h-8 bg-gradient-to-b from-gray-200 to-gray-300 shadow-lg border-x-2 border-gloss-navy flex flex-col items-center justify-center gap-1 py-1">
                                    <div className="w-6 h-0.5 bg-gloss-navy rounded-full"></div>
                                    <div className="w-6 h-0.5 bg-gloss-navy rounded-full"></div>
                                    <div className="w-6 h-0.5 bg-gloss-navy rounded-full"></div>
                                </div>

                                <div className="w-10 h-1 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HexagonSlider;