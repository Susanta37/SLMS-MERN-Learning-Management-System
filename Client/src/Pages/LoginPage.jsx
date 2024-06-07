import React, { useState } from 'react'
import login from "../assets/login.jpg"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { url } from '../Utilities/serverUrl'
import { useDispatch } from 'react-redux'
import { loginAuth } from '../store/authReducer'
const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading ,setLoading]=useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value, // Update the specific property based on the name attribute
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post(`${url}/user/login`, formData)
            if (data?.success) {
                localStorage.setItem("token", data?.accessToken)
                localStorage.setItem("user", JSON.stringify(data?.info))
                toast.success(data?.message)
                dispatch(loginAuth())
                navigate("/")
            }
            console.log('data', data)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log('error', error)
        }
        setLoading(false)
    }
    return (
        <div className='w-full flex md:flex-row flex-col overflow-y-scroll h-full'>
            <div className=' w-full md:w-[50%] flex justify-center items-center h-full '>
                <img src={login} className=' w-[80%] h-[90%] object-cover rounded-sm' alt="" />
            </div>
            <div className=' w-full md:w-[50%] flex items-center justify-start h-fit md:h-full '>
                <form onSubmit={handleSubmit} className=' w-full p-4  md:w-[80%] flex flex-col gap-4 h-fit ' action="">
                    <span className='text-3xl font-bold text-black flex md:justify-start justify-center '>Log in</span>
                    <span className='w-full md:flex hidden md:w-[60%]'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam velit, corrupti quae, saepe quo ut quas eligendi fugiat fugit possimus atque voluptatem consequuntur vero quasi iure. Magni odio deserunt in?</span>
                    <label className=' md:flex hidden' htmlFor="email">E-mail</label>
                    <input required name='email' value={formData.email} onChange={handleChange} placeholder='email' className=' w-full md:w-[60%] h-10 bg-gray-100 outline-none p-4 rounded-md' type="text" />
                    <label className=' md:flex hidden' htmlFor="name">password</label>
                    <input required name='password' onChange={handleChange} value={formData.password} placeholder='Password' className='w-full md:w-[60%] h-10 bg-gray-100 outline-none p-4 rounded-md' type="text" />
                    <button className=' w-full md:w-[60%] h-10 bg-blue-500 flex items-center justify-center text-white font-bold outline-none p-4 rounded-md'>{loading ?"Loading...":"Log In"}</button>
               <div className=' flex justify-between w-full md:w-[60%] px-4'>
                <span className=' text-sm md:text-base'>dont have an Account ?</span> <span onClick={()=>{navigate("/signup")}} className=' text-cyan-500 text-sm md:text-base'>Sign Up</span>
               </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
