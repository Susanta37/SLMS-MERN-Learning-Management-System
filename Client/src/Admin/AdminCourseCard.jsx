import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { ImTree } from "react-icons/im";

const AdminCourseCard = ({ course }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const navigate = useNavigate()
    const handleClick = (item) => {
        navigate(`/courses/${course?._id}`)
    };



    return (
        <div
            className={`not-selectable w-[320px] relative rounded-[10px] overflow-hidden shadow-xl border border-gray-300 md:m-4 border-1  bg-white  text-black hover:border-2 hover:border-cyan-600 hover:scale-110 transition-transform duration-300 hover:text-cyan-400 ${isFlipped ? "rotate-back" : ""
                }`}
            onClick={handleClick}
        >
            <div
                className={`transform ${isFlipped ? "rotateY-180" : ""
                    } h-72 transition-transform duration-300 ease-in-out`}
            >
                <img className="w-full h-[60%] object-cover" draggable='false' src={course?.thumbnail} alt="Thumbnail" />
                <div className="px-6 pt-4">
                    <div className="font-bold text-xl mb-2">{course?.type}</div>
                    <p className="text-xs mb-2">
                        {!isFlipped ? course?.descrption?.substring(0, 80) + "..." : course?.descrption}
                    </p>
                </div>
            </div>
            <div className=" flex justify-between py-2 px-4 border-t border-gray-400">
                <span className=" flex gap-1 items-center font-bold"><FaRupeeSign />{course?.price}</span>
                <span className=" flex items-center gap-2 font-bold"> <ImTree /> {course?.section?.length}  Sections</span>
            </div>
        </div>
    );
};

export default AdminCourseCard;