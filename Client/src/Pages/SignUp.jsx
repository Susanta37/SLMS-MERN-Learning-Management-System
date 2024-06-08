import React, { useState, useEffect } from "react";
import { FaUser, FaMapMarkerAlt, FaPhone, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logo from "./../assets/logoo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import { url } from '../Utilities/serverUrl';
import signLogo from '../assets/logoo.png';

const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        if (password.length < 6) {
            setPasswordStrength("Weak");
        } else if (password.length < 10) {
            setPasswordStrength("Medium");
        } else {
            setPasswordStrength("Strong");
        }
    };

    const getPasswordStrengthColor = () => {
        switch (passwordStrength) {
            case "Weak":
                return "bg-red-500";
            case "Medium":
                return "bg-yellow-500";
            case "Strong":
                return "bg-green-500";
            default:
                return "bg-white";
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${url}/user/signup`, formData);
            console.log('data', data);
            if (data.success) {
                toast.success(data?.message);
                navigate("/login");
            }
        } catch (error) {
            console.log('error', error);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-y-auto">
            <div className="hidden md:block w-full md:w-1/2 bg-gradient-to-r from-rose-100 to-blue-100 md:h-full flex justify-center items-center">
                <div className='flex flex-col justify-center items-center'>
                    <img src={signLogo} alt="login" className='w-[60%]' />
                    <span className='text-sm md:text-3xl font-semi bold'>Welcome to</span>
                    <span className='font-semibold text-[20px] md:text-3xl'>SLMS Courses</span>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col p-2 gap-4 items-center">
                <div className="flex w-full justify-between items-center pb-10 pt-5 pl-5 pr-5">
                    <img src='' alt="logo" className="w-[180px]" />
                    <Link
                        to="/"
                        className="p-2 underline underline-offset-2 hover:text-blue-500"
                    >
                        Back to Home
                    </Link>
                </div>
                <span className="font-bold text-3xl mb-2 text-center">
                    Registration Form
                </span>
                <span className="text-gray-500 font-medium p-5 pt-0 text-center ">
                    Signup and start learning
                </span>

                <form onSubmit={handleSubmit} className='w-full p-4 md:w-[80%] flex flex-col gap-4' action="">
                    <label htmlFor="fname">First Name</label>
                    <input onChange={handleChange} value={formData?.fname} name='fname' placeholder='First Name' required className='w-full h-10 bg-gray-100 outline-none p-4 rounded-md' type="text" />
                    <label htmlFor="lname">Last Name</label>
                    <input onChange={handleChange} value={formData?.lname} name='lname' placeholder='Last Name' required className='w-full h-10 bg-gray-100 outline-none p-4 rounded-md' type="text" />
                    <label htmlFor="email">E-mail</label>
                    <input onChange={handleChange} value={formData?.email} name='email' placeholder='E-mail' required className='w-full h-10 bg-gray-100 outline-none p-4 rounded-md' type="text" />
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} value={formData?.password} name='password' placeholder='Password' required className='w-full h-10 bg-gray-100 outline-none p-4 rounded-md' type="password" />
<button type='submit' className='w-full h-10 bg-blue-500 flex items-center justify-center text-white font-bold outline-none p-4 rounded-md'>{loading ? "Loading" : "Sign Up"}</button>
<div className='flex justify-between w-full px-4'>
<span className='text-sm'>Already have an Account?</span>
<span onClick={()=>{navigate("/login")}} className='text-cyan-500 text-sm cursor-pointer'>Log In</span>

</div>
</form>
</div>
</div>
);
};
export default SignUp;
