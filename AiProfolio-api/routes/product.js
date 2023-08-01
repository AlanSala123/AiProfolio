const express = require('express')
const multer  = require('multer')
const ChatGPT = require('../models/chatgpt')
const User = require('../models/user')
const Portfolio = require('../models/Portfolio')
const Image = require('../models/Image')

const upload = multer()

const productRouter = express.Router()

productRouter.post('/create', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'images', maxCount: 20 }]), async (req, res, next) => {
  try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.split(' ')[1];
      const user = User.verifyToken(token)
      console.time('execution time')

      const fileBuffer = req.files.resume[0].buffer; 
      const images = req.files.images;
      
      
      const labels = Object.keys(req.body).filter(key => key.startsWith('labels')).map(key => req.body[key])[0];

      const imageLabelPairs = images.map((image, index) => {
        return { 
            image: image,
            label: labels[index]
        };
    });


    
      const parsedText = await ChatGPT.parsePDF(fileBuffer);
      const [templateObject, resumeObject] = await Promise.all([ChatGPT.buildWebsite(), ChatGPT.parseResume(parsedText)])
      // TODO VERIFY JSOn
      const portfolio = await Portfolio.insertPortfolio( templateObject,  resumeObject,  user.id )
      await Promise.all(imageLabelPairs.map(pair => Promise.resolve(Image.insertImage(pair, portfolio.id))));

      console.log(imageLabelPairs)
      

      console.timeEnd('execution time')
      res.send(portfolio.id)
  } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
  }
});


productRouter.post('/fetch/:id', async (req, res)=>{
  const potfolio_id  = req.params.id
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1];
    // const user = User.verifyToken(token)

    const portfolio = await Portfolio.fetchPortfolio(potfolio_id)
    const images = await Image.fetchByPortfolioId(potfolio_id)

    res.send({"template" : JSON.parse(portfolio.template_code)?.portfolio, "resume" : JSON.parse(portfolio.resume_data),"images" : images })

  } catch (error) {
    console.log(error)
    res.s
  }
})

module.exports = productRouter