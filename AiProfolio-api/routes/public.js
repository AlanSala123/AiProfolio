const express = require('express');
const User = require('../models/user')
const Portfolio = require('../models/Portfolio')
const Image = require('../models/Image')


const publicRouter = express.Router();

publicRouter.get('/:id', async (req, res)=>{
    const user_id  = req.params.id
  
    try {
  
      const user = await User.fetch("id", user_id)
      const portfolio = await Portfolio.fetchPortfolio(user.hosted_id)
      const images = await Image.fetchByPortfolioId(portfolio.id)
      res.send({"template" : JSON.parse(portfolio.template_code), "resume" : JSON.parse(portfolio.resume_data),"images" : images })
      
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: "Internal server error" });
    }
  })

  module.exports = publicRouter