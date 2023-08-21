"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database/database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes/userRoutes"));
const app = (0, express_1.default)();
console.log("Reached to server");
app.use((0, cors_1.default)({
    credentials: true,
    origin: ['http://localhost:5173', 'https://passcrafter-x.netlify.app', "https://passcrafter-x.netlify.app"]
}));
// app.options('*', cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
(0, database_1.default)();
app.use("/api/v1", userRoutes_1.default);
// app.use((req, res) => {
//     res.status(404).json({ success: false, status: 404, message: "Not found" });
//   });
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`The server start at running on port ${port}`);
});
//# sourceMappingURL=app.js.map