import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishedDate: {
        type: Date
    },
    pageCount: {
        type: Number
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
})


export default mongoose.model('Book', bookSchema);