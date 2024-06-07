import React, { useState } from 'react'
import login from "../assets/login.jpg"
import { url } from '../Utilities/serverUrl'
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
const SignUp = () => {
    const navigate = useNavigate()
    const [loading,setLoading]=useState(false)
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post(`${url}/user/signup`, formData)
            console.log('data', data)
            if (data.success) {
                toast.success(data?.message)
                navigate("/login")
            }
        } catch (error) {
            console.log('error', error)
        }
        setLoading(false)
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    return (
         <div className='w-full flex md:flex-row flex-col overflow-y-scroll h-full'>
             <div className=' w-full md:w-[50%] flex justify-center items-center md:h-full h-52 '>
                <img src={login} className=' w-[80%] h-[90%] object-cover rounded-sm' alt="" />
            </div>
            <div className=' w-full md:w-[50%] flex items-center justify-start h-fit md:h-full '>
               <form onSubmit={handleSubmit} className=' w-full p-4  md:w-[80%] flex flex-col gap-4 h-fit ' action="">
                    <span className='text-3xl font-bold text-black'>Sign Up</span>
                    <span className=' w-[60%] md:flex hidden'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam velit, corrupti quae, saepe quo ut quas eligendi fugiat fugit possimus atque voluptatem consequuntur vero quasi iure. Magni odio deserunt in?</span>
                    <label className=' md:flex hidden' htmlFor="name">First Name</label>
                    <input onChange={handleChange} value={formData?.fname} name='fname' placeholder='First Name' required  className=' w-full md:w-[60%] h-10 bg-gray-100 outline-none p-4 rounded-md' type="text" />
                    <label className=' md:flex hidden' htmlFor="Last Name">Last Name</label>
                    <input onChange={handleChange} value={formData?.lname} name='lname' placeholder='Last Name' required  className=' w-full md:w-[60%] h-10 bg-gray-100 outline-none p-4 rounded-md' type="text" />
                    <label className=' md:flex hidden' htmlFor="E-mail">E-mail</label>
                    <input onChange={handleChange} value={formData?.email} name='email' placeholder='E-mail' required  className=' w-full md:w-[60%] h-10 bg-gray-100 outline-none p-4 rounded-md' type="text" />
                    <label className=' md:flex hidden' htmlFor="password">password</label>
                    <input onChange={handleChange} value={formData?.password} name='password' placeholder='Password' required  className=' w-full md:w-[60%] h-10 bg-gray-100 outline-none p-4 rounded-md' type="text" />
                    <button type='submit' className=' w-full md:w-[60%] h-10 bg-blue-500 flex items-center justify-center text-white font-bold outline-none p-4 rounded-md'>{loading ?"Loading" :" Sign Up"}</button>
               <div className=' flex justify-between w-full md:w-[60%] px-4'>
            <span className=' text-sm md:text-base'>already have an Account ?</span> <span onClick={()=>{navigate("/login")}} className=' text-cyan-500 text-sm md:text-base'>log in</span>
            </div>
          </form>
            </div>
        </div>
       
    )
}

export default SignUp
