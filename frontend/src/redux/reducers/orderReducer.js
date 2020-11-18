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

const orderDetailsReducer = (state = { loading: true, order: {} }, action) => {
    switch (action.type) {
        case 'ORDER_DETAILS_REQUEST':
            return { loading: true }
        case 'ORDER_DETAILS_SUCCESS':
            return { loading: false, order: action.payload }
        case 'ORDER_DETAILS_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export { orderCreateReducer, orderDetailsReducer }