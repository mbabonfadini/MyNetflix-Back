const mongoose = require("mongoose");
const validator = require('validator');


const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: 'É obrigatório',
            lowercase: true,
        },
        lastname: {
            type: String,
            required: 'É obrigatório',
            lowercase: true,
        },
        mail: {
            type: String,
            unique: true,
            required: 'É obrigatório',
            lowercase: true,
            index: true,
            validate: {
                validator: (valorDigitado) => { return validator.isEmail(valorDigitado) },
                message: 'inválido!'
            }
        },
        password: {
            type: String,
            required: 'É obrigatório',
            select: false,
        },
        dateOfBirth: {
            type: Date,
            required: 'É obrigatório',
            select: false
        },
        imgUrl: {
            type: String,
            default: 'https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png'
        },
        permissions: {
            type: Number,
            default: 2,
            required: 'É obgrigatório'
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
)

const UserSchema = mongoose.models.User || mongoose.model('User', schema);
module.exports = UserSchema;