import "./Navbar.css"

function Navbar({navbar}) {
    
    const sections = ["Home", "About", "Contact Me", "Skills"]

    return (
      <nav style={{"height": navbar?.dimensions?.height, "width": navbar?.dimensions?.width, "backgroundColor": navbar?.background?.color}}>
        <ul style={{height: navbar?.dimensions?.height, gap: navbar?.items?.spacing, "textAlign" : navbar?.items?.alignment?.textAlign, verticalAlign : "middle", display: "flex", flexDirection : "row", listStyle : "none", margin : "0", justifyContent: "center", alignItems: "center"}}>
        {
            sections.map((section, index) => (
                <li 
                key={index}
                style={{
                    fontSize : navbar?.items?.style?.fontSize, 
                    color : navbar?.items?.style?.fontColor, 
                    fontFamily : navbar?.items?.style?.fontFamily, 
                    marginTop : navbar?.dimensions?.height / 2,
                     }}>
                    {section}
                </li> 
            ))
        }
          </ul>
      </nav>
    )
}

export default Navbar
