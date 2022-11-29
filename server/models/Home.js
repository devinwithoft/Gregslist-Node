import mongoose from "mongoose";
const Schema = mongoose.Schema


export const HomeSchema = new Schema({
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    levels: { type: Number, required: true, default: 1 },
    imgUrl: { type: String, required: true, maxLength: 255 },
    price: { type: String, required: true },
    description: { type: String },
}, { timestamps: true, toJSON: { virtuals: true } })