import React, { Component } from 'react';
import SHOP_DATA from '../../data/SHOP_DATA';
import MenuItem from '../../component/MenuItem/MenuItem.jsx';
import './Shopstyle.scss';
class Shop extends Component {
  constructor() {
    super();
    this.state = {
      collection: SHOP_DATA,
    };
  }
  render() {
    const collection = this.state.collection;
    return (
      <div className='shop'>
        <div className='shop_topic'>COLLECTION</div>

        {collection.map(({ id, ...othersection }) => (
          <MenuItem key={id} {...othersection} />
        ))}
      </div>
    );
  }
}

export default Shop;
