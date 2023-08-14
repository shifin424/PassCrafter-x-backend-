"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRespositories_1 = require("src/repositories/userRepositories/userRespositories");
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        // Check if the email already exists
        const existingUser = await (0, userRespositories_1.findOne)(email);
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcryptjs_1.default.hash(password, saltRounds);
        // Create and save the user
        const userData = { userName, email, password: hashedPassword };
        const newUser = await (0, userRespositories_1.create)(userData);
        // Create JWT token
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, process.env.SECRETKEY, { expiresIn: "7d" });
        res.status(201).json({ user: newUser, token });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to register user" });
    }
};
exports.registerUser = registerUser;
//# sourceMappingURL=userController.js.map