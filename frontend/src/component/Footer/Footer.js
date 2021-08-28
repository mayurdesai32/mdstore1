import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getproducts } from '../../Redux/product/productAction';
const Footer = () => {
  const dispatch = useDispatch();
  const { loading, products, error, productsCount } = useSelector(
    (state) => state.product
  );
  console.log(products);
  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch]);
  return <div>helloworld</div>;
};

export default Footer;
