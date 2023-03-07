import React from 'react';


const Product = ({ product, setBooking }) => {
  const { name, picture, resalePrice, originalPrice, yearsOfUse, postedTime, sellerName, location } = product;
  // console.log(picture);

  return (

    <div className="card w-96  bg-base-200  shadow-xl">
      <figure className="px-10 pt-10">
        <img src={picture} alt="furniture" className="rounded-xl" />
      </figure>
      <div className="card-body ">
        <h2 className="card-title my-3">{name}</h2>
        <p>Use Time: {yearsOfUse}</p>
        <p>Original Price : ${originalPrice}</p>
        <p>Sell Price : <span className='text-orange-500 font-semibold'>${resalePrice}</span></p>
        <small>post: {postedTime}</small>
        <p className='text-sm text-gray-500 flex justify-between'><span>Seller: {sellerName}</span> <span>Location: {location}</span></p>

        <div className="card-actions mt-5">
          <label htmlFor="booking-modal" className="btn btn-warning" onClick={() => { setBooking(product) }} >Buy Now</label>
        </div>
      </div>

    </div>

  );
};

export default Product;