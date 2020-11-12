import express from 'express';
import User from '../models/UserModel';

const router = express.Router();

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