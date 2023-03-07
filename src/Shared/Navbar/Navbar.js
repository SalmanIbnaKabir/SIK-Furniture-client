import React, { useContext } from 'react';
import { FaUserAlt, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);


  const menuItems = <>
    <li className='font-semibold'><Link to='/'>Home</Link></li>

    <li className='font-semibold'><Link to='/blog'>Blog</Link></li>
    {
      user?.uid ?

        <>
          <li className='font-semibold'><Link to='/dashboard'>Dashboard</Link></li>

          <li><button onClick={logOut} type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Log Out</button></li>
        </>
        :
        <>
          <li className='font-semibold'><Link to='/login'>LogIn</Link></li>
        </>
    }



  </>


  return (
    <div className="navbar h-20 mb-12 pt-12">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {menuItems}
          </ul>
        </div>
        <Link className="btn btn-ghost normal-case text-xl" to='/'>
          {/* <img src='' alt="" /> */}
          <h2 className='text-orange-500 font-semibold text-2xl font-mono italic'>SIK Furniture</h2>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          {menuItems}
        </ul>
      </div>
      <div className="navbar-end avatar">

        <div title='My Profile' className="w-10 rounded-full ring ring-warning ring-offset-base-100 ring-offset-2">
          {user?.uid ? <img src={user.photoURL} alt='' /> : <FaUserCircle className='text-4xl'></FaUserCircle>}
        </div>

      </div>
    </div>
  );
};

export default Navbar;