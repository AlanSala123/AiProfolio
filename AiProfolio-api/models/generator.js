class Generator {
  constructor(resume) {
    this.resume = resume;
    this.fonts = [
      "Arial",
      "Verdana",
      "Georgia",
      "Times New Roman",
      "Courier New",
      "Brush Script MT",
      "Comic Sans MS",
      "Impact",
      "Lucida Sans Unicode",
      "Tahoma",
      "Trebuchet MS",
      "Lucida Console",
      "Roboto",
      "Open Sans",
      "Lato",
    ];

    this.alignments = ["left", "center", "justify"];
    this.borderStyles = [
      "dotted",
      "dashed",
      "solid",
      "double",
      "groove",
      "ridge",
      "inset",
      "outset",
      "none",
    ];
  }

  generateRandomColor(darkmode) {
    let r, g, b;

    if (darkmode) {
      r = Math.floor(Math.random() * 128) + 128;
      g = Math.floor(Math.random() * 128) + 128;
      b = Math.floor(Math.random() * 128) + 128;
    } else {
      r = Math.floor(Math.random() * 128);
      g = Math.floor(Math.random() * 128);
      b = Math.floor(Math.random() * 128);
    }

    return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  }

  generateColorVariation(baseColor, variationFactor) {
    let r = parseInt(baseColor.substr(1, 2), 16);
    let g = parseInt(baseColor.substr(3, 2), 16);
    let b = parseInt(baseColor.substr(5, 2), 16);

    r = Math.min(Math.max(parseInt(r + variationFactor), 0), 255);
    g = Math.min(Math.max(parseInt(g + variationFactor), 0), 255);
    b = Math.min(Math.max(parseInt(b + variationFactor), 0), 255);

    return (
      "#" + (r.toString(16) + g.toString(16) + b.toString(16)).padStart(6, "0")
    );
  }

  generateComplementaryColor(color, darkmode=false) {
    const r = parseInt(color.substr(1, 2), 16) / 255;
    const g = parseInt(color.substr(3, 2), 16) / 255;
    const b = parseInt(color.substr(5, 2), 16) / 255;

    const relativeLuminance = (c) => {
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };

    const luminance =
      0.2126 * relativeLuminance(r) +
      0.7152 * relativeLuminance(g) +
      0.0722 * relativeLuminance(b);

    const targetLuminanceDiff = darkmode ? 0.9 : 0.75;

    const targetLuminance =
      luminance +
      (luminance < 0.5 ? targetLuminanceDiff : -targetLuminanceDiff);

    const luminanceDiff = targetLuminance - luminance;

    const rComp = Math.max(Math.min(r + luminanceDiff, 1), 0);
    const gComp = Math.max(Math.min(g + luminanceDiff, 1), 0);
    const bComp = Math.max(Math.min(b + luminanceDiff, 1), 0);

    const rHex = Math.round(rComp * 255)
      .toString(16)
      .padStart(2, "0");
    const gHex = Math.round(gComp * 255)
      .toString(16)
      .padStart(2, "0");
    const bHex = Math.round(bComp * 255)
      .toString(16)
      .padStart(2, "0");

    return "#" + rHex + gHex + bHex;
  }

  getRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  generatePaleColor(darkmode) {
    const minComponentValue = darkmode ? 15 : 220; 
    const maxComponentValue = darkmode ? 35 : 240; 

    const r = Math.floor(
      Math.random() * (maxComponentValue - minComponentValue + 1) +
        minComponentValue
    );
    const g = Math.floor(
      Math.random() * (maxComponentValue - minComponentValue + 1) +
        minComponentValue
    );
    const b = Math.floor(
      Math.random() * (maxComponentValue - minComponentValue + 1) +
        minComponentValue
    );

    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  generateStyle(min, max, unit = "px") {
    return `${Math.floor(Math.random() * (max - min + 1) + min)}${unit}`;
  }

  buildNavbar({
    backgroundColor,
    fontColor,
    fontFamily,
    fontWeight,
  }) {
    return {
      navbar: {
        background: {
        height: this.generateStyle(5, 10, "vh"),
          minHeight: "50px",
          maxHeight: "70px",
          background: backgroundColor,
          margin: "0",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        list: {
          height: "inherit",
          minHeight: "inherit",
          maxHeight: "inherit",
          margin: "inherit",
          width: "97.5%",
          alignItems: "center",
          display: "flex",
          listStyleType: "none",
          flexDirection: "row",
          gap: this.generateStyle(10, 20, "px"),
          padding: "0",
          justifyContent: this.getRandomElementFromArray(['center', 'flex-start', 'flex-end']),
        },
        item: {
        fontSize: this.generateStyle(16, 24, "px"),
          color: fontColor,
          fontFamily: fontFamily,
          fontWeight: fontWeight,
        },
      },
    };
  }

  buildHeader({

    backgroundColor,
    borderColor,


    titleFontColor,
    titleFontFamily,
    titleFontWeight,

    subtitleFontColor,
    subtitleFontFamily,
    subtitleFontWeight,

  }) {
    return {
      header: {
        background: {
          height: '100vh',
          background: backgroundColor,
          borderColor: borderColor,
          borderWidth: this.generateStyle(1, 5, "px"),
          borderStyle: this.getRandomElementFromArray([
            "solid",
            "double",
            "groove",
            "ridge",
            "inset",
            "outset",
            "none",
            "none",
          ]),
          display: "flex",
          flexDirection: "column",
          alignItems: this.getRandomElementFromArray(['center', 'flex-start']),
          justifyContent: 'center'
        },
        title: {
          fontSize: this.generateStyle(48, 98, "px"),
          color: titleFontColor,
          fontFamily: titleFontFamily,
          fontWeight: titleFontWeight,
          padding: "0px 25px 10px 25px",
        },

        subtitle: {
          fontSize: this.generateStyle(24, 48, "px"),
          color: subtitleFontColor,
          fontFamily: subtitleFontFamily,
          fontWeight: subtitleFontWeight,
          padding: "0px 25px 0px 25px",
        },
      },
    };
  }

  buildAbout({
    backgroundColor,

    titleFontSize,
    titleFontColor,
    titleFontFamily,
    titleFontWeight,

    summaryFontColor,
    summaryFontFamily,
    summaryFontWeight,
    
  }) {
    const direction = this.getRandomElementFromArray(['row', 'column'])
    return {
        about: {
        background: {
          background: backgroundColor,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
        content : {
            display: "flex",
            flexDirection: direction,
            flexWrap : "wrap",
            alignItems: "center",
            justifyContent: "center",
            columnGap: "5vw",
        },
        image : {
            width: this.generateStyle(300, 500, "px"),
            maxWidth: '95%',
            borderRadius: '100%',
            borderStyle: this.getRandomElementFromArray(this.borderStyles),
            borderColor: summaryFontColor,
            borderWidth: this.generateStyle(2, 5, "px"),
        },
        title: {
          fontSize: titleFontSize,
          color: titleFontColor,
          fontFamily: titleFontFamily,
          fontWeight: titleFontWeight,
          width: "97.5%",
            textAlign: this.getRandomElementFromArray(['center', 'flex-start'])
        },
        summary: {
          fontSize: this.generateStyle(18, 24, "px"),
          color: summaryFontColor,
          fontFamily: summaryFontFamily,
          fontWeight: summaryFontWeight,
          maxWidth: "95%",
          width: direction === "row" ? "45%" : "95%",
            textAlign: this.getRandomElementFromArray(['center', 'flex-start']),
            margin: "0",
            padding: "2.5vh 0px 5vh 0px"
        },
      },
    };
  }

  buildExperiences({
    titleFontColor,
    titleFontSize,
    titleFontFamily,
    titleFontWeight,
    backgroundColor,

    itemBackgroundColor,


    itemBorderStyle,
    itemBorderColor,
    itemTitleFontColor,

    itemTitleFontFamily,
    itemTitleFontWeight,
    itemDescriptionFontColor,

    itemDescriptionFontFamily,
    itemDescriptionFontWeight,
    itemDateFontColor,

    itemDateFontFamily,
    itemDateFontWeight,

  }) {
    return {
      experiences: {
        background: {
          background: backgroundColor,
          width: "100%",
        display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
        },

        title: {
          color: titleFontColor,
          fontSize: titleFontSize,
          fontFamily: titleFontFamily,
          fontWeight: titleFontWeight,
          margin: "0",
          width: "97.5%",
          textAlign: this.getRandomElementFromArray(['center', 'flex-start'])

        },
        list: {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          margin: "0",
          listStyle: "none",
          padding: "0",
          width: "95%",
        gap: "10px",
        padding: "2.5vh 0px 5vh 0px",
        justifyContent: 'center',
        alignItems: 'center'
        },
        item: {
        width: this.getRandomElementFromArray([this.generateStyle(350, 500, "px"), this.generateStyle(700, 900, "px")]),
          maxWidth: '97.5%' ,
          background: itemBackgroundColor,
          boxShadow: this.getRandomElementFromArray([
            "none",
            `0 0 10px 0 ${itemBorderColor}`,
          ]),
          borderRadius: this.generateStyle(3, 16, "px"),
          borderWidth: this.getRandomElementFromArray('none', this.generateStyle(1, 3, "px")),
          borderStyle: itemBorderStyle,
          borderColor: itemBorderColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          
        },
        itemTitle: {
          color: itemTitleFontColor,
          fontSize: this.generateStyle(26, 36, "px"),
          fontFamily: itemTitleFontFamily,
          fontWeight: itemTitleFontWeight,
          textAlign: this.getRandomElementFromArray(['center', 'flex-start']),
          width: "95%",
        },
        itemDescription: {
          color: itemDescriptionFontColor,
          fontSize: this.generateStyle(18, 24, "px"),
          fontFamily: itemDescriptionFontFamily,
          fontWeight: itemDescriptionFontWeight,
          textAlign: this.getRandomElementFromArray(['center', 'flex-start']),
          width: "95%",
        },
        itemDate: {
          color: itemDateFontColor,
          fontSize: this.generateStyle(14, 16, "px"),
          fontFamily: itemDateFontFamily,
          fontWeight: itemDateFontWeight,
          textAlign: this.getRandomElementFromArray(['center', 'flex-start']),
          width: "95%",
        },
      },
    };
  }

  buildSkills({
    titleFontColor,
    titleFontSize,
    titleFontFamily,
    titleFontWeight,
    backgroundColor,
    itemBackgroundColor,
   
    itemBorderStyle,
    itemBorderColor,
    itemTitleFontColor,
   
    itemTitleFontFamily,
    itemTitleFontWeight,
    itemProgressBarColor,

   
    itemLevelFontFamily,
    itemLevelFontWeight,
  


  }) {
    return {
      skills: {
        background: {
          background: backgroundColor,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        },

        title: {
          color: titleFontColor,
          fontSize: titleFontSize,
          fontFamily: titleFontFamily,
          fontWeight: titleFontWeight,
        },
        list: {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          margin: "0",
          listStyle: "none",
          gap: this.generateStyle(10, 20, "px"),
          justifyContent: "center",
          alignItems: "center",
          width: "95%",
          padding: "2.5vh 0px 5vh 0px",
        },

        item: {
          maxWidth: this.generateStyle(300, 500, "px"),
          minWidth: this.generateStyle(100, 200, "px"),
          minHeight: this.generateStyle(50, 100, "px"),
          background: itemBackgroundColor,
          boxShadow: this.getRandomElementFromArray([
            "none",
            `0 0 10px 0 ${itemBorderColor}`,
          ]),
          borderRadius: this.generateStyle(3, 16, "px"),
          borderWidth: this.generateStyle(1, 5, "px"),
          borderStyle: itemBorderStyle,
          borderColor: itemBorderColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        itemTitle: {
          color: itemTitleFontColor,
          fontSize: this.generateStyle(24, 36, "px"),
          fontFamily: itemTitleFontFamily,
          fontWeight: itemTitleFontWeight,
          padding: "0.5vh 1vw 0.5vh 1vw",
          margin: "0",
          verticalAlign: "middle",
        },

        itemLevel: {
            color: itemProgressBarColor,
            fontSize: this.generateStyle(12, 18, "px"),
            fontFamily: itemLevelFontFamily,
            fontWeight: itemLevelFontWeight,

        },
      },
    };
  }

  buildProjects({
    titleFontColor,
    titleFontSize,
    titleFontFamily,
    titleFontWeight,
    backgroundColor,
    itemBackgroundColor,

    itemBorderStyle,
    itemBorderColor,
    itemTitleFontColor,

    itemTitleFontFamily,
    itemTitleFontWeight,
    itemDescriptionFontColor,

    itemDescriptionFontFamily,
    itemDescriptionFontWeight,
    itemTechnologiesFontColor,
    itemTechnologiesFontFamily,
    itemTechnologiesFontWeight,

  }) {
    return {
      projects: {
        title: {
            color: titleFontColor,
            fontSize: titleFontSize,
            fontFamily: titleFontFamily,
            fontWeight: titleFontWeight,
          },
        background: {
            background: backgroundColor,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
        },
        item : {
          
            background: itemBackgroundColor,
            borderRadius: this.generateStyle(3, 16, "px"),
            borderWidth: this.generateStyle(1, 5, "px"),
            borderStyle: itemBorderStyle,
            borderColor: itemBorderColor,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "1vh 1vw 5vh 1vw",

        },
        itemTitle: {
            color: itemTitleFontColor,
            fontSize: this.generateStyle(26, 36, "px"),
            fontFamily: itemTitleFontFamily,
            fontWeight: itemTitleFontWeight,
            textAlign: this.getRandomElementFromArray(['center', 'flex-start']),
            width: "95%",
        },
        itemDescription: {
            color: itemDescriptionFontColor,
            fontSize: this.generateStyle(18, 24, "px"),
            fontFamily: itemDescriptionFontFamily,
            fontWeight: itemDescriptionFontWeight,
            textAlign: this.getRandomElementFromArray(['center', 'flex-start']),
            width: "95%",
        },
        itemTechnologies: {
            color: itemTechnologiesFontColor,
            fontSize: this.generateStyle(14, 16, "px"),
            fontFamily: itemTechnologiesFontFamily,
            fontWeight: itemTechnologiesFontWeight,
            textAlign: this.getRandomElementFromArray(['center', 'flex-start']),
            width: "95%",
        },
      },
    };
  }

  buildEducation({
    backgroundColor,
    titleFontColor,
    titleFontSize,
    titleFontFamily,
    titleFontWeight,
    itemBackgroundColor,
    itemBorderStyle,
    itemBorderColor,
    itemInstitutionFontColor,
    itemInstitutionFontFamily,
    itemInstitutionFontWeight,

    itemDegreeFontSize,
    itemDegreeFontFamily,
    itemDegreeFontWeight,



  }) {
    return {
      education: {

        background: {
            background: backgroundColor,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
        },

        list: {
            display: "flex",
            flexDirection: this.getRandomElementFromArray(['row', 'column']),
            flexWrap: "wrap",
            margin: "0",
            listStyle: "none",
            gap: this.generateStyle(10, 20, "px"),
            justifyContent: "center",
            alignItems: "center",
            width: "95%",
            padding: "2.5vh 0px 5vh 0px",
        },

        item: {
            
            minWidth: this.generateStyle(100, 200, "px"),
            minHeight: this.generateStyle(50, 100, "px"),
            maxHeight: this.generateStyle(100, 200, "px"),
            background: itemBackgroundColor,
            boxShadow: this.getRandomElementFromArray([
                "none",
                `0 0 10px 0 ${itemInstitutionFontColor}`,
              ]),
            borderRadius: this.generateStyle(3, 16, "px"),
            borderWidth: this.generateStyle(1, 5, "px"),
            borderStyle: itemBorderStyle,
            borderColor: itemBorderColor,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: this.generateStyle(10, 20, "px"),
            width: "95%",
            padding: "2.5vh 1vw 5vh 1vw",

        },

        title: {
            color: titleFontColor,
            fontSize: titleFontSize,
            fontFamily: titleFontFamily,
            fontWeight: titleFontWeight,
            textAlign: 'center',
            width: "95%",
            // padding: "2.5vh 0px 0.5vh 0px",
            margin: "0"
        },

        itemInstitution: {
            color: itemInstitutionFontColor,
            fontSize: this.generateStyle(16, 24, "px"),
            fontFamily: itemInstitutionFontFamily,
            fontWeight: itemInstitutionFontWeight,
            textAlign: this.getRandomElementFromArray(['center', 'flex-start']),
            width: "95%",
            padding: "0",
            margin: "0",

        },
        itemDetails: {
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: this.generateStyle(10, 20, "px"),
            width: "95%",
            color: itemInstitutionFontColor,
            fontSize: this.generateStyle(16, 24, "px"),
            fontFamily: itemDegreeFontFamily,
            fontWeight: itemDegreeFontWeight,
            textAlign: this.getRandomElementFromArray(['center', 'flex-start']),
            padding: "0",
            margin: "0",
        },
      },
    };
  }

  generateColorPalette = () => {
    const darkmode = Math.random() < 0.5;


    const primaryColor = this.generateRandomColor(darkmode);
    const secondaryColor = this.generateColorVariation(
      primaryColor,
      darkmode ? -80 : 80
    );
    const accentColor = this.generateComplementaryColor(primaryColor, darkmode);


    const primaryTextColor = this.generateComplementaryColor(primaryColor, darkmode);
    const secondaryTextColor = this.generateComplementaryColor(secondaryColor, darkmode);
    const accentTextColor = this.generateComplementaryColor(accentColor, darkmode);


    const backgroundColor = this.generatePaleColor(darkmode);
    const backgroundTextColor =
      this.generateComplementaryColor(backgroundColor, darkmode);

    return {
      primaryColor,
      secondaryColor,
      accentColor,
      primaryTextColor,
      secondaryTextColor,
      accentTextColor,
      backgroundColor,
      backgroundTextColor,
    };
  };

  generateGeneralStyling() {
    const randomFont = this.getRandomElementFromArray(this.fonts);
    const randomAlignment = this.getRandomElementFromArray(this.alignments);
    const randomBorderStyle = this.getRandomElementFromArray(this.borderStyles);
    const randomFontWeight = this.getRandomElementFromArray([
      "normal",
      "bold",
      "bolder",
      "lighter",
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
    ]);

    return {
      randomFont,
      randomAlignment,
      randomBorderStyle,
      randomFontWeight,
    };
  }

  buildTemplate() {
    const { randomFont, randomAlignment, randomBorderStyle, randomFontWeight } = this.generateGeneralStyling();

    const {
      primaryColor,
      secondaryColor,
      accentColor,
      primaryTextColor,
      secondaryTextColor,
      accentTextColor,
      backgroundColor,
      backgroundTextColor,
    } = this.generateColorPalette();

    const sectionTitleFontSize = this.generateStyle(36, 42, "px")

    const option = this.getRandomElementFromArray([0, 1]);

      const template = {
        ...this.buildNavbar({
          backgroundColor: [backgroundColor, primaryColor][option],
          fontColor: [primaryColor, primaryTextColor][option],
          fontFamily: randomFont,
          fontWeight: randomFontWeight,
        }),

        ...this.buildHeader({
          backgroundColor: [backgroundColor, secondaryColor][option],
          borderColor: [primaryColor, secondaryTextColor][option],
          
          titleFontColor: primaryColor,
          titleFontFamily: randomFont,
          titleFontWeight: randomFontWeight,
          
          subtitleFontColor: primaryColor,
          subtitleFontFamily: randomFont,
          subtitleFontWeight: randomFontWeight,
          
        }),
        ...this.buildAbout({
          backgroundColor: backgroundColor,
          titleFontSize: sectionTitleFontSize,
          titleFontColor: primaryColor,
          titleFontFamily: randomFont,
          titleFontWeight: randomFontWeight,
          summaryFontColor: primaryColor,
          summaryFontFamily: randomFont,
          summaryFontWeight: randomFontWeight,
        }),

        ...this.buildExperiences({
          titleFontColor: primaryColor,
          titleFontSize: sectionTitleFontSize,
          titleFontFamily: randomFont,
          titleFontWeight: randomFontWeight,
          backgroundColor: backgroundColor,
          itemBackgroundColor: [backgroundColor, secondaryColor][option],
          itemBorderStyle: randomBorderStyle,
          itemBorderColor: [primaryColor, secondaryTextColor][option],
          itemTitleFontColor: [primaryColor, secondaryTextColor][option],
          itemTitleFontFamily: randomFont,
          itemTitleFontWeight: randomFontWeight,
          itemDescriptionFontColor: [primaryColor, secondaryTextColor][option],
          itemDescriptionFontFamily: randomFont,
          itemDescriptionFontWeight: randomFontWeight,
          itemDateFontColor: [primaryColor, secondaryTextColor][option],
          itemDateFontFamily: randomFont,
          itemDateFontWeight: randomFontWeight,
         
        }),
        ...this.buildSkills({
          titleFontColor: primaryColor,
          titleFontSize: sectionTitleFontSize,
          titleFontFamily: randomFont,
          titleFontWeight: randomFontWeight,
          backgroundColor: backgroundColor,
          itemBackgroundColor: [backgroundColor, secondaryColor][option],
          itemBorderStyle: randomBorderStyle,
          itemBorderColor: [primaryColor, secondaryTextColor][option],
          itemTitleFontColor: [primaryColor, secondaryTextColor][option],
          itemTitleFontFamily: randomFont,
          itemTitleFontWeight: randomFontWeight,
          itemProgressBarColor: [primaryColor, secondaryTextColor][option],
          itemLevelFontFamily: randomFont,
          itemLevelFontWeight: randomFontWeight,
        }),
        ...this.buildProjects({
          titleFontColor: primaryColor,
          titleFontSize: sectionTitleFontSize,
          titleFontFamily: randomFont,
          titleFontWeight: randomFontWeight,
          backgroundColor: backgroundColor,
          itemBackgroundColor: [backgroundColor, secondaryColor][option],
  
          itemBorderStyle: randomBorderStyle,
          itemBorderColor: [primaryColor, secondaryTextColor][option],
          itemTitleFontColor: [primaryColor, secondaryTextColor][option],
          
          itemTitleFontFamily: randomFont,
          itemTitleFontWeight: randomFontWeight,
          itemDescriptionFontColor: [primaryColor, secondaryTextColor][option],
        
          itemDescriptionFontFamily: randomFont,
          itemDescriptionFontWeight: randomFontWeight,
          itemTechnologiesFontColor: [primaryColor, secondaryTextColor][option],
          itemTechnologiesFontFamily: randomFont,
          itemTechnologiesFontWeight: randomFontWeight,

        }),
        ...this.buildEducation({
          backgroundColor: backgroundColor,
          titleFontColor: primaryColor,
          titleFontSize: sectionTitleFontSize,
          titleFontFamily: randomFont,
          titleFontWeight: randomFontWeight,
          itemBackgroundColor: [backgroundColor, secondaryColor][option],
          itemBorderStyle: randomBorderStyle,
          itemBorderColor: [primaryColor, secondaryTextColor][option],
          itemInstitutionFontColor: [primaryColor, secondaryTextColor][option],
          itemInstitutionFontFamily: randomFont,
          itemInstitutionFontWeight: randomFontWeight,
          itemDegreeFontColor: [primaryColor, secondaryTextColor][option],
          itemDegreeFontFamily: randomFont,
          itemDegreeFontWeight: randomFontWeight
        }),
      };

      return {
        ...template,
      };
    
  }
}

module.exports = Generator;

