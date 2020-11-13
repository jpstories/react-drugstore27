import express from 'express';
import ProductModel from '../models/ProductModel';

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.send(products)
})

router.post('/', async (req, res) => {
    const product = new ProductModel({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock,
        reviews: req.body.reviews,
    });
    const newProduct = await product.save();
    if (newProduct) {
        return res
            .status(201)
            .send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({ message: ' Error in Creating Product.' });
});


export default router;