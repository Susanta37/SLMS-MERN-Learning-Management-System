import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logof.png"
const SearchCard = ({ visible, onClose, user, quizzes, calculatedPercentage }) => {
    const navigate = useNavigate()
    if (!visible) return null;
    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
    };

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        >

            <div className="bg-white h-[60%] w-[60%] flex flex-col gap-4 items-center rounded ">
                <div className=" flex w-full justify-center">
                    <img src={logo} className=" w-60 h-40" alt="" />
                </div>
                <div className=" pl-12 flex  w-full flex-col gap-2">
                    <h1>Name :{user?.name} </h1>
                    <span>course Name : {quizzes?.[0]?.course?.name} </span>
                    <span>course id : {quizzes?.[0]?.course?._id}</span>
                </div>
                <div className="   border w-[90%] h-fit mt-10 flex flex-col gap-2 border-gray-900">
                    <div className=" flex p-2    gap-2 justify-between">
                        <span className=" flex gap-4 flex-col">Total percentage <hr /> <span>100 </span></span>
                        <span className=" flex flex-col gap-4 ">secured percentage  <hr />  <span> {calculatedPercentage} % </span> </span>
                        <span className=" flex flex-col gap-4 ">status <hr />  {calculatedPercentage > 40 ? <span className=" text-green-600 bg-green-100 px-4 py-2">pass</span> : <span className=" text-red-600 bg-red-100 px-4 py-2">Fail</span>} </span>
                        <span className=" flex cursor-pointer flex-col gap-4 ">get Certificate  <hr />  {calculatedPercentage > 40 ? <span onClick={() => { navigate("/profile") }} className=" text-green-600 bg-green-100 px-4 py-2">Get Certificate</span> : <span className=" text-red-600 bg-red-100 px-4 py-2">Not Eligible</span>}</span>
                    </div>

                </div>
                {/* {
          Math.floor(calculatedPercentage) > 40 ? <div className=" flex flex-col justify-center h-full items-center gap-2">
            <span>congratulations you have successfully completed the course ...</span>
            <span>mark Secured : {calculatedPercentage} % </span>
            <button onClick={() => { navigate("/profile") }}>check your certificate </button>
          </div> : <span>fail</span>
        } */}
            </div>
        </div>
    );
};

export default SearchCard