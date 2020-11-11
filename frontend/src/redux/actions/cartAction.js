import axios from "axios";
import Cookie from 'js-cookie';

const addToCartAction = (productID) => async (dispatch, getState) => {
    try {
        dispatch({ type: "ADD_TO_CART_REQUEST" })
        const { data } = await axios.get("/api/products/" + productID);
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                id: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                stock: data.stock,
            }
        })
        const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (error) { }
};

const removeFromCartAction = (productID) => async (dispatch, getState) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productID })
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

export { addToCartAction, removeFromCartAction };
