import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logof.png";

const SearchCard = ({ visible, onClose, user, quizzes, calculatedPercentage }) => {
    const navigate = useNavigate();

    if (!visible) return null;

    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
    };

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        >
            <div className="bg-white w-full md:w-[80%] h-auto md:h-[60%] flex flex-col justify-center items-center rounded-lg shadow-lg">
                <div className="w-full flex justify-center pt-8">
                    <img src={logo} className="w-40 h-28" alt="Logo" />
                </div>
                <div className="pl-8 w-full flex flex-col gap-4">
                    <h1 className="text-xl font-bold">{user?.name}</h1>
                    <span className="text-gray-600">Course Name: {quizzes?.[0]?.course?.name}</span>
                    <span className="text-gray-600">Course ID: {quizzes?.[0]?.course?._id}</span>
                </div>
                <div className="border w-full md:w-[80%] h-fit mt-8 p-4 flex flex-col gap-4 border-gray-200">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-gray-600 font-medium">Total Percentage</span>
                            <span className="font-semibold text-lg">{calculatedPercentage}%</span>
                        </div>
                        <div className="flex flex-col mt-4 md:mt-0">
                            <span className="text-gray-600 font-medium">Secured Percentage</span>
                            <span className="font-semibold text-lg">{calculatedPercentage}%</span>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-gray-600 font-medium">Status</span>
                            <span className={`font-semibold text-lg ${
                                calculatedPercentage > 40 ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {calculatedPercentage > 40 ? 'Pass' : 'Fail'}
                            </span>
                        </div>
                        <div className="flex flex-col mt-4 md:mt-0">
                            <span className="text-gray-600 font-medium">Get Certificate</span>
                            {calculatedPercentage > 40 ? (
                                <button onClick={() => navigate("/profile")} className="cursor-pointer text-white bg-green-500 px-4 py-2 rounded-lg">
                                    Get Certificate
                                </button>
                            ) : (
                                <span className="text-red-600">Not Eligible</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchCard;
