import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerNewUser } from '../Redux/user/userAction';
import { Link, useHistory } from 'react-router-dom';
const RegisterPage = () => {
  const history = useHistory();
  const [user, setuser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    cpassword: '',
  });
  const { name, email, phone, password, cpassword } = user;

  const dispatch = useDispatch();
  const curruser = useSelector((state) => state.userlogin.user);
  // const { loading, error, success } = useSelector((state) => state.users);

  const onchange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password === cpassword) {
      dispatch(registerNewUser(user));
    } else {
      alert(`Password doesn't Match the confirm password`);
    }
  };
  useEffect(() => {
    if (curruser) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className='userauth card'>
      <p className='userauth_title'>Register</p>
      <form onSubmit={submitHandler}>
        <label htmlFor='#name' className='label_userauth'>
          Name
        </label>
        <br />
        <input
          type='text'
          id='name'
          className='input_userauth'
          name='name'
          value={name}
          onChange={onchange}
          required
        />

        <br />
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
        <label htmlFor='#phone' className='label_userauth'>
          Phone No
        </label>
        <br />
        <input
          type='number'
          id='phone'
          className='input_userauth'
          name='phone'
          value={phone}
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
          className='input_userauth'
          name='password'
          value={password}
          onChange={onchange}
          required
        />
        <br />
        <label htmlFor='#cpassword' className='label_userauth'>
          Confirm Password
        </label>
        <br />
        <input
          type='password'
          id='cpassword'
          className='input_userauth'
          name='cpassword'
          value={cpassword}
          onChange={onchange}
          required
        />
        <br />
        <button className='btn_userauth' type='submit'>
          Register
        </button>
      </form>
      <div>
        <center>
          <p>
            Have already an account? <Link to='/login'>Login here</Link>
          </p>
        </center>
      </div>
    </div>
  );
};

export default RegisterPage;
