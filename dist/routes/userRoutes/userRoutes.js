"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controllers/user/userController");
const authorisation_1 = __importDefault(require("../../middlewares/authorisation/authorisation"));
const router = express_1.default.Router();
console.log("Request in routes");
router.post('/sign-up', userController_1.registerUser);
router.post('/login', userController_1.userLogin);
router.post('/saved-password', authorisation_1.default, userController_1.savedPassword);
router.get('/fetchSavedData', authorisation_1.default, userController_1.fetchSavedData);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map