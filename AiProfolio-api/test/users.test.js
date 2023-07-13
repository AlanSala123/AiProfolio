const User = require('../models/user.js')
const { NotFoundError, InternalServerError, FieldValidationError } = require('../utilities/error')


describe("Fetch", ()=>{

    test('fetch by id should return user for valid user id', async()=>{
         const validUserId = 'test-id'
         const result = await User.fetch("id",validUserId)
         expect(result).toStrictEqual({
            id : 'test-id', 
            password : 'test-password',
            first_name : 'test-first_name',
            email : 'test-email@test.com'
        })
     })
    
    test('fetch by id should return Not Found Error for invalid user id', async () => {
        const invalidUserId = 'test-fake-id'
            try {
                await User.fetch("id", invalidUserId)
                fail()
            } catch (error) {
                expect(error instanceof NotFoundError).toBeTruthy()
            }
    })

    test('fetch by email should return user for valid user email', async()=>{
        const validUserEmail = 'test-email@test.com'
        const result = await User.fetch("email",validUserEmail)
        expect(result).toStrictEqual({
           id : 'test-id', 
           password : 'test-password',
           first_name : 'test-first_name',
           email : 'test-email@test.com'
       })
    })
   
   test('fetch by email should return Not Found Error for invalid user email', async () => {
       const invalidUserEmail = 'test-fake-id'
           try {
               await User.fetch("email", invalidUserEmail)
               fail()
           } catch (error) {
               expect(error instanceof NotFoundError).toBeTruthy()
           }
   })

   test('fetch should return FieldValidationError for invalid column', async () => {
    const invalidColumn = 'password'
        try {
            await User.fetch(invalidColumn, 'test-password')
            fail()
        } catch (error) {
            expect(error instanceof FieldValidationError).toBeTruthy()
        }
})

    //describe("GenerateAuthToken")
    

})