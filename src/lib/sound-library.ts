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
        id: "piano-b",
        soundLocation: "piano/piano_01_A.mp3",
        imageLocation: "/images/piano-icon.jpg",
        name: "Piano A",
        description: "A soothing piano sound, B."
    },
    {
        id: "piano-c",
        soundLocation: "piano/piano_01_A.mp3",
        imageLocation: "/images/piano-icon.jpg",
        name: "Piano A",
        description: "A soothing piano sound, C."
    },
    {
        id: "guitar-a",
        soundLocation: "piano/piano_01_A.mp3",
        imageLocation: "/images/piano-icon.jpg",
        name: "Piano A",
        description: "A soothing piano sound."
    },
    {
        id: "drum-a",
        soundLocation: "piano/piano_01_A.mp3",
        imageLocation: "/images/piano-icon.jpg",
        name: "Piano A",
        description: "A soothing piano sound."
    },
];

export const getSoundDescriptionById = (id: string): string | undefined => {
    console.log(id);
    return soundLibrary.find(sound => sound.id === id)?.description || 'A radical instrument!';
}