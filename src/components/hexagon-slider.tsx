import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, RotateCcw, HelpCircle } from 'lucide-react';
import { globalSoundUtils } from "@/lib/sound-utils";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import InfoPanel from './info-panel';
import {getSoundById} from "@/lib/sound-library";

interface HexagonSliderProps {
    soundLocation: string;
    imageLocation: string;
    masterVolume?: number;
    id: string;
}

const HexagonSlider = ({ soundLocation, imageLocation, masterVolume = 1, id }: HexagonSliderProps) => {
    const [pitchRaw, setPitchRaw] = useState(50);
    const [volumeRaw, setVolumeRaw] = useState(50); // 50 = 100% (1x gain)
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);

    // Refs to store audio nodes for real-time control
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioBufferRef = useRef<AudioBuffer | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
    const endFunctionRef = useRef<(() => void) | null>(null);

    // Update master volume when prop changes
    useEffect(() => {
        globalSoundUtils.setMasterVolume(masterVolume);

        // If currently playing, update the gain to reflect new master volume
        if (gainNodeRef.current && isPlaying) {
            globalSoundUtils.updateVolume(gainNodeRef.current, volumeRaw);
        }
    }, [masterVolume, isPlaying, volumeRaw]);

    // Update pitch in real-time when slider changes
    useEffect(() => {
        if (sourceNodeRef.current && isPlaying && !isPaused) {
            globalSoundUtils.updatePitch(sourceNodeRef.current, pitchRaw);
        }
    }, [pitchRaw, isPlaying, isPaused]);

    // Update volume in real-time when slider changes
    useEffect(() => {
        if (gainNodeRef.current && isPlaying) {
            globalSoundUtils.updateVolume(gainNodeRef.current, volumeRaw);
        }
    }, [volumeRaw, isPlaying]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (endFunctionRef.current) {
                endFunctionRef.current();
            }
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, []);

    const playSound = async () => {
        // If paused, just resume the audio context
        if (isPaused && audioContextRef.current && audioContextRef.current.state !== 'closed') {
            await audioContextRef.current.resume();
            setIsPaused(false);
            return;
        }

        // Stop any currently playing sound
        if (endFunctionRef.current) {
            endFunctionRef.current();
            endFunctionRef.current = null;
        }

        // Close old context if exists
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            await audioContextRef.current.close();
        }

        setIsPlaying(true);
        setIsPaused(false);

        try {
            // Create new audio context
            const newAudioContext = new AudioContext();
            audioContextRef.current = newAudioContext;

            // Load and decode audio buffer (or reuse if already loaded)
            let audioBuffer = audioBufferRef.current;
            if (!audioBuffer) {
                const response = await fetch(`/sounds/${soundLocation}`);
                const arrayBuffer = await response.arrayBuffer();
                audioBuffer = await newAudioContext.decodeAudioData(arrayBuffer);
                audioBufferRef.current = audioBuffer; // Cache for future use
            }

            // Play the sample and get references to nodes
            const { end, gainNode, sourceNode } = globalSoundUtils.playSample(
                newAudioContext,
                audioBuffer,
                pitchRaw,
                volumeRaw
            );

            // Store references for real-time control
            gainNodeRef.current = gainNode;
            sourceNodeRef.current = sourceNode;
            endFunctionRef.current = end;

            // Calculate duration based on pitch
            const duration = (audioBuffer.duration / (globalSoundUtils.mapSliderVal(pitchRaw))) * 1000;

            // Auto-stop when sound finishes
            setTimeout(() => {
                // Only reset if this is still the current sound
                if (sourceNodeRef.current === sourceNode) {
                    setIsPlaying(false);
                    setIsPaused(false);
                    gainNodeRef.current = null;
                    sourceNodeRef.current = null;
                    endFunctionRef.current = null;

                    if (newAudioContext.state !== 'closed') {
                        newAudioContext.close().catch(err => {
                            console.warn('Error closing audio context:', err);
                        });
                    }
                    audioContextRef.current = null;
                }
            }, duration);

        } catch (error) {
            console.error('Error playing sound:', error);
            setIsPlaying(false);
            setIsPaused(false);
            gainNodeRef.current = null;
            sourceNodeRef.current = null;
            endFunctionRef.current = null;
            audioContextRef.current = null;
        }
    };

    const pauseSound = async () => {
        if (audioContextRef.current && isPlaying && !isPaused && audioContextRef.current.state === 'running') {
            await audioContextRef.current.suspend();
            setIsPaused(true);
        }
    };

    const stopSound = () => {
        if (endFunctionRef.current) {
            endFunctionRef.current();
            endFunctionRef.current = null;
        }

        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close().catch(err => {
                console.warn('Error closing audio context:', err);
            });
            audioContextRef.current = null;
        }

        gainNodeRef.current = null;
        sourceNodeRef.current = null;
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

                <div className="relative w-72 h-[420px]">
                    <button
                        className={cn(
                            "absolute inset-0 top-6 flex items-center justify-center focus:outline-none transition-all",
                            !isPlaying && "hover:scale-105"
                        )}
                        onClick={handleHexagonClick}
                        aria-label={isPlaying && !isPaused ? "Pause sound" : "Play sound"}
                    >
                        <svg
                            viewBox="0 0 300 400"
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
                                points="150,15 260,60 260,340 150,385 40,340 40,60"
                                fill="url(#hexGradient)"
                                stroke="#d4af37"
                                strokeWidth="3"
                                className={cn(
                                    "transition-opacity duration-200",
                                    isPlaying && !isPaused && "opacity-80"
                                )}
                            />

                            <polygon
                                points="150,25 215,55 215,115 150,145 85,115 85,55"
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

                    {/* Volume Slider (Left) */}
                    <div className="absolute left-[105px] -translate-x-1/2 top-[175px] pointer-events-none">
                        <span className="text-gloss-gold font-semibold text-xs tracking-wide">
                            VOLUME
                        </span>
                    </div>

                    <div className="absolute left-[105px] -translate-x-1/2 top-[195px] h-44">
                        <div className="relative w-8 h-full">
                            <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gloss-offwhite bg-opacity-30 rounded-full"></div>

                            <div
                                className="absolute left-1/2 -translate-x-1/2 w-1 bg-gloss-gold bg-opacity-80 rounded-full transition-all duration-200 bottom-0"
                                style={{ height: `${volumeRaw}%` }}
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
                                value={volumeRaw}
                                onChange={(e) => setVolumeRaw(Math.max(Number(e.target.value), 0))}
                                className="absolute left-1/2 -translate-x-1/2 w-full h-full opacity-0 cursor-pointer z-10"
                                style={{
                                    // @ts-ignore
                                    writingMode: 'bt-lr',
                                    WebkitAppearance: 'slider-vertical',
                                    // @ts-ignore
                                    appearance: 'slider-vertical'
                                }}
                                aria-label="Volume slider"
                            />

                            <div
                                className="absolute left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-200"
                                style={{
                                    bottom: `calc(${volumeRaw}% - 16px)`,
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

                    {/* Pitch Slider (Right) */}
                    <div className="absolute left-[195px] -translate-x-1/2 top-[175px] pointer-events-none">
                        <span className="text-gloss-gold font-semibold text-xs tracking-wide">
                            PITCH
                        </span>
                    </div>

                    <div className="absolute left-[195px] -translate-x-1/2 top-[195px] h-44">
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
                title={getSoundById(id)?.name || 'Sound Info'}
                id={id}
            />
        </>
    );
};

export default HexagonSlider;