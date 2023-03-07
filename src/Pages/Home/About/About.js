import React from 'react';
import img4 from  '../../../img/img1.jpg';


const About = () => {
  return (
    <div className=' py-10 '>
      <div className="hero ">
        <div className="hero-content flex-col gap-6 lg:flex-row">
          <img alt='' src={img4} className="w-1/2" />
          <div>
            <h1 className="text-5xl font-bold">Why shop for secondhand furniture first?</h1>
            <p className="py-6 text-lg ">We’re shouting it from the rooftops—secondhand furniture should be your first choice! In fact, well-made used furniture can last through generations. Furniture holds memories. We gather around it in times of joy and celebration; we curl up with our loved ones on it; we use it to store our most-prized possessions. Buying pre-loved furniture adds character to your home through its imperfections and the stories it carries. We’re here to continue those stories and create a world where furniture is circular, sustainable, and here to stay. </p>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;