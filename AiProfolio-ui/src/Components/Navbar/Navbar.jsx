import "./Navbar.css"
import React from 'react';

function Navbar({navbar, data}) {
    return (
      <nav id="template-navbar" style={{"height": navbar?.dimensions?.height, "width": navbar?.dimensions?.width, "background": navbar?.background?.color}}>
        <ul style={{height: navbar?.dimensions?.height, gap: navbar?.items?.spacing, "textAlign" : navbar?.items?.alignment?.textAlign, verticalAlign : "middle", display: "flex", flexDirection : "row", listStyle : "none", margin : "0", justifyContent: "center", alignItems: "center"}}>

                <li >
                    <a style={{fontSize : navbar?.items?.style?.fontSize,color : navbar?.items?.style?.fontColor, fontFamily : navbar?.items?.style?.fontFamily}} href="#header">Home</a>
                </li> 

                {data?.experiences[0] && 
                <li >
                    <a style={{fontSize : navbar?.items?.style?.fontSize,color : navbar?.items?.style?.fontColor, fontFamily : navbar?.items?.style?.fontFamily}} href="#experience">Experience</a>
                </li> }
                
                {data?.projects[0] && 
                <li >
                    <a style={{fontSize : navbar?.items?.style?.fontSize,color : navbar?.items?.style?.fontColor, fontFamily : navbar?.items?.style?.fontFamily}} href="#projects">Projects</a>
                </li> }
                
                {data?.skills[0] && 
                <li >
                    <a style={{fontSize : navbar?.items?.style?.fontSize, color : navbar?.items?.style?.fontColor, fontFamily : navbar?.items?.style?.fontFamily}} href="#skills">Skills</a>
                </li> }
                
                {data?.education && 
                <li >
                    <a style={{fontSize : navbar?.items?.style?.fontSize, color : navbar?.items?.style?.fontColor, fontFamily : navbar?.items?.style?.fontFamily}} href="#education">Education</a>
                </li> }
          </ul>
      </nav>
    )
}

export default Navbar
