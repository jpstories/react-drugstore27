import express from 'express';
import User from '../models/UserModel';
import { getToken } from '../util';

const router = express.Router();

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if (signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser),
        });
    } else {
        res.status(401).send({ message: 'Некорректный email или пароль' });
    }
});

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const newUser = await user.save();
    if (newUser) {
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
        });
    } else {
        res.status(401).send({ message: 'Некорректный email или пароль' });
    }
});

router.get('/createadmin', async (req, res) => {
    try {
        const admin = new User({
            name: 'Сергей',
            email: 'gmdalmask@gmail.com',
            password: '1234',
            isAdmin: true
        });
        await admin.save();
        res.send(admin);
    } catch (error) {

    }
})

export default router;