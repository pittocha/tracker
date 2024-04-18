
import db from "../server.js";

//query de création d'utilisateur
async function createUserQuery(email, password) {
    try {
        await db.query(
            `INSERT INTO users (email, password)
            VALUES (?, ?)
            `, [email, password]
        );
    } catch(error) {
        throw error;
    }
}

async function getUserByEmailQuery(email) {
    try {
        await db.query(
            'SELECT * FROM users WHERE `email` = ?',
            [email]
        );

        return row[0];
    } catch(error) {
        throw error;
    }
}

export { createUserQuery, getUserByEmailQuery };
