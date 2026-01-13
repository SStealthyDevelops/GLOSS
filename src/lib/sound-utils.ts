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

    public mapSliderVal = (val: number) => {
        return 0.5 + 0.015 * val;
    }

    /**
     * Map volume slider value (0-100) to gain value (0-2)
     * 0 = silent, 50 = 1x (100%), 100 = 2x (200%)
     */
    public mapVolumeSliderVal = (val: number): number => {
        // Map 0-100 to 0-2 linearly
        return (val / 100) * 2;
    }

    /**
     * Play a sample with pitch shifting and volume control
     * Now returns references to gain and source nodes for real-time control
     * @param audioContext - The Web Audio API context
     * @param audioBuffer - The decoded audio buffer
     * @param rawPitchRate - Raw pitch value from 0-100 (50 = normal pitch)
     * @param rawVolumeRate - Raw volume value from 0-100 (0 = silent, 50 = 100%, 100 = 200%)
     * @returns Object with end function, gainNode, and sourceNode for real-time control
     */
    public playSample(
        audioContext: AudioContext,
        audioBuffer: AudioBuffer,
        rawPitchRate: number,
        rawVolumeRate: number = 50
    ) {
        const rate = Math.max(0.80, this.mapSliderVal(rawPitchRate));
        const individualVolume = this.mapVolumeSliderVal(rawVolumeRate);

        const source = audioContext.createBufferSource();
        const gainNode = audioContext.createGain();

        source.buffer = audioBuffer;
        source.playbackRate.value = rate;

        // Set initial gain based on master volume and individual volume
        gainNode.gain.value = this.masterVolume * individualVolume;

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

        // Return the nodes so they can be controlled in real-time
        return { end, gainNode, sourceNode: source };
    }

    /**
     * Update the volume of a playing sound in real-time
     * @param gainNode - The gain node to update
     * @param rawVolumeRate - Raw volume value from 0-100 (0 = silent, 50 = 100%, 100 = 200%)
     */
    public updateVolume(gainNode: GainNode, rawVolumeRate: number) {
        const individualVolume = this.mapVolumeSliderVal(rawVolumeRate);
        // Smoothly transition to new volume to avoid clicking
        gainNode.gain.setTargetAtTime(
            this.masterVolume * individualVolume,
            gainNode.context.currentTime,
            0.01 // Time constant for smooth transition
        );
    }

    /**
     * Update the pitch of a playing sound in real-time
     * @param sourceNode - The source node to update
     * @param rawPitchRate - Raw pitch value from 0-100
     */
    public updatePitch(sourceNode: AudioBufferSourceNode, rawPitchRate: number) {
        const rate = Math.max(0.80, this.mapSliderVal(rawPitchRate));
        // Smoothly transition to new pitch to avoid artifacts
        sourceNode.playbackRate.setTargetAtTime(
            rate,
            sourceNode.context.currentTime,
            0.01 // Time constant for smooth transition
        );
    }

    /**
     * Update master volume and apply to all active sounds
     * @param volume - Volume level from 0 to 1
     * @param activeGainNodes - Array of currently active gain nodes to update
     * @param currentIndividualVolumes - Array of individual volume values (0-100, where 50 = 100%) corresponding to each gain node
     */
    public updateMasterVolume(
        volume: number,
        activeGainNodes: GainNode[] = [],
        currentIndividualVolumes: number[] = []
    ) {
        this.setMasterVolume(volume);

        // Update all active gain nodes with new master volume
        activeGainNodes.forEach((gainNode, index) => {
            const individualVolume = this.mapVolumeSliderVal(
                currentIndividualVolumes[index] || 50
            );
            gainNode.gain.setTargetAtTime(
                this.masterVolume * individualVolume,
                gainNode.context.currentTime,
                0.01
            );
        });
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
     * Convert pitch value to semitones for musical applications
     * @param rawPitchRate - Value from 0-100
     * @returns Semitones offset from original pitch
     */
    public pitchToSemitones(rawPitchRate: number): number {
        const rate = this.mapSliderVal(rawPitchRate);
        return 12 * Math.log2(rate);
    }
}

// Create a singleton instance for global access
export const globalSoundUtils = new SoundUtils();