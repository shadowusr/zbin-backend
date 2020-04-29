import {Document} from "mongoose";

export interface PasteInterface extends Document {
    id: number;
    createdAt: Date;
    expiresAt: Date;
    language: string;
    views: number;
    text: string;
    url: string;
    isPublic: boolean;
    title: string;
}