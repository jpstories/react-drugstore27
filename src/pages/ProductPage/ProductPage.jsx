import React from 'react';
import { Link } from 'react-router-dom';

const product = {
  _id: '1',
  image: 'https://imgs.asna.ru/resize_cache/118577/97452a19922aa0f4766549993f731cbe/iblock/6ff/6ff07668cac6139611ef481d7841c7f7/8733701.jpg',
  name: 'Цитовир',
  brand: 'Цитомед',
  price: '750',
  description: 'Антивирусное средство'
}

function ProductScreen() {
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
