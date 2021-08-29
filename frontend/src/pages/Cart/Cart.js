import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, changeQty } from '../../Redux/cart/cartAction';
import CheckOut from '../../component/CheckOut';
const Cart = ({ stripeApiKey }) => {
  const { cartItem } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const Grandtotal = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // console.log(cartItem);
  return (
    <div className='Cart card'>
      <center>
        <h2>MY CART</h2>
      </center>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>quantity</th>
            <th>SubTotal</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {cartItem.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <select
                    value={item.quantity}
                    onChange={(e) => {
                      dispatch(changeQty(item._id, parseInt(e.target.value)));
                    }}
                  >
                    {[...Array(item.stock).keys()].map((x, i) => {
                      return (
                        <option value={i + 1} key={i}>
                          {i + 1}
                        </option>
                      );
                    })}
                  </select>
                </td>
                <td>{(item.quantity * item.price).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(removeFromCart(item._id));
                    }}
                  >
                    <i
                      style={{ color: 'red' }}
                      className='far fa-trash-alt'
                    ></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <br />
      <hr />
      <br />
      <br />
      <center>
        <h3>Grant Total: {Math.ceil(Grandtotal)}/-</h3>

        <br />
        <CheckOut
          amount={Math.ceil(Grandtotal) * 100}
          stripeApiKey={stripeApiKey}
        />
      </center>
    </div>
  );
};

export default Cart;
