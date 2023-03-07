import React from 'react';
import About from '../About/About';
import Carousel from '../Carousel/Carousel';
import CategoryFurniture from '../CategoryFurniture/CategoryFurniture';

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <CategoryFurniture></CategoryFurniture>
      <About></About>
    </div>
  );
};

export default Home;