import axios from 'axios';
import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_FAILED,
  PLACE_ORDER_SUCCESS,
} from './orderConstant';

export const placeOrder = () => async (dispatch) => {
  try {
    dispatch({ type: PLACE_ORDER_REQUEST });
    // const response = await axios.put(`/user/resetpassword/`);
    dispatch({ type: PLACE_ORDER_SUCCESS });
  } catch (error) {
    dispatch({ type: PLACE_ORDER_FAILED });
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
