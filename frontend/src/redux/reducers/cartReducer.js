
function cartReducer(state = { cartItems: [], shippingAddress: {}, loadingCart: false }, action) {
    switch (action.type) {
        case 'ADD_TO_CART_REQUEST':
            return { cartItems: [...state.cartItems], loadingCart: true }
        case 'ADD_TO_CART':
            const item = action.payload;
            // const product = state.cartItems.find(obj => obj.id === item.id);
            // if (product) {
            //     return { cartItems: state.cartItems.map(obj => obj.id === product.id ? item : obj) }
            // }
            return {
                cartItems: [...state.cartItems, item],
                loadingCart: false
            };
        case 'REMOVE_FROM_CART':
            const newItems = [...state.cartItems];
            const delItems = newItems.filter(item => item.id !== action.payload);
            console.log(delItems);
            return { cartItems: delItems }
        case 'CART_SAVE_SHIPPING':
            return { ...state, shippingAddress: action.payload }
        case 'CART_SAVE_PAYMENT':
            return { ...state, ...action.payload }
        case 'CART_EMPTY':
            return { ...state, cartItems: [] }
        default:
            return state;
    }
}

export { cartReducer };