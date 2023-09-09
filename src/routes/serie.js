const express = require('express');
const SeriesSchema = require('../models/Series.js');
const dbConnection = require('../middlewares/dbConnetion.js');
const authUser = require("../middlewares/authUser.js");
const treatError = require('../functions/treatError.js');

const router = express.Router();

router
    .get("/read", dbConnection, async function (req, res) {
        try {
            // #swagger.tags = ['Serie']
            const series = await SeriesSchema.find()
            res.status(200).json({
                status: "OK",
                response: series
            })

        } catch (error) {
            return treatError(res, error)
        }

    })
    .get("/read/:id", dbConnection, async function (req, res) {
        try {
            // #swagger.tags = ['Serie']
            const { id } = req.params

            const series = await SeriesSchema.find({ id: id })
            res.status(200).json({
                status: "OK",
                response: series
            })

        } catch (error) {
            return treatError(res, error)
        }

    })
    .post("/create", authUser, dbConnection, async function (req, res) {
        try {
            // #swagger.tags = ['Serie']
            const user = req.userJwt.id;
            const { name, types, imgUrl, shortDescription } = req.body

            await SeriesSchema.create({ name, types, imgUrl, shortDescription, user });

            res.status(200).json({
                status: "OK",
                statusMensagem: "Serie inserida com sucesso",
            })

        } catch (error) {
            return treatError(res, error)
        }
    })
    .put("/update/:id", authUser, dbConnection, async function (req, res) {
        try {
            // #swagger.tags = ['Serie']
            // #swagger.description = 'Chose one or several below. The API will update any of them or all off them'
            const { id } = req.params

            const { name, types, imgUrl, shortDescription } = req.body
            req.body.user = req.user.Jwt;

            const series = await SeriesSchema.findByIdAndUpdate(id, { $set: req.body })
            res.status(200).json({
                status: "OK",
                statusMessage: "Serie atualizada com sucesso",
                response: series
            })

        } catch (error) {
            return treatError(res, error)
        }

    })
    .delete("/delete/:id", authUser, dbConnection, async function (req, res) {
        try {
            // #swagger.tags = ['Serie']
            const { id } = req.params
            await SeriesSchema.findByIdAndDelete(id)
            res.status(200).json({
                status: "OK",
                statusMessage: "Serie deletada com sucesso"
            })
        }
        catch (error) {
            return treatError(res, error)
        }
    })

module.exports = router;