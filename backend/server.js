import dotenv, { config } from "dotenv";
import app from "./app.js"
import mysql from "mysql2";
import { etf } from "./index.js";

dotenv.config();

const PORT = process.env.PORT || 4001;

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const db = mysql.createPool({
    connectionLimit: 10,
    host: `${DB_HOST}`,
    user: `${DB_USER}`,
    password: `${DB_PASSWORD}`,
    database: `${DB_NAME}`
}).promise();

export default db;

app.get("/", (req,res) => {
    res.status(200).json({ message: "I am an Express Server!" })
});

app.get("/keyword-search", etf, (req, res) => {
    res.status(res.locals.status).json(res.locals.result);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}\n-------------------------`);
});