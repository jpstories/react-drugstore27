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

const orderDetailsReducer = (state = { order: {}, loading: true }, action) => {
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

function myOrderListReducer(state = {
    orders: []
}, action) {
    switch (action.type) {
        case 'MY_ORDER_LIST_REQUEST':
            return { loading: true };
        case 'MY_ORDER_LIST_SUCCESS':
            return { loading: false, orders: action.payload };
        case 'MY_ORDER_LIST_FAIL':
            return { loading: false, error: action.payload };
        default: return state;
    }
}

function orderListReducer(state = {
    orders: []
}, action) {
    switch (action.type) {
        case 'ORDER_LIST_REQUEST':
            return { loading: true };
        case 'ORDER_LIST_SUCCESS':
            return { loading: false, orders: action.payload };
        case 'ORDER_LIST_FAIL':
            return { loading: false, error: action.payload };
        default: return state;
    }
}


export { orderCreateReducer, orderDetailsReducer, myOrderListReducer, orderListReducer }