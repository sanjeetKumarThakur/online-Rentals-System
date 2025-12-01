import bodyParser from "body-parser";
import express from "express";
import fs from 'fs';

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import config from "./config/config.js";
 
dotenv.config();
// Connect to DB before using routes - ensure .env is loaded
(async () => {
    await connectDB();
})();
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({
        name: config.name,
        port: config.port,
        status: "OK",
        version: config.version,
    });
});
 

app.listen(config.port, ()=>{
    console.log(`Server Running at port ${config.port} in the version ${config.version} ......`);
});