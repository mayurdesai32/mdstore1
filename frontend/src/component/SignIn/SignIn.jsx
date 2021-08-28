import React, { Component } from 'react';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className='SignIn'>
        <h3>I already have an account </h3>
        <br />
        <p>Sign in with you email and password</p>
        <br />
        <form action=''>
          <div>
            <label htmlFor=''> Email</label>
            <input type='text' />
          </div>
          <br />
          <div>
            <label htmlFor=''>Password</label>
            <input type='text' />
          </div>
          <br />
          <div>
            <button>Sign in</button>
            <button>Sign in with Google</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
