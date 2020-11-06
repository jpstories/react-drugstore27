import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailProduct } from "../../redux/actions/detailProduct";

function ProductScreen(props) {
    const { product, loading, error} = useSelector((state) => state.productDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailProduct(props.match.params.id));
    }, []);

    return (
        <div>

            <div className="back-to-result">
                <Link className="back-to-result__a" to="/">
                    Вернуться
                </Link>
            </div>

            {loading? <div>Loading...</div> :
            error? <div>Error</div> :
            <React.Fragment>
                <div className="details">
                    <div className="details-image">
                        <img src={product.image} alt="product"></img>
                    </div>

                    <div className="details-info">
                        <ul>
                            <li>
                                <h4>{product.name}</h4>
                            </li>
                            <li>
                                Цена: <b>{product.price}руб.</b>
                            </li>
                            <li>
                                Описание:
                                <div>{product.description}</div>
                            </li>
                        </ul>
                    </div>

                    <div className="details-action">
                        <ul>
                            <li>Цена: {product.price}</li>
                            <li>Статус: В наличии</li>
                            <li>
                                <button className="button primary">
                                    Добавить
                                </button>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="content-margined">
                    <h2>Отзывы</h2>
                    <div>
                        Пожалуйста <Link to="/signin">войдите</Link> чтобы
                        оставить отзыв.
                    </div>
                </div>
            </React.Fragment>
            }
        </div>
    );
}

export default ProductScreen;
