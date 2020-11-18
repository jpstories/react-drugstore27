import express from 'express'
import Order from '../models/OrderModel';
import { isAuth } from '../util';

const orderRouter = express.Router();

orderRouter.post('/', isAuth, async (req, res) => {
    if (req.body.orderItems === 0) {
        res.status(404).send({ message: 'Корзина пуста' })
    } else {
        const newOrder = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.body._id
        })
        const newOrderCreated = await newOrder.save();
        res.status(201).send({ message: "Заказ создан", order: newOrderCreated });
    }
})

export default orderRouter;