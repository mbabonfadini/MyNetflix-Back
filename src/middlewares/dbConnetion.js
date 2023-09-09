const mongoose = require("mongoose");

async function dbConnection(req, res, next) {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conectado ao db');
        try { next(); } catch (error) { console.log({ error: error }) }
    }
    catch (error) {
        console.log(error);
        return error
    }
}

module.exports = dbConnection