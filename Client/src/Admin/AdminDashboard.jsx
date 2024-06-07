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
      <div className="w-full md:w-[20%] p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-100">
        {sidebarItems.map((item, index) => (
          <div 
            key={index} 
            onClick={() => handleOpen(index)} 
            className={`cursor-pointer w-full px-4 py-2 rounded-full text-white duration-300 transition-all ease-in-out 
              ${open == index ? 'bg-cyan-700' : 'bg-gradient-to-r from-cyan-300 to-cyan-700 hover:translate-x-2'}`}
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
