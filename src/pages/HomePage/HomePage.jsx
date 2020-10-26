import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const products = [
    {
        _id: '1',
        image: '',
        name: 'Цитовир',
        brand: 'Цитомед',
        price: '500'
    }
]

function HomeScreen(props) {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const submitHandler = (e) => {
        console.log('Препарат найден')
        e.preventDefault();
    };

    const sortHandler = (e) => {
        console.log('Все препараты отсортированы')
    };

    // const setSearchKeyword = (e) => {
    //     console.log('Препарат найден')
    // };

    return (
        <>
            <h2>Антивирусное</h2>
            <ul className="filter">
                <li>
                    <form onSubmit={submitHandler}>
                        <input
                            name="searchKeyword"
                            // onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <button type="submit">Поиск</button>
                    </form>
                </li>
                <li>
                    Сортировать по{' '}
                    <select name="sortOrder" onChange={sortHandler}>
                        <option value="">Новинкам</option>
                        <option value="lowest">Дешевые</option>
                        <option value="highest">Дорогие</option>
                    </select>
                </li>
            </ul>
            <ul className="products">
                {products.map((product) => (
                    <li key={product._id}>
                        <div className="product">
                            <Link to="/">
                                <img
                                    className="product-image"
                                    src={product.image}
                                    alt="product"
                                />
                            </Link>
                            <div className="product-name">
                                <Link to="/">{product.name}</Link>
                            </div>
                            <div className="product-brand">Производитель: {product.brand}</div>
                            <div className="product-price">Цена: <mark>{product.price}руб.</mark></div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
export default HomeScreen;
