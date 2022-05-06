import mongoose, { Types } from "mongoose";

export default interface User {
    _id: Types.ObjectId;
    username: string,
    favoriteCuisines: [string],
    restaurants: [mongoose.Types.ObjectId]
}