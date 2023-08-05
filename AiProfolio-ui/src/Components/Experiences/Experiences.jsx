import React from "react";
import "./Experiences.css";
function Experience({ experiences, experienceList }) {
  if (experienceList.length > 5) {
    return (
      <div
        id="experience"
        className="timeline"
        style={{
          width: "100%",
          background: experiences?.background.color,
        }}
      >
        <h1
          style={{
            color: experiences?.title?.color,
            fontFamily: experiences?.title?.fontFamily,
            fontSize: experiences?.title?.fontSize,
            fontWeight: experiences?.title?.fontWeight,
            margin: "0",
            paddingTop: "8vh",
            paddingBottom: "4vh",
            width: "100%",
            textAlign: "center",
          }}
        >
          EXPERIENCE
        </h1>
        {experienceList.map((experience, index) => (
          <div
            key={index}
            className="container"
            style={{
              width: "25%",
              margin: "10px 0",
              transition: "transform .5s",
              maxHeight: "200px",
              marginLeft: "15%",
              marginRight: "15%",
            }}
          >
            <div
              className="content"
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                transition: "transform .5s",
              }}
            >
              <div
                className="front"
                style={{
                  padding: "10px 20px",
                  position: "absolute",
                  width: "calc(100% - 60px)",
                  height: "calc(100% - 40px)",
                  backfaceVisibility: "hidden",
                  background: experiences?.experienceItem?.background?.color,
                  borderStyle:
                    experiences?.experienceItem?.style?.border?.borderStyle,
                  borderWidth:
                    experiences?.experienceItem?.style?.border?.borderWidth,
                  borderColor:
                    experiences?.experienceItem?.style?.border?.borderColor,
                  borderRadius:
                    experiences?.experienceItem?.style?.border?.borderRadius ||
                    "#FFFFFF",
                  color: "#696969",
                  fontFamily: "Montserrat, sans-serif",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  zIndex: 2,
                  transform: "rotateY(0deg)",
                }}
              >
                <h2
                  style={{
                    fontSize:
                      experiences?.experienceItem?.style?.title?.fontSize,
                    color: experiences?.experienceItem?.style?.title?.fontColor,
                    fontFamily:
                      experiences?.experienceItem?.style?.title?.fontFamily,
                  }}
                >
                  {experience.title}
                </h2>
                <h4
                  style={{
                    fontSize:
                      experiences?.experienceItem?.style?.date?.fontSize,
                    color: experiences?.experienceItem?.style?.date?.fontColor,
                    fontFamily:
                      experiences?.experienceItem?.style?.date?.fontFamily,
                  }}
                >
                  {experience.date}
                </h4>
              </div>
              <div
                className="back"
                style={{
                  padding: "10px 20px",
                  position: "absolute",
                  width: "calc(100% - 60px)",
                  height: "calc(100% - 40px)",
                  backfaceVisibility: "hidden",
                  background: experiences?.experienceItem?.background?.color,
                  borderStyle:
                    experiences?.experienceItem?.style?.border?.borderStyle,
                  borderWidth:
                    experiences?.experienceItem?.style?.border?.borderWidth,
                  borderColor:
                    experiences?.experienceItem?.style?.border?.borderColor,
                  borderRadius:
                    experiences?.experienceItem?.style?.border?.borderRadius ||
                    "#FFFFFF",
                  color: "#696969",
                  fontFamily: "Montserrat, sans-serif",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  transform: "rotateY(180deg)",
                  overflow: "scroll",
                  paddingTop: "40px",
                }}
              >
                <p
                  style={{
                    marginBottom: "1.25rem",
                    textAlign: "justify",
                    lineHeight: 1.7,
                    fontWeight: 500,
                    fontFamily:
                      experiences?.experienceItem?.style?.date?.fontFamily,
                    textShadow: "1px 1px #888",
                    color: experiences?.experienceItem?.style?.date?.fontColor,
                    overflowWrap: "break-word",
                    wordWrap: "break-word",
                    fontSize:
                      experiences?.experienceItem?.style?.date?.fontSize,
                  }}
                >
                  {experience.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div
        id="experience"
        style={{
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            margin: "auto",
            background: experiences?.background?.color,
          }}
      >
        <h1
          style={{
            color: experiences?.experienceItem?.background?.color,
            fontFamily: experiences?.title?.fontFamily,
            fontSize: experiences?.title?.fontSize,
            fontWeight: experiences?.title?.fontWeight,
            margin: "0",
            paddingTop: "8vh",
            paddingBottom: "4vh",
            width: "100%",
            textAlign: "center",
          }}
        >
          EXPERIENCE
        </h1>
        <ul
          style={{
            width: "95%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            textAlign: experiences?.experienceItem?.alignment?.textAlign,
            verticalAlign:
            experiences?.experienceItem?.alignment?.verticalAlign,
            gap: experiences?.experienceItem?.spacing || "1em",
            margin: "0",
            padding: "0",
            listStyle: "none",
            justifyContent: "center",
            columnGap: "2em",
          }}
        >
          {experienceList.map((experience, index) => (
            <li
              key={index}
              style={{
                boxShadow: experiences?.experienceItem?.style?.boxShadow,
                borderStyle:
                  experiences?.experienceItem?.style?.border?.borderStyle,
                borderWidth:
                  experiences?.experienceItem?.style?.border?.borderWidth,
                borderColor:
                  experiences?.experienceItem?.style?.border?.borderColor,
                borderRadius:
                  experiences?.experienceItem?.style?.border?.borderRadius,
                paddingLeft: "1%",
                paddingRight: "1%",
                paddingBottom: "1%",
                marginBottom: "2%",
                background: experiences?.experienceItem?.background?.color,
                minWidth: "40%",
                maxWidth: "80%",
                minHeight : "15vh",
                display: "flex",
                flexDirection: "column",
                rowGap: "0",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
                
              <h2
  style={{
    fontSize: experiences?.experienceItem?.style?.title?.fontSize,
    color: experiences?.experienceItem?.style?.title?.fontColor,
    fontFamily: experiences?.experienceItem?.style?.title?.fontFamily,
    width: "100%",
    minWidth: "400px",
    marginBottom: "0",
    overflowWrap: "break-word",
    whiteSpace: "normal",
    wordBreak: "break-word",
    textAlign: "center",

  }}
>
  {experience.title}
</h2>

              <p
                style={{
                  fontSize:
                    experiences?.experienceItem?.style?.description?.fontSize,
                  color:
                    experiences?.experienceItem?.style?.description?.fontColor,
                  fontFamily:
                    experiences?.experienceItem?.style?.description?.fontFamily,
                    textAlign: "left",
                    maxWidth: "700px",
                    minWidth: "350px",
                    padding: "0 1em",
                }}
              >
               {experience.description}
              </p>
              <p
                style={{
                  fontSize: experiences?.experienceItem?.style?.date?.fontSize,
                  color: experiences?.experienceItem?.style?.date?.fontColor,
                  fontFamily:
                    experiences?.experienceItem?.style?.date?.fontFamily,
                    marginTop: "0",
                }}
              >
                {experience.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Experience;
