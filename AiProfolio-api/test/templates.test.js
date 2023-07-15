const Template = require('../models/templates.js')
const { NotFoundError, InternalServerError, FieldValidationError, InvalidCredentialsError } = require('../utilities/error')


describe("Fetch Template", () => {

    test('fetch by id should return template for valid template id', async () => {
        const validTemplateId = '1'
        const result = await Template.fetchById(validTemplateId)
        expect(result).toStrictEqual({
            template_id: '1',
            code: 'blah',
            likes: 10
        })
    })

    test('fetch by id should return a Not Found Error if the template_id is invalid', async () => {
        const inValidTemplateId = 'invalid-id'
        try {
            await Template.fetchById(inValidTemplateId)
            fail()
        } catch (error) {
            expect(error instanceof NotFoundError).toBeTruthy();
        }
    })

    test('fetch by k most likes should return an array of templates based on their likes', async () => {
        const k = 2;
        const result = await Template.fetchKMostLikedTemplates(k);
        expect(result).toStrictEqual([
          {
            template_id: '3',
            code: 'grey',
            likes: 30
          },
          {
            template_id: '2',
            code: 'woah',
            likes: 15
          }
        ]);
      });
})
describe("Insert", ()=>{

    test("Insert a template with valid fields should create a template", async ()=>{
        const code = "hello"
        const likes = 0
        const createdTemplate = await Template.insertTemplate(code, likes)
        expect(createdTemplate.likes).toStrictEqual(likes)
    })

    test("Insert a template with Invalid likes should not create a template", async ()=>{
        const code = "correct"
        const likes = "hi"
        try {
            await Template.insertTemplate(code, likes)
            fail()
        } catch (error) {
            expect(error instanceof InternalServerError).toBeTruthy();
        }
    })

    test("Insert a template with Invalid code should not create a template", async ()=>{
        const code = 100
        const likes = 100
        try {
            await Template.insertTemplate(code, likes)
            fail()
        } catch (error) {
            expect(error instanceof InternalServerError).toBeTruthy();
        }
    })

})

describe("Delete", ()=>{

    test("Template can be deleted", async()=>{
        const id = '1'
        await Template.deleteTemplate(id)
        try {
            await Template.fetchById(id)
        } catch (error) {
            expect(error instanceof NotFoundError).toBeTruthy()
        }
    })

})

describe("Update", ()=>{

    test("Template likes can be updated", async()=>{
        const likes = 80
        const id = 3
        const updatedTemplate = await Template.updateTemplateLikes(id, likes)
        expect(updatedTemplate.likes).toStrictEqual(likes)
    })

    test("Invalid id will return not found error", async()=>{
       const inValidTemplateId = "32372"
        try {
            await Template.updateTemplateLikes(inValidTemplateId)
            fail()
        } catch (error) {
            expect(error instanceof InternalServerError).toBeTruthy();
        }
    })

})
