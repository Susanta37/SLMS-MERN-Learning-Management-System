import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CourseCard from '../cards/CourseCard';
import CertificateCard from '../cards/CertificateCard';
import { useNavigate, useParams } from 'react-router-dom';
import { url } from '../Utilities/serverUrl';
import Loader from '../Utilities/Loader';

const ProfilePage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(0);
    const [details, setDetails] = useState({});
    const items = ["Courses", "User Details", "Certificates"];

    const handleOpen = (index) => {
        setOpen(index);
    };

    const getCourseDetails = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${url}/user/userdetails/${user?._id}`);
            setDetails(data?.info);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (id) {
            setOpen(Number(id));
        }
    }, [id]);

    useEffect(() => {
        getCourseDetails();
    }, [user?._id]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className='w-full h-screen overflow-y-scroll'>
            <div className='bg-cyan-500 h-40 flex items-center justify-center'>
                <span className='font-bold text-4xl text-white'>{details?.name}</span>
            </div>
            <div className='flex justify-center gap-4 mt-5 md:mt-10'>
                {items.map((item, index) => (
                    <button key={index} onClick={() => handleOpen(index)} className={`px-4 py-2 border rounded-md focus:outline-none transition duration-300 ${open === index ? "bg-cyan-600 text-white" : "hover:bg-gray-200"}`}>
                        {item}
                    </button>
                ))}
            </div>
            <div className={`my-10 mx-auto max-w-6xl flex flex-wrap justify-center gap-4 ${open === 0 ? "block" : "hidden"}`}>
                {details?.course?.length > 0 ? (
                    details?.course?.map((item, index) => <CourseCard key={index} course={item?.course} />)
                ) : (
                    <span>No courses available</span>
                )}
            </div>
            <div className={`${open === 1 ? "block" : "hidden"} mx-auto max-w-6xl mt-10`}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div className='bg-white rounded-md shadow-md p-6'>
                        <h2 className='text-lg font-bold mb-4'>User Details</h2>
                        <div className='flex flex-col gap-4'>
                            <div>
                                <span className='font-bold'>Name:</span> {details?.name}
                            </div>
                            <div>
                                <span className='font-bold'>Email:</span> {details?.email}
                            </div>
                            <div>
                                <span className='font-bold'>Total Courses:</span> {details?.course?.length}
                            </div>
                        </div>
                    </div>
                    <div className='bg-white rounded-md shadow-md p-6'>
                        <h2 className='text-lg font-bold mb-4'>Profile Picture</h2>
                        <div className='flex items-center justify-center'>
                            <div className='w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-full flex items-center justify-center'>
                                <span className='text-4xl'>SS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 ${open === 2 ? "block" : "hidden"} mx-auto max-w-6xl`}>
                {details?.course?.map((item, index) => {
                    if (item?.isQualified) {
                        return <CertificateCard key={index} course={item?.course} mark={item?.mark} />;
                    }
                })}
            </div>
        </div>
    );
};

export default ProfilePage;
