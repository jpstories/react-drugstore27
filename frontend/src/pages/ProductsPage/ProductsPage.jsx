import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import { homeAction, productSaveAction, productDeleteAction } from '../../redux/actions/homeAction';

function ProductsPage() {
    const dispatch = useDispatch();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const { products, loading } = useSelector(state => state.productList);
    const { loading: loadingSave, success: successSave, error: errorSave } = useSelector(state => state.productSave);
    const { success: successDelete } = useSelector(state => state.productDelete);

    const [visible, setVisible] = React.useState(false);
    const [visibleEdit, setVisibleEdit] = React.useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        setVisible(false);
        dispatch(productSaveAction({ name, image, brand, price, description, stock }))
    }

    const submitHandlerEdit = (e) => {
        e.preventDefault();
        setVisibleEdit(false);
        console.log({ id, name, image, brand, price, description, stock });
        dispatch(productSaveAction({ _id: id, name, image, brand, price, description, stock }))
    }

    useEffect(() => {
        if (successSave) {
            setVisible(false);
            setVisibleEdit(false);
        }
        dispatch(homeAction())
    }, [successSave, successDelete])

    const showModal = () => {
        setVisible(true)
    };

    const handleCancel = () => {
        setVisible(false)
        setVisibleEdit(false)
    };

    const editHandler = (product) => {
        setVisibleEdit(true);
        setId(product._id);
        setImage(product.image);
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setDescription(product.description);
        setStock(product.stock);
    }

    const deleteHandler = (product) => {
        if (window.confirm("Вы действительно хотите удалить продукт?")) {
            dispatch(productDeleteAction(product._id));
        }
    }

    const descSlice = (str) => {
        if (str.length > 185) {
            return <div>
                <span>{str.slice(0, 185)}</span>
                <a>{'..... '}</a>
            </div>
        } else {
            return str
        }
    }

    return (
        <div className="products-page">
            <div className="table-content">
                <table className="table">
                    <thead className="table-header">
                        <tr>
                            <th></th>
                            <th>Название</th>
                            <th>Цена, ₽</th>
                            <th>Производитель</th>
                            <th>Описание</th>
                            <th>Количество</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && products.map((product) => (
                            <tr className="table-body-row" key={product._id}>
                                <td><img width="60" src={product.image} alt="product" /></td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.brand}</td>
                                <td className="table-desc">{descSlice(product.description)}</td>
                                <td>{product.stock}</td>
                                <td className="table-actions">
                                    <Button type="primary" className="button" onClick={() => editHandler(product)}>
                                        Редактировать
                                    </Button>{' '}
                                    <Button
                                        type="danger"
                                        className="button"
                                        onClick={() => deleteHandler(product)}
                                    >
                                        Удалить
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="table-content-addBtn">
                <Button className="table-content-addBtn" type="primary" onClick={showModal}>Добавить</Button>
            </div>

            <Modal
                title="Добавить продукт"
                visible={visible}
                onCancel={handleCancel}
                footer=""
                style={{ top: 40 }}
            >
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
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
                                type="number"
                                id="price"
                                name="price"

                                onChange={(e) => setPrice(parseInt(e.target.value))}
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
                                rows="4"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </li>
                        <li>
                            <label htmlFor="stock">
                                Количество
                    </label>
                            <input
                                value={stock}
                                type="number"
                                id="stock"
                                name="stock"

                                onChange={(e) => setStock(parseInt(e.target.value))}
                            />
                        </li>
                        <li>
                            <button type="submit" className="button primary">Добавить</button>
                        </li>
                    </ul>
                </form>
            </Modal>

            <Modal
                maskClosable={false}
                title="Редактирование"
                visible={visibleEdit}
                onCancel={handleCancel}
                footer=""
                style={{ top: 40 }}
            >
                <form onSubmit={submitHandlerEdit}>
                    <ul className="form-container">
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
                                type="number"
                                id="price"
                                name="price"

                                onChange={(e) => setPrice(parseInt(e.target.value))}
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
                                rows="4"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </li>
                        <li>
                            <label htmlFor="stock">
                                Количество
                    </label>
                            <input
                                value={stock}
                                type="number"
                                id="stock"
                                name="stock"

                                onChange={(e) => setStock(parseInt(e.target.value))}
                            />
                        </li>
                        <li>
                            <button type="submit" className="button primary">Обновить</button>
                        </li>
                    </ul>
                </form>
            </Modal>

        </div>
    )
}
export default ProductsPage;