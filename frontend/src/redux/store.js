import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";
import { registerReducer, signinReducer } from "./reducers/userReducer"

import Cookie from "js-cookie";
import { orderCreateReducer } from "./reducers/orderReducer";

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
    cart: { cartItems, shipping: {}, payment: {} },
    userSignin: { userInfo }
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: signinReducer,
    userRegister: registerReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    order: orderCreateReducer,
});

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnchancer(applyMiddleware(thunk))
);
export default store;
