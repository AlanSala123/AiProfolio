const { Configuration, OpenAIApi } = require("openai")
require('dotenv').config()
const portfolioJsonTemplate = require("./component_map.js")
const resumeTemplateJson = require("./resume_map.js")
const fs = require("fs")


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);

class ChatGPT{
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
            
              
        ${resumeText}`, "gpt-3.5-turbo")
        const responseObject = JSON.parse(response)
        console.log(responseObject)
        return responseObject
    }




    static async buildWebsite(){
      const response = await ChatGPT.request(`
      Following the structure of this JSON template:

      ${portfolioJsonTemplate}
      
      In the provided JSON template, assign distinctive and vibrant styles to each component key. The goal is to create a design that is not only eye-catching but also ensures readability and accessibility. Pay special attention to contrast, making sure that foreground items stand out clearly against their backgrounds.

Dare to be different and unique in your color choices and styling elements. We're seeking designs that break free from the ordinary.

Your work should be strictly within the bounds of the JSON template structure. Return the final design as a JSON code. Let the components spring to life with a myriad of colors and engaging elements. Aim for a design that truly distinguishes itself in uniqueness and contrast.
MAKE SURE TEXT COLOR AND ITEM BACKGROUND FOR EACH COMPONENT ARE DISTINCTIVE AND CONTRASTING, AND THAT THE TEXT IS READABLE AND ACCESSIBLE. AND MAKE SURE THAT THE SAME THEME IS FOLLOWED AT LEAST SOMEWHAT, AND WHILE IT SHOULD BE UNIQUE IT SHOULD ALSO BE PROFESSIONAL LOOKING
      `, "gpt-3.5-turbo-16k")
      console.log(response);
      const responseObject = JSON.parse(response)
      console.log(responseObject)
      return responseObject
  }
}

const luisResume = `LUIS BRAVO
Oxnard, CA • (805) 415-9758 • luisbravo@ucsb.edu • https://www.linkedin.com/in/luisbrvo/
 EDUCATION
 University of California, Santa Barbara (UCSB)
Bachelor of Science (B.S.)
GPA : 3.1 / 4
RESEARCH EXPERIENCE
Student Researcher, UCSB Systems and Networking Lab, Santa Barbara, CA
 Contributed to the development of Trust ee, a Python package aimed at providing network operators with tools to increase trust in
black box ML models
 Led the conversion of the Trustee trust report output from CLI to HTML, improving its readability and shareability
 Implemented functionality to set thresholds and generate decision trees based on the threshold set to assist network operators in
identifying potential issues with ML models
 Worked in a team environment to ensure project goals were met in a timely and efficient manner
PERSONAL PROJECTS
 Designed and developed an iOS application that enables users to create and share a fridge database, providing the ability to update, delete, and edit items and notes into the shared environment.
 Designed and developed a Python-based application enabling users to create invoices and estimates with ease, while also providing efficient management of files and data to ensure an accessible and responsive graphical user interface.
 Designed and developed a social media prototype application at CalHacks which allowed users to see visual connections between each of their mutual friends in a node graph-like graphical format.
RELEVANT COURSEWORK
 Data Structures and Algorithms, Object Oriented Design, Computer Architecture, Computer Organization and Design Logic, Numerical Computing, Problem Solving with Computers, Discrete Math, Calculus, Vector Calculus, Differential Equations
SKILLS
Technical: Python, Swift, C++, iOS development, HTML, CSS, Javascript, Express.js, Node.js, React.js, PostgreSQL English (Native), Spanish (Advanced)
Santa Barbara, CA Expected June 2025
 January 2022-Present
   EXPERIENCE
Futureforce Tech Launchpad Scholar, Salesforce, San Francisco, CA
 Leading a team in the development of a full stack web application
 Developing a variety of web applications to gain experience in full stack web development
 Researching and experimenting with a variety of development technologies
Fulfillment Associate, Amazon, Isla Vista, CA
 Assisted customers with package pickup and delivery
 Maintained accurate records of packages received and delivered
 Worked as part of a team to provide efficient and effective service to customers
Cashier, Vons, Santa Barbara, CA
 Assisted customers with package pickup and delivery
 Maintained accurate records of packages received and delivered
 Worked as part of a team to provide efficient and effective service to customers
Cashier, Walmart, Oxnard, CA
 Handled customer transactions and assisted with customer inquiries and concerns
 Maintained a clean and organized work environment
 Assisted with stocking shelves and maintaining inventory
June 2023-August 2023
September 2022-February 2023
February 2022-June 2022
August 2021-December 2021
 `

 console.time('executionTime');


  ChatGPT.buildWebsite().then(website => {
    console.timeEnd('executionTime');
    fs.writeFile('EXAMPLE.json', JSON.stringify(website), 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
      }
   
      console.log("JSON file has been saved.");
  });
  }).catch(console.error)