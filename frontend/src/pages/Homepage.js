import React from 'react';
import Shop from './Shop/Shop';
import Homepagelist from '../component/Homepagelist';
const Homepage = () => {
  return (
    <div className='homepage'>
      <Homepagelist />
      {/* <div className='List'>
        <ItemList />
        <ItemList /> <ItemList /> <ItemList /> <ItemList /> <ItemList />{' '}
        <ItemList /> <ItemList /> <ItemList /> <ItemList /> <ItemList />
      </div> */}
      <Shop />
    </div>
  );
};

export default Homepage;
