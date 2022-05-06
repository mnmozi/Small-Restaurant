import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import RestaurantModel from "../models/restaurant.js";
import UserModel from "../models/user.js";


import AppError from "../util/appError.js";
import { findHelper } from "../util/getRecordsHelper.js";
import validationErrorsExtration from "../util/validationErrorsExtraction.js";
import catchAsync from "../api/middleware/catchAsync.js"
import logger from "../util/winston.js";

export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = new UserModel({ _id: new mongoose.Types.ObjectId(), ...req.body.user });
        logger.info("%o", user)
        await user.validate().catch((err: mongoose.Error.ValidationError) => {
            validationErrorsExtration(err);
        });
        const result = await user.save();
        res.status(201).json({ data: result })
    })
export const remove = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

    })
export const findOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        validateId(req.params.id)
        const id = new mongoose.Types.ObjectId(req.params.id)
        const user = await UserModel.findById(id);
        res.status(200).json({ data: user })
    })
export const find = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const getListConfig = findHelper(req);
        let resourcesCount = 0;
        if (getListConfig.offset === 0) {
            resourcesCount = await UserModel.count();
        }
        const selector = req.query.favoriteCuisine ? { favoriteCuisines: req.query.favoriteCuisine } : {}
        let users;


        users = await UserModel
            .find(selector)
            .skip(getListConfig.offset * getListConfig.limit)
            .limit(getListConfig.limit)
            .sort({ createdAt: getListConfig.order });


        let owners;
        if (selector.favoriteCuisines) {
            logger.info(selector.favoriteCuisines)
            // select all users owns a restaurant with this cuisine
            owners = await RestaurantModel
                .find({ cuisine: selector.favoriteCuisines })
                .populate({ path: 'owner' })
        }


        res.status(200).json({ commonTaste: users, owners: owners })

    })
export const addCuisine = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        validateId(req.params.id)
        const id = new mongoose.Types.ObjectId(req.params.id)

        const user = await UserModel.findById(id);
        if (!user) {
            throw new AppError("Can't find user", 400);
        }
        const result = await user.updateOne(
            { $addToSet: { favoriteCuisines: req.body.cuisine } }
        )

        res.status(200).json({ data: result })
    })
const validateId = (id: string) => {
    const idValidation = mongoose.Types.ObjectId.isValid(id);
    if (!idValidation) {
        throw new AppError("Invalid Id", 400)
    }
}