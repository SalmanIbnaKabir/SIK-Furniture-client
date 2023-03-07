import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import Product from '../Product/Product';

const Products = () => {
  const products = useLoaderData();
  const [booking, setBooking] = useState('');
  const [modalClose, setModalClose] = useState(true)
  // console.log(products)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-10 '>
      {products.map(product => <Product key={product._id} product={product} setBooking={setBooking}></Product>)}
      {
        modalClose && <BookingModal product={booking} setModalClose={setModalClose}></BookingModal>
      }
    </div>
  );
};

export default Products;