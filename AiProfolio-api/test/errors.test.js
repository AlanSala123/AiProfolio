
const {
    InternalServerError,
    InvalidCredentialsError,
    NotFoundError,
    FieldValidationError,
    UnauthorizedError,
    ForbiddenError,
    BadRequestError
  } = require('../utilities/error')

describe("Internal Server Error", ()=>{
    test("default print", ()=>{
        const err = new InternalServerError()
        expect(err.print()).toBe('Internal Server Error - 500: Undefined Internal Server Error')
    })
    test("custom print", ()=>{
        const err = new InternalServerError("Defined Internal Server Error")
        expect(err.print()).toBe('Internal Server Error - 500: Defined Internal Server Error')
    })
})

describe("Unauthorized Error", ()=>{
    test("default print", ()=>{
        const err = new UnauthorizedError()
        expect(err.print()).toBe('Unauthorized Error - 401: Unauthorized access')
    })
    test("custom print", ()=>{
        const err = new UnauthorizedError("Defined Unauthorized Error")
        expect(err.print()).toBe('Unauthorized Error - 401: Defined Unauthorized Error')
    })
})

describe("Forbidden Error", ()=>{
    test("default print", ()=>{
        const err = new ForbiddenError()
        expect(err.print()).toBe('Forbidden Error - 403: Access forbidden')
    })
    test("custom print", ()=>{
        const err = new ForbiddenError("Defined Forbidden Error")
        expect(err.print()).toBe('Forbidden Error - 403: Defined Forbidden Error')
    })
})

describe("Bad Request Error", ()=>{
    test("default print", ()=>{
        const err = new BadRequestError()
        expect(err.print()).toBe('Bad Request Error - 400: Bad request')
    })
    test("custom print", ()=>{
        const err = new BadRequestError("Defined Bad Request Error")
        expect(err.print()).toBe('Bad Request Error - 400: Defined Bad Request Error')
    })
})