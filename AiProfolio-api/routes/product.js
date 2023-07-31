const express = require('express')
const multer  = require('multer')
const ChatGPT = require('../models/chatgpt')

const upload = multer()

const productRouter = express.Router()

const uploadFields = [
    { name: 'resume', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]
  
  productRouter.post('/create', upload.fields(uploadFields), async (req, res, next) => {
    console.log("create")
    try {
      console.time('execution time')
  
      // Ensure that there is at least one resume file
      if (!req.files.resume || req.files.resume.length === 0) {
        throw new Error('No resume was uploaded.');
      }
  
      const resumeFile = req.files.resume[0];
      const imageFiles = req.files.images || []; // this will be an array of image files
  
      // Process the resume file
      const parsedText = await ChatGPT.parsePDF(resumeFile.buffer);
  
      // Process images - you can do whatever is required with these imageFiles
  
      // Get the template and resume object
      const [templateObject, resumeObject] = await Promise.all([
        ChatGPT.buildWebsite(),
        ChatGPT.parseResume(parsedText)
      ]);
  
      console.log(resumeObject);
      console.log(templateObject);
      console.timeEnd('execution time')
  
      res.send({ "template" : templateObject.portfolio, "resume" : resumeObject })
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.toString() });
    }
  })
  
  

module.exports = productRouter