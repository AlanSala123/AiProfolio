import { useMemo } from 'react';
import './Header.css'

function Header({header, data, images}){

    console.log(images)

    const backgroundImage = useMemo(() => {
        const backgroundImage = images.find((image) => image.label === "background image");
        if (backgroundImage) {
            const buffer = backgroundImage.serialized.data;
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
        <div id="header" style={{...header?.background, backgroundImage : backgroundImage ? `url(${backgroundImage})` : ""}}>
            <h1 id="header-title" style={header?.title}> {data?.user?.name} </h1>
            <p id="header-subtitle" style={header?.subtitle}> {data?.jobAspiration} </p>
        </div> 
    )
}

export default Header
