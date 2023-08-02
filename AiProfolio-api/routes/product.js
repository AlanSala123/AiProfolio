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
    //   const [templateObject, resumeObject] = await Promise.all([ChatGPT.buildWebsite(), ChatGPT.parseResume(parsedText)])
    const [templateObject, resumeObject] = await Promise.all([ChatGPT.buildWebsiteFaster(), ChatGPT.parseResume(parsedText)])
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