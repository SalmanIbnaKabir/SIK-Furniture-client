import React from 'react';
import img1 from '../../../img/bedRoom.svg';
import img2 from '../../../img/kitchen.webp';
import img3 from '../../../img/diningRoom.png';
import { Link } from 'react-router-dom';

const CategoryFurniture = () => {


  const categoryOption = [
    {
      categoryId: 1,
      name: 'BedRoom Furniture',
      img: img1
    },
    {
      categoryId: 2,
      name: 'Kitchen Furniture',
      img: img2
    },
    {
      categoryId: 3,
      name: 'Dining Room Furniture',
      img: img3
    },
  ]
  return (

    <div className='my-10'>
      <h1 className='text-orange-500 text-center font-semibold text-xl'>Category Of Furniture</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-5 '>
        {/* home categoryOption */}

        {categoryOption.map(option =>
          <Link to={`products/${option.categoryId}`} key={option.categoryId}>
            <div className="card w-96 bg-base-200 shadow-xl">
              <figure className="px-10 pt-10">
                <img src={option.img} alt="Shoes" className="rounded-xl h-20 " />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{option.name}</h2>

              </div>
            </div>
          </Link>)}

      </div>
    </div>


  );
};

export default CategoryFurniture;