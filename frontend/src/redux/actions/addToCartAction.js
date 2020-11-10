import axios from "axios";

const addToCartAction = (productID) => async (dispatch) => {
    try {
        const { data } = await axios.get("/product/" + productID);
        console.log(data);
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                id: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                stock: data.stock
            }
        });
    } catch (error) {

    }
};

export { addToCartAction };
