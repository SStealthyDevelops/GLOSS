import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, RotateCcw, HelpCircle } from 'lucide-react';
import { globalSoundUtils } from "@/lib/sound-utils";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import InfoPanel from './info-panel';

interface HexagonSliderProps {
    soundLocation: string;
    imageLocation: string;
    masterVolume?: number;
    id: string;
}

const HexagonSlider = ({ soundLocation, imageLocation, masterVolume = 1, id }: HexagonSliderProps) => {
    const [pitchRaw, setPitchRaw] = useState(50);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentEnd, setCurrentEnd] = useState<(() => void) | null>(null);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);

    useEffect(() => {
        globalSoundUtils.setMasterVolume(masterVolume);
    }, [masterVolume]);

    useEffect(() => {
        return () => {
            if (currentEnd) {
                currentEnd();
            }
            if (audioContext && audioContext.state !== 'closed') {
                audioContext.close();
            }
        };
    }, []);

    const playSound = async () => {
        if (isPaused && audioContext && audioContext.state !== 'closed') {
            await audioContext.resume();
            setIsPaused(false);
            return;
        }

        if (currentEnd) {
            currentEnd();
            setCurrentEnd(null);
        }

        if (audioContext && audioContext.state !== 'closed') {
            await audioContext.close();
        }

        setIsPlaying(true);
        setIsPaused(false);

        try {
            const newAudioContext = new AudioContext();
            setAudioContext(newAudioContext);

            const response = await fetch(`/sounds/${soundLocation}`);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await newAudioContext.decodeAudioData(arrayBuffer);

            const { end } = globalSoundUtils.playSample(
                newAudioContext,
                audioBuffer,
                pitchRaw
            );

            setCurrentEnd(() => end);

            // Wait for sound to finish or be stopped
            const duration = (audioBuffer.duration / (pitchRaw / 50)) * 1000;
            setTimeout(() => {
                setIsPlaying(false);
                setIsPaused(false);
                setCurrentEnd(null);

                // Only close if still open
                if (newAudioContext.state !== 'closed') {
                    newAudioContext.close().catch(err => {
                        console.warn('Error closing audio context:', err);
                    });
                }
                setAudioContext(null);
            }, duration);

        } catch (error) {
            console.error('Error playing sound:', error);
            setIsPlaying(false);
            setIsPaused(false);
            setCurrentEnd(null);
            setAudioContext(null);
        }
    };

    const pauseSound = async () => {
        if (audioContext && isPlaying && !isPaused && audioContext.state === 'running') {
            await audioContext.suspend();
            setIsPaused(true);
        }
    };

    const stopSound = () => {
        if (currentEnd) {
            currentEnd();
            setCurrentEnd(null);
        }

        if (audioContext && audioContext.state !== 'closed') {
            audioContext.close().catch(err => {
                console.warn('Error closing audio context:', err);
            });
            setAudioContext(null);
        }

        setIsPlaying(false);
        setIsPaused(false);
    };

    const resetPitch = () => {
        setPitchRaw(50);
    };

    const handleHelpClick = () => {
        setIsInfoPanelOpen(true);
    };

    const handleHexagonClick = () => {
        if (isPlaying && !isPaused) {
            pauseSound();
        } else {
            playSound();
        }
    };

    return (
        <>
            <div className="inline-flex flex-col items-center justify-center gap-3">
                <div className="flex gap-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleHelpClick();
                        }}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border-2 border-gloss-gold flex items-center justify-center transition-all shadow-lg hover:scale-110"
                        aria-label="Help"
                    >
                        <HelpCircle className="w-5 h-5 text-gloss-gold" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            resetPitch();
                        }}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border-2 border-gloss-gold flex items-center justify-center transition-all shadow-lg hover:scale-110"
                        aria-label="Reset pitch"
                    >
                        <RotateCcw className="w-5 h-5 text-gloss-gold" />
                    </button>
                </div>

                <div className="relative w-48 h-[420px]">
                    <button
                        className={cn(
                            "absolute inset-0 top-6 flex items-center justify-center focus:outline-none transition-all",
                            !isPlaying && "hover:scale-105"
                        )}
                        onClick={handleHexagonClick}
                        aria-label={isPlaying && !isPaused ? "Pause sound" : "Play sound"}
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
                                    isPlaying && !isPaused && "opacity-80"
                                )}
                            />

                            <polygon
                                points="100,25 155,55 155,115 100,145 45,115 45,55"
                                fill="#4a7ba7"
                                opacity="0.8"
                            />
                        </svg>
                    </button>

                    <div className="absolute top-[70px] left-1/2 -translate-x-1/2 pointer-events-none">
                        <div className={cn(
                            "w-20 h-20 rounded-lg overflow-hidden shadow-lg transition-transform duration-200",
                            isPlaying && !isPaused && "scale-110"
                        )}>
                            <Image
                                src={imageLocation}
                                alt="Sound icon"
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 top-[175px] pointer-events-none">
                        <span className="text-gloss-gold font-semibold text-xs tracking-wide">
                            PITCH
                        </span>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 top-[195px] h-44">
                        <div className="relative w-8 h-full">
                            <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gloss-offwhite bg-opacity-30 rounded-full"></div>

                            <div
                                className="absolute left-1/2 -translate-x-1/2 w-1 bg-gloss-gold bg-opacity-80 rounded-full transition-all duration-200 bottom-0"
                                style={{ height: `${pitchRaw}%` }}
                            ></div>

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

                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={pitchRaw}
                                onChange={(e) => setPitchRaw(Math.max(Number(e.target.value), 1))}
                                className="absolute left-1/2 -translate-x-1/2 w-full h-full opacity-0 cursor-pointer z-10"
                                style={{
                                    // @ts-ignore
                                    writingMode: 'bt-lr',
                                    WebkitAppearance: 'slider-vertical',
                                    // @ts-ignore
                                    appearance: 'slider-vertical'
                                }}
                                aria-label="Pitch slider"
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
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (isPlaying && !isPaused) {
                                pauseSound();
                            } else {
                                playSound();
                            }
                        }}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border-2 border-gloss-gold flex items-center justify-center transition-all shadow-lg hover:scale-110"
                        aria-label={isPlaying && !isPaused ? "Pause" : "Play"}
                    >
                        {isPlaying && !isPaused ? (
                            <Pause className="w-5 h-5 text-gloss-gold" fill="currentColor" />
                        ) : (
                            <Play className="w-5 h-5 text-gloss-gold ml-0.5" fill="currentColor" />
                        )}
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            stopSound();
                        }}
                        disabled={!isPlaying}
                        className={cn(
                            "w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-gloss-gold flex items-center justify-center transition-all shadow-lg",
                            isPlaying ? "hover:from-slate-600 hover:to-slate-700 hover:scale-110 opacity-100" : "opacity-40 cursor-not-allowed"
                        )}
                        aria-label="Stop"
                    >
                        <Square className="w-4 h-4 text-gloss-gold" fill="currentColor" />
                    </button>
                </div>
            </div>

            <InfoPanel
                isOpen={isInfoPanelOpen}
                onClose={() => setIsInfoPanelOpen(false)}
                title="Sound Information"
                id={id}
            />
        </>
    );
};

export default HexagonSlider;