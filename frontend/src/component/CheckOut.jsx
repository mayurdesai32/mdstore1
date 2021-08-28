import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const CheckOut = ({ amount }) => {
  const tokenHandler = (token) => {
    console.log(token);
  };
  return (
    <div>
      <StripeCheckout
        amount={amount * 100}
        currency='INR'
        shippingAddress
        token={tokenHandler}
        // stripeKey=
      >
        <button>PAY NOW</button>
      </StripeCheckout>
    </div>
  );
};

export default CheckOut;
