import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwtMiddleware from '../middleware/auth.js';
import { createUserQuery, getUserByEmailQuery } from '../queries/userQueries.js';

//fonction de creation d'utilisateur
async function createUser(req, res) {
    const { email, password } = req.body;
    try {
        //verifier si l'email est déja utilisé
        const existingUser = await getUserByEmailQuery(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Cet e-mail est déjà utilisé' })
        }
        //hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUserQuery(email, hashedPassword);
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur : ', error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
    }
}

//fonction de login
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmailQuery(email);

        if (!user) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        //verification du mot de passe avec bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // gnénérer un token
        const token = jwt.sign(
            {userId: user.user_id},
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
        );
        
        //envoi du token dans la reponse
        res.status(200).json({ message: 'Authentification réussie', token: token });
    } catch (error) {
        console.error('Erreur lors de l\'authentification : ', error);
        res.status(500).json({ message: 'Erreur lors de l\'authentification' });
    }
}

export { createUser, login, jwtMiddleware };