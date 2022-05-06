import mongoose, { Schema } from "mongoose";
import Restaurant from "../interfaces/restaurant.js";
const schema = new mongoose.Schema<Restaurant>(
    {
        _id: mongoose.Types.ObjectId
        ,
        name: {
            type: String,
            required: true,
            unique: true,
        },
        cuisine: {
            type: String,
            required: true,
        },
        location: {
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ['Point'], // 'location.type' must be 'Point'
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);
schema.path("name").validate(async function (this: Restaurant, value: string) {
    const nameCount = await RestaurantModel.countDocuments({ name: value });
    if (nameCount === 1) {
        const restaurantId = await RestaurantModel.findOne({ name: value }).select("_id");
        if (restaurantId) console.log(restaurantId._id.equals(this._id));
        if (restaurantId && restaurantId._id.equals(this._id)) {
            return true;
        } else {
            return false;
        }
    }
    if (nameCount === 0) return true;
    return false;
}, "name already exists");
schema.index({ location: "2dsphere" });
const RestaurantModel = mongoose.model<Restaurant>("Restaurant", schema);

export default RestaurantModel;