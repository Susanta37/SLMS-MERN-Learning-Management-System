import React from "react";
import CourseCard from "../cards/CourseCard";
import { useSelector } from "react-redux";

const ExploreCourse = () => {
    const courses = useSelector(state => state?.course?.courses);

    return (
        <div className="w-full bg-white">
            {/* Explore more section */}
            <div className="text-center py-8">
                <h1 className="text-4xl font-semibold">Learn on your schedule</h1>
                <p className="text-richblack-300 text-lg font-semibold mt-1">
                    Study any topic, anytime. Explore thousands of courses for the lowest price ever!
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8 px-4 md:px-0">
                {courses?.map((item, index) => (
                    <CourseCard key={index} course={item} />
                ))}
            </div>
        </div>
    );
};

export default ExploreCourse;
