import './Header.css'

function Header({header}){


        return (
            <div id="Header" style={{
                height: header?.dimensions?.height || "100vh",
                width: header?.dimensions?.width || "100vw",
                backgroundColor: header?.background?.color,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <h1 id="header-title" style={{
                    fontFamily: header?.foreground?.title?.fontFamily,
                    fontSize: header?.foreground?.title?.fontSize,
                    color: header?.foreground?.title?.fontColor
                }}> HEADER TITLE</h1>
                <p id="header-subtitle" style={{
                    fontFamily: header?.foreground?.subtitle?.fontFamily,
                    fontSize: header?.foreground?.subtitle?.fontSize,
                    color: header?.foreground?.subtitle?.fontColor
                }}>HEADER SUBTITLE </p>
            </div>
            
            
        )
}

export default Header