const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: 'É obrigatório',
            lowercase: true,
        },
        types: {
            type: Array,
            required: 'É obrigatório',
            friends: [mongoose.Types.ObjectId],
        },
        imgUrl: {
            type: String,
            required: 'É obrigatório',
        },
        shortDescription: {
            type: String,
            required: 'É obrigatório',
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: 'É obrigatório',
            select: false,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const seriesSchema = mongoose.models.Serie || mongoose.model("Serie", schema)
module.exports = seriesSchema