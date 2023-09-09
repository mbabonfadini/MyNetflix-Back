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
        versionKey: false
    }
)

const typeOfSubjectSchema = mongoose.models.TypeOfSubject || mongoose.model("TypeOfSubject", schema);

module.exports = typeOfSubjectSchema;