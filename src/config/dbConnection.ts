import mongoose from "mongoose";
import "dotenv/config";
export default async () => {
    if (process.env.DB_URL) {
        try {
            await mongoose.connect(process.env.DB_URL);
        } catch (err) {
            console.log(err);
        }
    } else {
        throw new Error("Couldn't connect to the database!");
    }
};