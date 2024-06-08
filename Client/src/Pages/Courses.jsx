import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineMinusSm } from "react-icons/hi";
import { FaRupeeSign } from "react-icons/fa";
import { ImTree } from "react-icons/im";
import { LuPlus } from "react-icons/lu";
import { PiVideo } from "react-icons/pi";
import toast from 'react-hot-toast';
import Loader from '../Utilities/Loader';
import { url } from '../Utilities/serverUrl';
import { useSelector } from 'react-redux';

const Courses = () => {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [course, setCourse] = useState({});
    const date = new Date(course?.createdAt).toLocaleDateString();
    const [showDetails, setShowDetails] = useState([]);
    const totalSections = course?.section?.reduce((acc, section) => {
        if (section?.subSection) {
            return acc + section?.subSection?.length;
        } else {
            return acc;
        }
    }, 0);

    const toggleDetails = (index) => {
        const updatedShowDetails = [...showDetails];
        updatedShowDetails[index] = !updatedShowDetails[index];
        setShowDetails(updatedShowDetails);
    };

    const getCourseDetails = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${url}/course/course/${id}`);
            setCourse(data?.course);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
        setLoading(false);
    };

    const changeRoute = () => {
        navigate(`/course/section/${id}`);
    };

    const handleEnroll = async () => {
        if (!user) {
            toast.error("You have not logged in yet");
            return;
        }
        setLoading(true);
        try {
            const { data } = await axios.put(`${url}/course/enroll`, {
                userId: user?._id,
                courseId: course?._id
            });
            if (data.success) {
                toast.success(data?.message);
                setCourse(data?.updateCourse);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        getCourseDetails();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100 pb-10">
            <div className="md:w-3/5 w-full overflow-y-auto flex flex-col justify-between p-4 pt-10 md:pt-16 h-auto md:h-full">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{course?.name}</h1>
                    <p className="text-sm md:text-lg font-semibold text-gray-700 mb-4">{course?.descrption}</p>
                    <p className="text-sm text-gray-500">Created At: {date}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg md:text-xl font-bold">Curriculum for this course:</h2>
                            <span className="text-sm md:text-base">{totalSections} Lessons</span>
                        </div>
                    </div>
                    {course?.section?.map((sub, index) => (
                        <div className="flex flex-col gap-2" key={index}>
                            <div 
                                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md cursor-pointer" 
                                onClick={() => toggleDetails(index)}
                            >
                                <span className="flex gap-1 items-center text-lg">
                                    {!showDetails[index] ? <LuPlus /> : <HiOutlineMinusSm />} {sub?.sectionName}
                                </span>
                                <span className="text-base">{sub?.subSection?.length} Lessons</span>
                            </div>
                            <div className={showDetails[index] ? 'flex flex-col gap-2' : 'hidden'}>
                                {sub?.subSection?.map((item, index) => (
                                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md text-cyan-600 font-semibold" key={index}>
                                        <span className="flex items-center gap-1 text-lg"><PiVideo /> {item?.title}</span>
                                        <span className="text-base">{item?.timeDuration}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="md:w-2/5 w-full flex justify-center items-center p-4">
                <div className="w-full md:w-4/5 bg-white rounded-lg shadow-xl">
                    <img className="w-full h-48 md:h-60 object-cover rounded-t-lg" draggable='false' src={course?.thumbnail} alt="Thumbnail" />
                    <div className="p-6">
                        <h2 className="font-bold text-xl mb-2">{course?.type}</h2>
                        <p className="text-sm mb-4 text-gray-700">{course?.descrption}</p>
                        <div className="flex justify-between py-2 px-4 border-t border-gray-300">
                            <span className="flex items-center gap-1 font-bold text-lg"><FaRupeeSign />{course?.price}</span>
                            <span className="flex items-center gap-2 font-bold text-lg"><ImTree /> {course?.section?.length} Sections</span>
                        </div>
                        {course?.user?.some(us => user?._id === us?.user) ? (
                            <button 
                                onClick={changeRoute} 
                                className="w-full py-3 mt-4 bg-purple-600 text-lg font-bold text-white rounded-md hover:bg-purple-700 transition-all duration-300"
                            >
                                Start Learning
                            </button>
                        ) : (
                            <button 
                                onClick={handleEnroll} 
                                className="w-full py-3 mt-4 bg-purple-600 text-lg font-bold text-white rounded-md hover:bg-purple-700 transition-all duration-300"
                            >
                                Enroll
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;

