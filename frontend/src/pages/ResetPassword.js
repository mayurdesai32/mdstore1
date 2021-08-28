import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPassword } from '../Redux/user/userAction';
const ResetPassword = ({ match }) => {
  // const Id = match.params.id;
  const resettoken = match.params.resettoken;
  console.log('hello');

  const dispatch = useDispatch();
  // useEffect(() => {

  //   // eslint-disable-next-line
  // }, []);
  const [user, setuser] = useState({
    password: '',
    cpassword: '',
  });
  const onchange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const User = { ...user, resettoken: resettoken };
    console.log(User);
    dispatch(resetPassword(User));
    // dispatch(loginUser(user));
  };
  // const curruser = useSelector((state) => state.userlogin.user);

  const { password, cpassword } = user;
  return (
    <div className='userauth card'>
      <p className='userauth_title'>Reset Password</p>
      <div>{resettoken}</div>;
      <form onSubmit={submitHandler}>
        <label htmlFor='#password' className='label_userauth'>
          Password
        </label>
        <br />
        <input
          type='password'
          id='password'
          className='input_userauth'
          name='password'
          value={password}
          onChange={onchange}
          required
        />
        <br />

        <label htmlFor='#cpassword' className='label_userauth' required>
          confirm Password
        </label>
        <br />
        <input
          type='password'
          id='password'
          name='cpassword'
          value={cpassword}
          onChange={onchange}
          className='input_userauth'
          required
        />
        <br />
        <button type='submit' className='btn_userauth'>
          Login
        </button>
      </form>
      {/* <div>
        <center>
          <p>
            Create an account? <Link to='/register'>Signup</Link>
          </p>
        </center>
      </div> */}
    </div>
  );
};

export default ResetPassword;
