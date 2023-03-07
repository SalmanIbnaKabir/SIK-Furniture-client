import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../img/error-page.jpg';

const ErrorPage = () => {
  return (
    <div >
      <Link to='/' className='btn btn-warning mt-4'>Go back</Link>
      <img src={error} alt="error page" className='max-h-screen max-w-full' />
      
    </div>
  );
};

export default ErrorPage;