import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AdminCourseCard from './AdminCourseCard';
import AdminCreateCourse from './AdminCreateCourse';
import AdminCreateSection from './AdminCreateSection';
import AdminCreateQuiz from './AdminCreateQuiz';
import Loader from '../Utilities/Loader';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [courseOpen, setCourseOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { id } = useParams();
  const courses = useSelector(state => state?.course?.courses);
  const status = useSelector(state => state?.course?.status);
  const sidebarItems = ["All Courses", "Create Course", "Add Section", "Add Quiz"];
  const [open, setOpen] = useState(0);

  const handleOpen = (index) => {
    navigate(`/admindashboard/${index}`);
  };

  useEffect(() => {
    setOpen(id);
  }, [id]);

  useEffect(() => {
    if (!user?.isAdmin) {
      toast.error("You are not an admin");
      navigate("/");
    }
  }, [user]);

  return (
    <div className="w-full h-full flex flex-col md:flex-row">
     <div className="bg-gray-800 text-white w-full md:w-[20%] py-8 px-6 flex flex-col items-center justify-start">
        <h2 className="text-lg font-semibold mb-4">Admin Dashboard</h2>
        {sidebarItems.map((item, index) => (
          <div 
            key={index} 
            onClick={() => handleOpen(index)} 
            className={`cursor-pointer w-full py-2 rounded-lg text-center transition-colors duration-300 hover:bg-cyan-600 hover:text-white ${
              open === index ? 'bg-cyan-600 text-white font-bold' : ''
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="w-full md:w-[80%] h-full p-4 overflow-y-auto">
        {status === "loading" ? <Loader /> : (
          <>
            <div className={`w-full ${open == 0 ? "flex" : "hidden"} flex-wrap justify-center gap-4`}>
              {courses?.map((item, index) => (
                <AdminCourseCard key={index} course={item} />
              ))}
            </div>
            <div className={`w-full ${open == 1 ? "block" : "hidden"}`}>
              <AdminCreateCourse />
            </div>
            <div className={`w-full ${open == 2 ? "block" : "hidden"}`}>
              <AdminCreateSection courses={courses} />
            </div>
            <div className={`w-full ${open == 3 ? "block" : "hidden"}`}>
              <AdminCreateQuiz courses={courses} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
