import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

    let checkOrders = false;
    let userInfo = '';
    let orders = '';

    return (
        <div className="profile">
            <div className="profile-info">
                <form onSubmit={submitHandler} >
                    <ul className="form-container">
                        <li>
                            <h2>Профиль</h2>
                        </li>
                        <li>
                            <label htmlFor="name">
                                Имя
                            </label>
                            <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="email">
                                Электронная почта
                            </label>
                            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="password">Пароль</label>
                            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
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
                            <tr>
                                <td className="profile-table-noorders">Нет заказов</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProfilePage;

