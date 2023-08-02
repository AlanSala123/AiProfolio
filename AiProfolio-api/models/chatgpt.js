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




    static async buildWebsite(){
      
      const response = await ChatGPT.request(`
      Following the structure of this JSON template:

      ${portfolioJsonTemplate}
      FOLLOW THIS FORMAT STRICTLY.
      
      
In this creative challenge, you have been given a JSON template that contains various components. 
Your task is to infuse these components with distinctive and vibrant styles to create an eye-catching design 
while ensuring readability and accessibility. Emphasize contrast so that foreground items stand out clearly against their backgrounds.

Feel free to think outside the box and be daring in your color choices and styling elements. The goal is to 
break free from ordinary designs and produce something truly unique. However, it's essential to stay within the
 bounds of the JSON template structure.

When working on your design, remember that the text color and item background for each component must 
be distinctive and contrasting. Additionally, the text should remain readable and accessible to all users.
 While the design should be unique, it should also maintain a professional appearance.


Finally, unleash your creativity and let your imagination run wild. Return the final design as a JSON code that brings life to the 
components with a myriad of colors and engaging elements. Aim to create a design that truly stands out with its uniqueness and contrast 
while maintaining a cohesive theme. Add color and personality to the template while ensuring that the design remains polished and professional.
PLEASE DONT JUST USE BLACK AND WHITE USE COLORFUL 
COLORS AND MAKE IT LOOK NICE, MAKE IT FOLLOW A THEME AND MAKE IT LOOK PROFESSIONAL.
PLease make sure to make the text contrast from the background of items and make sure the text is readable and accessible to all users.
MAKE THE CONTRAST VALUE A MINIMUM OF !
MAKE IT LOOK PROFESSIONAL AND KEEP A THEME.
FILL OUT ALL THE SECTIONS
MANDATORY: RETURN ONLY THE GENERATED JSON NOTHING ELSE LIKE TEXT OR ANYTHING.
      `, "gpt-4")
      console.log(response);
      const responseObject = JSON.parse(response)
      console.log(responseObject)
      return responseObject
  }

  static async buildComponent( templateObj ,componentName, themeData){
    const response = await ChatGPT.request(`
    I will feed you JSON DATA that represents the styling of a ${componentName} you will output a json string of the styling with the theme applied to it.
    Following the structure of this JSON template:

    ${templateObj}
    FOLLOW THIS FORMAT STRICTLY.
    
    
In this creative challenge, you have been given a JSON template that contains various components. 
Your task is to infuse these components with distinctive and vibrant styles to create an eye-catching design 
while ensuring readability and accessibility. Emphasize contrast so that foreground items stand out clearly against their backgrounds.

Feel free to think outside the box and be daring in your color choices and styling elements. The goal is to 
break free from ordinary designs and produce something truly unique. However, it's essential to stay within the
bounds of the JSON template structure.

When working on your design, remember that the text color and item background for each component must 
be distinctive and contrasting. Additionally, the text should remain readable and accessible to all users.
While the design should be unique, it should also maintain a professional appearance.


Finally, unleash your creativity and let your imagination run wild. Return the final design as a JSON code that brings life to the 
components with a myriad of colors and engaging elements. Aim to create a design that truly stands out with its uniqueness and contrast 
while maintaining a cohesive theme. Add color and personality to the template while ensuring that the design remains polished and professional.
PLEASE DONT JUST USE BLACK AND WHITE USE COLORFUL 
COLORS AND MAKE IT LOOK NICE, MAKE IT FOLLOW A THEME AND MAKE IT LOOK PROFESSIONAL.
PLease make sure to make the text contrast from the background of items and make sure the text is readable and accessible to all users.
MAKE THE CONTRAST VALUE A MINIMUM OF !
MAKE IT LOOK PROFESSIONAL AND KEEP A THEME.
FILL OUT ALL THE SECTIONS
MANDATORY: RETURN ONLY THE GENERATED JSON NOTHING ELSE LIKE TEXT OR ANYTHING.



    `, "gpt-4")
    const responseObject = JSON.parse(response)
    return responseObject
  }

  static async generateTheme(){


    return await ChatGPT.request(`
      YOUR TASK IS TO GENERATE A THEME FOR A PORTFOLIO WEBSITE, YOU WILL GIVE ME A STRING OF THE THEME.
      WHERE YOU WILL SPECIFY IMPORTANT VALUES LIKE COLOR, FONT, ETC.
      PLEASE BE CREATIVE AND MAKE IT LOOK NICE AND PROFESSIONAL. DO NOT LET THE COLORS BE DULL.
    `, 'gpt-3.5-turbo')
  }




  static async buildWebsiteFaster(){
    const themeData = await this.generateTheme()
    const templateObj = JSON.parse(portfolioJsonTemplate)
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

ChatGPT.buildWebsiteFaster()

module.exports = ChatGPT

