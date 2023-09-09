const mongoose = require("mongoose");

async function dbConnection(req, res, next) {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        try { next(); } catch (error) { console.log({ error: error }) }
    }
    catch (error) {
        return error
    }
}

module.exports = dbConnection