const express = require('express');
const UserSchema = require("../models/User.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbConnection = require('../middlewares/dbConnetion.js');
const treatError = require("../functions/treatError.js");
const router = express.Router();

router
    .post("/create", dbConnection, async function (req, res) {
        try {
            // #swagger.tags = ['User']
            const { name, lastname, mail, password, dateOfBirth, imgUrl, permission } = req.body;

            const attempts = 10;
            const passwordHash = await bcrypt.hash(password, attempts);

            const dbResponse = await UserSchema.create({ name, lastname, mail, password: passwordHash, dateOfBirth, imgUrl, permission })

            res.status(200).json({
                status: "OK",
                statusMensagem: "Usuário criado com sucesso.",
                resposta: dbResponse
            })
        }
        catch (error) {
            return treatError(res, error)
        }
    })

    .post("/login", dbConnection, async function (req, res) {
        try {
            // #swagger.tags = ['User']
            const { mail, password } = req.body;
            let dbResponse = await UserSchema.findOne({ mail }).select("+password");

            if (dbResponse) {
                let correctPassword = await bcrypt.compare(password, dbResponse.password);
                if (correctPassword) {

                    let token = jwt.sign({ id: dbResponse._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

                    res.header('x-auth-token', token)
                    res.status(200).json({
                        status: "OK",
                        statusMensagem: "Usuário autenticado com sucesso.",
                        response: { "x-auth-token": token }
                    });
                }
                else {
                    throw new Error("Email ou senha incorreta");
                }
            }
            else {
                throw new Error("Email ou senha incorreta");
            }
        }
        catch (error) {
            return treatError(res, error)

        }
    })

    .put("/update/:id", dbConnection, async function (req, res) {
        try {
            //#swagger.tags = ['User']
            // #swagger.description = 'Chose one or several below. The API will update any or all off them'

            const { id } = req.params
            const { name, lastname, mail, password, dateOfBirth, imgUrl, permission } = req.body;
            await UserSchema.findByIdAndUpdate(id, { $set: req.body })

            res.status(200).json({
                status: "OK",
                statusMensagem: "Usuário atualizado com sucesso.",
            })

        }
        catch (error) {
            return treatError(res, error)
        }
    })

module.exports = router