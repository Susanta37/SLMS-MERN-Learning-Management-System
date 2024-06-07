import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import logo from "../assets/logoo.png";
import ExploreCourse from './ExploreCourse';
import Loader from "../Utilities/Loader";
import { useSelector, useDispatch } from 'react-redux';

const HomePage = () => {
    const status = useSelector(state => state?.course?.status);
    const courses = useSelector(state => state?.course?.courses);
    const [search, setSearch] = useState("");
    const [searchedCourse, setSearchedCourse] = useState([]);
    const [clicked, setClicked] = useState(false);
    const dispatch = useDispatch();

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

    if (status === "loading") {
        return <Loader />;
    }

    return (
        <div className='flex flex-col gap-4 items-center pb-20 scroll-smooth mt-2 w-full h-full overflow-y-scroll'>
            <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-zinc-100 dark:bg-zinc-800">
                <div className="md:w-1/2 p-4">
                    <h2 className="text-orange-500 text-sm font-bold uppercase">Online Education</h2>
                    <h1 className="text-4xl font-bold mt-2 mb-4 text-zinc-900 dark:text-white">Learn The Skills You Need To Succeed</h1>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6">Free online courses from the world's leading experts. Join 18+ million learners today.</p>
                    <div className="flex items-center mb-4">
                        <input value={search} name='search' onChange={(e) => { setSearch(e.target.value); }}
                            onFocus={() => { setClicked(true); }}
                            placeholder="Keywords of your course" className="p-3 border border-zinc-300 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        <button className="bg-orange-500 text-white p-3 rounded-r-md">Search Course</button>
                    </div>
                    <div className="flex space-x-4">
                        <span className="text-zinc-600 dark:text-zinc-300">Most Popular:</span>
                        <a className="text-orange-500 hover:underline">React</a>
                        <a href="#" className="text-orange-500 hover:underline">Node</a>
                        <a href="#" className="text-orange-500 hover:underline">Tailwind CSS</a>
                        <a href="#" className="text-orange-500 hover:underline">MongoDB</a>
                    </div>
                </div>
                <div className="md:w-1/2 p-4">
                    <img src={logo} alt="Student" className="rounded-lg shadow-lg" />
                </div>
            </div>
            <ExploreCourse />
        </div>
    );
}

export default HomePage;
