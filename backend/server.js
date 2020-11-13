import express from 'express';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import bodyParser from 'body-parser';

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

app.listen(5000, () => {
    console.log('Сервер запущен, http://localhost:5000')
});