import React, { useState } from 'react';
import { FaUserCircle, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { messageClear } from '../store/reducers/authReducer';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const cartItems = useSelector((state) => state.cart.cartItems); // 👈
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const logoutHandler = () => {
    localStorage.removeItem('userToken');
    dispatch(messageClear()); // optional
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/home"><img src="/rebuyhub.png" alt="Logo" className="h-20 w-auto" />
        </Link>
        

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-[75%] py-2 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Account and Cart Icons */}
        <div className="flex items-center space-x-6">
          {/* Account Dropdown */}
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="flex items-center space-x-2 text-gray-700"
            >
              <FaUserCircle className="text-2xl" />
              <span>Account</span>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                <ul className="py-2">
                  <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Profile</li>
                  <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Settings</li>
                  <li onClick={logoutHandler} className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Logout</li>
<Link to="/orders"><li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">My Orders</li></Link>
                  <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">My Cart</li>
                </ul>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <div>
            {/* Cart Icon */}
<Link to="/cart" className="relative text-gray-700">
  <FaShoppingCart className="text-2xl" />
  {cartItems.length > 0 && (
    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
      {totalQuantity}
    </span>
  )}
</Link>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
