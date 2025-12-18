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
        description: "A soothing piano sound, A."
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