import { useMemo } from 'react';
import './Header.css'
import pako from 'pako';

function Header({header, data, images}){

    console.log(images)

    const backgroundImage = useMemo(() => {
        const backgroundImage = images.find((image) => image.label === "background image");
        if (backgroundImage) {
            const prebuffer = new Uint8Array(backgroundImage.serialized.data)
            const buffer = pako.inflate(prebuffer);
            const uint8Array = new Uint8Array(buffer);
            let binaryString = '';
            uint8Array.forEach(byte => {
                binaryString += String.fromCharCode(byte);
            });
            const base64String = btoa(binaryString);
            return `data:${backgroundImage.mimetype};base64,${base64String}`;
        }
        return null;
    }, [images]);

    return (
        <div id="header" style={{...header?.background, background : backgroundImage ? `linear-gradient(
            rgba(0, 0, 0, 0.7), 
            rgba(0, 0, 0, 0.7)
          ), url(${backgroundImage})` : "", backgroundRepeat :"none", backgroundSize: "cover"}}>
            <h1 id="header-title" style={{...header?.title, textShadow : backgroundImage ? "#FFF 0px 0px 2px" : ""}}> {data?.user?.name} </h1>
            <p id="header-subtitle" style={{...header?.subtitle, textShadow : backgroundImage ? "#FFF 0px 0px 2px" : ""}}> {data?.jobAspiration} </p>
        </div> 
    )
}

export default Header
