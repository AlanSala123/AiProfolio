const { Configuration, OpenAIApi } = require("openai")
require('dotenv').config()


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
            {
                "user": {
                  "name": "",
                  "from": "",
                  "email": "",
                  "media-links": []
                },
                "summary": "",
                "contactInformation": {
                  "phone": "",
                  "address": ""
                },
                "experiences": [
                  {
                    "experience": "",
                    "location": "",
                    "description": ""
                  }
                ],
                "projects": [
                  {
                    "project": "",
                    "description": "",
                    "link": "",
                    "image-url": ""
                  }
                ],
                "skills": [],
                "education": [
                  {
                    "school": "",
                    "location": "",
                    "gpa": "",
                    "major": ""
                  }
                ],
                "certifications": [
                  {
                    "name": "",
                    "issuingOrganization": "",
                    "date": ""
                  }
                ],
                "awards": [
                  {
                    "title": "",
                    "issuer": "",
                    "date": ""
                  }
                ],
                "publications": [
                  {
                    "title": "",
                    "publicationDate": "",
                    "publicationName": ""
                  }
                ],
                "volunteerWork": [
                  {
                    "organization": "",
                    "role": "",
                    "dates": ""
                  }
                ]
              }
              
        ${resumeText}`, "gpt-3.5-turbo")
        const responseObject = JSON.parse(response)
        console.log(responseObject)
        return responseObject
    }
}

