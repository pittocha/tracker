import { getJson } from "serpapi";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.SERPAPI_KEY;

export async function etf(req, res, next){
    const params = {q: req.query.q,};
    
    try {
        if (!API_KEY) {
            throw new Error("API key not provided");
        }

        const data = await getJson({
            ...params,
            engine: "google_finance",
            gl: "fr",
            hl: "fr",
            api_key: API_KEY,
        });

        res.locals.result = data;
        res.locals.status = 200;
        next(); 
    } catch (error) {
        console.error(error);
        res.locals.status = 500;
        res.locals.result = { error: error.message };
        next();
    }
}