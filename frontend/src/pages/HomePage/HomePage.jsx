import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { homeAction } from "../../redux/actions/homeAction";
import Axios from "axios";

function HomeScreen() {
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector((state) => state.productList);

    useEffect(() => {
        dispatch(homeAction());
    }, []);

    return (
        <React.Fragment>
            <h2 className="home__title">Антивирусное</h2>
            <div className="filter">
                <div>
                    <form>
                        <input name="searchKeyword" />
                        <button type="submit">Поиск</button>
                    </form>
                </div>

                <div>
                    <label htmlFor="sortOrder">Сортировать по</label>
                    <select name="sortOrder">
                        <option value="">Новинкам</option>
                        <option value="lowest">Дешевые</option>
                        <option value="highest">Дорогие</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="loading">Загрузка...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
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
                                        <div className="product-brand">
                                            Производитель: {product.brand}
                                        </div>
                                        <div className="product-price">
                                            Цена: <mark>{product.price}руб.</mark>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
        </React.Fragment>
    );
}
export default HomeScreen;
