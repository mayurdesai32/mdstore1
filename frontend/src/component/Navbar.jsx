import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../Redux/user/userAction';

const Navbar = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cartItem);
  const curruser = useSelector((state) => state.userlogin.user);
  const totalqty = cartItem.reduce((acc, item) => acc + item.quatity, 0);
  const logout = () => {
    dispatch(logOutUser(curruser._id));
  };
  // useEffect(() => {
  //   // react - hooks / exhaustive - deps;
  //   // eslint-disable-next-line
  // }, [logout]);
  return (
    <>
      <div className='navbarTop '>
        <div>
          <Link to='/' className='navbarTop_link'>
            <i className='fas fa-user'></i>
            Login in
          </Link>
        </div>
        <div>
          <Link to='/' className='navbarTop_link'>
            <i className='fas fa-user'></i>
            My Account
            <i className='fas fa-chevron-down'></i>
          </Link>
        </div>
        <div>
          <Link to='/' className='navbarTop_link'>
            <i className='fas fa-map-marker-alt'></i>
            Track order
          </Link>
        </div>
        <div>
          <Link to='/' className='navbarTop_link'>
            <i className='fas fa-phone-alt'></i>
            help
          </Link>
        </div>
      </div>
      <div className='navbar'>
        <div className='nav_container'>
          <div className=' navbar_nav'>
            <div className='nav_brand'>
              <Link to='/'>
                <i className='fas fa-store'></i>
                <span className='nav_brand_text'>MD STORE </span>
              </Link>
            </div>
            <ul className='nav_links'>
              <li className='links_link'>
                <Link to='/shop'>SHOP</Link>
              </li>
              <li className='links_link'>
                <Link to='/singlepage'>CONTACT</Link>
              </li>
              <li className='links_link'>
                {!curruser ? (
                  <Link to='/login'>SIGN IN</Link>
                ) : (
                  <Link onClick={logout}>LOGOUT</Link>
                )}
              </li>
              <li className='links__link'>
                <Link to='/cart'>
                  <i className='fas fa-shopping-cart'>CART {totalqty}</i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
