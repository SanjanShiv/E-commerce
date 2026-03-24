import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ShoppingBag, Search, Heart, ShoppingCart, 
  Menu, Zap, Truck, Sun, Moon 
} from "lucide-react";
import AuthService from "../services/auth.service";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const currentUser = AuthService.getCurrentUser();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const hideBottomBar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="navbar-wrapper">
      <div className="navbar-top">
        <Link to="/" className="navbar-brand">
          <ShoppingBag size={28} />
          <span>SanjuStore</span>
        </Link>
        
        <div className="navbar-search">
          <Search className="search-icon" />
          <input type="text" placeholder="Search for products, brands..." />
          <button>Search</button>
        </div>
        
        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle Dark Mode">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {currentUser ? (
            <>
              <Link to="/profile" className="user-greeting">
                <img src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" alt="User" />
                <span>Hello, {currentUser.username.split('@')[0]}!</span>
              </Link>
              <Link to="#" className="action-item">
                <Heart size={20} /> Wishlist
                <span className="action-badge">3</span>
              </Link>
              <Link to="#" className="action-item">
                <ShoppingCart size={20} /> Cart
                <span className="action-badge">2</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="action-item" style={{ fontWeight: 600, color: 'var(--primary-color)' }}>
                Sign In
              </Link>
              <Link to="/register" className="action-item" style={{ fontWeight: 600 }}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      
      {!hideBottomBar && (
        <div className="navbar-bottom">
        <button className="btn-categories">
          <Menu size={18} /> All Categories
        </button>
        <div className="nav-links">
          <Link to="#">Electronics</Link>
          <Link to="#">Fashion</Link>
          <Link to="#">Home & Kitchen</Link>
          <Link to="#">Books</Link>
          <Link to="#">Sports</Link>
          <Link to="#">Beauty</Link>
          <Link to="#">Toys & Games</Link>
        </div>
        <div className="nav-deals">
          <div className="deal-item hot">
            <Zap size={16} /> Deals
          </div>
          <div className="deal-item track">
            <Truck size={16} /> Track Order
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Navbar;
