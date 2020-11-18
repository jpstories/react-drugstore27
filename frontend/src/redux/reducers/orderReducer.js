const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ORDER_CREATE_REQUEST':
            return { loading: true }
        case 'ORDER_CREATE_SUCCESS':
            return { loading: false, success: true, ...action.payload }
        case 'ORDER_CREATE_FAIL':
            return { loading: false, error: action.payload }
        case 'ORDER_CREATE_RESET':
            return {}
        default:
            return state
    }
}

export { orderCreateReducer }