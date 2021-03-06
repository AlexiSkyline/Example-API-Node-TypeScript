import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    imagen: String,
    createdAd: { type: Date, default: Date.now },
    updatedAt: Date
});

export default model( 'Post', PostSchema );