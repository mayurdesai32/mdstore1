import {
  CLEAR_ERRORS,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCTBYID_REQUEST,
  PRODUCTBYID_SUCCESS,
  PRODUCTBYID_FAIL,
} from './productConstant';
import axios from 'axios';

export const getallproducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });
    const response = await axios.get('/product/products');

    dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: response.data.message });
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    dispatch({ type: ALL_PRODUCTS_FAIL, payload: err });
  }
};

export const getallproductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTBYID_REQUEST });
    const response = await axios.get(`/product/productbyid/${id}`);

    dispatch({ type: PRODUCTBYID_SUCCESS, payload: response.data.message });
  } catch (error) {
    const err = error.response.data;
    // console.log(error.response.message);
    dispatch({ type: PRODUCTBYID_FAIL, payload: err });
  }
};
// clear Error
export const clearErrors = async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
// export const ()=>{};
// export const ()=>{};

// export default ={ getproducts };
