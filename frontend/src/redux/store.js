import { createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import { ProductListReducer } from './reducers/productReducers';


const initialState = {};
const reducer = combineReducers({
    productList: ProductListReducer,
})
const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnchancer(applyMiddleware(thunk)));
export default store;