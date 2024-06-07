import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import logo from "../assets/logof.png";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export default function SideBar({ open, handleClose }) {
  const navigate = useNavigate();
  const [index, setIndex] = React.useState(false);
  const courses = useSelector((state) => state?.course?.courses);
  const user = JSON.parse(localStorage.getItem("user"));
  let value = useSelector((state) => state.authReducer.isLogin);
  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          open={open}
          onClose={() => {
            handleClose();
          }}
        >
          <div className=" w-60  flex flex-col gap-4">
            {value && (
              <>
                {" "}
                <span className=" p-2 w-full h-fit flex  gap-2 items-center ">
                  {" "}
                  hello {user?.name?.slice(0,10)}{" "}
                </span>
                <span onClick={()=>{ handleClose();  navigate("/profile/1")}} className="  w-full h-fit flex px-4 py-1 rounded-md  bg-cyan-400 border border-cyan-800 text-white  gap-2 justify-between items-center ">
                  {" "}
                  view Profile
                  <IoLogOut className=" text-red-500 text-sm md:text-base" />{" "}
                </span>
                <span onClick={()=>{ handleClose();  navigate("/admindashboard/0")}} className="  w-full h-fit flex px-4 py-1 rounded-md  bg-cyan-400 border border-cyan-800 text-white  gap-2 justify-between items-center ">
                  {" "}
                  view Admin Panel
                 
                </span>
              </>
            )}
            {!value && (
              <>
                {" "}
                <span className=" p-2 w-full h-fit flex flex-col gap-2 justify-between items-center ">
                  <span className=" w-full relative font-italianno flex flex-col items-center justify-center  ">
                    <span className=" absolute top-0 left-50">WellCome to</span>{" "}
                    <img onClick={()=>{handleClose();navigate("/")}} src={logo} className=" w-full h-28 " alt="" />{" "}
                  </span>
                  <span className=" w-full justify-evenly flex items-center  ">
                    <span onClick={()=>{handleClose();navigate("/login")}} className=" px-4 py-1 rounded-md  bg-cyan-400 border border-cyan-800 text-white">login</span> <span onClick={()=>{handleClose();navigate("/signup")}} className=" px-2 py-1 rounded-md border border-cyan-400 shadow-sm shadow-cyan-400 ">sign up</span>
                  </span>{" "}
                </span>
               
              </>
            )}
            <span
              onClick={() => {
                setIndex((state) => !state);
              }}
              className="px-6  flex justify-between w-full h-fit "
            >
              Courses {!index ? <FaAngleRight /> : <FaAngleDown />}{" "}
            </span>
          </div>

          <div
            className={`px-4 h-full ${
              index ? "flex" : "hidden"
            } transition-all mt-4 ease-in-out duration-500 flex-col gap-4`}
          >
            {courses?.map((item, index) => (
              <span
                onClick={() => {
                  handleClose();
                  navigate(`/courses/${item?._id}`);
                }}
                key={index}
                className=" px-4 flex items-center justify-between text-xs  w-full "
              >
                {" "}
                {item?.name} <FaAngleRight />{" "}
              </span>
            ))}
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
