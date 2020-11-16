import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StepLine from '../../components/StepLine';

const shippingPrice = 250;
const taxPrice = 20;

function PlaceOrderPage(props) {
  const dispatch = useDispatch();
  const { cartItems, shipping, payment } = useSelector(state => state.cart);
  if (!shipping.address) {
    props.history.push('/shipping')
  }
  if (!payment.paymentMethod) {
    props.history.push('/payment')
  }
  const placeOrderHandler = () => {

  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price, 0);
  const shippingPrice = itemsPrice > 1000 ? 0 : 150;
  const taxPrice = 0.05 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return <div>
    <StepLine step1 step2 step3 step4 />
    <div className="placeorder">
      <div className="placeorder-info">

        <div>
          <h3>
            Доставка
          </h3>
          <div>
            {shipping.country}, {shipping.city}, {shipping.postalCode}, {shipping.address}
          </div>
        </div>

        <div>
          <h3>Оплата</h3>
          <div>
            Метод оплаты: <b>{payment.paymentMethod}</b>
          </div>
        </div>

        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Корзина
              </h3>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  Корзина пуста
                </div>
                :
                cartItems.map((item, index) =>
                  <li key={index} className="cart-product-info">
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>

                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>
                      </div>
                    </div>

                    <div className="cart-price">
                      {item.price}руб.
                    </div>
                  </li>
                )
            }
          </ul>
        </div>

      </div>

      <div className="placeorder-action">
        <ul>
          <li>
            <button disabled={cartItems.length === 0} className="button primary full-width" onClick={placeOrderHandler}>Подтвердить заказ</button>
          </li>
          <li>
            <h3>Весь заказ</h3>
          </li>
          <li>
            <div>Товары</div>
            <div>{itemsPrice} руб.</div>
          </li>
          <li>
            <div>Доставка</div>
            <div>{shippingPrice === 0 ? 'Бесплатная доставка' : `${shippingPrice} руб.`}</div>
          </li>
          <li>
            <div>Пошлина</div>
            <div>{taxPrice} руб.</div>
          </li>
          <li>
            <div><strong>Итого</strong></div>
            <div><strong>{totalPrice} рублей</strong></div>
          </li>
        </ul>
      </div>

    </div>
  </div>
}

export default PlaceOrderPage;