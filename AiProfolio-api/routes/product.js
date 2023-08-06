const express = require('express');
const multer  = require('multer');
require('dotenv').config()
const secretKey = process.env.JWT_SECRET
const jwt = require('express-jwt');

const ChatGPT = require('../models/chatgpt')
const User = require('../models/user')
const Portfolio = require('../models/Portfolio')
const Image = require('../models/Image')

const upload = multer();
const productRouter = express.Router();

const cookieParser = require('cookie-parser');
productRouter.use(cookieParser());

const authMiddleware = (req, res, next) => {
  const {token} = req.cookies;
  if (!token) {
      return res.status(401).send({ error: 'Not authenticated' });
  }

  try {
      const user = User.verifyToken((token)); 
      req.user = user;
      next();
  } catch (error) {
    
    res.status(401).send({ error: 'Not authenticated' });
  }
}

productRouter.use(authMiddleware);

productRouter.use(jwt.expressjwt({
  secret: secretKey,
  algorithms: ['HS256'],
  getToken: req => req.cookies.token,
  credentialsRequired: true 
}));



productRouter.post('/create', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'images', maxCount: 20 }]), async (req, res, next) => {
  try {
    
    const user = req.user
    console.time('execution time')

      const fileBuffer = req.files.resume[0].buffer; 
      const images = req.files.images;
      
      const labels = Object.keys(req.body).filter(key => key.startsWith('labels')).map(key => req.body[key])[0];

      const imageLabelPairs = images?.map((image, index) => {
        return { 
            image: image,
            label: labels[index]
        };
    });

      const parsedText = await ChatGPT.parsePDF(fileBuffer);
    // const [templateObject, resumeObject] = await Promise.all([ChatGPT.buildWebsite(), ChatGPT.parseResume(parsedText)])
    // const [templateObject, resumeObject] = await Promise.all([ChatGPT.buildWebsiteFaster(), ChatGPT.parseResume(parsedText)])
    const templateObject = {portfolio : buildWebsiteProgrammatically()}
    const resumeObject = await ChatGPT.parseResume(parsedText)
      // TODO VERIFY JSOn
      const portfolio = await Portfolio.insertPortfolio( templateObject,  resumeObject,  user.id )
      if (imageLabelPairs){
        await Promise.all(imageLabelPairs?.map(pair => Promise.resolve(Image.insertImage(pair, portfolio.id))));
      }

      console.timeEnd('execution time')
      res.send(portfolio.id)
  } catch (error) {
    console.timeEnd('execution time')
    console.log(error)
      res.status(500).send({ message: "Internal server error" });
  }
});


productRouter.get('/fetch/:id', async (req, res)=>{
  const portfolio_id  = req.params.id
  const user = req.user

  try {

    const portfolio = await Portfolio.fetchPortfolio(portfolio_id)
    const images = await Image.fetchByPortfolioId(portfolio_id)

    res.send({"template" : JSON.parse(portfolio.template_code)?.portfolio, "resume" : JSON.parse(portfolio.resume_data),"images" : images })
    
  } catch (error) {
    console.log(error)
  }
})

productRouter.get('/fetchAll', async (req, res)=>{
  const user = req.user
  try {
    const portfolios = await Portfolio.fetchByUser(user.id)
    res.send(portfolios)

  } catch (error) {
    console.log(error)
  }
})

module.exports = productRouter


function buildWebsiteProgrammatically() {
  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 101) + 100; // range is now 100-200
    const g = Math.floor(Math.random() * 101) + 100; // range is now 100-200
    const b = Math.floor(Math.random() * 101) + 100; // range is now 100-200

    return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  };

  const generateColorVariation = (baseColor, variationFactor) => {
    let r = parseInt(baseColor.substr(1, 2), 16);
    let g = parseInt(baseColor.substr(3, 2), 16);
    let b = parseInt(baseColor.substr(5, 2), 16);

    r = Math.min(Math.max(parseInt(r + variationFactor), 0), 255);
    g = Math.min(Math.max(parseInt(g + variationFactor), 0), 255);
    b = Math.min(Math.max(parseInt(b + variationFactor), 0), 255);

    return (
      "#" + (r.toString(16) + g.toString(16) + b.toString(16)).padStart(6, "0")
    );
  };
  const generateComplementaryColor = (color) => {

    const r = parseInt(color.substr(1, 2), 16) / 255;
    const g = parseInt(color.substr(3, 2), 16) / 255;
    const b = parseInt(color.substr(5, 2), 16) / 255;
  
    const relativeLuminance = (c) => {
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
  
    const luminance = 0.2126 * relativeLuminance(r) + 0.7152 * relativeLuminance(g) + 0.0722 * relativeLuminance(b);
  
    const targetLuminanceDiff = 0.75; 
  
    const targetLuminance = luminance + (luminance < 0.5 ? targetLuminanceDiff : -targetLuminanceDiff);
  
    const luminanceDiff = targetLuminance - luminance;
  
    const rComp = Math.max(Math.min(r + luminanceDiff, 1), 0);
    const gComp = Math.max(Math.min(g + luminanceDiff, 1), 0);
    const bComp = Math.max(Math.min(b + luminanceDiff, 1), 0);
  
    const rHex = Math.round(rComp * 255).toString(16).padStart(2, "0");
    const gHex = Math.round(gComp * 255).toString(16).padStart(2, "0");
    const bHex = Math.round(bComp * 255).toString(16).padStart(2, "0");
  
    return "#" + rHex + gHex + bHex;
  };
  
  


  // General styles that will be applied across all sections

  function getRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  const generatePaleColor = () => {

    const darkmode = Math.random() < 0.5;

    const minComponentValue = darkmode ? 15 : 220; // Set the minimum value for each RGB component
    const maxComponentValue = darkmode ? 35 : 240; // Set the maximum value for each RGB component
  
    const r = Math.floor(Math.random() * (maxComponentValue - minComponentValue + 1) + minComponentValue);
    const g = Math.floor(Math.random() * (maxComponentValue - minComponentValue + 1) + minComponentValue);
    const b = Math.floor(Math.random() * (maxComponentValue - minComponentValue + 1) + minComponentValue);
  
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };
  
  
  console.log(generatePaleColor());
  

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function buildWebsiteProgrammatically2() {
    const fonts = [
      "Arial",
      "Verdana",
      "Georgia",
      "Times New Roman",
      "Courier New",
    ];
    const alignments = ["left", "right", "center", "justify"];
    const borderStyles = [
      "dotted",
      "dashed",
      "solid",
      "double",
      "groove",
      "ridge",
      "inset",
      "outset",
    ];

    const randomFont = getRandomElementFromArray(fonts);
    const randomAlignment = getRandomElementFromArray(alignments);
    const randomBorderStyle = getRandomElementFromArray(borderStyles);

    const backgroundColor = generatePaleColor();
    const accentColor = generateRandomColor();
    const accentColorText = generateComplementaryColor(accentColor);

    // portfolio is structured here...
    const generateStyle = (min, max, unit = "px") =>
  `${getRandomNumber(min, max)}${unit}`;

    return {
      navbar: {
        dimensions: {
          height: generateStyle(50, 100),
        },
        background: {
          color: accentColor,
        },
        items: {
          alignment: {
            textAlign: randomAlignment,
            verticalAlign: "middle",
          },
          spacing: generateStyle(10, 20),
          style: {
            fontSize: generateStyle(18, 24),
            fontColor: accentColorText,
            fontFamily: randomFont,
          },
        },
      },
      header: {
        dimensions: {
          height: generateStyle(60, 100, "vh"),
        },
        background: {
          color: accentColor,
        },
        border: {
          color: accentColorText,
          width: generateStyle(1, 5),
          style: randomBorderStyle,
        },
        foreground: {
          title: {
            fontSize: generateStyle(50, 75),
            fontColor: accentColorText,
            fontFamily: randomFont,
            fontWeight: "bold",
            fontStyle: "normal",
          },
          subtitle: {
            fontSize: generateStyle(24, 36),
            fontColor: generateColorVariation(accentColorText, 25),
            fontFamily: randomFont,
            fontWeight: "normal",
            fontStyle: "italic",
          },
          alignment: {
            textAlign: randomAlignment,
            verticalAlign: "middle",
          },
        },
      },
      about: {
        background: {
          color: backgroundColor,
        },
        aboutItem: {
          alignment: {
            textAlign: randomAlignment,
            verticalAlign: "top",
          },
          spacing: generateStyle(10, 30),
          style: {
            profilePicture: {
              width: generateStyle(50, 100),
              height: generateStyle(50, 100),
            },
            name: {
              fontSize: generateStyle(18, 26),
              fontColor: generateComplementaryColor(backgroundColor),
              fontFamily: randomFont,
            },
            description: {
              fontSize: generateStyle(18, 26),
              fontColor: generateComplementaryColor(backgroundColor),
              fontFamily: randomFont,
            },
          },
        },
      },
      experiences: {
        title: {
          color: accentColor,
          fontSize: generateStyle(24, 36),
          fontFamily: randomFont,
          fontWeight: "bold",
        },
        background: {
          color: backgroundColor,
        },
        flexWrap: "wrap",
        experienceItem: {
          maxWidth: generateStyle(200, 300),
          alignment: {
            textAlign: randomAlignment,
            verticalAlign: "top",
          },
          background: {
            color: accentColor,
          },
          spacing: generateStyle(10, 30),
          style: {
            boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
            border: {
              borderStyle: randomBorderStyle,
              borderRadius: generateStyle(1, 10),
              borderWidth: generateStyle(1, 5),
              borderColor: accentColorText,
            },
            title: {
              fontSize: generateStyle(20, 24),
              fontColor: accentColorText,
              fontFamily: randomFont,
            },
            description: {
              fontSize: generateStyle(14, 18),
              fontColor: generateColorVariation(accentColorText, 25),
              fontFamily: randomFont,
            },
            date: {
              fontSize: generateStyle(14, 18),
              fontColor: generateColorVariation(accentColorText, 25),
              fontFamily: randomFont,
            },
          },
        },
      },
      skills: {
        title: {
          fontSize: generateStyle(24, 36),
          fontColor: accentColor,
          fontFamily: randomFont,
        },
        justifyContent: "center",
        dimensions: {
          minHeight: generateStyle(200, 300),
        },
        flexWrap: "wrap",
        background: {
          color: backgroundColor,
        },
        skillItem: {
          spacing: generateStyle(10, 20),
          dimensions: {
            minWidth: generateStyle(50, 100),
            maxWidth: generateStyle(200, 300),
            maxHeight: generateStyle(50, 100), 
          },
          style: {
            backgroundColor: accentColor,
            boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
            border: {
              borderStyle: randomBorderStyle,
              borderRadius: generateStyle(1, 10),
              borderWidth: generateStyle(1, 5),
              borderColor: accentColorText,
            },
            name: {
              fontSize: generateStyle(16, 20),
              fontColor: accentColorText,
              fontFamily: randomFont,
            },
            progressBar: {
              color: accentColorText,
              backgroundColor: generateComplementaryColor(accentColorText),
              border: {
                borderStyle: randomBorderStyle,
                borderRadius: generateStyle(1, 10),
                borderWidth: generateStyle(0.2, 2),
                borderColor: accentColorText,
              },
              minHeight : generateStyle(5, 10)
            },
            level: {
              fontSize: generateStyle(14, 18),
              fontColor: generateColorVariation(accentColorText, 25),
              fontFamily: randomFont,
            },
          },
        },
      },
      projects: {
        dimensions: {
          minHeight: generateStyle(200, 300),
        },
        background: {
          color: backgroundColor,
        },
        projectItem: {
          alignment: {
            textAlign: randomAlignment,
            verticalAlign: "top",
          },
          background: {
            color: accentColor,
          },
          spacing: generateStyle(10, 30),
          style: {
            boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
            border: {
              borderStyle: randomBorderStyle,
              borderRadius: generateStyle(1, 10),
              borderWidth: generateStyle(1, 5),
              borderColor: accentColorText,
            },
            title: {
              fontSize: generateStyle(20, 24),
              fontColor: accentColorText,
              fontFamily: randomFont,
            },
            description: {
              fontSize: generateStyle(14, 18),
              fontColor: generateColorVariation(accentColorText, 25),
              fontFamily: randomFont,
            },
            technologies: {
              fontSize: generateStyle(14, 18),
              fontColor: generateColorVariation(accentColorText, 25),
              fontFamily: randomFont,
            },
          },
        },
      },
      education: {
        flexDirection: "column",
        background: {
          color: backgroundColor,
        },
        educationItem: {
          alignment: {
            textAlign: randomAlignment,
            verticalAlign: "top",
          },
          background: {
            color: accentColor,
          },
          spacing: `${getRandomNumber(10, 30)}px`,
          style: {
            boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
            border: {
              borderStyle: randomBorderStyle,
              borderRadius: `${getRandomNumber(1, 10)}px`,
              borderWidth: `${getRandomNumber(1, 5)}px`,
              borderColor: accentColorText,
            },
            institution: {
              fontSize: `${getRandomNumber(20, 24)}px`,
              fontColor: accentColorText,
              fontFamily: randomFont,
            },
            degree: {
              fontSize: `${getRandomNumber(16, 20)}px`,
              fontColor: generateColorVariation(accentColorText, 25),
              fontFamily: randomFont,
            },
            major: {
              fontSize: `${getRandomNumber(14, 18)}px`,
              fontColor: generateColorVariation(accentColorText, 25),
              fontFamily: randomFont,
            },
            date: {
              fontSize: `${getRandomNumber(14, 18)}px`,
              fontColor: generateColorVariation(accentColorText, 25),
              fontFamily: randomFont,
            },
          },
        },
      },
    };
  }
  return buildWebsiteProgrammatically2()
}

