import { Request } from "express";
import validator from "validator";
import logger from "./winston.js";
import "dotenv/config";
import { GetListConfig } from "../interfaces/getListConfig.js";

const LIMIT: number = parseInt(process.env.LIMIT || "20");
const OFFSET = 0;

export const minLimit = (currLimit: number) => {
    if (currLimit > LIMIT) {
        return LIMIT;
    }
    return currLimit;
};

export const findHelper = (req: Request): GetListConfig => {
    let cardsLimit = LIMIT;
    let cardsOffset = OFFSET;
    let order = -1;
    if (req.query.limit) {
        logger.warn("here your sent params limit " + req.query.limit);
        if (validator.isNumeric(<string>req.query.limit)) {
            logger.info("is numeric");
            cardsLimit = minLimit(+req.query.limit);
        } else {
            logger.info("NOT numeric");
        }
    }
    logger.warn("your limist is " + cardsLimit);
    if (req.query.offset) {
        if (validator.isNumeric(<string>req.query.offset)) {
            logger.info("offset is numeric");
            cardsOffset = minLimit(+req.query.offset);
        } else {
            logger.info("offset isnot numeric");
        }
    }
    if (req.query.order) {
        logger.info("factoring with " + req.query.order);
        if (req.query.order === "1") order = 1;
        else order = -1;
    }
    return { limit: cardsLimit, offset: cardsOffset, order: order };
};
