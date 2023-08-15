"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyUserToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        const error = new Error('No token provided');
        error.statusCode = 401;
        return next(error);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token.split(' ')[1], process.env.SECRET_KEY);
        if (decoded) {
            req.user = decoded;
            next();
        }
    }
    catch (error) {
        next(error);
    }
};
exports.default = verifyUserToken;
//# sourceMappingURL=authorisation.js.map