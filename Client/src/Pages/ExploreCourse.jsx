import React, { useState } from "react";
import CourseCard from "../cards/CourseCard";
import { useSelector } from "react-redux";
const HomePageExplore = [
    {
        tag: 'Free',
        courses: [
            {
                heading: "Learn HTML",
                description: "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.",
                level: 'Beginner',
                lessionNumber: 6
            },
            {
                heading: "Learn CSS",
                description: "This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques",
                level: 'Beginner',
                lessionNumber: 6
            },
            {
                heading: "Responsive Web design",
                description: "This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes",
                level: 'Beginner',
                lessionNumber: 6
            },
        ]
    },
    {
        tag: 'New to coding',
        courses: [
            {
                heading: "HTML",
                description: "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.",
                level: 'Beginner',
                lessionNumber: 6
            },
            {
                heading: "CSS",
                description: "This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques",
                level: 'Beginner',
                lessionNumber: 6
            },
            {
                heading: "Responsive ",
                description: "This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes",
                level: 'Beginner',
                lessionNumber: 6
            },
        ]
    },
    {
        tag: 'Most popular',
        courses: [
            {
                heading: "Java",
                description: "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.",
                level: 'Beginner',
                lessionNumber: 6
            },
            {
                heading: "Python",
                description: "This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques",
                level: 'Beginner',
                lessionNumber: 6
            },
            {
                heading: "SCSS",
                description: "This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes",
                level: 'Beginner',
                lessionNumber: 6
            },
        ]
    },
    {
        tag: 'Skills paths',
        courses: [
            {
                heading: "Flask",
                description: "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.",
                level: 'Beginner',
                lessionNumber: 6
            },
            {
                heading: "Django",
                description: "This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques",
                level: 'Beginner',
                lessionNumber: 6
            },
            {
                heading: "Fast API",
                description: "This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes",
                level: 'Beginner',
                lessionNumber: 6
            },
        ]
    },
    {
        tag: 'Career paths',
        courses: [
            {
                heading: "Next.js",
                description: "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.",
                level: 'Beginner',
                lessionNumber: 6
            },
            {
                heading: "Nuxt.js",
                description: "This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques",
                level: 'Beginner',
                lessionNumber: 6
            },
            {
                heading: "Sanity",
                description: "This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes",
                level: 'Beginner',
                lessionNumber: 6
            },
        ]
    },
]
const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const ExploreCourse = () => {
    const courses = useSelector(state => state?.course?.courses)
    console.log('courses', courses)

    return (
        <div className=" w-full bg-zinc-800">
            {/* Explore more section */}
            <div>
                <div className="text-4xl font-semibold text-center ">
                    Learn on your schedule
                    {/* <HighlightText text={"Power of Code"} /> */}
                    <p className="text-center text-richblack-300 text-lg font-semibold mt-1">

                        Study any topic, anytime. Explore thousands of courses for the lowest price ever!
                    </p>
                </div>
            </div>

            <div className=' flex md:flex-row flex-col flex-wrap items-center mt-8 gap-3 justify-center  '>
                {courses?.map((item, index) => {

                    return (
                        <CourseCard key={index} course={item} />
                    )
                })}
            </div>
        </div>
    );
};

export default ExploreCourse;
