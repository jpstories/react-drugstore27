import axios from "axios";
import Cookie from "js-cookie";

const signinAction = (email, password) => async (dispatch) => {
    dispatch({ type: 'USER_SIGNIN_REQUEST', payload: { email, password } })
    try {
        const { data } = await axios.post("/api/users/signin", { email, password });
        dispatch({ type: 'USER_SIGNIN_SUCCESS', payload: data })
        Cookie.set('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: 'USER_SIGNIN_ERROR' })
    }
}

const registerAction = (name, email, password) => async (dispatch) => {
    dispatch({ type: 'USER_REGISTER_REQUEST', payload: { name, email, password } })
    try {
        const { data } = await axios.post('/api/users/register', { name, email, password })
        dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data })
        Cookie.set('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: 'USER_REGISTER_ERROR' })
    }
}

const logoutAction = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: 'USER_LOGOUT' })
}

export { signinAction, registerAction, logoutAction }