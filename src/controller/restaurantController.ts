import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import validationErrorsExtration from "../util/validationErrorsExtraction.js";
import RestaurantModel from "../models/restaurant.js";
import UserModel from "../models/user.js";


import AppError from "../util/appError.js";
import catchAsync from "../api/middleware/catchAsync.js"
import { findHelper } from "../util/getRecordsHelper.js";
import Restaurant from "../interfaces/restaurant.js";
import logger from "../util/winston.js";
import { restaurantModel } from "../models/index.js";



export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const user = await UserModel.findOne({ username: req.body.restaurant.owner });
        if (!user) {
            throw new AppError("Can't find user", 400)
        }

        const restaurant = new RestaurantModel({ _id: new mongoose.Types.ObjectId(), name: req.body.restaurant.name, owner: user._id, cuisine: req.body.restaurant.cuisine, location: req.body.restaurant.location });
        await user.updateOne(
            { $addToSet: { restaurants: restaurant._id } }
        )
        // if (userUpdate.)
        await restaurant.validate().catch((err: mongoose.Error.ValidationError) => {
            validationErrorsExtration(err);
        });
        const result = await restaurant.save();
        res.status(201).json({ data: result })
    })
export const find = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const getListConfig = findHelper(req);
        let resourcesCount = 0;
        if (getListConfig.offset === 0) {
            resourcesCount = await RestaurantModel.count();
        }

        const selector = req.query ? { ...req.query } : {}

        const restaurants = await RestaurantModel
            .find(selector)
            .skip(getListConfig.offset * getListConfig.limit)
            .limit(getListConfig.limit)
            .sort({ createdAt: getListConfig.order });

        res.status(200).json({ data: restaurants, count: resourcesCount })
    })
export const findOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        validateId(req.params.id)
        const id = new mongoose.Types.ObjectId(req.params.id)
        const restaurant = await RestaurantModel.findById(id);
        res.status(200).json({ data: restaurant })
    })
export const remove = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        validateId(req.params.id)
        const id = new mongoose.Types.ObjectId(req.params.id)
        const result = await RestaurantModel.remove(id);
        res.status(200).json({ message: "successfully removed restaurant!", data: result })
    })
export const findWithin = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const long = req.body.restaurant.location.long;
        const latt = req.body.restaurant.location.latt;
        const maxDistance = req.body.restaurant.maxDistance || 1000;

        const result = await restaurantModel.find({
            location: {
                $near: {
                    $maxDistance: maxDistance,
                    $geometry: {
                        type: "Point",
                        coordinates: [long, latt]
                    }
                }
            }
        })
        res.status(200).json({ data: result })

    })
const validateId = (id: string) => {
    const idValidation = mongoose.Types.ObjectId.isValid(id);
    if (!idValidation) {
        throw new AppError("Invalid Id", 400)
    }
}