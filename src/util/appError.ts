import mongoose from "mongoose";
interface myValidationError {
  path: string;
  value: string;
  message: string;
}
class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  validationErrors?: myValidationError[];

  constructor(
    message: string,
    statusCode: number,
    validationErrors?: mongoose.Error.ValidatorError[]
  ) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    if (validationErrors) {
      this.validationErrors = [];
      for (let validationError in validationErrors) {
        this.validationErrors.push({
          path: validationErrors[validationError].path,
          value: validationErrors[validationError].value,
          message: validationErrors[validationError].message,
        });
      }
      console.log(this.validationErrors)
    }
  }
}

export default AppError;
