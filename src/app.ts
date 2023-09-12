import express from "express"
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cors from 'cors'
import connectDatabase from './config/database/database'
import router from './routes/userRoutes/userRoutes'

const app = express();
console.log("Reached to server")
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173','https://passcrafter-x.netlify.app' , "https://passcrafter-x.netlify.app" ,"https://passxgen.netlify.app"]
  })
);
// app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
 
connectDatabase();

app.use("/api/v1", router);

// app.use((req, res) => {
//     res.status(404).json({ success: false, status: 404, message: "Not found" });
//   });

  const port = process.env.PORT 
app.listen(port, () => {
  console.log(`The server start at running on port ${port}`);
});