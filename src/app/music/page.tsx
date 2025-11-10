"use client";

import {Button} from "@/components/ui/button";
import useSound from 'use-sound';

// @ts-ignore
import musicFile from '@/../public/sounds/piano/piano_01_A.mp3';

const MusicPage = () => {
    const [playOn] = useSound(musicFile, {
        volume: 0.25,
    });

    return (
        <div className='h-screen w-screen bg-gloss-navy'>
            <Button onClick={() => {
                playOn();
            }}>
                Pressme
            </Button>
        </div>
    )
}

export default MusicPage;