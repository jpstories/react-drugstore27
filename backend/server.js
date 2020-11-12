import express from 'express';
import products from './data';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute'

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).catch(error => console.log(error.reason));

const app = express();

app.use('/api/users', userRoute);

app.get("/api/products", (req, res) => {
    res.send(products);
})

app.get("/api/products/:id", (req, res) => {
    const productID = req.params.id;
    const product = products.find(item => item._id === productID);
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ msg: 'Product not found' });
    }
})

app.listen(5000, () => {
    console.log('server listening on port 5000')
}) 