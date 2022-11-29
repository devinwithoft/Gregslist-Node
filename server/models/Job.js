import { Schema } from "mongoose";


export const JobSchema = new Schema({
    jobTitle: { type: String, required: true, minLength: 3 },
    company: { type: String, required: true, minLength: 3 },
    hours: { type: Number, required: true },
    rate: { type: Number, required: true },
    description: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } })