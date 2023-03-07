import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import Navbar from '../Shared/Navbar/Navbar';



const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);

  return (
    <div>
      <Navbar></Navbar>
      <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden">Open SideBar</label>
      <div className="drawer drawer-mobile">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content  " >
          {/* <!-- Page content here -->  style={{ overflow: "hidden" }}*/}

          <Outlet></Outlet>


        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80  text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li><Link to='/dashboard'>My Orders</Link></li>

            {
              isSeller &&
              <>
                <li><Link to='/dashboard/addproduct'>Add Product</Link></li>
                <li><Link to='/dashboard/myproduct'>My Product</Link></li>

              </>
            }
            {
              isAdmin &&
              <>

                <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                <li><Link to='/dashboard/allsellers'>All Sellers</Link></li>
                <li><Link to='/dashboard/reporteditems'>Reported Items</Link></li>

              </>
            }

          </ul>

        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;