import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    description: { type: String, required: true },
    stock: { type: Number, default: 0, required: true },
    reviews: { type: Number, default: 0 }
});

const productModel = mongoose.model('ProductModel', productSchema);

export default productModel;