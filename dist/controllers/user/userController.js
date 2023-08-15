"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSavedData = exports.savedPassword = exports.userLogin = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRespositories_1 = require("../../repositories/userRepositories/userRespositories");
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const existingUser = await (0, userRespositories_1.findOne)(email);
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcryptjs_1.default.hash(password, saltRounds);
        const userData = { userName, email, password: hashedPassword };
        const newUser = await (0, userRespositories_1.create)(userData);
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
            expiresIn: "7d",
        });
        res.status(201).json({ user: newUser.userName, token: `Bearer ${token}` });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to register user" });
    }
};
exports.registerUser = registerUser;
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await (0, userRespositories_1.findOne)(email);
        if (!existingUser) {
            return res.status(400).json({ error: "Email does not exist" });
        }
        const passwordMatch = await bcryptjs_1.default.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: existingUser._id }, process.env.SECRET_KEY, {
            expiresIn: "7d",
        });
        res.status(200).json({ user: existingUser.userName, token: `Bearer ${token}` });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to login User" });
    }
};
exports.userLogin = userLogin;
const savedPassword = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { appName, userName, password } = req.body;
        const user = await (0, userRespositories_1.UserFindById)(userId);
        console.log(1);
        if (!user) {
            res.status(400).json({ error: "No User Found" });
        }
        console.log(2);
        const savedPasswordData = {
            appName,
            userName,
            password,
        };
        await (0, userRespositories_1.savePassword)(userId, savedPasswordData);
        console.log(3);
        res.status(201).json({ message: 'Saved password successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.savedPassword = savedPassword;
const fetchSavedData = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log(userId);
        const user = await (0, userRespositories_1.PasswordFindById)(userId);
        if (!user) {
            res.status(400).json({ error: "No User Found" });
        }
        const savedPass = user.savedPassword.map((item) => ({
            userName: item.userName,
            appName: item.appName,
            password: item.password
        }));
        res.status(200).json(savedPass);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "Internal server error" });
    }
};
exports.fetchSavedData = fetchSavedData;
//# sourceMappingURL=userController.js.map