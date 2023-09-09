const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: 'É obrigatório',
            lowercase: true,
        },
        epNumber: {
            type: Number,
            required: 'É obrigatório',
        },
        link: {
            type: String,
            required: 'É obrigatório',
            index: true
        },
        seriesId: {
            type: mongoose.Types.ObjectId,
            ref: 'Serie',
            required: 'É obrigatório',
        },
        type: {
            type: mongoose.Types.ObjectId,
            ref: "TypesOfVideo",
            required: 'É obrigatório',
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: "É obrigatório"
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
)

const episodesSchemas = mongoose.models.Episodes || mongoose.model('Episodes', schema);
module.exports = episodesSchemas