const express = require('express');
const EpisodesSchema = require('../models/Episodes.js')
const dbConnection = require("../middlewares/dbConnetion.js");
const authUser = require("../middlewares/authUser.js")
const treatError = require("../functions/treatError.js");
const router = express.Router();

router
    .get("/read", dbConnection, async function (req, res) {
        try {

            //#swagger.tags = ['Episodes']
            const dbResponse = await EpisodesSchema.find();
            res.status(200).json({
                status: "OK",
                response: dbResponse
            })
        }
        catch (error) {
            return treatError(res, error)

        }
    })

    .get("/read/:id", dbConnection, async function (req, res) {
        try {
            //#swagger.tags = ['Episodes']
            const { id } = req.params
            const dbResponse = await EpisodesSchema.findById(id);

            res.status(200).json({
                status: "OK",
                response: dbResponse
            })
        }
        catch (error) {
            return treatError(res, error)

        }
    })

    .post("/create", authUser, dbConnection, async function (req, res) {
        try {
            //#swagger.tags = ['Episodes']
            const { id } = req.userJwt
            const { name, epNumber, link, seriesId, type } = req.body
            const dbResponse = await EpisodesSchema.create({ name, epNumber, link, seriesId, type, user: id });
            res.status(200).json({
                status: "OK",
                response: dbResponse
            })
        }

        catch (error) {
            return treatError(res, error)

        }
    })

    .post("/massiveCreate", authUser, dbConnection, async function (req, res) {
        try {
            //#swagger.tags = ['Episodes']
            const { user } = req.userJwt
            const { list, type } = req.body;
            const { serie } = req.params
            const newList = list.map(iten => {
                iten.seriesId = serie
                iten.type = type
                iten.user = user
                return iten
            })

            const dbResponse = await EpisodesSchema.insertMany(newList);
            res.status(200).json({
                status: "OK",
                response: dbResponse
            })
        }
        catch (error) {
            return treatError(res, error)

        }
    })

    .put("/update/:id", authUser, dbConnection, async function (req, res) {
        try {
            //#swagger.tags = ['Episodes']
            const { id } = req.params
            req.body.user = req.userJwt.id
            await EpisodesSchema.findByIdAndUpdate(id, { $set: req.body });
            res.status(200).json({
                status: "OK",
                statusMessage: "Updated sucessufully",
                response: dbResponse
            })
        }
        catch (error) {
            return treatError(res, error)

        }
    })

    .delete("/delete/:id", authUser, dbConnection, async function (req, res) {
        try {
            //#swagger.tags = ['Episodes']
            const { id } = req.params
            await EpisodesSchema.findByIdAndDelete(id);

            res.status(200).json(
                {
                    status: "ok",
                    statusMessage: "deleted sucessufully"
                }
            )
        }
        catch (error) {
            return treatError(res, error)
        }
    })

module.exports = router;