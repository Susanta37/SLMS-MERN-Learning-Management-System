import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signLogo from '../assets/logoo.png';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginAuth } from '../store/authReducer';
import { url } from '../Utilities/serverUrl';
import logo1 from '../assets/logof.png'
const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${url}/user/login`, formData);
            if (data?.success) {
                localStorage.setItem("token", data?.accessToken);
                localStorage.setItem("user", JSON.stringify(data?.info));
                toast.success(data?.message);
                dispatch(loginAuth());
                navigate("/");
            }
            console.log('data', data);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log('error', error);
        }
        setLoading(false);
    };

    return (
        <div className='flex flex-col md:flex-row h-screen'>
            <div className="w-full md:w-1/2 bg-gradient-to-r from-rose-100 to-blue-100 h-full flex flex-col justify-center items-center p-4">
                <img src={signLogo} alt="login" className='w-3/4 md:w-2/4' />
                <span className='text-2xl md:text-3xl font-semibold'>Welcome to</span>
                <span className='text-xl md:text-3xl font-semibold'>Hyscaller LMS</span>
            </div>
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center overflow-y-auto p-8'>
                <div className='flex flex-col items-center w-full max-w-md'>
                    <div className='flex items-center justify-between w-full mb-8'>
                        <img src={logo1} alt="logo" className='w-36 md:w-44 p-2' />
                        <Link to="/" className='p-2 underline underline-offset-2 hover:text-blue-500'>Back to Home</Link>
                    </div>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
                        <span className='font-bold text-2xl md:text-3xl'>Sign into Your Account</span>
                        <label className='w-full'>
                            <span>Email</span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Email'
                                className='w-full border border-black p-2 rounded-md'
                                required
                            />
                        </label>
                        <label className='w-full'>
                            <span>Password</span>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Password'
                                className='w-full border border-black rounded-md p-2'
                                required
                            />
                        </label>
                        <span className='font-semibold text-blue-600 self-end'>Forgot Password?</span>
                        <div className='flex items-center gap-2'>
                            <input type="checkbox" />
                            <span>Remember me.</span>
                        </div>
                        <button
                            type="submit"
                            className='w-full p-2 bg-rose-500 flex justify-center rounded-lg text-white hover:bg-rose-400 transition-all duration-300 ease-in-out hover:scale-105'
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <Link to="/signup" className="mt-2 text-blue-500 hover:underline">
                        Don't have an account? Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signin;
