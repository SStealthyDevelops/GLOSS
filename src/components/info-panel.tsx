// components/info-panel.tsx

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfoPanelProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
}

const InfoPanel = ({ isOpen, onClose, title = "Information", children }: InfoPanelProps) => {
    const panelRef = useRef<HTMLDivElement>(null);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            // Add a small delay to prevent immediate closing on the same click that opened it
            setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside);
            }, 100);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Handle escape key
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
            {/* Backdrop with blur */}
            <div
                className={cn(
                    "fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0"
                )}
            />

            {/* Side Panel */}
            <div
                ref={panelRef}
                className={cn(
                    "fixed top-0 left-0 h-full w-96 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header */}
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

                {/* Content */}
                <div className="p-6 overflow-y-auto h-[calc(100%-88px)]">
                    {children || (
                        <div className="text-gray-300">
                            <p>Panel content goes here...</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default InfoPanel;