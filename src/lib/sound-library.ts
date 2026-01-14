export interface SoundItem {
    id: string;
    soundLocation: string;
    imageLocation: string;
    name: string;
    description: string;
}

/**
 * Add more sounds as needed
 */
export const soundLibrary: SoundItem[] = [
    {
        id: "piano-a",
        soundLocation: "piano/piano_01_A.mp3",
        imageLocation: "/images/piano-icon.jpg",
        name: "Piano A",
        description: "The piano stands as one of the most versatile and beloved instruments in Western music, capable of expressing everything from delicate" +
            " intimacy to thunderous power. Invented by Bartolomeo Cristofori in Italy around 1700, the piano revolutionized music by allowing players to" +
            " control dynamics through touch—something its predecessor, the harpsichord, could not do. Over the centuries, piano craftsmanship reached" +
            " extraordinary heights, with manufacturers like Steinway & Sons becoming legendary for their quality and sound. This Steinway Baby Grand Model A" +
            " dates to 1896-97. Today, pianos remain central to classical music, jazz, and popular music, continuing to inspire composers and performers with their rich tonal palette and expressive range."
    },
    {
        id: "basement-photo-copier  ",
        soundLocation: "random/basement_photo_copier_safelight_01.mp3",
        imageLocation: "/images/basement.jpg",
        name: "Basement Photo Copier",
        description: "A steady hum punctuated by soft mechanical clicks, the photocopier safelight emits a sterile glow and a subtle electronic presence. Its sound is calm, procedural, and quietly hypnotic—perfect for evoking late-night offices, archival rooms, or moments of repetition and routine where time seems to slow under fluorescent light."
    },
    {
        id: "bathroom_sink_cold",
        soundLocation: "random/bathroom_sink_cold_tap.mp3",
        imageLocation: "/images/bathroom_sink.jpg",
        name: "Bathroom Sink Cold Tap",
        description: "A clean, rhythmic flow with delicate splashes and a faint metallic resonance, the bathroom sink tap produces an intimate, everyday soundscape. Gentle and familiar, it captures moments of pause and reflection—ideal for scenes of quiet routines, private spaces, or the subtle passage of time marked by running water."
    },
    {
        id: "xylophone-a",
        soundLocation: "xylophone/xylophone_a_3.mp3",
        imageLocation: "/images/xylophone.jpg",
        name: "Xylophone A",
        description: "Bright, percussive strikes ring out with crisp clarity, each note blooming and fading in quick succession. The xylophone’s sound is playful yet precise—perfect for conveying lightness, motion, and curiosity, from whimsical moments to carefully measured musical accents."
    },
    {
        id: "staff-bell-lo-b",
        soundLocation: "random/staff_bell_lo_b.mp3",
        imageLocation: "/images/staff_bell.jpg",
        name: "Staff Bell Lo B",
        description: "A single, resonant chime with a warm metallic body, the staff bell lo B rings out clean and controlled. Its low B pitch carries a sense of order and attention—ideal for signaling transitions, quiet authority, or grounding moments that call listeners gently into focus."
    },

];

export const getSoundDescriptionById = (id: string): string | undefined => {
    return soundLibrary.find(sound => sound.id === id)?.description || 'A radical instrument!';
}

export const getSoundById = (id: string): SoundItem | undefined => {
    return soundLibrary.find(sound => sound.id === id);
}