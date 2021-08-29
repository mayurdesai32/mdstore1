import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_QTY,
  DECREMENT_THE_PRODUCT,
  REMOVE_ALL,
} from './cartConstant';

export const addToCart = (product, quantity) => async (dispatch, getState) => {
  const cartItem = {
    name: product.name,
    _id: product._id,
    price: product.price,
    stock: product.stock,
    // _id: product._id,
    // product,
    quantity,
  };
  dispatch({ type: ADD_TO_CART, payload: cartItem });
  localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItem));
};
export const changeQty = (productid, qty) => async (dispatch, getState) => {
  // const qty = parseInt(Qty);
  console.log(qty);
  dispatch({ type: CHANGE_QTY, payload: { productid, qty } });
  localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItem));
};

export const removeFromCart = (productid) => async (dispatch, getState) => {
  console.log(productid);
  dispatch({ type: REMOVE_FROM_CART, payload: productid });
  localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItem));
};
