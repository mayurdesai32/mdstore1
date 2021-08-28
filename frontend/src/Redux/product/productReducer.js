import React from 'react';
import {
  CLEAR_ERRORS,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCTBYID_REQUEST,
  PRODUCTBYID_SUCCESS,
  PRODUCTBYID_FAIL,
} from './productConstant';

const InitailState = { products: [], loading: false };
export const allproductReducer = (state = InitailState, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return { loading: true, products: [] };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        success: true,
      };
    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload.err,
        success: false,
      };

    default:
      return state;
  }
};

// by id

const initailState = { product: [], loading: false };
export const productByIdReducer = (state = initailState, action) => {
  switch (action.type) {
    case PRODUCTBYID_REQUEST:
      return { loading: true, products: [] };
    case PRODUCTBYID_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: true,
      };
    case PRODUCTBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

// export default allproductReducer;
