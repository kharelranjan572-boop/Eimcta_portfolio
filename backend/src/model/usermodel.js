const mongoose = require('mongoose')

const AdvertisementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        highlightsTopics: {
            type: String,
            default: "",
            trim: true,
        },

        highlightsList: {
            type: [String],
            default: [],
        },

        images: {
            type: [String], // image URLs or file paths
            default: [],
        },

        offerTitle: {
            type: String,
            default: "",
            trim: true,
        },

        offerDescription: {
            type: String,
            default: "",
            trim: true,
        },

        offerDate: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true, // createdAt & updatedAt
    }
);

module.exports =
    mongoose.models.Advertisement ||
    mongoose.model("Advertisement", AdvertisementSchema);