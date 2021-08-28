import React from 'react';
import { Link } from 'react-router-dom';
const ItemList = ({ id, name, imageUrl, price }) => {
  return (
    <Link to={`/singlepage/${id}`} className='ItemList hat'>
      <img
        src={imageUrl}
        // src={
        //   'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/13170748/2021/1/5/6816ad8b-f84a-46af-94a6-4332b83cfe4b1609827169710-Levis-Men-Shirts-1901609827168502-6.jpg'
        // }
        alt={name}
        className='ItemList_image'
      />
      <div className='ItemList_info'>
        <h4 className='ItemList_brand'>Brand</h4>
        <p className='ItemList_name'>{name}</p>
        <p className='ItemList_price'>{price}</p>
      </div>
      {/* <div className='ItemList_hover'>
        <div>
          <button>View Product</button>
        </div>
        <div>
          <button>add to wishlish</button>
          <button>add to cart</button>
        </div>
      </div> */}
    </Link>
  );
};

export default ItemList;
