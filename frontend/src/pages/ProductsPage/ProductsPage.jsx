import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CTable from '../../components/CTable';
import { homeAction, productSaveAction } from '../../redux/actions/homeAction';

function ProductsPage() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const { products } = useSelector(state => state.productList);
    console.log(products)
    const productSaved = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSaved;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(productSaveAction({ name, image, brand, price, description, stock }))
    }

    useEffect(() => {
        dispatch(homeAction())
        return {

        }
    }, [])


    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Добавить продукт</h2>
                </li>
                {loadingSave && <li>Загрузка...</li>}
                {errorSave && <li>{errorSave}</li>}
                <li>
                    <label htmlFor="name">
                        Название
                    </label>
                    <input
                        value={name}
                        type="text"
                        name="name"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="image">
                        Изображение
                    </label>
                    <input
                        value={image}
                        type="text"
                        id="image"
                        name="image"

                        onChange={(e) => setImage(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="brand">
                        Производитель
                    </label>
                    <input
                        value={brand}
                        type="text"
                        id="brand"
                        name="brand"

                        onChange={(e) => setBrand(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="price">
                        Цена
                    </label>
                    <input
                        value={price}
                        type="text"
                        id="price"
                        name="price"

                        onChange={(e) => setPrice(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="description">
                        Описание
                    </label>
                    <textarea
                        value={description}
                        type="text"
                        id="description"
                        name="description"

                        onChange={(e) => setDescription(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="stock">
                        Количество
                    </label>
                    <input
                        value={stock}
                        type="text"
                        id="stock"
                        name="stock"

                        onChange={(e) => setStock(e.target.value)}
                    />
                </li>
                <li>
                    <button type="submit" className="button primary">Добавить</button>
                </li>
            </ul>
        </form>
        <div className="table-content">
            <CTable products={products} />
        </div>
    </div>
}
export default ProductsPage;