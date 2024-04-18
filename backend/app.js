import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json());



app.use('/api/auth', userRoutes);

export default app;