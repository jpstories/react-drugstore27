import express from 'express'
import Order from '../models/OrderModel';
import { isAuth } from '../util';

const orderRouter = express.Router();

orderRouter.post('/', isAuth, async (req, res) => {
    if (req.body.orderItems === 0) {
        res.status(404).send({ message: 'Корзина пуста' })
    } else {
        const newOrder = new Order({
            user: req.user._id,
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
        })
        const newOrderCreated = await newOrder.save();
        res.status(201).send({ message: "Заказ создан", order: newOrderCreated });
    }
})

orderRouter.get('/:id', isAuth, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order)
    } else {
        res.status(404).send({ message: 'Продукт не найден' })
    }
})

export default orderRouter;