"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.findOne = void 0;
const userSchema_1 = __importDefault(require("src/models/userSchema/userSchema"));
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
//# sourceMappingURL=userRespositories.js.map