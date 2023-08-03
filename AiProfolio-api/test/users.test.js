const { JsonWebTokenError } = require('jsonwebtoken')
const User = require('../models/user.js')
const { NotFoundError, InternalServerError, FieldValidationError, InvalidCredentialsError } = require('../utilities/error')
const pool = require('../config/database.js')
const bcrypt = require("bcrypt")
jest.mock('../config/database.js')

describe("Fetch User", () => {

    test('fetch by id should return user for valid user id', async () => {
        const validUserId = 'test-id';
        pool.query.mockResolvedValue({
            rows: [
                {
                    id: 'test-id',
                    password: 'test-password',
                    first_name: 'test-first_name',
                    email: 'test-email@test.com',
                },
            ],
        });
        const result = await User.fetch("id", validUserId);
        expect(result).toStrictEqual({
            id: 'test-id',
            password: 'test-password',
            first_name: 'test-first_name',
            email: 'test-email@test.com',
        });
    });

    test('fetch by id should throw Not Found Error for invalid user id', async () => {
        const invalidUserId = 'test-fake-id'
        pool.query.mockResolvedValue({
            rows:
                []
        });
        try {
            await User.fetch("id", invalidUserId)
            fail()
        } catch (error) {
            expect(error instanceof NotFoundError).toBeTruthy()
        }
    })

    test('fetch by email should return user for valid user email', async () => {
        const validUserEmail = 'test-email@test.com'

        pool.query.mockResolvedValue({
            rows: [
                {
                    id: 'test-id',
                    password: 'test-password',
                    first_name: 'test-first_name',
                    email: 'test-email@test.com',
                },
            ],
        })

        const result = await User.fetch("email", validUserEmail)

        expect(result).toStrictEqual({
            id: 'test-id',
            password: 'test-password',
            first_name: 'test-first_name',
            email: 'test-email@test.com'
        })
    })

    test('fetch by email should throw Not Found Error for invalid user email', async () => {
        const invalidUserEmail = 'test-fake-id'
        pool.query.mockResolvedValue({
            rows:
                []
        });
        try {
            await User.fetch("email", invalidUserEmail)
            fail()
        } catch (error) {
            expect(error instanceof NotFoundError).toBeTruthy()
        }
    })

    test('fetch should return FieldValidationError for invalid column', async () => {
        const invalidColumn = 'password'
        pool.query.mockResolvedValue({
            rows:
                []
        });
        try {
            await User.fetch(invalidColumn, 'test-password')
            fail()
        } catch (error) {
            expect(error instanceof FieldValidationError).toBeTruthy()
        }
    })

})

describe("Token Handling", () => {

    test("Generate token should return a valid token which can be decoded", () => {
        const token = User.generateAuthToken({
            id: 'test-id',
            password: 'test-password',
            first_name: 'test-first_name',
            email: 'test-email@test.com'
        })
        const user = User.verifyToken(token)
        
        expect({
            id: user.id,
            first_name: user.first_name,
            email: user.email
        }).toStrictEqual({
            id: 'test-id',
            first_name: 'test-first_name',
            email: 'test-email@test.com'
        })
    })

    test("Token not of type string should throw a InvalidCredentials Error", () => {
        try {
            const fakeToken = 0
            User.verifyToken(fakeToken)
            fail()
        } catch (error) {
            expect(error instanceof InvalidCredentialsError).toBeTruthy()
        }
    })

    test("Expired token should throw an InvalidCredentials Error", () => {
        try {
            const expiredToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ
            pZCI6InRlc3QtaWQiLCJmaXJzdF9uYW1lIjoidGVzdC1maXJzdF9uYW1lIiwiZ
            W1haWwiOiJ0ZXN0LWVtYWlsQHRlc3QuY29tIiwiaWF0IjoxNjg5Mjg4NjUyLCJl
            eHAiOjE2ODkyODg2NTV9.cAEy3S4OVUfbp4Crsl8FFnYiJOiiqICpL263CVE_TqM`

            User.verifyToken(expiredToken)
        } catch (error) {
            expect(error instanceof InvalidCredentialsError).toBeTruthy()
        }
    })

})

describe("User Utilities", () => {
    test("validateEmail should return true if email meets criteria", () => {
        const validEmail = 'luisbravo@test.com'
        const result = User.validateEmail(validEmail)
        expect(result).toBe(true)
    })

    test("validateEmail should return false if email does not meets criteria (No Uppercase)", () => {
        const invalidEmail = 'luisbravo123'
        try {
            User.validateEmail(invalidEmail)
            fail()
        } catch (error) {
            expect(error instanceof FieldValidationError).toBeTruthy()
        }
    })

    test("validateEmail should return false if email does not meets criteria (No lowercase)", () => {
        const invalidEmail = 'LUISBRAVO123'
        try {
            User.validateEmail(invalidEmail)
            fail()
        } catch (error) {
            expect(error instanceof FieldValidationError).toBeTruthy()
        }
    })

    test("validateEmail should return false if email does not meets criteria (No digit)", () => {
        const invalidEmail = 'Luisbravo'
        try {
            User.validateEmail(invalidEmail)
            fail()
        } catch (error) {
            expect(error instanceof FieldValidationError).toBeTruthy()
        }
    })

    test("validateEmail should return false if email does not meets criteria (Not 8 chars)", () => {
        const invalidEmail = 'Lu123'
        try {
            User.validateEmail(invalidEmail)
            fail()
        } catch (error) {
            expect(error instanceof FieldValidationError).toBeTruthy()
        }
    })

    test("validatePassword should return true if password meets criteria", () => {
        const validPassword = 'Password12345'
        const result = User.validatePassword(validPassword)
        expect(result).toBe(true)
    })

    test("validatePassword should throw FieldValidationError if password does not meets criteria", () => {
        const invalidPassword = 'password'
        try {
            User.validatePassword(invalidPassword)
            fail()
        } catch (error) {
            expect(error instanceof FieldValidationError).toBeTruthy()
        }
    })
})

describe("Create", () => {
    test("Create User With Valid Inputs should successfully create a user", async () => {
        User.fetch = jest.fn().mockRejectedValue(new NotFoundError)
        pool.query.mockResolvedValue({
            rows: [
                {
                    id: 'test-id',
                    password: 'Password123',
                    first_name: 'test',
                    email: 'creation@test.com',
                },
            ],
        })
        
        jest.spyOn(bcrypt, 'hashSync').mockReturnValue("Password123");
        
        const password = "Password123"
        const email = "creation@test.com"
        const first_name = "test2"
        const createdUser = await User.create({ password, email, first_name })
        expect(createdUser.email).toStrictEqual(email)
    })

    test("Create User With invalid Inputs(password) should throw FieldValidationError", async () => {
        User.fetch = jest.fn().mockRejectedValue(new NotFoundError)
        pool.query.mockResolvedValue({
            rows: [
                {
                    id: 'test-id',
                    password: 'Password123',
                    first_name: 'test',
                    email: 'creation@test.com',
                },
            ],
        })
        const password = "1"
        const email = "creation@test.com"
        const first_name = "test"
        try {
            await User.create({ password, email, first_name })
            fail()
        } catch (error) {
            expect(error instanceof FieldValidationError).toBeTruthy()
        }
    })

    test("Create User With invalid Inputs(email) should throw FieldValidationError", async () => {
        User.fetch = jest.fn().mockRejectedValue(new NotFoundError)
        pool.query.mockResolvedValue({
            rows: [
                {
                    id: 'test-id',
                    password: 'Password123',
                    first_name: 'test',
                    email: 'creation@test.com',
                },
            ],
        })
        const password = "Password123"
        const email = "1"
        const first_name = "test"
        try {
            await User.create({ password, email, first_name })
            fail()
        } catch (error) {
            expect(error instanceof FieldValidationError).toBeTruthy()
        }
    })

})

describe("Login", () => {

    test("Created User Can Log in with valid credentials", async () => {
        

        User.fetch = jest.fn().mockResolvedValue({
            id: 'test-id',
            password: 'Password123',
            first_name: 'test',
            email: 'creation@test.com',
        });

        jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
        
        const email = "creation@test.com";
        const password = "Password123";
        const loginForm = {
            email: email,
            password: password,
        };
        const { user, newToken } = await User.login({ loginForm, token: "" });
        expect(user.email).toStrictEqual(email);
    });


    test("Login fails with non existing email address and throws NotFoundError", async () => {
        User.fetch = jest.fn().mockRejectedValue(new NotFoundError)
        const email = "fake@test.com"
        const password = "Password123"
        const loginForm = {
            email: email,
            password: password
        }
        try {
            await User.login({ loginForm, token: "" })
            fail()
        } catch (error) {
            expect(error instanceof NotFoundError).toBeTruthy()
        }

    })
    test("Login fails with invalid password and throws invalid credentials error", async () => {
        
        User.fetch = jest.fn().mockResolvedValue({
            id: 'test-id',
            password: 'password123',
            first_name: 'test',
            email: 'creation@test.com'
        });
        jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);
        const email = "creation@test.com"
        const password = "invalid"
        const loginForm = {
            email: email,
            password: password
        }
        try {
            await User.login({ loginForm })
            fail()
        } catch (error) {
            expect(error instanceof InvalidCredentialsError).toBeTruthy()
        }
    })
})

describe("Register", () => {
    test("Register should create a new user if valid", async () => {
        
        User.create = jest.fn().mockResolvedValue({
            id: 'test-id',
            password: 'validPassword123',
            first_name: 'test-2',
            email: 'test2@test.com'
        });

        const registrationForm = {
            email: "test2@test.com",
            password: "validPassword123",
            first_name: "test-2"
        }
        const { user, token } = await User.register(registrationForm)
        expect(user.email == registrationForm.email && token).toBeTruthy()
    })

    test("User can be deleted", async () => {
        User.fetch = jest.fn().mockRejectedValue(new NotFoundError)
        const email = 'test2@test.com'
        await User.delete(email)
        try {
            await User.fetch("email", email)
        } catch (error) {
            expect(error instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe("Delete", () => {
    test("User can be deleted", async () => {
        User.fetch = jest.fn().mockRejectedValue(new NotFoundError)
        const email = 'creation@test.com'
        await User.delete(email)
        try {
            await User.fetch("email", email)
        } catch (error) {
            expect(error instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe("Testing For Internal Server Errors", () => {

    let pool;

    beforeAll(() => {
        pool = require('../config/database.js');
        jest.mock('../config/database.js')
        pool.query.mockImplementation(() => {
            throw new Error();
        })
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("Create throws internal server error", async () => {
        try {
            await User.create({ password: 'Password123', email: 'creation@test.com', first_name: 'test' })
        } catch (error) {
            expect(error instanceof InternalServerError).toBeTruthy()
        }
    })

    test("Delete throws internal server error", async () => {
        try {
            await User.delete('email@test.com')
        } catch (error) {
            expect(error instanceof InternalServerError).toBeTruthy()
        }
    })

    test("Fetch throws Not Found Error", async () => {
        try {
            await User.fetch("email", 'test-email@test.com')
        } catch (error) {
            expect(error instanceof NotFoundError).toBeTruthy()
        }
    })
})

