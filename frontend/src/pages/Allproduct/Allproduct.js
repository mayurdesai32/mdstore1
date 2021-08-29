import React, { useState, useEffect } from 'react';
import ItemList from '../../component/ItemList.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getallproducts } from '../../Redux/product/productAction';

const Allproduct = () => {
  // const [product, setproduct] = useState([]);
  const dispatch = useDispatch();
  const { products, loading, error, success } = useSelector(
    (state) => state.product
  );
  // console.log(products.products);
  useEffect(() => {
    dispatch(getallproducts());
    // eslint-disable-next-line
  }, []);
  const err = error || 'Found Some Error';
  return (
    <div className='all_product'>
      {loading ? (
        <h1>loading...</h1>
      ) : !success ? (
        <h1>{err}</h1>
      ) : (
        products.map((product, index) => (
          <ItemList
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.price}
            id={product._id}
            key={product._id}
          />
        ))
      )}
      {/*  */}
    </div>
  );
};

export default Allproduct;
