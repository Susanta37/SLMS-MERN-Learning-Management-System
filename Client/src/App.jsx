import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

import LandingPage from './Page/LandingPage'
import ErrorPage from './Components/ErrorPage'
import Login from './Page/Login'



const App = () => {
  const appRoute=createBrowserRouter([
{
  path:'/',
  element:<LandingPage/>,
  errorElement:<ErrorPage/>
},
{
  path:'/login',
  element:<Login/>,
}



  ])
  return (
  
 <RouterProvider router={appRoute}/>
  )
}

export default App
