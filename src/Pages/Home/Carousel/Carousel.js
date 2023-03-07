import React from 'react';
import img1 from '../../../img/img6.jpg';
import img2 from '../../../img/img4.jpg';
import img3 from '../../../img/img5.jpg';
import { FaArrowRight } from "react-icons/fa";

const Carousel = () => {

  const item =
    <>
      <div className='px-8' >
        <h1 className="text-3xl md:text-5xl  font-bold leading-10"> The easiest way <br /> to buy  & sell used <br /> furniture</h1>
        <button className="btn btn-warning mt-5">Shop Now  <FaArrowRight className='ml-3'/> </button>
      </div>
    </>
  return (
    <div className="carousel w-full py-8 mt-5">
      <div id="slide1" className="carousel-item relative w-full">
        <div className="hero ">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img alt='' src={img1} className="max-w-sm lg:max-w-lg" />
            {item}
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle hover:btn-warning ">❮</a>
          <a href="#slide2" className="btn btn-circle hover:btn-warning ">❯</a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <div className="hero  ">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img alt='' src={img2} className="max-w-sm" />
            {item}
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle hover:btn-warning">❮</a>
          <a href="#slide3" className="btn btn-circle hover:btn-warning">❯</a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <div className="hero  ">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img alt='' src={img3} className="max-w-sm" />
            {item}
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle hover:btn-warning">❮</a>
          <a href="#slide1" className="btn btn-circle hover:btn-warning">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Carousel;