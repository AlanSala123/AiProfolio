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
MAKE IT LOOK PROFESSIONAL AND KEEP A THEME.
FILL OUT ALL THE SECTIONS
MANDATORY: RETURN ONLY THE GENERATED JSON NOTHING ELSE LIKE TEXT OR ANYTHING.
MAKE TEXT FONTS READABLE AND ACCESSIBLE TO ALL USERS.
USE AS MUCH OF THE THEME DATA AS POSSIBLE BUT ADD ANYTHING THAT YOU THINK Would IMPROVE THE DESIGN.



    `, "gpt-3.5-turbo")
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
        - Ect...
        
        THE COLORS SELECTED SHOULD BE VIBRANT AND ENGAGING, BUT ALSO OFFER SUFFICIENT CONTRAST TO ENSURE TEXT IS READABLE. FONTS SHOULD BE LEGIBLE AT ALL SIZES AND SUITED TO A VARIETY OF DEVICES AND SCREEN RESOLUTIONS.

        WHETHER YOU CHOOSE A COMPLEX OR MINIMALISTIC APPROACH, THE THEME SHOULD BE DISTINCTIVE AND UNIQUE. BE BOLD, AND DON'T HESITATE TO PUSH CREATIVE BOUNDARIES WHILE STILL MAINTAINING A HIGH DEGREE OF USABILITY AND ACCESSIBILITY.
        DON'T LET THERE BE WHITE ON WHITE OR BLACK ON BLACK TEXT
    `, 'gpt-3.5-turbo')
    console.log(res)
    return res
}



  static async buildWebsiteFaster(){
    const themeData = await this.generateTheme()
    const [navbar, about, header, experiences, skills, projects, education] = await Promise.all([this.buildComponent(navbarTemplate, "navbar", themeData), this.buildComponent(aboutTemplate, "about", themeData), this.buildComponent(headerTemplate, "hero", themeData), this.buildComponent(experiencesTemplate, "experiences", themeData), this.buildComponent(skillsTemplate, "skills", themeData), this.buildComponent(projectsTemplate, "projects", themeData), this.buildComponent(educationTemplate, "education", themeData)])
    return({
      "portfolio" : {
        "navbar": navbar.navbar,
        "about": about.about,
        "header": header.hero,
        "experiences": experiences.experiences,
        "skills": skills.skills,
        "projects": projects.projects,
        "education": education.education
      }
    })
  }
}

module.exports = ChatGPT

