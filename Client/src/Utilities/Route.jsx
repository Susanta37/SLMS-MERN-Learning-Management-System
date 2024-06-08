import React, { useEffect, useState } from 'react'

import { Outlet, createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import HomePage from '../Pages/HomePage'
import LoginPage from '../Pages/LoginPage'
import SignUp from '../Pages/SignUp'
import NavBar from '../Components/NavBar'
import Courses from '../Pages/Courses'
import SectionVideo from '../Pages/SectionVideo'
import ProfilePage from '../Pages/ProfilePage'
import QuizPage from '../Pages/QuizPage'
import CertificatePdf from '../Components/CertificatePdf'
import SideBar from '../Components/SideBar'
import { useSelector } from 'react-redux'
import CreateCourse from '../Components/CreateCourse'
import AdminDashboard from '../Admin/AdminDashboard'
import Signin from '../Pages/SignIn'

const Route = () => {



    const Layout = () => {
        let value = useSelector(state => state.authReducer.isLogin);
        console.log('value', value)
        if (!value) {
            return <Navigate to={"/login"} />;
        }


        return (
            <div className='flex flex-col h-screen overflow-hidden justify-evenly bg-zinc-800'>
                <div className=' w-full flex   h-[10%] '>
                    <NavBar />
                </div>

                <div className='w-full h-[90%] '>
                    <Outlet />
                </div>



            </div>
        )
    }
    const Layout2 = () => {
        let value = useSelector(state => state.authReducer.isLogin);
        // console.log('value', value)
        if (value) {
            return <Navigate to={"/"} />;
        }


        return (
            <div className='flex flex-col h-screen overflow-hidden justify-evenly'>
                <div className=' w-full flex   h-[10%] '>
                    <NavBar />
                </div>

                <div className='w-full h-[90%] '>
                    <Outlet />
                </div>



            </div>
        )
    }
    const Layout3 = () => {

        return (
            <div className='flex flex-col h-screen overflow-hidden justify-evenly'>
                <div className=' w-full flex   h-[10%] '>
                    <NavBar />
                </div>

                <div className='w-full h-[90%] '>
                    <Outlet />
                </div>



            </div>
        )
    }

    // all routes 

    const BrowserRoute = createBrowserRouter([
        {

            element: <Layout />,
            children: [

                {
                    path: "/certificate",
                    element: <CertificatePdf />
                },
                

                {
                    path: "/course/section/:id/:videoid?",
                    element: <SectionVideo />
                },



                {
                    path: "/profile/:id?",
                    element: <ProfilePage />
                },
                {
                    path: "/course/section/quiz/:id",
                    element: <QuizPage />
                },
                {
                    path: "/admindashboard/:id",
                    element: <AdminDashboard />
                },
            ]
        },
        {

            element: <Layout2 />,
            children: [
                {
                    path: "/login",
                    element: <Signin />
                },
                {
                    path: "/Signup",
                    element: <SignUp />
                },
            ]
        },
        {

            element: <Layout3 />,
            children: [
                {
                    path: "/",
                    element: <HomePage />
                },
                {
                    path: "/courses/:id",
                    element: <Courses />
                },
            ]
        },


    ])

    return (
        <RouterProvider router={BrowserRoute} />
    )
}

export default Route
