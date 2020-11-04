import React from 'react';
import { Link } from 'react-router-dom';

import products from '../../data'

function ProductScreen(props) {
    const product = products.find(item => props.match.params.id === item._id);

    return (
      <div>
        <div className="back-to-result">
          <Link className="back-to-result__a" to="/">Вернуться</Link>
        </div>
        <>
          <div className="details">

            <div className="details-image">
              <img src={product.image} alt="product"></img>
            </div>

            <div className="details-info">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                <li>
                  Цена: <b>{product.price}руб.</b>
                </li>
                <li>
                  Описание:
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>

            <div className="details-action">
              <ul>
                <li>Цена: {product.price}</li>
                <li>Статус: В наличии</li>
                <li>
                  <button className="button primary">Добавить</button>
                </li>
              </ul>
            </div>

          </div>

          <div className="content-margined">
            <h2>Отзывы</h2>
            <div>Пожалуйста <Link to="/signin">войдите</Link> чтобы оставить отзыв.</div>
          </div>
        </>  
      </div>
    )
}

export default ProductScreen;
