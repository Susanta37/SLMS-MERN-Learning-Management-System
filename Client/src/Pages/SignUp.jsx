import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../assets/login.jpg';
import axios from 'axios';
import toast from 'react-hot-toast';
import { url } from '../Utilities/serverUrl';

const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
    });

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
        <div className='flex flex-col md:flex-row h-screen overflow-y-auto'>
            <div className='w-full md:w-1/2 flex justify-center items-center h-52 md:h-full'>
                <img src={login} className='w-3/4 md:w-4/5 h-full md:h-5/6 object-cover rounded-sm' alt="login" />
            </div>
            <div className='w-full md:w-1/2 flex items-center justify-center h-full p-4'>
                <form onSubmit={handleSubmit} className='w-full md:w-4/5 flex flex-col gap-4'>
                    <span className='text-2xl md:text-3xl font-bold text-black'>Sign Up</span>
                    <span className='w-full md:w-4/5 text-sm md:text-base hidden md:flex'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam velit, corrupti quae, saepe quo ut quas eligendi fugiat fugit possimus atque voluptatem consequuntur vero quasi iure. Magni odio deserunt in?
                    </span>
                    <label className='hidden md:flex' htmlFor="fname">First Name</label>
                    <input 
                        onChange={handleChange} 
                        value={formData?.fname} 
                        name='fname' 
                        placeholder='First Name' 
                        required  
                        className='w-full md:w-4/5 h-10 bg-gray-100 outline-none p-4 rounded-md' 
                        type="text" 
                    />
                    <label className='hidden md:flex' htmlFor="lname">Last Name</label>
                    <input 
                        onChange={handleChange} 
                        value={formData?.lname} 
                        name='lname' 
                        placeholder='Last Name' 
                        required  
                        className='w-full md:w-4/5 h-10 bg-gray-100 outline-none p-4 rounded-md' 
                        type="text" 
                    />
                    <label className='hidden md:flex' htmlFor="email">E-mail</label>
                    <input 
                        onChange={handleChange} 
                        value={formData?.email} 
                        name='email' 
                        placeholder='E-mail' 
                        required  
                        className='w-full md:w-4/5 h-10 bg-gray-100 outline-none p-4 rounded-md' 
                        type="email" 
                    />
                    <label className='hidden md:flex' htmlFor="password">Password</label>
                    <input 
                        onChange={handleChange} 
                        value={formData?.password} 
                        name='password' 
                        placeholder='Password' 
                        required  
                        className='w-full md:w-4/5 h-10 bg-gray-100 outline-none p-4 rounded-md' 
                        type="password" 
                    />
                    <button 
                        type='submit' 
                        className='w-full md:w-4/5 h-10 bg-blue-500 flex items-center justify-center text-white font-bold outline-none p-4 rounded-md'
                        disabled={loading}
                    >
                        {loading ? "Loading" : "Sign Up"}
                    </button>
                    <div className='flex justify-between w-full md:w-4/5 px-4'>
                        <span className='text-sm md:text-base'>Already have an account?</span>
                        <span onClick={() => navigate("/login")} className='text-cyan-500 text-sm md:text-base cursor-pointer'>Log In</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
