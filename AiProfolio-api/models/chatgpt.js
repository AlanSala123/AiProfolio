const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const portfolioJsonTemplate = require("./component_map.js");
const resumeTemplateJson = require("./resume_map.js");
const pdfjsLib = require("pdfjs-dist");

const {
  navbarTemplate,
  aboutTemplate,
  headerTemplate,
  experiencesTemplate,
  skillsTemplate,
  projectsTemplate,
  educationTemplate,
} = require("./faster.js");

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
    const response = await ChatGPT.request(
      `
            I will feed you text from a resume and you will output a organized json string of ALL the data inside the resume, 
            ONLY OUTPUT THE GENERATED STRING NOTHING ELSE,
            ALSO DO NOT INCLUDE NEWLINES AT IN YOUR RESPONSE,
            FOLLOW THIS FORMAT STRICTLY

            ${resumeTemplateJson}

            FOR THE SUMMARY SECTION CREATE A MINIMUM 200 WORD DESCRIPTION OF THE PERSON BASED ON THE RESUME TEXT.
            FOR THE JOB ASPIRATION SECTION ASSUME WHAT THE PERSONS JOB ASPIRATION (Job Title) IS BASED ON THE RESUME TEXT
           MAKE THE DESCRIPTIONS OF STUFF BETTER AND MORE DETAILED AND APPROPRIATE TO FIT A PORTFOLIO WEBSITE,
           DONT ADD A PROGRESS OR LEVEL FOR THE SKILLS IF THERE IS NOTHING INDICATING THAT IN THE RESUME TEXT,

        ${this.preprocessResumeText(resumeText)}`,
      "gpt-3.5-turbo"
    );
    const responseObject = JSON.parse(response);
    return responseObject;
  }
}

module.exports = ChatGPT;



