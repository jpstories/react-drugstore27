import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const orders = [
    {
        _id: '1',
        createdAt: '26.10.2020',
        totalPrice: '1500',
        user: { name: 'Sergey' },
        isPaid: 'Оплата',
        paidAt: '27.10.2020',
        isDelivered: 'Доставка',
        deliveredAt: '30.10.2020'
    }
];

const userInfo = [{ email: 'gmdalmask@gmail.com', name: 'Sergey', password: 'test1234' }];

function ProfilePage(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogout = () => {
        alert('Выход...')
    }

    const submitHandler = (e) => {
        e.preventDefault();
        alert('Профиль обновлен')
    }

    useEffect(() => {
        if (userInfo) {
            setEmail(userInfo.email);
            setName(userInfo.name);
            setPassword(userInfo.password);
        }
        return () => {

        };
    }, [])

    let checkOrders;
    if (orders === true) {
        checkOrders = true;
    } else {
        checkOrders = false;
    }

    return (
        <div className="profile">
            <div className="profile-info">
                <div className="form">
                    <form onSubmit={submitHandler} >
                        <ul className="form-container">
                            <li>
                                <h2>Профиль</h2>
                            </li>
                            <li>
                                <label htmlFor="name">
                                    Имя
              </label>
                                <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                                </input>
                            </li>
                            <li>
                                <label htmlFor="email">
                                    Электронная почта
          </label>
                                <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                                </input>
                            </li>
                            <li>
                                <label htmlFor="password">Пароль</label>
                                <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                                </input>
                            </li>

                            <li>
                                <button type="submit" className="button primary">Обновить</button>
                            </li>
                            <li>
                                <button type="button" onClick={handleLogout} className="button secondary full-width">Выйти</button>
                            </li>

                        </ul>
                    </form>
                </div>
            </div>
            <div className="profile-orders content-margined">
                <table className="table profile-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Дата</th>
                            <th>Итого</th>
                            <th>Оплачено</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkOrders ?
                            (orders.map(order => <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid}</td>
                                <td>
                                    <Link to='/'>Детали</Link>
                                </td>
                            </tr>))
                            :
                            <tr><td>Нет заказов</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProfilePage;

