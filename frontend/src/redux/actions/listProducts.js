import axios from 'axios';
const { PRODUCT_LIST_REQUEST } = require("../constants/productConstants")

const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        const { data } = await axios.get("api/products");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    } catch(error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
}

export { listProducts }