import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { cartReducer } from "./reducers/cartReducer";
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";
import Cookie from "js-cookie";

const cartItems = Cookie.getJSON('cartItems') || [];

const initialState = { cart: { cartItems } };

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnchancer(applyMiddleware(thunk))
);
export default store;
