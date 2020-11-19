import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from './config';
import bodyParser from 'body-parser';
import { userRoute, productRoute, orderRoute } from './routes'

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.listen(5000, () => {
    console.log('Сервер запущен, http://localhost:5000')
});