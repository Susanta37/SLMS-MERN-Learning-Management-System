import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
        <div className="w-full flex flex-col md:flex-row h-full md:h-screen overflow-y-scroll pb-10">
            <div className="md:w-3/5 w-full flex flex-col justify-between p-4 pt-10 md:pt-16 md:overflow-y-scroll h-fit md:h-full">
                <div className="w-full h-auto md:h-1/2 flex flex-col gap-4">
                    <span className="text-2xl md:text-4xl font-bold">{course?.name}</span>
                    <span className="text-sm md:text-lg font-semibold">{course?.descrption}</span>
                    <span className="text-sm">Created At: {date}</span>
                </div>
                <div className="flex flex-col gap-2 w-full h-auto md:h-1/2 md:justify-start justify-end cursor-pointer">
                    <div className="flex justify-between border border-gray-900 p-2 rounded-md shadow-md bg-white">
                        <span className="text-sm md:text-lg font-bold">Curriculum for this course:</span>
                        <span className="text-sm md:text-base">{totalSections} Lessons</span>
                    </div>
                    {course?.section?.map((sub, index) => (
                        <div className="flex flex-col gap-2" key={index}>
                            <div className="flex justify-between border border-gray-900 p-2 shadow-md bg-white rounded-md" onClick={() => toggleDetails(index)}>
                                <span className="flex gap-1 text-sm md:text-lg items-center">{!showDetails[index] ? <LuPlus /> : <HiOutlineMinusSm />} {sub?.sectionName}</span>
                                <span className="text-sm md:text-base">{sub?.subSection?.length} Lessons</span>
                            </div>
                            <div className={showDetails[index] ? 'flex flex-col gap-2' : 'hidden'}>
                                {sub?.subSection?.map((item, index) => (
                                    <div className="flex justify-between border text-sm text-cyan-600 font-semibold border-gray-900 p-2 shadow-md bg-gray-50 rounded-md" key={index}>
                                        <span className="flex items-center gap-1 text-sm md:text-lg"><PiVideo /> {item?.title}</span>
                                        <span className="text-sm md:text-base">{item?.timeDuration}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="md:w-2/5 w-full h-full pt-10 md:pt-0 md:h-auto flex justify-center items-center">
                <div className="w-11/12 md:w-3/4 rounded-lg overflow-hidden shadow-xl border border-gray-300 bg-white">
                    <img className="w-full h-48 md:h-60 object-cover" draggable='false' src={course?.thumbnail} alt="Thumbnail" />
                    <div className="px-6 pt-4">
                        <div className="font-bold text-xl mb-2">{course?.type}</div>
                        <p className="text-sm mb-2">
                            {course?.descrption}
                        </p>
                        <div className="flex justify-between py-2 px-4 border-t border-gray-300">
                            <span className="flex gap-1 items-center font-bold"><FaRupeeSign />{course?.price}</span>
                            <span className="flex items-center gap-2 font-bold"><ImTree /> {course?.section?.length} Sections</span>
                        </div>
                        {course?.user?.some(us => user?._id === us?.user) ? (
                            <button onClick={changeRoute} className="w-full py-3 bg-purple-600 text-lg font-bold text-white rounded-md hover:bg-purple-700">Start Learning</button>
                        ) : (
                            <button onClick={handleEnroll} className="w-full py-3 bg-purple-600 text-lg font-bold text-white rounded-md hover:bg-purple-700">Enroll</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;
