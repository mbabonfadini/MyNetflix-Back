const jwt = require('jsonwebtoken');
const treatError = require('../functions/treatError.js');

async function authUser(req, res, next) {
    const token = req.headers['x-auth-token'];

    if (!token) {
        return treatError(res, new Error("Token de autenticação não fornecido"))
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userJwt = decoded;
        next();

    } catch (error) {
        return treatError(res, new Error("Token de autenticação inválido"));
    }
}

module.exports = authUser;