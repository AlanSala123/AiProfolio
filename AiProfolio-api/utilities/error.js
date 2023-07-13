
class CustomError{
    constructor(name=null, message=null, errorCode=null){
        this.name = name || 'Error'
        this.message = message || 'Undefined Error' 
        this.errorCode = errorCode || '400'
    }

    print(){
        return `${this.name} - ${this.errorCode}: ${this.message}`
    }
}

class InternalServerError extends CustomError {
    constructor(message = null) {
      super('Internal Server Error', message || 'Undefined Internal Server Error', '500');
    }
}

class InvalidCredentialsError extends CustomError {
    constructor(message = null) {
      super('Invalid Credentials Error', message || 'Undefined Invalid Credentials Error', '401');
    }
}

class NotFoundError extends CustomError {
    constructor(message = null) {
      super('Not Found Error', message || 'Resource not found', '404');
    }
}

class FieldValidationError extends CustomError {
    constructor(message = null) {
      super('FieldValidation Error', message || 'Invalid input', '400');
    }
}

class UnauthorizedError extends CustomError {
    constructor(message = null) {
      super('Unauthorized Error', message || 'Unauthorized access', '401');
    }
}

class ForbiddenError extends CustomError {
    constructor(message = null) {
      super('Forbidden Error', message || 'Access forbidden', '403');
    }
}

class BadRequestError extends CustomError {
    constructor(message = null) {
      super('Bad Request Error', message || 'Bad request', '400');
    }
}

module.exports = {
  InternalServerError,
  InvalidCredentialsError,
  NotFoundError,
  FieldValidationError,
  UnauthorizedError,
  ForbiddenError,
  BadRequestError
}