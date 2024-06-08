import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import CertificatePdf from "../Components/CertificatePdf";

const CertificateCard = ({ course, mark }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [open, setOpen] = useState(false);
    const date = new Date(course?.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
    const navigate = useNavigate();

    const handleClick = (item) => {
        navigate(`/courses/${course?._id}`);
    };

    return (
        <>
            <CertificatePdf visible={open} mark={mark} date={date} onClose={() => { setOpen(false); }} user={user} course={course} />
            <div className="not-selectable w-[340px] relative rounded-lg overflow-hidden shadow-lg border border-gray-300 md:m-4 bg-white text-black transition-transform hover:scale-105 duration-300 ease-in-out">

                <div className="h-[200px]">
                    <img className="w-full h-[70%] object-fit" src={course?.thumbnail} alt="Thumbnail" />
                    <div className="px-6 pt-4">
                        <div className="font-semibold text-sm md:text-base mb-2">
                            <span className="block text-gray-700">Course Name:</span>
                            <span className="text-gray-600">{course?.type}</span>
                        </div>
        
                    </div>
                </div>

                <div onClick={() => { setOpen(true); }} className="flex justify-center py-3 px-4 border-t bg-green-500 text-white hover:bg-green-600 cursor-pointer">
                    <span className="flex items-center gap-2 text-sm md:text-base font-bold"><MdDownloadForOffline /> Download</span>
                </div>
            </div>
        </>
    );
};

export default CertificateCard;
