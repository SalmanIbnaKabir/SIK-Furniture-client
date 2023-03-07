import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../../Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Dashboard/AllSellers/AllSellers";
import MyBookings from "../../Dashboard/MyBookings/MyBookings";
import MyProduct from "../../Dashboard/MyProduct/MyProduct";
import ReportedItems from "../../Dashboard/ReportedItems/ReportedItems";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Blog from "../../Pages/Blog/Blog";
import Home from "../../Pages/Home/Home/Home";
import Products from "../../Pages/Products/Products/Products";
import DisplayError from "../../Shared/DisplayError/DisplayError";
import ErrorPage from "../../Shared/ErrorPage/ErrorPage";
import Login from "../../Shared/Login/Login";
import SingUp from "../../Shared/SignUp/SingUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/blog',
        element: <Blog></Blog>
      },
      {
        path: '/signup',
        element: <SingUp></SingUp>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/products/:id',
        element: <PrivateRoute><Products></Products></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: '/dashboard',
        element: <MyBookings></MyBookings>
      },
      {
        path: '/dashboard/allbuyers',
        element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
      },
      {
        path: '/dashboard/allsellers',
        element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
      },
      {
        path: '/dashboard/reporteditems',
        element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
      },
      {
        path: '/dashboard/addproduct',
        element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
      },
      {
        path: '/dashboard/myproduct',
        element: <SellerRoute><MyProduct></MyProduct></SellerRoute>
      }
    ]
  },


  {
    path: '*',
    element: <ErrorPage></ErrorPage>
  }
]);

export default router;