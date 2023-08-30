import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmt from "helmet";
import morgan from "morgan";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import connectRoute from "./routes/connection.js";
import postRoute from "./routes/posts.js";
import profileRoute from "./routes/profile.js";

//Setup Express
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(cors());
app.use(helmt());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/connection", connectRoute);
app.use("/api/post", postRoute);
app.use("/api/profile", profileRoute);


// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
// await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
app.listen(port, () => console.log(`App server listening on port ${port}!`));
