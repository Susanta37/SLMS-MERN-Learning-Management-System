import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import logo from "../assets/logof.png"
const MyModal = ({ visible, onClose, user, quizzes, calculatedPercentage }) => {
  const navigate = useNavigate()
  if (!visible) return null;
  const handleOnClose = (e) => {
    if (e?.target?.id === "container") onClose();
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center"
    >
      <span onClick={()=>{onClose();navigate("/profile/2")}} className=" w-full md:w-[60%] flex justify-end text-red-600"><RxCross2 size={28}/></span>
      <div className="bg-white h-full md:h-[60%] w-full md:w-[60%] flex flex-col gap-4 items-center rounded ">
        <div className=" flex w-full justify-center">
          <img src={logo} className=" w-60 h-40" alt="" />
        </div>
        <div className=" pl-12 flex  w-full flex-col gap-2">
          <h1>Name :{user?.name} </h1>
          <span>course Name : {quizzes?.[0]?.course?.name} </span>
          <span>course id : {quizzes?.[0]?.course?._id}</span>
        </div>
        <div className="   border w-[90%] h-fit mt-10 flex flex-col gap-2 border-gray-900">
          <div className=" flex md:p-2  text-xs md:text-base   gap-2 justify-between">
            <span className=" flex gap-4 justify-center flex-col">Total percentage <hr /> <span>100 </span></span>
            <span className=" flex flex-col justify-center gap-4 ">secured percentage  <hr />  <span> {calculatedPercentage.toFixed(2)} % </span> </span>
            <span className=" flex flex-col justify-center gap-4 ">status <hr />  {calculatedPercentage > 40 ? <span className=" text-green-600 bg-green-100 px-4 py-2">pass</span> : <span className=" text-red-600 bg-red-100 px-4 py-2">Fail</span>} </span>
            <span className=" flex cursor-pointer flex-col justify-center gap-4 ">get Certificate  <hr />  {calculatedPercentage > 40 ? <span onClick={() => { navigate("/profile/2") }} className=" text-green-600 bg-green-100 px-4 py-2">Get Certificate</span> : <span className=" text-red-600 bg-red-100 px-4 py-2">Not Eligible</span>}</span>
          </div>

        </div>
       
      </div>
    </div>
  );
};

export default MyModal