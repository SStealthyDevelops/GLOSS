
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {getSoundDescriptionById} from "@/lib/sound-library";

interface InfoPanelProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    id: string;
}

const InfoPanel = ({ isOpen, onClose, title = "Information", id }: InfoPanelProps) => {
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside);
            }, 100);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            <div
                className={cn(
                    "fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0"
                )}
            />

            <div
                ref={panelRef}
                className={cn(
                    "fixed top-0 left-0 h-full w-96 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex items-center justify-between p-6 border-b border-gloss-gold border-opacity-30">
                    <h2 className="text-2xl font-bold text-gloss-gold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-all hover:scale-110"
                        aria-label="Close panel"
                    >
                        <X className="w-5 h-5 text-gloss-gold" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto h-[calc(100%-88px)]">
                    <p className="text-gloss-gold text-base">
                        {getSoundDescriptionById(id)}
                    </p>
                </div>
            </div>
        </>
    );
};

export default InfoPanel;