import mongoose, { Schema, Types } from "mongoose";

export default interface Restaurant {
    _id: mongoose.Types.ObjectId;
    name: string,
    cuisine: string,
    location: {
        type: string,
        coordinateds: [number],
    }
    owner: Schema.Types.ObjectId


}
export interface RestaurantInput {
    name: string,
    cuisine: string,
    location: {
        type: string,
        coordinates: [number]
    }
}