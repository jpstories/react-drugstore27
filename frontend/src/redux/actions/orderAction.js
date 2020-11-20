import axios from "axios";

const createOrderAction = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'ORDER_CREATE_REQUEST', payload: order })
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: 'ORDER_CREATE_SUCCESS', payload: data })
        dispatch({ type: 'CART_EMPTY' })
        // localStorage.removeItem('cartItems')
    } catch (error) {
        dispatch({
            type: 'ORDER_CREATE_FAIL',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

const detailsOrderAction = (orderID) => async (dispatch, getState) => {
    dispatch({ type: 'ORDER_DETAILS_REQUEST', payload: orderID })
    try {
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get(`/api/orders/${orderID}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({ type: 'ORDER_DETAILS_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ type: 'ORDER_DETAILS_FAIL', payload: error.message })
    }
}

export { createOrderAction, detailsOrderAction }