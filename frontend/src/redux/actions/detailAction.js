import axios from "axios";

const detailAction = (productID) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_DETAILS_REQUEST", payload: productID });
        const { data } = await axios.get("/product/" + productID);
        dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "PRODUCT_DETAILS_FAIL", payload: error.message });
    }
};

export { detailAction };
