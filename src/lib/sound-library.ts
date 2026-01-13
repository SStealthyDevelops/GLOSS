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
        description: "A soothing piano sound, B."
    },
    {
        id: "bathroom_sink_cold",
        soundLocation: "random/bathroom_sink_cold_tap.mp3",
        imageLocation: "/images/bathroom_sink.jpg",
        name: "Bathroom Sink Cold Tap",
        description: "A soothing piano sound, C."
    },
    {
        id: "xylophone-a",
        soundLocation: "xylophone/xylophone_a_3.mp3",
        imageLocation: "/images/xylophone.jpg",
        name: "Xylophone A",
        description: "A soothing piano sound."
    },
    {
        id: "staff-bell-lo-b",
        soundLocation: "random/staff_bell_lo_b.mp3",
        imageLocation: "/images/staff_bell.jpg",
        name: "Staff Bell Lo B",
        description: "A soothing piano sound."
    },

];

export const getSoundDescriptionById = (id: string): string | undefined => {
    return soundLibrary.find(sound => sound.id === id)?.description || 'A radical instrument!';
}

export const getSoundById = (id: string): SoundItem | undefined => {
    return soundLibrary.find(sound => sound.id === id);
}