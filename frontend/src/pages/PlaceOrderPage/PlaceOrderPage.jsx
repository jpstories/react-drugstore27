import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StepLine from '../../components/StepLine';
import { createOrderAction } from '../../redux/actions/orderAction';

function PlaceOrderPage(props) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const orderItems = useSelector(state => state.order);
  const { loading, success, error, order } = orderItems;

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`)
      dispatch({ type: 'ORDER_CREATE_RESET' })
    }
  }, [dispatch, props.history, success, order])

  if (!shippingAddress) {
    props.history.push('/shipping')
  }
  if (!paymentMethod) {
    props.history.push('/payment')
  }
  const placeOrderHandler = () => {
    dispatch(createOrderAction({
      orderItems: cartItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }))
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price, 0);
  const shippingPrice = itemsPrice > 1000 ? 0 : 150;
  const taxPrice = 0.05 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return <div>
    <StepLine step1 step2 step3 />
    <div className="placeorder">
      <div className="placeorder-info">

        <div>
          <h3>
            Доставка
          </h3>
          <div>
            {shippingAddress.country}, {shippingAddress.city},
            {shippingAddress.postalCode}, {shippingAddress.address}
          </div>
        </div>

        <div>
          <h3>Оплата</h3>
          <div>
            Метод оплаты: <b>{paymentMethod}</b>
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
                        {/* <Link to={"/product/" + item._id}> */}
                        {item.name}
                        {/* </Link> */}
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
            <button
              disabled={cartItems.length === 0}
              className="button primary full-width"
              onClick={placeOrderHandler}
            >
              Подтвердить заказ
            </button>
            {loading && 'Загрузка...'}
            {error && 'Ошибка при оформлении заказа'}
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