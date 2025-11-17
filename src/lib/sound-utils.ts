export class SoundUtils {
    public playSample(audioContext: AudioContext, audioBuffer: AudioBuffer, rawPitchRate: number) {
        const rate = rawPitchRate / 50; // Convert 0-100 scale to 0.0-2.0 scale


        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.playbackRate.value = rate; // 1 = original speed/pitch, 2 = twice as fast/high
        source.connect(audioContext.destination);
        source.start(0)

        const end = () => {
            source.stop();
            source.disconnect();
        }
        return {end};
    }
}