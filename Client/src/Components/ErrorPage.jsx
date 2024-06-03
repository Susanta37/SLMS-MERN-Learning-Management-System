import React from 'react'
import errorLogo from '../assets/404.png'
import { Link } from 'react-router-dom'
import LandingPage from '../Page/LandingPage'
const ErrorPage = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
         <Link to="/" className='px-6 py-4 flex justify-center items-center mt-10 md:mt-4 bg-red-300 text-white font-bold w-[200px]'>
        Back To Home
      </Link>
      <img src={errorLogo} alt="404 Error " className='md:w-[600px]  w-[500px] mt-28 md:mt-0 relative' />
       
    </div>
  )
}

export default ErrorPage
