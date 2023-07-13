const User = require('../models/user.js')
const { NotFoundError, InternalServerError } = require('../utilities/error')


describe("FetchUserById", ()=>{
    test('fetchById should return user for valid userId', async()=>{
         const validUserId = 'test-id'
         const result = await User.fetchById(validUserId)
         expect(result).toStrictEqual({
            id : 'test-id',
            username : 'test-username',
            password : 'test-password',
            first_name : 'test-first_name',
            email : 'test-email@test.com'
        })
     })
    
     test('fetchById should return Not Found Error for invalid userId', async () => {
        const invalidUserId = 'test-fake-id'
            try {
                await User.fetchById(invalidUserId)
                fail()
            } catch (error) {
                expect(error instanceof NotFoundError).toBeTruthy()
            }
    })

    describe("GenerateAuthToken")
    

})