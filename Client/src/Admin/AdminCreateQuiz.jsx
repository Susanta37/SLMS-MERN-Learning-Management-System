import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { url } from "../Utilities/serverUrl";
import Loader from "../Utilities/Loader";

const AdminCreateQuiz = ({ courses }) => {
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    options: [
      { option: "" },
      { option: "" },
      { option: "" },
      { option: "" }
    ],
    answer: "",
    course: ""
  });

  const handleOptionChange = (e, index) => {
    const newOptions = [...formData.options];
    newOptions[index].option = e.target.value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${url}/course/quiz`, formData);
      toast.success(data?.message);
      if (data?.success) {
        setFormData({
          name: "",
          options: [
            { option: "" },
            { option: "" },
            { option: "" },
            { option: "" }
          ],
          answer: "",
          course: ""
        });
        setSelectedOption("");
      }
      console.log('data', data);
    } catch (error) {
      console.log('error', error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData({ ...formData, course: event.target.value });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4 md:p-6 space-y-4 md:space-y-6 bg-white shadow-md rounded-md">
      <h1 className="text-xl md:text-2xl font-bold">Create A Quiz</h1>
      <div className="w-full md:w-2/3 flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm md:text-lg" htmlFor="course-dropdown">Choose a Course:</label>
          <select
            value={selectedOption}
            className="p-2 border border-cyan-400 rounded-md"
            onChange={handleChange}
            id="course-dropdown"
          >
            <option value="">Select an option</option>
            {courses.map((option, index) => (
              <option key={index} value={option?._id}>
                {option?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm md:text-lg" htmlFor="quiz-name">Quiz Name:</label>
          <input
            value={formData.name}
            name="name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            type="text"
            placeholder="Name"
            className="p-2 border border-cyan-400 rounded-md"
          />
        </div>
        <h2 className="text-sm md:text-lg">Add Questions</h2>
        {formData.options.map((option, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <label className="text-sm md:text-lg" htmlFor={`option-${index}`}>Option {index + 1}</label>
            <input
              value={option.option}
              onChange={(e) => handleOptionChange(e, index)}
              className="p-2 border border-cyan-400 rounded-md"
              placeholder={`Option ${index + 1}`}
              type="text"
            />
          </div>
        ))}
        <div className="flex flex-col space-y-2">
          <label className="text-sm md:text-lg" htmlFor="answer-dropdown">Select the Answer:</label>
          <select
            value={formData.answer}
            className="p-2 border border-cyan-400 rounded-md"
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            id="answer-dropdown"
          >
            <option value="">Select the answer</option>
            {formData.options.map((option, index) => (
              <option key={index} value={option.option}>
                {option.option}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleSubmit} className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600">Add Quiz</button>
      </div>
    </div>
  );
};

export default AdminCreateQuiz;
