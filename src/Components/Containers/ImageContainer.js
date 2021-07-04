import React, { useState, useEffect } from 'react'
import { generateQR } from '../../Utils/tools';
import { TacoCarousel } from './../Carousel/Carousel';

export const ImagesContainer = ({ taco, user }) => {
    const [tacoImages, setTacoImages] = useState([...taco.photos.map(img => img.fileUrl)]);
    const [imageExpand, setImageExpand] = useState(null);

    useEffect(async () => {
        const qrUrl = await generateQR(window.location.href)
        setTacoImages([...tacoImages, qrUrl])
    }, [])
    console.log(taco, user)
    return <div className={`row m-0 taco_page_img${imageExpand ? '--expand' : ''}`}>
        {imageExpand ? <div className={`image--expand`}><div><img src={imageExpand} onClick={() => setImageExpand(null)} /></div></div> : null}
        {tacoImages.length ? <TacoCarousel images={tacoImages} setImageExpand={setImageExpand} /> : null}
    </div>
}