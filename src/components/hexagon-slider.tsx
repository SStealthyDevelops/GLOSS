import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import {SoundUtils} from "@/lib/sound-utils";

/**
 *
 * @param soundLocation Relative to /sounds/
 * @param endCallback
 * @constructor
 */
const HexagonSlider = ( { soundLocation }: {soundLocation: string}) => {
    const [pitchRaw, setPitchRaw] = useState(50);

    // raw pitch from 0-100. `


    return (
        <div className="inline-flex items-center justify-center p-4">
            <div className="relative w-48 h-96">

                <button className="absolute inset-0 flex items-center justify-center" onClick={() => {
                    const audioContext = new AudioContext();
                    fetch(`/sounds/${soundLocation}`)
                        .then(response => response.arrayBuffer())
                        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                        .then(audioBuffer => {
                            const soundUtils = new SoundUtils();
                            const { end } = soundUtils.playSample(audioContext, audioBuffer, pitchRaw);
                        });
                }}>
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
                        />

                        <polygon
                            points="100,25 155,55 155,115 100,145 45,115 45,55"
                            fill="#4a7ba7"
                            opacity="0.8"
                        />
                    </svg>
                </button>

                <div className="absolute top-12 left-1/2 -translate-x-1/2">
                    <Volume2 className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 top-40 h-44">
                    <div className="relative w-8 h-full">

                        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gloss-offwhite bg-opacity-30 rounded-full"></div>

                        <div
                            className="absolute left-1/2 -translate-x-1/2 w-1 bg-gloss-gold bg-opacity-80 rounded-full transition-all duration-200 bottom-0"
                            style={{ height: `${pitchRaw}%` }}
                        ></div>

                        <div className="absolute left-1/2 -translate-x-1/2 w-full h-full flex flex-col justify-between py-1">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="flex justify-center">
                                    <div className="w-3 h-0.5 bg-gloss-offwhite opacity-50"></div>
                                </div>
                            ))}
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={pitchRaw}
                            onChange={(e) => setPitchRaw(Number(e.target.value))}
                            className="absolute left-1/2 -translate-x-1/2 w-full h-full opacity-0 cursor-pointer z-10"
                            style={{
                                writingMode: 'bt-lr',
                                WebkitAppearance: 'slider-vertical',
                                appearance: 'slider-vertical'
                            }}
                            aria-label="Volume slider"
                        />

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

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                    <div className="bg-white px-5 py-2 rounded-lg shadow-md border-2 border-gloss-gold">
                        <span className="text-2xl font-serif font-bold text-gloss-navy">{pitchRaw}</span>
                        <span className="text-xs font-body-serif text-gloss-slate ml-0.5">%</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HexagonSlider;