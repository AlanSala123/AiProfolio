const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const resumeTemplateJson = require("./resume_map.js");
const pdfjsLib = require("pdfjs-dist");
const e = require("express");
const mammoth = require("mammoth");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

class ChatGPT {
  static async parsePDF(fileBuffer) {
    const data = new Uint8Array(fileBuffer);
    const pdf = await pdfjsLib.getDocument({ data: data }).promise;

    let totalText = "";

    const numPages = pdf.numPages;

    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();

      const pageText = content.items.map((item) => item.str).join(" ");
      totalText += pageText + " ";
    }


    return totalText;
  }

static async parseDOCX(fileBuffer) {
  return mammoth.extractRawText({ buffer: fileBuffer })
    .then((result) => result.value)
    .catch((error) => {
      console.error('Error parsing DOCX:', error);
      return null;
    });
}

  static async request(prompt, model) {
    const chatCompletion = await openai.createChatCompletion({
      model: model,
      messages: [{ role: "user", content: prompt }],
    });
    let data = String(chatCompletion.data.choices[0].message.content);
    return data;
  }

  static preprocessResumeText(resumeText) {

    resumeText = resumeText.toLowerCase();  
    resumeText = resumeText.replace(/(\r\n|\n|\r|\t)/gm, ' ');
    resumeText = resumeText.replace(/ +(?= )/g, '');
      
    return resumeText;
  }

  static async parseResume(resumeText) {
    console.log(resumeText)
    const response = await ChatGPT.request(
      `
            I will feed you text from a resume and you will output a organized json string of ALL the data inside the resume, 
            ONLY OUTPUT THE GENERATED STRING NOTHING ELSE,
            ALSO DO NOT INCLUDE NEWLINES AT IN YOUR RESPONSE,
            FOLLOW THIS FORMAT STRICTLY

            ${resumeTemplateJson}

            FOR THE SUMMARY SECTION CREATE A FIRST PERSON DESCRIPTION OF THE PERSON BASED ON THE RESUME TEXT MAKE IT GOOD AND LEAVE OUT BAD OR POTENTIALLY BAD THINGS LIKE A RELATIVELY LOW GPA FOR EXAMPLE.
            FOR THE JOB ASPIRATION SECTION ASSUME WHAT THE PERSONS JOB ASPIRATION (Job Title) IS BASED ON THE RESUME TEXT
           MAKE THE DESCRIPTIONS OF STUFF BETTER AND MORE DETAILED AND APPROPRIATE TO FIT A PORTFOLIO WEBSITE,
           DON'T ADD A PROGRESS OR LEVEL FOR THE SKILLS IF THERE IS NOTHING INDICATING THAT IN THE RESUME TEXT,

        ${this.preprocessResumeText(resumeText)}`,

      "gpt-3.5-turbo"
    );
    const responseObject = JSON.parse(extractBracketedSubstring(response));
    return responseObject;
  }
}

function extractBracketedSubstring(s) {
  const firstBracket = s.indexOf('{');
  const lastBracket = s.lastIndexOf('}');
  if (firstBracket === -1 || lastBracket === -1 || firstBracket > lastBracket) {
    return null; // Return null if brackets are not found or not properly nested
  }
  return s.substring(firstBracket, lastBracket + 1);
}

module.exports = ChatGPT;



