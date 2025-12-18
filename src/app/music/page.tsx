"use client";

import HexagonSlider from "@/components/hexagon-slider";
import { useState } from "react";
import {Home, Music, Volume2, VolumeX} from "lucide-react";
import Link from "next/link";
import {soundLibrary} from "@/lib/sound-library";



const MusicPage = () => {
    const [masterVolume, setMasterVolume] = useState(70);

    return (
        <div className='min-h-screen w-screen bg-gloss-navy relative overflow-auto'>
            <header className="sticky top-0 z-40 w-full border-b border-gloss-gold border-opacity-20 bg-slate-900 bg-opacity-90 backdrop-blur-md shadow-lg">
                <div className="container mx-auto px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Music className="w-8 h-8 text-gloss-gold" />
                            <h1 className="text-2xl font-bold text-gloss-gold tracking-wide">
                                Sound Library
                            </h1>
                        </div>

                        <nav className="flex items-center gap-6">
                            <Link
                                href="/"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border-2 border-gloss-gold text-gloss-gold font-semibold transition-all hover:scale-105 shadow-lg"
                            >
                                <Home className="w-5 h-5" />
                                <span>Home</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 place-items-center">
                    {soundLibrary.map((sound) => (
                        <HexagonSlider
                            key={sound.id}
                            id={sound.id}
                            soundLocation={sound.soundLocation}
                            imageLocation={sound.imageLocation}
                            masterVolume={masterVolume / 100}
                        />
                    ))}
                </div>
            </div>

            <div className="fixed bottom-8 left-8 z-50">
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