const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        typeName: {
            type: String,
            required: true,
            lowercase: true,
            index: true,
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
        versionKey: false,

    }
)

const typeOfVideoSchema = mongoose.models.TypeOfVideo || mongoose.model("TypeOfVideo", schema);

module.exports = typeOfVideoSchema;