import * as mongoose from 'mongoose';

export const PasteSchema = new mongoose.Schema({
    createdAt: Date,
    expiresAt: {type: Date, expires: 0},
    language: String,
    views: Number,
    text: String,
    url: {type: String, index: { unique: true }},
    isPublic: Boolean,
    title: String,
});