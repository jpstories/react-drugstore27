import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCartAction } from '../../redux/actions/cartAction';

function CartScreen(props) {
    const dispatch = useDispatch();

    const { cartItems, loadingCart } = useSelector(state => state.cart);

    const handleRemoveFromCart = (productID) => {
        dispatch(removeFromCartAction(productID))
    }

    const handleGoToOrder = () => {
        props.history.push('/signin?redirect=shipping')
    }

    return (
        loadingCart ? <div className="loading">Загрузка...</div>
            :
            <div className="cart">
                <div className="cart-list">
                    <div className="cart-list-container">
                        <div>
                            <h3>
                                Корзина
                            </h3>
                        </div>
                        {cartItems.length === 0 ?
                            <div>Корзина пуста :(</div>
                            :
                            cartItems.map((item, index) =>
                                <div key={index} className="cart-item">
                                    <div className="cart-image">
                                        <img src={item.image} alt="product" />
                                    </div>
                                    <div className="cart-name">
                                        <div className="cart-name-title">
                                            <Link to={"/product/" + item._id}>
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className="cart-name-settings">
                                            <div className="cart-price">
                                                {item.price}руб.
                                            </div>
                                            <button
                                                type="button"
                                                className="button btn-cart-delete"
                                                onClick={() => handleRemoveFromCart(item.id)}>
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="cart-action">
                    <div className="cart-action__total">
                        <span>Количество: {cartItems.length} шт.</span>
                        <span>Итого: <b>{cartItems.reduce((a, b) => Number(a) + Number(b.price), 0)}</b> рублей</span>
                    </div>
                    <button
                        className="button primary full-width"
                        disabled={cartItems.length === 0}
                        onClick={handleGoToOrder}
                    >
                        Перейти к оформлению заказа
                    </button>
                </div>
            </div>
    )
}

export default CartScreen;