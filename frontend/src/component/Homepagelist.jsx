import React from 'react';
// import { withRouter } from 'react-router-dom';
// import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Homepagelist = () => {
  return (
    <div className='Homepagelist'>
      {/* <Link to={`/singleshow/${id}`} className='Listitem'></Link> */}
      <Link className='cat1 hat'>
        {/* <a href='/'> */}
        <div className='subcat'>
          <h3>Hat</h3>
          <p>Shop now</p>
        </div>
        {/* </a> */}
      </Link>
      {/* end of list1 */}
      <Link className='cat1 '>
        <div className='subcat'>
          <h3>Shoes</h3>
          <p>Shop now</p>
        </div>
      </Link>
      <Link className='cat1 '>
        <div className='subcat'>
          <h3>Jacket</h3>
          <p>Shop now</p>
        </div>
      </Link>
      <Link className='cat1 '>
        <div className='subcat'>
          <h3>Men</h3>
          <p>Shop now</p>
        </div>
      </Link>
      <Link className='cat1 '>
        <div className='subcat'>
          <h3>Women</h3>
          <p>Shop now</p>
        </div>
      </Link>
    </div>
  );
};

// export default withRouter(Homepagelist);
export default Homepagelist;
