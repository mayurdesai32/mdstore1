import React from 'react';
import ItemList from '../ItemList';
import './MenuItem_style.scss';
const MenuItem = ({ title, routeName, items }) => {
  return (
    <div className='MenuItem'>
      <h1 className='MenuItem_title'>{title.toUpperCase()}</h1>
      <div className='subMenuItem'>
        {items
          .filter((element, index) => index < 4)
          .map(({ id, ...otherection }) => (
            <ItemList key={id} id={id} {...otherection} />
          ))}
      </div>
      <br />
      {/* <hr /> */}
      <br />
    </div>
  );
};

export default MenuItem;
