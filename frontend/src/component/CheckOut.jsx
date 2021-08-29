import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../Redux/order/orderAction.js';

const CheckOut = ({ amount, stripeApiKey }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userlogin.user);
  const cartItems = useSelector((state) => state.cart.cartItem);
  // const {}=useSelector()
  console.log(stripeApiKey);
  const tokenHandler = (token) => {
    dispatch(placeOrder(token, cartItems, currentUser, amount));
  };
  return (
    <div>
      <StripeCheckout
        amount={amount}
        currency='INR'
        shippingAddress
        token={tokenHandler}
        stripeKey={stripeApiKey}
      >
        <button>PAY NOW</button>
      </StripeCheckout>
    </div>
  );
};

export default CheckOut;
