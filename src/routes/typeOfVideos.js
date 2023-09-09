const express = require('express');
const TypeOfVideo = require("../models/TypesOfVideo.js");
const dbConnection = require('../middlewares/dbConnetion.js');
const authUser = require('../middlewares/authUser.js');
const treatError = require('../functions/treatError.js');
const router = express.Router();

router
    .get("/read", dbConnection, async function (req, res) {
        try {
            //#swagger.tags = ['Type Of Video']
            const dbResponse = await TypeOfVideo.find()

            res.status(200).json({
                status: "Ok",
                response: dbResponse
            })
        }
        catch (error) {
            return treatError(res, error)
        }
    })

    .post("/create", authUser, dbConnection, async function (req, res) {
        try {
            //#swagger.tags = ["Type Of Video"]
            const { id } = req.userJwt
            const { typeName } = req.body

            const dbResponse = await TypeOfVideo.create({ typeName, user: id })

            res.status(200).json({
                status: "Ok",
                response: dbResponse
            })
        }
        catch (error) {
            return treatError(res, error)
        }
    })

    .put("/update/:id", authUser, dbConnection, async function (req, res) {
        try {
            //#swagger.tags = ["Type Of Video"]
            const { id } = req.params;
            await TypeOfVideo.findByIdAndUpdate(id, { $set: req.body });

            res.status(200).json({
                status: "OK",
                statusMessage: "Subject atualizada com sucesso"
            })
        }
        catch (error) {
            return treatError(res, error)
        }
    })

    .delete("/delete/:id", authUser, dbConnection, async function (req, res) {
        try {
            //#swagger.tags = ["Type Of Video"]
            const { id } = req.params;
            await TypeOfVideo.findByIdAndDelete(id);

            res.status(200).json({
                status: "OK",
                statusMessage: "Subject deletada com sucesso"
            })
        }
        catch (error) {
            return treatError(res, error)
        }
    })

module.exports = router