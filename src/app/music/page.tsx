"use client";

import HexagonSlider from "@/components/hexagon-slider";

const MusicPage = () => {

    return (
        <div className='h-screen w-screen bg-gloss-navy'>
            <HexagonSlider soundLocation='piano/piano_01_A.mp3' />
        </div>
    )
}

export default MusicPage;