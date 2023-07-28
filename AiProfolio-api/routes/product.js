const express = require('express')
const multer  = require('multer')
const ChatGPT = require('../models/chatgpt')

const upload = multer()

const productRouter = express.Router()

productRouter.post('/create', upload.array('files'), async (req, res, next) =>{
  console.log("create")
    try {
      console.time('execution time')
        const fileBuffer = req.files[0].buffer; 

        // These should be sequential
        const parsedText = await ChatGPT.parsePDF(fileBuffer);
        // This can run in parallel
        const [templateObject, resumeObject] = await Promise.all([ChatGPT.buildWebsite(), ChatGPT.parseResume(parsedText)])

        console.log(resumeObject)
        console.log(templateObject)
        console.timeEnd('execution time')
        res.send({"template" : templateObject, "resume" : resumeObject })
      } catch (error) {
        console.log(error);
      }
})

module.exports = productRouter