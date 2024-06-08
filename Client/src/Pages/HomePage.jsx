import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import logo from "../assets/logoo.png";
import ExploreCourse from './ExploreCourse';
import Loader from "../Utilities/Loader";
import { useSelector, useDispatch } from 'react-redux';
import { Box, List, ListItem, ListItemText } from '@mui/material';

const HomePage = () => {
    const status = useSelector(state => state?.course?.status);
    const courses = useSelector(state => state?.course?.courses);
    const [search, setSearch] = useState("");
    const [searchedCourse, setSearchedCourse] = useState([]);
    const [clicked, setClicked] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleSearch = () => {
        navigate(`/search?query=${search}`);
    };

    if (status === "loading") {
        return <Loader />;
    }

    return (
        <div className='flex flex-col gap-4 items-center pb-20 scroll-smooth mt-2 w-full h-full overflow-y-scroll'>
            <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-zinc-100 dark:bg-white">
                <div className="md:w-1/2 p-4">
                    <h2 className="text-orange-500 text-sm font-bold uppercase">Online Education</h2>
                    <h1 className="text-4xl font-bold mt-2 mb-4 text-zinc-900 dark:text-zinck-800">Learn The Skills You Need To Succeed</h1>
                    <p className="text-zinc-600 text-2xl dark:text-zinc-800 mb-6">Free online courses from the world's leading experts. Join 18+ million learners today.</p>
                    <div className="flex items-center mb-4">
                        <input
                            value={search}
                            name='search'
                            onChange={(e) => { setSearch(e.target.value); }}
                            onFocus={() => { setClicked(true); }}
                            placeholder="Keywords of your course"
                            className="p-3 border border-zinc-300 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button className="bg-orange-500 text-white p-3 rounded-r-md" onClick={handleSearch}>Search Course</button>
                    </div>
                    {clicked && searchedCourse.length > 0 && (
                        <div className="bg-white p-2 border border-gray-300 rounded-md shadow-md w-full">
                            <ul>
                                {searchedCourse.map((course, index) => (
                                    <li key={index} className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate(`/courses/${course.id}`); }}>
                                        {course.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
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
            {search && searchedCourse.length > 0 && (
                <Box sx={{ position: 'absolute', top: '64px', left: '50%', transform: 'translateX(-50%)', width: '300px', bgcolor: 'background.paper', boxShadow: 3, zIndex: 1 }}>
                    <List>
                        {searchedCourse.map((item, index) => (
                            <ListItem button key={index} onClick={() => { navigate(`/courses/${item?._id}`); setSearchedCourse([]); setSearch(''); }}>
                                <ListItemText primary={item?.name} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </div>
    );
}

export default HomePage;
