import express, { json } from "express";
import mysql from "mysql";
import dotenv, { config } from "dotenv";
import cors from 'cors';
import { etf } from "./index.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json());

const PORT = process.env.PORT || 4001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: `${DB_USER}`,
    password: `${DB_PASSWORD}`,
    database: "invest_tracker"
});

app.get("/", (req,res) => {
    res.status(200).json({ message: "I am an Express Server!" })
});

app.get("/keyword-search", etf, (req, res) => {
    res.status(res.locals.status).json(res.locals.result);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}\n-------------------------`);
});