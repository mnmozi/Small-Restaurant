import mongoose, { Schema } from "mongoose";

import User from "../interfaces/user.js";

const schema = new mongoose.Schema<User>(
    {
        _id: mongoose.Types.ObjectId,

        username: {
            type: String,
            required: true,
            unique: true,
        },
        favoriteCuisines: {
            type: [String],

        },
        restaurants: [{ type: mongoose.Types.ObjectId, ref: 'Restaurant' }]
    },
    { timestamps: true }
);

schema.path("username").validate(async function (this: User, value: string) {
    const usernameCount = await UserModel.countDocuments({ username: value });
    if (usernameCount === 1) {
        const userId = await UserModel.findOne({ username: value }).select("_id");
        if (userId) console.log(userId._id.equals(this._id));
        if (userId && userId._id.equals(this._id)) {
            return true;
        } else {
            return false;
        }
    }
    if (usernameCount === 0) return true;
    return false;
}, "name already exists");
const UserModel = mongoose.model<User>("User", schema);

export default UserModel;
