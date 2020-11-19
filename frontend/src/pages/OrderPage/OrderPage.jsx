import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrderAction } from '../../redux/actions/orderAction';
import { PayPalButton } from 'react-paypal-button-v2';
import { Tag, Spin } from 'antd';
import Axios from 'axios';


function OrderPage(props) {
  const dispatch = useDispatch();
  const orderID = props.match.params.id;
  const { loading, error, order } = useSelector(state => state.detailsOrder);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    dispatch(detailsOrderAction(orderID))
    const addPaypalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `http://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!orderID) {
      dispatch(detailsOrderAction(orderID))
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPaypalScript()
        } else {
          setSdkReady(true)
        }
      }
    }
  }, []);

  const handlerSuccessPayment = () => { }

  return <div>
    {loading ? <div className="loading">
      <Spin size="large" />
    </div>
      : <div className="placeorder">
        <div className="placeorder-info">
          <div><h1>Заказ</h1>№ <Tag color="blue"><strong>{orderID}</strong></Tag></div>
          <div>
            <h3>
              Адрес доставки
            </h3>
            <div>
              {order.shippingAddress.country}, {order.shippingAddress.city}, {order.shippingAddress.address}, {order.shippingAddress.postalCode}
            </div>
            <div className="order-delivered">
              {order.isDelivered
                ? <Tag color="blue"><strong>дата доставки ${order.deliveredAt}</strong></Tag>
                : <Tag color="blue"><strong>Самовывоз</strong></Tag>
              }
            </div>
          </div>
          <div>
            <h3>Оплата</h3>
            <div>
              Способ оплаты: <strong>{order.paymentMethod}</strong>
            </div>
            <div className="order-paid">
              {order.isPaid
                ? <Tag color="green"><strong>Статус : оплачено ${order.paidAt}</strong></Tag>
                : <Tag color="red"><strong>Статус: не оплачено</strong></Tag>
              }
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Корзина</h3>
              </li>
              {order.orderItems.length === 0 ?
                <div>Корзина пуста</div>
                : order.orderItems.map(item =>
                  <li key={item._id}>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>{item.name}</div>
                    </div>
                    <div className="cart-price">
                      {item.price} руб.
                      </div>
                  </li>
                )
              }
            </ul>
          </div>
        </div>

        <div className="placeorder-action">
          <ul>
            {/* <li className="placeorder-actions-payment">
                {loadingPay && <div>Завершение оплаты...</div>}
                {!order.isPaid &&
              <PaypalButton
                amount={order.totalPrice}
                onSuccess={handleSuccessPayment} />
            }
              </li> */}
            <li>
              <h3>Весь заказ</h3>
            </li>
            <li>
              <div>Товары</div>
              <div>{order.itemsPrice}руб.</div>
            </li>
            <li>
              <div>Доставка</div>
              <div>{order.shippingPrice}руб.</div>
            </li>
            <li>
              <div>Пошлина</div>
              <div>{order.taxPrice}руб.</div>
            </li>
            <li>
              <div>Итого</div>
              <div>{order.totalPrice}руб.</div>
            </li>
            {!order.isPaid && (
              <li className="paypal-block">{!sdkReady
                ? <Spin />
                : <PayPalButton amount={order.totalPrice} onSuccess={handlerSuccessPayment} />
              }
              </li>
            )}
          </ul>
        </div>

      </div>
    }
  </div>

}

export default OrderPage;