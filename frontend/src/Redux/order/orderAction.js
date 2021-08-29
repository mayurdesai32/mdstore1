import axios from 'axios';
import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_FAILED,
  PLACE_ORDER_SUCCESS,
} from './orderConstant';
//  token, cartItems, currentUser, subtotal;
export const placeOrder =
  (token, cartItems, currentUser, amount) => async (dispatch) => {
    try {
      const order = {
        token,
        cartItems,
        currentUser,
        subtotal: amount,
      };
      dispatch({ type: PLACE_ORDER_REQUEST });
      const response = await axios.post(`/order/placeorder`, order);
      console.log(response);
      dispatch({ type: PLACE_ORDER_SUCCESS, payload: response.data.message });
    } catch (error) {
      const err = error.response.data;
      dispatch({ type: PLACE_ORDER_FAILED, payload: err });
    }
  };
export const getAllOrder = () => async (dispatch) => {
  try {
    dispatch({ type: PLACE_ORDER_REQUEST });
    // const response = await axios.put(`/user/resetpassword/`);
    dispatch({ type: PLACE_ORDER_SUCCESS });
  } catch (error) {
    dispatch({ type: PLACE_ORDER_FAILED });
  }
};

export const getOrderById = () => async (dispatch) => {
  try {
    dispatch({ type: PLACE_ORDER_REQUEST });
    // const response = await axios.put(`/user/resetpassword/`);
    dispatch({ type: PLACE_ORDER_SUCCESS });
  } catch (error) {
    dispatch({ type: PLACE_ORDER_FAILED });
  }
};
