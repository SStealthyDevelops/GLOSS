class SoundBite {
    name: string;
    soundPath: string;
    imagePath: string;

    constructor(name: string, soundPath: string, imagePath: string) {
        this.imagePath = imagePath;
        this.name = name;
        this.soundPath = soundPath;
        this.imagePath = imagePath;
    }
}

export const soundLibrary: SoundBite[] = [
    new SoundBite('Piano', 'piano/piano_01_A.mp3', 'buzz.png'),
];