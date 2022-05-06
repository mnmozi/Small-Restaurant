import mongoose from "mongoose";
import AppError from "./appError.js";
export default (validateResult: mongoose.Error.ValidationError | null) => {
    const validationErrors: mongoose.Error.ValidatorError[] = [];

    if (validateResult) {
        for (var prop in validateResult.errors) {
            let x = validateResult.errors[prop];

            if (x instanceof mongoose.Error.ValidatorError) {
                validationErrors.push(x);
            }
        }

        if (validationErrors.length > 0) {
            throw new AppError("validation faild", 500, validationErrors);
        }
    }
};
