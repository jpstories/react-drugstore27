import React from 'react';
import { Link } from 'react-router-dom';

const orders = [
  {
    _id: '1',
    createdAt: '26.10.2020',
    totalPrice: '1500',
    user: { name: 'Sergey' },
    isPaid: 'Оплачено',
    paidAt: '27.10.2020',
    isDelivered: 'Доставка',
    deliveredAt: '30.10.2020'
  }
];

function OrdersPage(props) {
  const deleteHandler = (order) => {
    let deleteOrder = prompt('Вы действительно хотите удалить заказ?');
    if (deleteOrder === true) {
      console.log('Заказ удален');
    } else {
      console.log('Заказ остался без изменений')
    }
  }

  return (
    <div className="content content-margined">

      <div className="order-header">
        <h3>Заказы</h3>
      </div>

      <div className="order-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Дата заказа</th>
              <th>Сумма</th>
              <th>Пользователь</th>
              <th>Оплата</th>
              <th>Время оплаты</th>
              <th>Способ получения</th>
              <th>Дата доставки</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (<tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalPrice}</td>
              <td>{order.user.name}</td>
              <td>{order.isPaid.toString()}</td>
              <td>{order.paidAt}</td>
              <td>{order.isDelivered.toString()}</td>
              <td>{order.deliveredAt}</td>
              <td>
                <Link to="/" className="button secondary">Детали</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Удалить</button>
              </td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default OrdersPage;