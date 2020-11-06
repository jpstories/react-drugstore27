import express from 'express'
import data from './data'

const app = express();

app.get("/api/products", (req, res) => {
    res.send(data.products);
})

app.get("/product/:id", (req, res) => {
    const productID = req.params.id;
    const product = data.products.find(item => item._id === productID);
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ msg: 'Product not found' });
    }
})

app.listen(5000, () => {
    console.log('server listening on port 5000')
}) 