import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
import {
  IoMdHome,
  IoMdClose,
  IoMdInformationCircle,
  IoIosChatbubbles,
  IoIosLogIn,
} from "react-icons/io";
 
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
 
  const toggleSidebar = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 
  useEffect(() => {
    const handleScroll = () => {
      const scrolledPixels = window.scrollY;
      const scrollThreshold = 100; 
 
      if (scrolledPixels > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
 
    window.addEventListener("scroll", handleScroll);
 
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
 
  return (
    <div>
      <nav
        className={`top-0 left-0 right-0 md:w-screen h-20 flex justify-between items-center p-2 pr-4 text-black z-50  ${
          scrolled ? "h-20 fixed shadow-md transition-top duration-500 ease-in-out bg-gray-100   text-black" : "bg-gradient-to-r from-rose-200 to-blue-200"
        }`}
        style={{
          top: scrolled ? "0" : "-60px",
        }}
      >
      <a href="#home">
      <img
  src=''
  alt="image"
  height={150}
  width={130}
  className="mt-3 ml-2 md:mt-4 mb-4 md:ml-20 "
  draggable={false}
/>
      </a>
 
 
        <div className="hidden md:flex container mx-auto justify-center items-center">
          <ul className="flex mx-auto gap-7">
            <li>
              <a
                href="#home"
                className=" hover:text-rose-500 hover:no-underline"
              >
                <b>Home </b>
              </a>
            </li>
            <li>
              <a
                href="#project"
                className=" hover:text-rose-500 hover:no-underline"
              >
                <b>About</b>
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className=" hover:text-rose-500 hover:no-underline"
              >
                <b>Services </b>
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className=" hover:text-rose-500 hover:no-underline"
              >
                <b>Contact </b>
              </a>
            </li>
          </ul>
          {/* <div className="mr-9">
            <button className="text-white rounded-full hover:bg-red-600  border border-red-500  hover:border-red-50 hover:scale-110 hover:delay-300">
              Get in Touch
            </button>
          </div> */}
<div className="mr-9 flex gap-5">
  {/* <a href="https://www.instagram.com/susant_37" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green -600  hover:scale-110 ease-in-out transition-all duration-300">
    <FiInstagram />
  </a> */}
 
<div className="flex gap-8 px-4">
<Link to="/login" className={`${scrolled?"bg-blue-300":"bg-gray-200"}  px-10 py-2 rounded-full items-center flex hover:bg-rose-400 font-bold transition-all ease-in-out duration-500 hover:scale-105 hover:text-white`
}>
Sign in
 
</Link>
<Link  to="/signup" className="border border-blue-400 px-10 py-2 rounded-full items-center flex hover:bg-rose-400 font-bold transition-all ease-in-out duration-500 hover:scale-105 hover:text-white">
  Sign up
 
</Link>
</div>
 
 
 

</div>
 
 
        </div>
        <div className="md:hidden">
          <FiMenu
            className="text-white hover:text-rose-500 hover:no-underline ml-2 mr-5 cursor-pointer"
            size={24}
            onClick={toggleSidebar}
          />
        </div>
      </nav>
 
      {isMenuOpen && (
        <div
          className={`fixed inset-y-0 right-0 w-75 bg-rose-200 shadow-md z-50 transform transition duration-500 ease-in-out  ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4  ">
            {/* Close icon */}
            <IoMdClose
              className="text-black hover:text-green-600 hover:no-underline cursor-pointer"
              size={24}
              onClick={toggleSidebar}
            />
            <img
              src=''
              alt="image"
              height={80}
              width={140}
              className="mt-3 mr-6 ml-2 md:mt-4 mb-4 md:ml-12 "
              draggable={false}
           
            />
          </div>
          <ul className="py-4 flex flex-col pt-5 gap-5">
            <li>
              <a
                href="#home"
                className="text-black hover:text-green-600 hover:no-underline"
                onClick={toggleSidebar}
              >
                <b className="pl-12 flex gap-5">
                  {" "}
                  <IoMdHome />
                  Home
                </b>
              </a>
            </li>
            <li>
              <a
                href="#project"
                className="text-black hover:text-green-600 hover:no-underline"  onClick={toggleSidebar}
              >
                <b className="pl-12 flex gap-5">
                  <IoMdInformationCircle />
                  Project
                </b>
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className="text-black hover:text-green-600 hover:no-underline"  onClick={toggleSidebar}
              >
                <b className="pl-12 flex gap-5">
                  <IoIosChatbubbles />
                  Experience
                </b>
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-black hover:text-green-600 hover:no-underline"  onClick={toggleSidebar}
              >
                <b className="pl-12 flex gap-5">
                  <IoIosLogIn />
                  Contact
                </b>
              </a>
            </li>
          </ul>
          <div className="pl-12 pt-7">
          <Link to="/carrear">
              <button className="pl-6 pr-6 rounded-full px-8  border border-green-900 text-black h-10 font-semibold bg-green-600 hover:bg-red-800 hover:border-black hover:text-white hover:scale-110 transition-transform duration-300 mr-4">
                My Career
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default NavBar;