export class SoundUtils {
    private masterVolume: number = 1;
    private activeSources: Set<AudioBufferSourceNode> = new Set();

    /**
     * Set the master volume for all sounds
     * @param volume - Volume level from 0 to 1
     */
    public setMasterVolume(volume: number) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
    }

    /**
     * Get the current master volume
     */
    public getMasterVolume(): number {
        return this.masterVolume;
    }

    /**
     * Play a sample with pitch shifting and volume control
     * @param audioContext - The Web Audio API context
     * @param audioBuffer - The decoded audio buffer
     * @param rawPitchRate - Raw pitch value from 0-100 (50 = normal pitch)
     * @param individualVolume - Optional individual volume multiplier (0-1)
     * @returns Object with end function to stop playback
     */
    public playSample(
        audioContext: AudioContext,
        audioBuffer: AudioBuffer,
        rawPitchRate: number,
        individualVolume: number = 1
    ) {
        const rate = rawPitchRate / 50; // Convert 0-100 scale to 0.0-2.0 scale

        const source = audioContext.createBufferSource();
        const gainNode = audioContext.createGain();

        source.buffer = audioBuffer;
        source.playbackRate.value = rate; // 1 = original speed/pitch, 2 = twice as fast/high

        const finalVolume = this.masterVolume * individualVolume;
        gainNode.gain.value = finalVolume;

        source.connect(gainNode);
        gainNode.connect(audioContext.destination);

        this.activeSources.add(source);

        source.start(0);

        source.onended = () => {
            this.activeSources.delete(source);
            source.disconnect();
            gainNode.disconnect();
        };

        const end = () => {
            try {
                source.stop();
                source.disconnect();
                gainNode.disconnect();
                this.activeSources.delete(source);
            } catch (e) {
                // Source might already be stopped
                console.warn('Source already stopped:', e);
            }
        };

        return { end };
    }

    public stopAll() {
        this.activeSources.forEach(source => {
            try {
                source.stop();
                source.disconnect();
            } catch (e) {
                console.warn('Error stopping source:', e);
            }
        });
        this.activeSources.clear();
    }


    public getActiveSoundCount(): number {
        return this.activeSources.size;
    }

    /**
     * Convert raw pitch value to playback rate
     * @param rawPitchRate - Value from 0-100
     * @returns Playback rate (0.0 to 2.0)
     */
    public rawPitchToRate(rawPitchRate: number): number {
        return rawPitchRate / 50;
    }

    /**
     * Convert pitch value to semitones for musical applications
     * @param rawPitchRate - Value from 0-100
     * @returns Semitones offset from original pitch
     */
    public pitchToSemitones(rawPitchRate: number): number {
        const rate = this.rawPitchToRate(rawPitchRate);
        return 12 * Math.log2(rate);
    }
}

// Create a singleton instance for global access
export const globalSoundUtils = new SoundUtils();