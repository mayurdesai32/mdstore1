import React from 'react';
import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_FAILED,
  PLACE_ORDER_SUCCESS,
} from './orderConstant';

export const placeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return { ...state, loading: true };

    case PLACE_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload };

    case PLACE_ORDER_FAILED:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
