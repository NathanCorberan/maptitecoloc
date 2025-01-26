export class CustomError extends Error {
    public statusCode: string;
    public errorCode: string;
  
    constructor(message: string, statusCode: string, errorCode: string) {
      super(message);
      this.statusCode = statusCode;
      this.errorCode = errorCode;
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }
  