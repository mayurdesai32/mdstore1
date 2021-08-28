import React from 'react';
import axios from 'axios';
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAIL,
  USER_LOGOUT,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_REQUEST_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_FAIL,
} from './userConstant';

export const registerNewUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    await axios.post('/user/register', user);
    console.log('register successful');

    // console.log(response.data.message);
    dispatch({ type: USER_REGISTER_SUCCESS });
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    dispatch({ type: USER_REGISTER_FAIL, payload: err });
  }
};

export const loginUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const response = await axios.post('/user/login', user);
    console.log('login successful' + response.data.message);

    // console.log(response.data.message);
    dispatch({ type: LOGIN_REQUEST_SUCCESS, payload: response.data.message });
    localStorage.setItem('user', JSON.stringify(getState().userlogin.user));
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    dispatch({ type: LOGIN_REQUEST_FAIL, payload: err });
  }
};

export const forgotPassword = (emailid) => async (dispatch) => {
  const user = { email: emailid };
  // const config = {
  //   header: {
  //     'Content-Type': 'application/json',
  //   },
  // };
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    console.log(user);

    const response = await axios.post('/user/forgotpassword', user);
    dispatch({
      type: FORGOT_PASSWORD_REQUEST_SUCCESS,
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_REQUEST_FAIL, payload: error });
  }
};

// /resetpassword/:resetToken

export const resetPassword = (user) => async (dispatch) => {
  const { resettoken, password, cpassword } = user;
  const User = { password, cpassword };
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const response = await axios.put(`/user/resetpassword/${resettoken}`, User);
    dispatch({
      type: RESET_PASSWORD_REQUEST_SUCCESS,
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_REQUEST_FAIL, payload: error });
  }
};

// for logout
export const logOutUser = (userid) => async (dispatch, getState) => {
  try {
    console.log(userid);
    await axios.post('/user/logout', userid);
    // console.log('login successful' + response.data.message);

    dispatch({ type: USER_LOGOUT });

    localStorage.removeItem('user');
    localStorage.removeItem('cartItem');
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    // dispatch({ type: USER_LOGOUT_ERR, payload: err });
  }
};
