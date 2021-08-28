import React from 'react';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_QTY,
  DECREMENT_THE_PRODUCT,
  REMOVE_ALL,
} from './cartConstant';

const InitailState = { cartItem: [] };
const cartReducer = (state = InitailState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // if product exist in cart
      const currItem = action.payload;
      const qty = action.payload.quatity;
      const stock = action.payload.stock;

      const isItemExist = state.cartItem.find(
        (element) => element._id === currItem._id
      );

      if (isItemExist) {
        console.log('hello');
        return {
          ...state,
          cartItem: state.cartItem.map((item) =>
            item._id === currItem._id
              ? {
                  ...item,
                  quatity:
                    item.quatity + qty <= stock ? item.quatity + qty : stock,
                }
              : item
          ),
        };
      } else {
        // console.log(currItem);
        return {
          ...state,
          cartItem: [...state.cartItem, currItem],
        };
      }

    // REMOVE_FROM_CART;
    case REMOVE_FROM_CART:
      console.log(action.payload.productid);
      return {
        ...state,
        cartItem: state.cartItem.filter((item) => {
          return item._id !== action.payload;
        }),
      };

    case CHANGE_QTY:
      return {
        ...state,
        cartItem: state.cartItem.map((item) =>
          item._id === action.payload.productid
            ? {
                ...item,
                quatity: action.payload.qty,
              }
            : item
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
