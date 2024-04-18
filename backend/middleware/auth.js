import jwt  from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');//penser à changer la clé RANDOM_TOKEN_SECRET pour la securitée
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        res.status(403).json({ error });
    }
};

export default jwtMiddleware