import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrderAction } from '../../redux/actions/orderAction';
import { Tag, Spin } from 'antd';


function OrderPage(props) {
  const dispatch = useDispatch();
  const orderID = props.match.params.id;
  const { loading, error, order } = useSelector(state => state.detailsOrder)

  useEffect(() => {
    dispatch(detailsOrderAction(orderID))
  }, []);

  const handleSuccessPayment = () => {

  }


  return <div>
    {loading ? <div className="loading">
      <Spin size="large" />
    </div>
      : error ? <div>Ошибка</div>
        : <div className="placeorder">
          <div className="placeorder-info">
            <div><h1>Заказ</h1> <i>№ <strong>{orderID}</strong></i></div>
            <div>
              <h3>
                Адрес доставки
              </h3>
              <div>
                {order.shippingAddress.country}, {order.shippingAddress.city}, {order.shippingAddress.address}, {order.shippingAddress.postalCode}
              </div>
              <div className="order-delivered">
                {order.isDelivered
                  ? <Tag color="blue">дата доставки ${order.deliveredAt}</Tag>
                  : <Tag color="blue">самовывоз</Tag>
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
                  ? <Tag color="green">Статус : оплачено ${order.paidAt}</Tag>
                  : <Tag color="red">Статус: не оплачено</Tag>
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
                        <div>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
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
            </ul>
          </div>

        </div>
    }
  </div>

}

export default OrderPage;