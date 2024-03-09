import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "cookie-universal";
import "./Header.css";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/Images/Moon Shop-logos/Moon Shop-logos_transparent.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import SearchTerm from "../search/SearchTerm";

const Header = () => {
  // Authentication and user information
  const { auth, setAuth } = useAuth();
  const isAdmin = auth?.admin;
  const user = auth?.email;
  const userId = auth?.id;

  // Cookie handling
  const NewCookie = new Cookies();

  // Navigation
  const navigate = useNavigate();

  // Signout function
  const signout = async () => {
    NewCookie.remove("auth");
    await setAuth({});
    navigate("/");
    alert("Logout");
  };

  // Navbar state
  const [active, setActive] = useState("nav__menu");
  const [isOpen, setIsOpen] = useState(false);

  // Shopping cart information
  const { cartQuantity } = useShoppingCart();

  // Toggle navbar visibility
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Number of items in the cart
  const cartItems = cartQuantity;

  return (
    <nav className={`navbar ${isOpen ? "active" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={logo} alt={logo} className="logo" />
        </Link>

        {/* Menu icon */}
        <div className="menu-icon" onClick={toggleNavbar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation menu */}
        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <li className="nav-item">
            {/* Empty Link element */}
            <Link className="nav-link"></Link>
          </li>
          <li className="nav-item">
            {/* Link for search term component */}
            <Link className="nav-link">
              <SearchTerm />
            </Link>
          </li>
          <li className="nav-item">
            {/* Home link */}
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            {/* All Products link */}
            <Link to="/allproducts" className="nav-link">
              All Product
            </Link>
          </li>

          {/* Profile link for authenticated users */}
          {user && (
            <li className="nav-item">
              <Link to={`updateuser/${userId}`} className="nav-link">
                Profile
              </Link>
            </li>
          )}

          {/* Dashboard link for admin users */}
          {isAdmin && (
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
          )}

          {/* Login/Logout links */}
          {!user ? (
            <li className="nav-item">
              {/* Login link for unauthenticated users */}
              <Link to="/signin" className="nav-link">
                Login
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              {/* Logout link for authenticated users */}
              <Link onClick={(e) => signout()} className="nav-link">
                Logout
              </Link>
            </li>
          )}

          {/* Shopping cart link */}
          <li className="nav-item">
            <Link to="/cart" className="nav-link navbar-right">
              <span className="cart_icon">
                <RiShoppingCartLine />
              </span>
              {cartItems > 0 && <span className="cart-items">{cartItems}</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
