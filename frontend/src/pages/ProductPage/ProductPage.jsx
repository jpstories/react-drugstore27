import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCartAction } from "../../redux/actions/cartAction";
import { detailAction } from "../../redux/actions/detailAction";

import { Carousel, Spin } from 'antd';

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};


function ProductScreen(props) {
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails);

    useEffect(() => {
        dispatch(detailAction(props.match.params.id));
    }, []);

    const handleAddToCart = () => {
        props.history.push('/cart')
        dispatch(addToCartAction(props.match.params.id))
    }

    return (
        <div className="product-detail-page">
            <div className="back-to-result">
                <Link className="back-to-result__a" to="/">
                    &#8592; Назад
                </Link>
            </div>

            {loading ? <div className="loading">
                <Spin size="large" />
            </div> :
                error ? <div>Error</div> :
                    <React.Fragment>
                        <div className="details">
                            <div className="details-image">
                                <img src={product.image} alt="product"></img>
                                <Carousel autoplay dotPosition="left">
                                    <div>
                                        <img className="details-image__slide" src={product.image} alt="product-slide" />
                                    </div>
                                    <div>
                                        <img className="details-image__slide" src={product.image} alt="product-slide" />
                                    </div>
                                    <div>
                                        <img className="details-image__slide" src={product.image} alt="product-slide" />
                                    </div>
                                    <div>
                                        <img className="details-image__slide" src={product.image} alt="product-slide" />
                                    </div>
                                </Carousel>
                            </div>

                            <div className="details-aside">
                                <div className="details-info">
                                    <ul className="details-info-list">
                                        <li className="details-info-list__el">
                                            <h4>{product.name}</h4>
                                        </li>
                                        <li className="details-info-list__el">
                                            <span>Описание:</span>
                                            <div>{product.description}</div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="details-action">
                                    <div className="details-action-list">
                                        {product.stock > 0 ?
                                            <div className="details-action-list__status">
                                                <div className="details-action-list__el"><b>Цена:</b> {product.price} рублей</div>
                                                <span className="marked">В наличии</span>
                                                <button onClick={handleAddToCart} className="button primary" style={{ maxWidth: '200px' }}>
                                                    Добавить
                                                </button>
                                            </div> : <div><b>Нет в наличии</b></div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="content-margined">
                            <h2>Отзывы</h2>
                            <div>
                                Пожалуйста <Link to="/signin">войдите</Link> чтобы оставить отзыв.
                            </div>
                        </div>
                    </React.Fragment>
            }
        </div>
    );
}

export default ProductScreen;
