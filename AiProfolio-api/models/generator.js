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

    const targetLuminanceDiff = darkmode ? 0.75 : 0.6;

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
    const minComponentValue = darkmode ? 15 : 220; // Set the minimum value for each RGB component
    const maxComponentValue = darkmode ? 35 : 240; // Set the maximum value for each RGB component

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
    height,
    minHeight,
    maxHeight,
    backgroundColor,
    alignment,
    spacing,
    fontSize,
    fontColor,
    fontFamily,
    fontWeight,
  }) {
    return {
      navbar: {
        background: {
          height: height,
          minHeight: minHeight,
          maxHeight: maxHeight,
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
          gap: spacing,
          padding: "0",
          justifyContent: this.getRandomElementFromArray(['center', 'flex-start', 'flex-end']),
        },
        item: {
          fontSize: fontSize,
          color: fontColor,
          fontFamily: fontFamily,
          fontWeight: fontWeight,
        },
      },
    };
  }

  buildHeader({
    height,
    backgroundColor,
    borderColor,
    borderWidth,
    borderStyle,
    titleFontSize,
    titleFontColor,
    titleFontFamily,
    titleFontWeight,
    subtitleFontSize,
    subtitleFontColor,
    subtitleFontFamily,
    subtitleFontWeight,
    textAlign,
    verticalAlign,
  }) {
    return {
      header: {
        background: {
          height: height,
          background: backgroundColor,
          borderColor: borderColor,
          borderWidth: borderWidth,
          borderStyle: borderStyle,
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
    alignment,
    titleFontSize,
    titleFontColor,
    titleFontFamily,
    titleFontWeight,
    summaryFontSize,
    summaryFontColor,
    summaryFontFamily,
    summaryFontWeight,
  }) {
    return {
      about: {
        background: {
          background: backgroundColor,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

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
          width: "95%",
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
    maxWidth,
    itemBackgroundColor,
    itemBoxShadow,
    itemBorderRadius,
    itemBorderWidth,
    itemBorderStyle,
    itemBorderColor,
    itemTitleFontColor,
    itemTitleFontSize,
    itemTitleFontFamily,
    itemTitleFontWeight,
    itemDescriptionFontColor,
    itemDescriptionFontSize,
    itemDescriptionFontFamily,
    itemDescriptionFontWeight,
    itemDateFontColor,
    itemDateFontSize,
    itemDateFontFamily,
    itemDateFontWeight,
    itemMaxWidth,
    itemMinWidth,
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
          boxShadow: itemBoxShadow,
          borderRadius: itemBorderRadius,
          borderWidth: this.getRandomElementFromArray('none', this.generateStyle(1, 3, "px")),
          borderStyle: itemBorderStyle,
          borderColor: itemBorderColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxHeight : this.getRandomElementFromArray(['none', this.generateStyle(300, 400, "px"), this.generateStyle(700, 900, "px")]),
            
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
    itemBoxShadow,
    itemBorderRadius,
    itemBorderWidth,
    itemBorderStyle,
    itemBorderColor,
    itemTitleFontColor,
    itemTitleFontSize,
    itemTitleFontFamily,
    itemTitleFontWeight,
    itemProgressBarColor,
    itemProgressBarBackgroundColor,
    itemProgressBarBorderRadius,
    itemProgressBarBorderWidth,
    itemProgressBarBorderStyle,
    itemProgressBarBorderColor,
    itemProgressBarMinHeight,
    itemLevelFontColor,
    itemLevelFontSize,
    itemLevelFontFamily,
    itemLevelFontWeight,
    itemMaxWidth,
    itemMinWidth,
    itemMaxHeight,
    itemMinHeight,
    itemSpacing,
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
          gap: itemSpacing,
          justifyContent: "center",
          alignItems: "center",
          width: "95%",
          padding: "2.5vh 0px 5vh 0px",
        },

        item: {
          maxWidth: itemMaxWidth,
          minWidth: itemMinWidth,
          minHeight: itemMinHeight,
          background: itemBackgroundColor,
          boxShadow: itemBoxShadow,
          borderRadius: itemBorderRadius,
          borderWidth: itemBorderWidth,
          borderStyle: itemBorderStyle,
          borderColor: itemBorderColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        itemTitle: {
          color: itemTitleFontColor,
          fontSize: itemTitleFontSize,
          fontFamily: itemTitleFontFamily,
          fontWeight: itemTitleFontWeight,
          padding: "0.5vh 1vw 0.5vh 1vw",
          margin: "0",
          verticalAlign: "middle",
        },

        itemLevel: {
            color: itemProgressBarColor,
            fontSize: itemLevelFontSize,
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
    minHeight,
    itemBackgroundColor,
    itemBoxShadow,
    itemBorderRadius,
    itemBorderWidth,
    itemBorderStyle,
    itemBorderColor,
    itemTitleFontColor,
    itemTitleFontSize,
    itemTitleFontFamily,
    itemTitleFontWeight,
    itemDescriptionFontColor,
    itemDescriptionFontSize,
    itemDescriptionFontFamily,
    itemDescriptionFontWeight,
    itemTechnologiesFontColor,
    itemTechnologiesFontSize,
    itemTechnologiesFontFamily,
    itemTechnologiesFontWeight,
    itemMaxWidth,
    itemMinWidth,
    itemMaxHeight,
    itemMinHeight,
    itemSpacing,
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
            minHeight: minHeight,
            background: itemBackgroundColor,
            boxShadow: itemBoxShadow,
            borderRadius: itemBorderRadius,
            borderWidth: itemBorderWidth,
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
    alignment,
    titleFontColor,
    titleFontSize,
    titleFontFamily,
    titleFontWeight,
    itemBackgroundColor,
    itemBoxShadow,
    itemBorderRadius,
    itemBorderWidth,
    itemBorderStyle,
    itemBorderColor,
    itemInstitutionFontColor,
    itemInstitutionFontSize,
    itemInstitutionFontFamily,
    itemInstitutionFontWeight,
    itemDegreeFontColor,
    itemDegreeFontSize,
    itemDegreeFontFamily,
    itemDegreeFontWeight,
    itemMajorFontColor,
    itemMajorFontSize,
    itemMajorFontFamily,
    itemMajorFontWeight,
    itemDateFontColor,
    itemDateFontSize,
    itemDateFontFamily,
    itemDateFontWeight,
    itemMaxWidth,
    itemMinWidth,
    itemMaxHeight,
    itemMinHeight,
    itemSpacing,
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
            gap: itemSpacing,
            justifyContent: "center",
            alignItems: "center",
            width: "95%",
            padding: "2.5vh 0px 5vh 0px",
        },

        item: {
            
            minWidth: itemMinWidth,
            minHeight: itemMinHeight,
            maxHeight: itemMaxHeight,
            background: itemBackgroundColor,
            boxShadow: itemBoxShadow,
            borderRadius: itemBorderRadius,
            borderWidth: itemBorderWidth,
            borderStyle: itemBorderStyle,
            borderColor: itemBorderColor,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: itemSpacing,
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
            fontSize: itemInstitutionFontSize,
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
            gap: itemSpacing,
            width: "95%",
            color: itemDegreeFontColor,
            fontSize: itemDegreeFontSize,
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
    const darkmode = Math.random() < 0.4;

    // Generate the main colors
    const primaryColor = this.generateRandomColor(darkmode);
    const secondaryColor = this.generateColorVariation(
      primaryColor,
      darkmode ? -80 : 80
    );
    const accentColor = this.generateComplementaryColor(primaryColor, darkmode);

    // Generate the text colors
    const primaryTextColor = this.generateComplementaryColor(primaryColor, darkmode);
    const secondaryTextColor = this.generateComplementaryColor(secondaryColor, darkmode);
    const accentTextColor = this.generateComplementaryColor(accentColor, darkmode);

    // Generate the background color
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

    const options = ["simple"];

    const selected = this.getRandomElementFromArray(options);

    const styling = {};

    if (selected === "simple") {
      const template = {
        ...this.buildNavbar({
          height: this.generateStyle(5, 10, "vh"),
          minHeight: "50px",
          maxHeight: "70px",
          backgroundColor: backgroundColor,
          alignment: randomAlignment,
          spacing: this.generateStyle(10, 20, "px"),
          fontSize: this.generateStyle(16, 24, "px"),
          fontColor: secondaryColor,
          fontFamily: randomFont,
          fontWeight: randomFontWeight,
        }),
        ...this.buildHeader({
          height: this.generateStyle(70, 100, "vh"),
          backgroundColor: backgroundColor,
          borderColor: secondaryColor,
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
          titleFontSize: this.generateStyle(24, 48, "px"),
          titleFontColor: secondaryColor,
          titleFontFamily: randomFont,
          titleFontWeight: randomFontWeight,
          subtitleFontSize: this.generateStyle(16, 24, "px"),
          subtitleFontColor: secondaryColor,
          subtitleFontFamily: randomFont,
          subtitleFontWeight: randomFontWeight,
          textAlign: randomAlignment,
          verticalAlign: this.getRandomElementFromArray([
            "top",
            "middle",
            "bottom",
          ]),
        }),
        ...this.buildAbout({
          backgroundColor: backgroundColor,
          alignment: randomAlignment,
          titleFontSize: this.generateStyle(24, 48, "px"),
          titleFontColor: secondaryColor,
          titleFontFamily: randomFont,
          titleFontWeight: randomFontWeight,
          summaryFontSize: this.generateStyle(12, 18, "px"),
          summaryFontColor: secondaryColor,
          summaryFontFamily: randomFont,
          summaryFontWeight: randomFontWeight,
        }),
        ...this.buildExperiences({
          titleFontColor: secondaryColor,
          titleFontSize: this.generateStyle(24, 48, "px"),
          titleFontFamily: randomFont,
          titleFontWeight: randomFontWeight,
          backgroundColor: backgroundColor,
          maxWidth: this.generateStyle(300, 500, "px"),
          itemBackgroundColor: backgroundColor,
          itemBoxShadow: this.getRandomElementFromArray([
            "none",
            "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          ]),
          itemBorderRadius: this.generateStyle(3, 16, "px"),
          itemBorderWidth: this.generateStyle(1, 5, "px"),
          itemBorderStyle: randomBorderStyle,
          itemBorderColor: secondaryColor,
          itemTitleFontColor: secondaryColor,
          itemTitleFontSize: this.generateStyle(16, 24, "px"),
          itemTitleFontFamily: randomFont,
          itemTitleFontWeight: randomFontWeight,
          itemDescriptionFontColor: secondaryColor,
          itemDescriptionFontSize: this.generateStyle(12, 18, "px"),
          itemDescriptionFontFamily: randomFont,
          itemDescriptionFontWeight: randomFontWeight,
          itemDateFontColor: secondaryColor,
          itemDateFontSize: this.generateStyle(12, 18, "px"),
          itemDateFontFamily: randomFont,
          itemDateFontWeight: randomFontWeight,
          itemMaxWidth: this.generateStyle(300, 500, "px"),
          itemMinWidth: this.generateStyle(100, 200, "px"),
        }),
        ...this.buildSkills({
          titleFontColor: secondaryColor,
          titleFontSize: this.generateStyle(24, 48, "px"),
          titleFontFamily: randomFont,
          titleFontWeight: randomFontWeight,
          backgroundColor: backgroundColor,
          itemBackgroundColor: backgroundColor,
          itemBoxShadow: this.getRandomElementFromArray([
            "none",
            "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          ]),
          itemBorderRadius: this.generateStyle(3, 16, "px"),
          itemBorderWidth: this.generateStyle(1, 5, "px"),
          itemBorderStyle: randomBorderStyle,
          itemBorderColor: secondaryColor,
          itemTitleFontColor: secondaryColor,
          itemTitleFontSize: this.generateStyle(16, 24, "px"),
          itemTitleFontFamily: randomFont,
          itemTitleFontWeight: randomFontWeight,
          itemProgressBarColor: secondaryColor,
          itemProgressBarBackgroundColor: backgroundColor,
          itemProgressBarBorderRadius: this.generateStyle(3, 16, "px"),
          itemProgressBarBorderWidth: this.generateStyle(1, 5, "px"),
          itemProgressBarBorderStyle: randomBorderStyle,
          itemProgressBarBorderColor: secondaryColor,
          itemProgressBarMinHeight: this.generateStyle(10, 20, "px"),
          itemLevelFontColor: secondaryColor,
          itemLevelFontSize: this.generateStyle(12, 18, "px"),
          itemLevelFontFamily: randomFont,
          itemLevelFontWeight: randomFontWeight,
          itemMaxWidth: this.generateStyle(300, 500, "px"),
          itemMinWidth: this.generateStyle(100, 200, "px"),
          itemMaxHeight: this.generateStyle(100, 200, "px"),
          itemMinHeight: this.generateStyle(50, 100, "px"),
          itemSpacing: this.generateStyle(10, 20, "px"),
        }),
        ...this.buildProjects({
          titleFontColor: secondaryColor,
          titleFontSize: this.generateStyle(24, 48, "px"),
          titleFontFamily: randomFont,
          titleFontWeight: randomFontWeight,
          backgroundColor: backgroundColor,
          minHeight: this.generateStyle(300, 500, "px"),
          itemBackgroundColor: backgroundColor,
          itemBoxShadow: this.getRandomElementFromArray([
            "none",
            "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          ]),
          itemBorderRadius: this.generateStyle(3, 16, "px"),
          itemBorderWidth: this.generateStyle(1, 5, "px"),
          itemBorderStyle: randomBorderStyle,
          itemBorderColor: secondaryColor,
          itemTitleFontColor: secondaryColor,
          itemTitleFontSize: this.generateStyle(16, 24, "px"),
          itemTitleFontFamily: randomFont,
          itemTitleFontWeight: randomFontWeight,
          itemDescriptionFontColor: secondaryColor,
          itemDescriptionFontSize: this.generateStyle(12, 18, "px"),
          itemDescriptionFontFamily: randomFont,
          itemDescriptionFontWeight: randomFontWeight,
          itemTechnologiesFontColor: secondaryColor,
          itemTechnologiesFontSize: this.generateStyle(12, 18, "px"),
          itemTechnologiesFontFamily: randomFont,
          itemTechnologiesFontWeight: randomFontWeight,
          itemMaxWidth: this.generateStyle(300, 500, "px"),
          itemMinWidth: this.generateStyle(100, 200, "px"),
          itemMaxHeight: this.generateStyle(100, 200, "px"),
          itemMinHeight: this.generateStyle(50, 100, "px"),
          itemSpacing: this.generateStyle(10, 20, "px"),
        }),
        ...this.buildEducation({
          backgroundColor: backgroundColor,
          alignment: randomAlignment,
          titleFontColor: secondaryColor,
          titleFontSize: this.generateStyle(24, 48, "px"),
          titleFontFamily: randomFont,
          titleFontWeight: randomFontWeight,
          itemBackgroundColor: backgroundColor,
          itemBoxShadow: this.getRandomElementFromArray([
            "none",
            "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          ]),
          itemBorderRadius: this.generateStyle(3, 16, "px"),
          itemBorderWidth: this.generateStyle(1, 5, "px"),
          itemBorderStyle: randomBorderStyle,
          itemBorderColor: secondaryColor,
          itemInstitutionFontColor: secondaryColor,
          itemInstitutionFontSize: this.generateStyle(16, 24, "px"),
          itemInstitutionFontFamily: randomFont,
          itemInstitutionFontWeight: randomFontWeight,
          itemDegreeFontColor: secondaryColor,
          itemDegreeFontSize: this.generateStyle(16, 24, "px"),
          itemDegreeFontFamily: randomFont,
          itemDegreeFontWeight: randomFontWeight,
          itemMajorFontColor: secondaryColor,
          itemMajorFontSize: this.generateStyle(16, 24, "px"),
          itemMajorFontFamily: randomFont,
          itemMajorFontWeight: randomFontWeight,
          itemDateFontColor: secondaryColor,
          itemDateFontSize: this.generateStyle(12, 18, "px"),
          itemDateFontFamily: randomFont,
          itemDateFontWeight: randomFontWeight,
          itemMaxWidth: this.generateStyle(300, 500, "px"),
          itemMinWidth: this.generateStyle(100, 200, "px"),
          itemMaxHeight: this.generateStyle(100, 200, "px"),
          itemMinHeight: this.generateStyle(50, 100, "px"),
          itemSpacing: this.generateStyle(10, 20, "px"),
        }),
      };

      return {
        ...template,
      };
    }
  }
}

module.exports = Generator;

