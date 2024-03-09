// Sidebar.js

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "cookie-universal";
import useAuth from "../../../hooks/useAuth";
import "./Sidebar.css";
import { FaRegUser, FaUsers } from "react-icons/fa";
import { IoHomeOutline, IoBagCheckOutline, IoLogOut } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbCategory2, TbCategoryPlus, TbUsersPlus } from "react-icons/tb";
import { CiBoxes } from "react-icons/ci";
import { MdAddBox } from "react-icons/md";

const Sidebar = () => {
  // Retrieve authentication details and setAuth function from useAuth hook
  const { auth, setAuth } = useAuth();
  const user = auth?.id; // Extract user ID from authentication details

  // Create a new instance of Cookies
  const NewCookie = new Cookies();

  // Use the useNavigate hook to get the navigate function
  const navigate = useNavigate();

  // Define the signout function to clear the authentication cookie and navigate to the home page
  const signout = async () => {
    NewCookie.remove("auth"); // Remove the authentication cookie
    await setAuth({}); // Clear the authentication details
    navigate("/"); // Navigate to the home page
    alert("Logout"); // Display a logout alert
  };

  // Extract the current pathname from the useLocation hook
  const { pathname } = useLocation();

  // Define a function to determine if a link should be considered active based on the current pathname
  const activeLink = ({ isActive }) => (isActive ? "active" : "");

  return (
    <>
      {/* Sidebar Container */}
      <div className="sidebar">
        <p> Menu </p>
        
        {/* Dashboard Link */}
        <Link
          className={activeLink({
            isActive: pathname === "/",
          })}
          to="/dashboard"
        >
          <LuLayoutDashboard className="side-icon" />
          Dashboard
        </Link>
        <div className="sid-br"></div>
        
        {/* Orders Link */}
        <Link to="/dashboard/orders">
          <IoBagCheckOutline className="side-icon" />
          Orders
        </Link>
        <div className="sid-br"></div>
        
        {/* Categories Links */}
        <Link to="/dashboard/categories">
          <TbCategory2 className="side-icon" />
          Categories
        </Link>
        <Link to="/dashboard/addcategory">
          <TbCategoryPlus className="side-icon" />
          Add Category
        </Link>
        <div className="sid-br"></div>
        
        {/* Products Links */}
        <Link to="/dashboard/products">
          <CiBoxes className="side-icon" />
          Products
        </Link>
        <Link to="/dashboard/addproduct">
          <MdAddBox className="side-icon" />
          Add Product
        </Link>
        <div className="sid-br"></div>
        
        {/* Users Links */}
        <Link to="/dashboard/users">
          <FaUsers className="side-icon" />
          Users
        </Link>
        <Link to="/dashboard/adduser">
          <TbUsersPlus className="side-icon" />
          Add User
        </Link>
        <div className="sid-br"></div>
        
        {/* My Profile Link */}
        <Link to={`/dashboard/user/${user}`}>
          <FaRegUser className="side-icon" />
          My Profile
        </Link>
        
        {/* Logout Link */}
        <Link onClick={(e) => signout()}>
          <IoLogOut className="side-icon" />
          Logout
        </Link>
        
        {/* Back Home Link */}
        <Link to="/">
          <IoHomeOutline className="side-icon" />
          Back Home
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
