import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';
import Homepage from './pages/Homepage';
import Navbar from './component/Navbar';
import Cart from './pages/Cart/Cart';
import SinglePage from './pages/SinglePage/SinglePage';
import SignInAndSingUp from './pages/SignInAndSingUp/SignInAndSingUp.jsx';
import RegisterPage from './pages/RegisterPage';
import Loginpage from './pages/Loginpage';
import Forgotpassword from './pages/Forgotpassword';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import Footer from './component/Footer/Footer';
import Allproduct from './pages/Allproduct/Allproduct';
import ResetPassword from './pages/ResetPassword';
function App() {
  const [stripeApiKey, setstripeApiKey] = useState('');
  const stripeapi = async () => {
    const response = await axios.get(`order/stripeapi`);
    console.log(response);
    setstripeApiKey(response.data.stripeApiKey);
  };
  useEffect(() => {
    stripeapi();
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <div className='body_container'>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/shop' component={Allproduct} />
          <Route path='/singlepage/:id' component={SinglePage} />
          <Route exact path='/signinandsingup' component={SignInAndSingUp} />
          <Route exact path='/allproduct' component={Allproduct} />
          <Route exact path='/cart'>
            <Cart stripeApiKey={stripeApiKey} />
          </Route>
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/login' component={Loginpage} />
          <Route exact path='/forgotpassword' component={Forgotpassword} />
          <Route
            exact
            path='/resetpassword/:resettoken'
            component={ResetPassword}
          />
        </Switch>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
