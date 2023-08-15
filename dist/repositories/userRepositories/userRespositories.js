"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePassword = exports.PasswordFindById = exports.UserFindById = exports.create = exports.findOne = void 0;
const userSchema_1 = __importDefault(require("../../models/userSchema/userSchema"));
const passwordSchema_1 = __importDefault(require("../../models/passwordSchema/passwordSchema"));
const findOne = async (email) => {
    try {
        const user = await userSchema_1.default.findOne({ email });
        return user;
    }
    catch (error) {
        throw new Error("Failed to find user by email");
    }
};
exports.findOne = findOne;
const create = async (userData) => {
    try {
        const newUser = new userSchema_1.default(userData);
        const savedUser = await newUser.save();
        return savedUser;
    }
    catch (error) {
        throw new Error("Failed to create user");
    }
};
exports.create = create;
const UserFindById = async (userId) => {
    try {
        const user = await userSchema_1.default.findById(userId);
        return user;
    }
    catch (error) {
        throw new Error('Failed to find user by ID');
    }
};
exports.UserFindById = UserFindById;
const PasswordFindById = async (userId) => {
    try {
        console.log(userId);
        const user = await passwordSchema_1.default.findOne({ userId: userId });
        console.log(user, "<<<<<<<");
        return user;
    }
    catch (error) {
        throw new Error('Failed to find user by ID');
    }
};
exports.PasswordFindById = PasswordFindById;
const savePassword = async (userId, savedPasswordData) => {
    try {
        console.log(4);
        let password = await passwordSchema_1.default.findOne({ userId: userId });
        if (!password) {
            password = await passwordSchema_1.default.create({
                userId,
                savedPassword: [savedPasswordData],
            });
        }
        else {
            password.savedPassword.push(savedPasswordData);
            await password.save();
        }
    }
    catch (error) {
        console.log(error);
        throw new Error('Failed to save password');
    }
};
exports.savePassword = savePassword;
//# sourceMappingURL=userRespositories.js.map