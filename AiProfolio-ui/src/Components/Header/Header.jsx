import './Header.css'

function Header({header, data}){
    return (
        <div id="header" style={{
            minHeight: header?.dimensions?.height || "100vh",
            width: header?.dimensions?.width || "100vw",
            background: header?.background?.color,
            border: `${header?.border?.width} ${header?.border?.style} ${header?.border?.color}`,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <h1 id="header-title" style={{
                fontFamily: header?.foreground?.title?.fontFamily,
                fontSize: header?.foreground?.title?.fontSize,
                color: header?.foreground?.title?.fontColor,
                fontWeight: header?.foreground?.title?.fontWeight,
                fontStyle: header?.foreground?.title?.fontStyle,
                paddingTop: "2vh"
            }}> {data?.user?.name} </h1>
            <p id="header-subtitle" style={{
                fontFamily: header?.foreground?.subtitle?.fontFamily,
                fontSize: header?.foreground?.subtitle?.fontSize,
                color: header?.foreground?.subtitle?.fontColor,
                fontWeight: header?.foreground?.subtitle?.fontWeight,
                fontStyle: header?.foreground?.subtitle?.fontStyle,
                paddingBottom: "2vh"
            }}>{data?.jobAspiration}</p>
        </div> 
    )
}

export default Header
