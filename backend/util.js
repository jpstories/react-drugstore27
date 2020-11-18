import jwt from 'jsonwebtoken';
import config from './config';
const getToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        config.JWT_SECRET,
        {
            expiresIn: '48h',
        }
    );
};

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (authorization) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, config.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ message: 'Invalid Token' });
            }
            req.user = decode;
            next();
            return;
        });
    } else {
        return res.status(401).send({ message: 'Token is not supplied.' });
    }
};

const isAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ message: 'Admin Token is not valid.' });
};

export { getToken, isAuth, isAdmin };
