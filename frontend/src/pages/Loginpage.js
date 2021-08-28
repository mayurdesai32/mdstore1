import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/user/userAction';
import { Link, useHistory } from 'react-router-dom';

const Loginpage = () => {
  const [user, setuser] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const { email, password } = user;
  const onchange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);
    dispatch(loginUser(user));
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
      <p className='userauth_title'>Login</p>
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
          value={email}
          onChange={onchange}
          required
        />
        <br />

        <label htmlFor='#password' className='label_userauth' required>
          Password
        </label>
        <br />
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={onchange}
          className='input_userauth'
          required
        />

        <Link to='/forgotpassword'>forgot password</Link>
        <br />
        <button type='submit' className='btn_userauth'>
          Login
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

export default Loginpage;
