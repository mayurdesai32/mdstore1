import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../Redux/user/userAction';
import { Link, useHistory } from 'react-router-dom';
// userForgotPassword;
const Forgotpassword = () => {
  const [userEmail, setuserEmail] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const onchange = (e) => {
    setuserEmail(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(userEmail);
    dispatch(forgotPassword(userEmail));
  };
  const curruser = useSelector((state) => state.userlogin.user);
  useEffect(() => {
    if (curruser) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className='userauth card'>
      <br />
      <p className='userauth_title'>Forgot Password</p>
      <br />

      <form onSubmit={submitHandler}>
        <label htmlFor='#email' className='label_userauth'>
          Email
        </label>
        <br />
        <input
          type='email'
          id='email'
          className='input_userauth'
          name='email'
          value={userEmail}
          onChange={onchange}
          required
        />

        <br />
        <button type='submit' className='btn_userauth'>
          Send Email
        </button>
      </form>
      <div>
        <center>
          <p>
            Create an account? <Link to='/register'>Signup</Link>
          </p>
        </center>
      </div>
    </div>
  );
};

export default Forgotpassword;
