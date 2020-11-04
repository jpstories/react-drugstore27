import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/actions/listProducts';

function HomeScreen() {
    // const [searchKeyword, setSearchKeyword] = useState('');
    // const [sortOrder, setSortOrder] = useState('');
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());
        return () => {
            //
        }
    }, [])

    // const submitHandler = (e) => {
    //     console.log('Препарат найден')
    //     e.preventDefault();
    // };

    // const sortHandler = (e) => {
    //     console.log('Все препараты отсортированы')
    // };

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

            {
            loading? <div>Loading...</div> : 
            error? <div>{error}</div> :
                <ul className="products">
                    {products.map((product) => (
                        <li key={product._id}>
                            <div className="product">
                                <Link to={`/product/${product._id}`}>
                                    <img
                                        className="product-image"
                                        src={product.image}
                                        alt="product"
                                    />
                                </Link>
                                <div className="product-name">
                                    <Link to="/product">{product.name}</Link>
                                </div>
                                <div className="product-brand">Производитель: {product.brand}</div>
                                <div className="product-price">Цена: <mark>{product.price}руб.</mark></div>
                            </div>
                        </li>
                    ))}
                </ul>
            }
        </>
    );
}
export default HomeScreen;
