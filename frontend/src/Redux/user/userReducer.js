import React from 'react';
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

let InitailState = { user: [], loading: false };

export const userRegisterReducer = (state = InitailState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
InitailState = { loading: false };

export const userLoginReducer = (state = InitailState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };

    case LOGIN_REQUEST_SUCCESS:
      return { loading: false, success: true, user: action.payload };

    case LOGIN_REQUEST_FAIL:
      return { loading: false, error: action.payload, success: false };
    case USER_LOGOUT:
      return { loading: false, user: null, success: true };

    default:
      return state;
  }
};

export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { ...state, loading: true };

    case FORGOT_PASSWORD_REQUEST_SUCCESS:
      return { loading: false, success: true, message: action.payload };

    case FORGOT_PASSWORD_REQUEST_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const userResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { ...state, loading: true };

    case RESET_PASSWORD_REQUEST_SUCCESS:
      return { loading: false, success: true, user: action.payload };

    case RESET_PASSWORD_REQUEST_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
