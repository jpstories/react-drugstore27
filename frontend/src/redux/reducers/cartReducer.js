function cartReducer(state = { cartItems: [] }, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            const item = action.payload;
            // const product = state.cartItems.find(obj => obj.id === item.id);
            // if (product) {
            //     return { cartItems: state.cartItems.map(obj => obj.id === product.id ? item : obj) }
            // }
            return { cartItems: [...state.cartItems, item] };
        default:
            return state;
    }
}

export { cartReducer };