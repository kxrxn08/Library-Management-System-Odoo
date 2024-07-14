import React, { useEffect, useState } from 'react';
import icon from "../Images/icon.png"
// from "jwt-decode" import jwtDecode as jwt_decode ;
import {jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [token, setToken] = useState('');
var [decode, setDecode] = useState({});
var [name, setName] = useState("");
  var decoded = null;
  const navigate=useNavigate();
  useEffect(() => {
    var token = localStorage.getItem("access_token");
    if (token != null) 
          {
            decoded = jwtDecode(token);
          setDecode(decoded);
          setName(decoded.fullName);
          setToken(token);
        }
        else {
            setToken(null);
          }
    // console.log("1234",Cookies.get("session"))
  }, []);
  const logout = () => {

    localStorage.removeItem("access_token");
    window.location.reload();
    navigate("/");
  };

  const navigateToLogin=()=>{
    navigate("/login");
  }
  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 mt-1">
            <a href="/" className="text-lg font-bold text-dark px-3 py-2  ">
              Public Library
            </a>
            </div>
            {/* <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a>
                <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
              </div>
            </div> */}
          </div>
          <div className="ml-3 relative">
            <div>
              {token ? <button
                type="button"
                className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white"
                id="user-menu"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {/* <span className="sr-only">Open user menu</span> */}
                 <div className='flex gap-2 text-center p-2'>

                <img
                  className="h-8 w-8 rounded-full"
                  src={icon}
                  alt="User avatar"
                  />
                
                {name && <h1 className='text-black mt-2'>{name}</h1>}
                  </div> 
              </button>: 
              <button
              type="button"
                className="flex text-sm border-2 border-transparent border-3 border-red-800 rounded-lg  focus:outline-none focus:border-white bg-red-300 py-2 px-4 capitalize font-semibold "
                onClick={navigateToLogin}
              >
                Login
              </button>
              }
            </div>
            {dropdownOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <a
                  href="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Profile
                </a>
                <a
                href='/'
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={logout}
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</a>
            <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Services</a>
            <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar