import React, { useEffect, useState } from 'react';
import logo from "../assets/logof.png";
import { IoIosSearch } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRightLong } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from './SideBar';
import { RxCross2 } from "react-icons/rx";
import { logoutAuth } from '../store/authReducer';
import toast from 'react-hot-toast';

const NavBar = () => {
    const courses = useSelector(state => state?.course?.courses);
    const [search, setSearch] = useState("");
    const [searchedCourse, setSearchedCourse] = useState([]);
    const [open, setOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    let token = useSelector((state) => state.authReducer.isLogin);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(logoutAuth());
        toast.success("Logged Out Successfully");
    };

    useEffect(() => {
        if (search) {
            setSearchedCourse(
                courses?.filter((item) => (
                    item?.name?.toLowerCase()?.includes(search.toLowerCase())
                ))
            );
        } else {
            setSearchedCourse([]);
        }
    }, [search, courses]);

    return (
        <>
            <SideBar open={open} handleClose={() => { setOpen(false); }} />
            <div className='shadow-md w-full flex gap-2 justify-between items-center bg-zinc-800'>
                <div className='w-[60%] md:w-[20%] h-full flex items-center justify-center'>
                    <img onClick={() => { navigate("/") }} src={logo} className='w-40 h-full rounded-md object-cover cursor-pointer' alt="" />
                </div>
                <span className='md:hidden flex pr-4' onClick={() => { setOpen(state => !state); }}>
                    <GiHamburgerMenu size={26} />
                </span>
                <div onClick={() => { setIsHovered(state => !state); }} className="relative px-4 py-2 cursor-pointer bg-blue-100 md:block hidden text-sky-700 font-bold rounded-md">
                    Courses
                </div>
                {isHovered && (
                    <div className="absolute z-10 top-[60px] left-[22%] h-[350px] overflow-y-scroll rounded-md bg-white shadow-lg p-6 flex flex-col gap-4">
                        <span onClick={() => { setIsHovered(false); }} className='flex w-full text-red-500 cursor-pointer transition-all duration-500 ease-in-out justify-end'>
                            <RxCross2 />
                        </span>
                        {courses?.map((item, index) => (
                            <span onClick={() => { navigate(`/courses/${item?._id}`); }}
                                className="flex gap-2 cursor-pointer hover:text-cyan-500 hover:translate-x-1 duration-300 ease-in-out items-center"
                                key={index}
                            >
                                <FaArrowRightLong className="text-xs" /> {item?.name}
                            </span>
                        ))}
                    </div>
                )}
                <form onSubmit={(e) => { e.preventDefault(); }} className='relative w-[30%] md:flex hidden md:w-[20%] bg-blue-200 h-10 items-center p-4 justify-between rounded-md'>
                    <input value={search} name='search' onChange={(e) => { setSearch(e.target.value); }}
                        onFocus={() => { setClicked(true); }} placeholder='Search Courses' className="w-[90%] bg-transparent outline-none" type="text" />
                    <button type='submit'><IoIosSearch /></button>
                </form>
                {clicked && (
                    <div className={`top-[60px] left-[35%] h-fit overflow-y-scroll rounded-full bg-white shadow-lg p-6 ${searchedCourse.length > 0 ? "flex absolute z-10" : "hidden"} flex-col gap-4`}>
                        <span onClick={() => { setClicked(false); setSearchedCourse([]); }} className='flex w-full text-red-500 cursor-pointer transition-all duration-500 ease-in-out justify-end'>
                            <RxCross2 />
                        </span>
                        {searchedCourse?.map((item, index) => (
                            <span onClick={() => { setClicked(false); setSearchedCourse([]); navigate(`/courses/${item?._id}`); }}
                                className='flex gap-2 cursor-pointer hover:text-cyan-500 hover:translate-x-1 duration-300 ease-in-out items-center'
                                key={index}
                            >
                                <FaArrowRightLong className="text-xs" /> {item?.name}
                            </span>
                        ))}
                    </div>
                )}
                <div className='w-[50%] md:w-[40%] hidden md:flex justify-center gap-6'>
                    {<NavLink to={"/login"} className={`${!token ? "flex" : "hidden"} items-center justify-center w-28 bg-cyan-500 hover:scale-105 capitalize duration-300 ease-in-out font-bold text-white rounded-md py-2`}>log in</NavLink>}
                    {<button onClick={() => { navigate("/admindashboard/0") }} className={`${token && user?.isAdmin ? "flex" : "hidden"} items-center justify-center w-28 hover:scale-105 capitalize duration-300 ease-in-out font-bold text-red-500 animate-pulse rounded-md py-2`}>Admin page</button>}
                    {<NavLink to={"/signup"} className={`${!token ? "block" : "hidden"} px-6 bg-white hover:scale-105 duration-300 capitalize ease-in-out font-bold text-gray-800 border border-black rounded-md py-2`}>sign up</NavLink>}
                    {<NavLink to={`/profile/${0}`} className={`${token ? "flex" : "hidden"} px-6 bg-white hover:scale-105 duration-300 capitalize ease-in-out items-center font-bold text-gray-800 rounded-md py-2`}>My Courses</NavLink>}
                    {<NavLink to={"/profile/1"} className={`${token ? "block" : "hidden"} hover:scale-105 duration-300 ease-in-out`}><img src="https://imgs.search.brave.com/MpXwHc3OUm2Z6U4IpSlZYWHSjIjjlpPpCfqrJaRwat0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY29v/bC1hbmltZS1wcm9m/aWxlLXBpY3R1cmUt/Z21wdW9ldnlkam15/eXR4eS5qcGc" className='w-[50px] h-[50px] rounded-full' alt="" /></NavLink>}
                    {<button onClick={handleLogout} className={`${token ? "block" : "hidden"} flex items-center gap-2 font-bold hover:scale-105 duration-300 ease-in-out`}> Logout <ImExit /></button>}
                </div>
            </div>
        </>
    );
};

export default NavBar;
