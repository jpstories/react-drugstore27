import express from 'express';
import Product from '../models/ProductModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
    const searchKeyword = req.query.searchKeyword ? {
        name: {
            $regex: req.query.searchKeyword,
            $options: 'i',
        },
    } : {};

    const sortOrder = req.query.sortOrder ? req.query.sortOrder === 'lowest'
        ? { price: 1 }
        : { price: -1 }
        : { _id: -1 };

    const products = await Product.find({ ...searchKeyword }).sort(sortOrder);
    res.send(products)
})

router.get('/:id', async (req, res) => {
    const product = await Product.findById({ _id: req.params.id });
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Продукт не найден' })
    }
})


router.post('/', isAuth, isAdmin, async (req, res) => {
    const product = new Product({
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

router.put('/:id', isAuth, isAdmin, async (req, res) => {
    const productID = req.params.id;
    const product = await Product.findById(productID);
    if (product) {
        product.name = req.body.name,
            product.image = req.body.image,
            product.brand = req.body.brand,
            product.price = req.body.price,
            product.description = req.body.description,
            product.stock = req.body.stock
    };
    const updatedProduct = await product.save();
    if (updatedProduct) {
        return res
            .status(200)
            .send({ message: 'Информация о продукте обновлена', data: updatedProduct });
    }
    return res.status(500).send({ message: 'Ошибка при обновлении информации о продукте' });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
        await deletedProduct.remove();
        res.send({ message: 'Продукт удален' })
    } else {
        res.send({ message: 'Ошибка при удалении продукта' })
    }
})


export default router;