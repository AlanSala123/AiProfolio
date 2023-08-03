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
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

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
    let r = 255 - parseInt(color.substr(1, 2), 16);
    let g = 255 - parseInt(color.substr(3, 2), 16);
    let b = 255 - parseInt(color.substr(5, 2), 16);

    return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  };

  const initialColor = generateRandomColor();
  const variationFactor = 50;
  const primaryColor = generateColorVariation(initialColor, variationFactor);
  const secondaryColor = generateComplementaryColor(primaryColor);

  // General styles that will be applied across all sections

  function getRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const randomFont = getRandomElementFromArray([
    "Arial",
    "Verdana",
    "Georgia",
    "Times New Roman",
    "Courier New",
  ]);
  const randomAlignment = getRandomElementFromArray([
    "left",
    "right",
    "center",
    "justify",
  ]);
  const randomBorderStyle = getRandomElementFromArray([
    "dotted",
    "dashed",
    "solid",
    "double",
    "groove",
    "ridge",
    "inset",
    "outset",
  ]);

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

    const primaryColor = generateRandomColor();
    const secondaryColor = generateComplementaryColor(primaryColor);

    // portfolio is structured here...
    const generateStyle = (min, max, unit = "px") =>
  `${getRandomNumber(min, max)}${unit}`;

    return {
      navbar: {
        dimensions: {
          height: generateStyle(50, 100),
        },
        background: {
          color: primaryColor,
        },
        items: {
          alignment: {
            textAlign: randomAlignment,
            verticalAlign: "middle",
          },
          spacing: generateStyle(5, 20),
          style: {
            fontSize: generateStyle(12, 24),
            fontColor: secondaryColor,
            fontFamily: randomFont,
          },
        },
      },
      header: {
        dimensions: {
          height: generateStyle(200, 300),
        },
        background: {
          color: secondaryColor,
        },
        border: {
          color: primaryColor,
          width: generateStyle(1, 5),
          style: randomBorderStyle,
        },
        foreground: {
          title: {
            fontSize: generateStyle(24, 48),
            fontColor: primaryColor,
            fontFamily: randomFont,
            fontWeight: "bold",
            fontStyle: "normal",
          },
          subtitle: {
            fontSize: generateStyle(14, 24),
            fontColor: primaryColor,
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
          color: primaryColor,
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
              fontSize: generateStyle(20, 30),
              fontColor: secondaryColor,
              fontFamily: randomFont,
            },
            description: {
              fontSize: generateStyle(14, 18),
              fontColor: secondaryColor,
              fontFamily: randomFont,
            },
          },
        },
      },
      experiences: {
        title: {
          color: secondaryColor,
          fontSize: generateStyle(24, 36),
          fontFamily: randomFont,
          fontWeight: "bold",
        },
        background: {
          color: secondaryColor,
        },
        flexWrap: "wrap",
        experienceItem: {
          maxWidth: generateStyle(200, 300),
          alignment: {
            textAlign: randomAlignment,
            verticalAlign: "top",
          },
          background: {
            color: secondaryColor,
          },
          spacing: generateStyle(10, 30),
          style: {
            boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
            border: {
              borderStyle: randomBorderStyle,
              borderRadius: generateStyle(1, 10),
              borderWidth: generateStyle(1, 5),
              borderColor: primaryColor,
            },
            title: {
              fontSize: generateStyle(20, 24),
              fontColor: primaryColor,
              fontFamily: randomFont,
            },
            description: {
              fontSize: generateStyle(14, 18),
              fontColor: primaryColor,
              fontFamily: randomFont,
            },
            date: {
              fontSize: generateStyle(14, 18),
              fontColor: primaryColor,
              fontFamily: randomFont,
            },
          },
        },
      },
      skills: {
        title: {
          fontSize: generateStyle(24, 36),
          fontColor: secondaryColor,
          fontFamily: randomFont,
        },
        justifyContent: "center",
        dimensions: {
          minHeight: generateStyle(200, 300),
        },
        flexWrap: "wrap",
        background: {
          color: primaryColor,
        },
        skillItem: {
          spacing: generateStyle(10, 20),
          dimensions: {
            minWidth: generateStyle(50, 100),
            maxWidth: generateStyle(200, 300),
            maxHeight: generateStyle(50, 100), 
          },
          style: {
            backgroundColor: secondaryColor,
            boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
            border: {
              borderStyle: randomBorderStyle,
              borderRadius: generateStyle(1, 10),
              borderWidth: generateStyle(1, 5),
              borderColor: primaryColor,
            },
            name: {
              fontSize: generateStyle(16, 20),
              fontColor: primaryColor,
              fontFamily: randomFont,
            },
            progressBar: {
              color: primaryColor,
              backgroundColor: secondaryColor,
              border: {
                borderStyle: randomBorderStyle,
                borderRadius: generateStyle(1, 10),
                borderWidth: generateStyle(1, 5),
                borderColor: primaryColor,
              },
            },
            level: {
              fontSize: generateStyle(14, 18),
              fontColor: primaryColor,
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
          color: primaryColor,
        },
        projectItem: {
          alignment: {
            textAlign: randomAlignment,
            verticalAlign: "top",
          },
          background: {
            color: secondaryColor,
          },
          spacing: generateStyle(10, 30),
          style: {
            boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
            border: {
              borderStyle: randomBorderStyle,
              borderRadius: generateStyle(1, 10),
              borderWidth: generateStyle(1, 5),
              borderColor: primaryColor,
            },
            title: {
              fontSize: generateStyle(20, 24),
              fontColor: primaryColor,
              fontFamily: randomFont,
            },
            description: {
              fontSize: generateStyle(14, 18),
              fontColor: primaryColor,
              fontFamily: randomFont,
            },
            technologies: {
              fontSize: generateStyle(14, 18),
              fontColor: primaryColor,
              fontFamily: randomFont,
            },
          },
        },
      },
      education: {
        flexDirection: "column",
        background: {
          color: secondaryColor,
        },
        educationItem: {
          alignment: {
            textAlign: randomAlignment,
            verticalAlign: "top",
          },
          spacing: `${getRandomNumber(10, 30)}px`,
          style: {
            boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
            border: {
              borderStyle: randomBorderStyle,
              borderRadius: `${getRandomNumber(1, 10)}px`,
              borderWidth: `${getRandomNumber(1, 5)}px`,
              borderColor: primaryColor,
            },
            institution: {
              fontSize: `${getRandomNumber(20, 24)}px`,
              fontColor: primaryColor,
              fontFamily: randomFont,
            },
            degree: {
              fontSize: `${getRandomNumber(16, 20)}px`,
              fontColor: primaryColor,
              fontFamily: randomFont,
            },
            major: {
              fontSize: `${getRandomNumber(14, 18)}px`,
              fontColor: primaryColor,
              fontFamily: randomFont,
            },
            date: {
              fontSize: `${getRandomNumber(14, 18)}px`,
              fontColor: primaryColor,
              fontFamily: randomFont,
            },
          },
        },
      },
    };
  }
  return buildWebsiteProgrammatically2()
}

console.log(buildWebsiteProgrammatically());
