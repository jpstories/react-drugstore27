import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCartAction } from '../../redux/actions/addToCartAction';


function CartScreen(props) {
    const dispatch = useDispatch();
    const productID = props.match.params.id;

    const { cartItems } = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(addToCartAction(productID))
    }, [])

    return (
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
                                        <Link to={"/product/" + item.product}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div className="cart-name-settings">
                                        <div className="cart-price">
                                            {item.price}руб.
                                        </div>
                                        <button type="button" className="button btn-cart-delete">
                                            Удалить
                                        </button>
                                    </div>
                                </div>

                                <div className="cart-action">
                                    <button className="button primary full-width" disabled={cartItems.length === 0}>
                                        Перейти к оформлению заказа
                                    </button>
                                </div>

                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CartScreen;