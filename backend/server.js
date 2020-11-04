import { json } from 'body-parser';
import express from 'express'
import data from './data'

const app = express();

app.get("/api/products", (req, res) => {
    // console.log(data.products);
    // console.log(res);
    res.send(data.products);
})

app.listen(5000, () => {
    console.log('server listening on port 5000')
}) 