const { Configuration, OpenAIApi } = require("openai")
require('dotenv').config()
const portfolioJsonTemplate = require("./component_map.js")
const resumeTemplateJson = require("./resume_map.js")
const pdfjsLib = require('pdfjs-dist');

const {
  navbarTemplate,
  aboutTemplate,
  headerTemplate,
  experiencesTemplate,
  skillsTemplate,
  projectsTemplate,
  educationTemplate
} = require("./faster.js")


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);

class ChatGPT{
  

  static async parsePDF(fileBuffer) {
    const data = new Uint8Array(fileBuffer);
    const pdf = await pdfjsLib.getDocument({data: data}).promise;
  
    let totalText = "";
  
    const numPages = pdf.numPages;
  
    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
  
      const pageText = content.items.map(item => item.str).join(' ');
      totalText += pageText + ' ';
    }

    return totalText;
  }

    static async request(prompt, model){
        const chatCompletion = await openai.createChatCompletion({
            model: model,
            messages: [{role: "user", content: prompt}],
          });
          let data = String(chatCompletion.data.choices[0].message.content)
          return data  
        }

    static async parseResume(resumeText){

        const response = await ChatGPT.request(`
            I will feed you text from a resume and you will output a organized json string of ALL the data inside the resume, 
            ONLY OUTPUT THE GENERATED STRING NOTHING ELSE,
            ALSO DO NOT INCLUDE NEWLINES AT IN YOUR RESPONSE,
            FOLLOW THIS FORMAT STRICTLY

            ${resumeTemplateJson}

            FOR THE SUMMARY SECTION CREATE A MINIMUM 200 WORD DESCRIPTION OF THE PERSON BASED ON THE RESUME TEXT.
            FOR THE JOB ASPIRATION SECTION ASSUME WHAT THE PERSONS JOB ASPIRATION (Job Title) IS BASED ON THE RESUME TEXT


            
        ${resumeText}`, "gpt-3.5-turbo")
        const responseObject = JSON.parse(response)
        return responseObject
    }


  static async buildComponent( templateObj ,componentName, themeData){
    const response = await ChatGPT.request(`
    I will feed you JSON DATA that represents the styling of a ${componentName} you will output a json string of the styling with the theme applied to it.
    Following the structure of this JSON template:

    ${templateObj}
    FOLLOW THIS FORMAT STRICTLY.

    And also use this theme ${JSON.stringify(themeData)}
    ALSO MAKE SURE THAT THE VALUES YOU INPUT ARE VALID CSS CODE AND NO EXTRA TEXT
    
    
    Revamp a provided JSON template into a unique, eye-catching, and professional design, ensuring a strong contrast for readability and accessibility. Use vibrant CSS-valid colors while adhering to the template structure. The end result should be a JSON code that invigorates the components, maintaining a cohesive theme. Make certain all text fonts are accessible. Only return the CSS-valid JSON code, with no additional text. Avoid solely using black and white.

    MANDATORY: OUTPUT ONLY THE JSON NO ADDITIONAL TEXT

    `, "gpt-4")
    const responseObject = JSON.parse(response)
    return responseObject
  }

  static async generateTheme(){
    const res = await ChatGPT.request(`
        YOUR TASK IS TO GENERATE A THEME FOR A PORTFOLIO WEBSITE THAT BLENDS CREATIVITY, PROFESSIONALISM, AND ACCESSIBILITY.

       PLEASE PROVIDE THE FOLLOWING DETAILS:
        - BACKGROUND COLORS OR IMAGES
        - BACKGROUND COLORS FOR ITEMS WITHIN THE SECTION
        - TEXT COLORS DEPENDING ON BACKGROUND COLOR OF ITEMS OR SECTIONS
        - FONT STYLES AND SIZES
        - ANY ADDITIONAL STYLING DETAILS, SUCH AS BORDER STYLES, SPACING, OR ALIGNMENT
        
        FOCUS SOLEY ON STYLINGS, NOT ANIMATION OR INTERACTIVITY.
        
        THE COLORS SELECTED SHOULD BE VIBRANT AND ENGAGING, BUT ALSO OFFER SUFFICIENT CONTRAST TO ENSURE TEXT IS READABLE. FONTS SHOULD BE LEGIBLE AT ALL SIZES AND SUITED TO A VARIETY OF DEVICES AND SCREEN RESOLUTIONS.

        The sections go in this order  navbar, header, about, education, experiences, skills, projects

        WHETHER YOU CHOOSE A COMPLEX OR MINIMALISTIC APPROACH, THE THEME SHOULD BE DISTINCTIVE AND UNIQUE. BE BOLD, AND DON'T HESITATE TO PUSH CREATIVE BOUNDARIES WHILE STILL MAINTAINING A HIGH DEGREE OF USABILITY AND ACCESSIBILITY.
        EMPHASIZE THAT THE SECTION SHOULD FLOW CONTINUOSLY AND LOOK PROFESSIONAL AND EASY TO READ.
    `, 'gpt-4')
    console.log(res)
    return res
}



  static async buildWebsiteFaster(){
    const themeData = await this.generateTheme()
    const [navbar, about, header, experiences, skills, projects, education] = await Promise.all([this.buildComponent(navbarTemplate, "navbar", themeData), this.buildComponent(aboutTemplate, "about", themeData), this.buildComponent(headerTemplate, "header", themeData), this.buildComponent(experiencesTemplate, "experiences", themeData), this.buildComponent(skillsTemplate, "skills", themeData), this.buildComponent(projectsTemplate, "projects", themeData), this.buildComponent(educationTemplate, "education", themeData)])
    return({
      "portfolio" : {
        "navbar": navbar.navbar,
        "about": about.about,
        "header": header.header,
        "experiences": experiences.experiences,
        "skills": skills.skills,
        "projects": projects.projects,
        "education": education.education
      }
    })
  }
}

module.exports = ChatGPT

