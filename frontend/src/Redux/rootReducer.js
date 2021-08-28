import { combineReducers } from 'redux';

import cartReducer from './cart/cartReducer';
import {
  userRegisterReducer,
  userLoginReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
} from './user/userReducer';
import {
  allproductReducer,
  productByIdReducer,
} from './product/productReducer';
import { placeOrderReducer } from './order/orderReducer';
const rootReducer = combineReducers({
  cart: cartReducer,
  product: allproductReducer,
  singleproduct: productByIdReducer,
  users: userRegisterReducer,
  userlogin: userLoginReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  placeOrder: placeOrderReducer,
});
export default rootReducer;
