import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction, signinAction } from '../../redux/actions/userAction';
import { Tag, Button } from 'antd';
import userImage from '../../assets/img/user.png';
import { listMyOrdersAction } from '../../redux/actions/orderAction';

function ProfilePage(props) {
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.userSignin);
    const { orders, loading } = useSelector(state => state.userOrders);

    console.log('orders: ', orders);

    const handleLogout = () => {
        dispatch(logoutAction())
        props.history.push('/signin')
        dispatch(signinAction(null, null));
    }

    React.useEffect(() => {
        dispatch(listMyOrdersAction())
    }, [])

    return (userInfo ? <div className="profile">
        <div className="profile-info">
            <h2 className="profile-title">Профиль</h2>
            <div className="form-container profile-details">

                <div>
                    <div>Имя:</div>
                    <Tag color="blue">{userInfo.name}</Tag>
                    <div>Электронная почта</div>
                    <Tag color="green">{userInfo.email}</Tag>
                </div>

                <div className="profile-photo">
                    <img src={userImage} alt="user__photo" width="55" />
                    <a href="#">Фото профиля</a>
                </div>
            </div>
            <Button className="" type="primary" onClick={handleLogout}>Выйти</Button>
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
                    {orders ? !loading &&
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
        : <div>
            <h2>Войдите в систему</h2>
            <Link to="/signin">Войти</Link>
        </div>)
}

export default ProfilePage;

