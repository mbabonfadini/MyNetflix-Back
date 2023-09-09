const mongoose = require("mongoose");
const treatError = require("../functions/treatError.js")

async function dbConnection(req, res, next) {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        try { next(); } catch (error) { console.log({ error: error }) }
        return mongoose.connection;
    }
    catch (error) {
        treatError(res, 'Error: Erro ao conectar no banco de dados')
        return error
    }
}

module.exports = dbConnection