import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/mobile.jpg";

const Login = () => {
  return (
    <div className="flex min-h-screen">
      <div className="fixed w-full md:w-1/2 bg-gradient-to-r from-rose-200 to-blue-200 h-screen hidden md:flex justify-center items-center">
        <div className="flex flex-col justify-center items-center h-full">
          <img
            src="https://dreamslms.dreamstechnologies.com/html/assets/img/login-img.png"
            alt="login"
            className="w-[500px]"
          />
          <span className="text-2xl font-semibold">Welcome to</span>
          <span className="font-bold text-6xl md:text-3xl">HyScaller LMS</span>
        </div>
      </div>
      <div className="w-full md:w-1/2 md:ml-[50%] overflow-y-auto flex justify-center items-center h-screen" >
        <div className="flex flex-col p-8 md:p-20 gap-5 justify-center w-full max-w-md">
          <div className="flex items-center justify-between w-full">
            <img
              src=''
              alt="logo"
              className="w-[140px] md:w-[200px] p-2 rounded-full"
            />
            <Link
              to="/"
              className="p-2 underline underline-offset-2 hover:text-blue-500"
            >
              Back to Home
            </Link>
          </div>
          <span className="font-bold text-2xl md:text-3xl">
            Sign into Your Account
          </span>
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full border border-black p-2 rounded-md"
          />
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full border-black border rounded-md p-2"
          />
          <Link
            to="/forgot-password"
            className="font-semibold text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button className="w-full p-2 bg-rose-500 flex justify-center rounded-lg text-white hover:bg-rose-400 transition-all duration-300 ease-in-out hover:scale-105">
            Sign In
          </button>
          <Link to="/signup" className="mt-2 text-blue-500 hover:underline">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
