import './Header.css'

function Header(dimensions, background, font, input, imgprops){
    <div id="Header" style={{"height" : dimensions.height || "100vh" , "width" : dimensions.width || "100vw", "margin" : dimensions.margin, "textAlign" : font.textAlign, "backgroundColor" : background.color}} >

        {imgprops.foreground && <img src={input.img_url} alt="" />}
        {imgprops.background && <img src={input.img_url} alt="" />}
        <h1 style={{
            "fontFamily" : font.fontFamily,
            "fontWeight" : font.h1.fontWeight,
            "fontSize" : font.h1.fontSize,
            "color" : font.h1.color,

        }}>{input.title}</h1>
        {input.subtitle && <p style={{
            "fontFamily" : font.fontFamily,
            "fontWeight" : font.p.fontWeight,
            "fontSize" : font.p.fontSize,
            "color" : font.p.color
        }}
        >{input.subtitle}</p>}

    </div>
}

export default Header