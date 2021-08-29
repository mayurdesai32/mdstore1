import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './SinglePage_Style.scss';
import { getallproductById } from '../../Redux/product/productAction';
import { addToCart } from '../../Redux/cart/cartAction';
const SinglePage = ({ match }) => {
  const [quantity, setquantity] = useState(1);
  const Id = match.params.id;
  const dispatch = useDispatch();

  const { product, loading, error, success } = useSelector(
    (state) => state.singleproduct
  );
  // console.log(error);
  // console.log(product);
  useEffect(() => {
    dispatch(getallproductById(Id));
    // eslint-disable-next-line
  }, []);

  const addtocart = () => {
    dispatch(addToCart(product, parseInt(quantity)));
    // console.log(product);
  };
  const err = error || 'product not found ';

  return (
    <div className='SingleProduct'>
      <Link to='/' className='address'>
        <i className='fas fa-arrow-left'>back</i>
      </Link>
      <h1>{Id}</h1>
      {loading ? (
        <h1>loading...</h1>
      ) : !success ? (
        <center>
          <h1>{err}</h1>
        </center>
      ) : (
        <>
          <div className='SingleProduct_detail' key={Id}>
            <div className='SingleProduct_info card'>
              <h3 className='SingleProduct_title'>{product.name}</h3>
              <hr />
              <center className='SingleProduct_image'>
                <img
                  src={
                    'https://m.media-amazon.com/images/I/61PDbUd1VaL._SL1500_.jpg'
                  }
                  alt='ProductImage'
                  className='image_fluid'
                />
              </center>
              <div className='SingleProduct_price'></div>
              <div className='SingleProduct_desc'>{product.desc}</div>
            </div>
            <div className='SingleProduct_detail2 '>
              <div className='SingleProduct_cart card'>
                <h3 className='SingleProduct_price'>Price:{product.price}</h3>
                <hr />
                <div className='SingleProduct_qty'>
                  <p className='SingleProduct_qty_info'>Select Quantity</p>

                  <select
                    className='SingleProduct_qty_opt'
                    value={quantity}
                    onChange={(e) => {
                      setquantity(e.target.value);
                    }}
                  >
                    {[...Array(product.stock).keys()].map((x, i) => {
                      return (
                        <option value={i + 1} key={i}>
                          {i + 1}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <hr />
                <div className='SingleProduct_cart'>
                  {product.stock ? (
                    <>
                      <div className='SingleProduct_stock'>stock available</div>
                      <button onClick={addtocart}>add to card</button>
                    </>
                  ) : (
                    <>
                      <div className='SingleProduct_stock'>
                        stock unavailable
                      </div>

                      <button disabled>out of stock</button>
                    </>
                  )}
                </div>
              </div>
              <div className='SingleProduct_review card'>
                <h2 className='SingleProduct_review_title'>Give Your Review</h2>
                <div className='SingleProduct_review_rating p2'>rating</div>
                <div>
                  <input type='text' className='SingleProduct_review_input ' />
                </div>
                <div>
                  <button className='SingleProduct_review_btn'>
                    Submit Review
                  </button>
                </div>
                <h3 className='SingleProduct_review_latest'>Latest Reviews</h3>{' '}
                {/* <div className='SingleProduct_review'>rating</div> */}
                {/* start */}
                <div>
                  <div className='SingleProduct_review_rating p2'>rating</div>
                  <div className='SingleProduct_review_desc'>good one</div>
                  <div className='SingleProduct_review_by p2'>by wds</div>
                </div>
                <hr />
                {/* end */}
                {/* start */}
                <div>
                  <div className='SingleProduct_review_rating p2'>rating</div>
                  <div className='SingleProduct_review_desc'>good one</div>
                  <div className='SingleProduct_review_by p2'>by wds</div>
                </div>
                <hr />
                {/* end */}
                {/* start */}
                <div>
                  {/* <div className='SingleProduct_review'>rating</div> */}
                  <div className='SingleProduct_review_rating p2'>rating</div>
                  <div className='SingleProduct_review_desc'>good one</div>
                  <div className='SingleProduct_review_by p2'>by wds</div>
                </div>
                <hr />
                {/* end */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePage;
