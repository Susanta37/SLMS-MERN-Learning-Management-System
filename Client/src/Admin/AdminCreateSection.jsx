import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { url } from "../Utilities/serverUrl";
import Loader from "../Utilities/Loader";

const AdminCreateSection = ({ courses }) => {
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [subSec, setSubSec] = useState({
    title: "",
    timeDuration: "",
    description: "",
    videoUrl: ""
  });
  const [formData, setFormData] = useState({
    sectionName: "",
    subSection: [],
    courseId: ""
  });

  const handleSubChange = (e) => {
    setSubSec((state) => ({
      ...state, [e.target.name]: e.target.value
    }));
  };

  const handlePushSub = () => {
    setFormData((state) => ({
      ...state, subSection: [...state.subSection, subSec]
    }));
    setSubSec({
      title: "",
      timeDuration: "",
      description: "",
      videoUrl: ""
    });
    toast.success(`${formData.subSection.length + 1} video added ..`);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${url}/section/create`, formData);
      toast.success(data?.message);
      if (data?.success) {
        setFormData({
          sectionName: "",
          subSection: [],
          courseId: ""
        });
        setSubSec({
          title: "",
          timeDuration: "",
          description: "",
          videoUrl: ""
        });
      }
      console.log('data', data);
    } catch (error) {
      console.log('error', error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData((state) => ({
      ...state, courseId: event.target.value
    }));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4 md:p-6 space-y-4 md:space-y-6 bg-white shadow-md rounded-md">
      <h1 className="text-xl md:text-2xl font-bold">Create A Section</h1>
      <div className="w-full md:w-2/3 flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm md:text-lg" htmlFor="dynamic-dropdown">Choose a Course:</label>
          <select
            value={selectedOption}
            className="p-2 border border-cyan-400 rounded-md"
            onChange={handleChange}
            id="dynamic-dropdown"
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
          <label className="text-sm md:text-lg" htmlFor="section-name">Section Name:</label>
          <input
            value={formData.sectionName}
            name="sectionName"
            onChange={(e) => {
              setFormData(item => ({
                ...item, [e.target.name]: e.target.value
              }));
            }}
            type="text"
            placeholder="Section Name"
            className="p-2 border border-cyan-400 rounded-md"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-sm md:text-lg">Add Videos</h2>
          <div className="flex flex-col space-y-2">
            <label className="text-sm md:text-lg" htmlFor="video-title">Video Name</label>
            <input
              onChange={handleSubChange}
              value={subSec.title}
              name="title"
              className="p-2 border border-cyan-400 rounded-md"
              placeholder="Video Title"
              type="text"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm md:text-lg" htmlFor="video-time">Video Time</label>
            <input
              onChange={handleSubChange}
              name="timeDuration"
              value={subSec.timeDuration}
              className="p-2 border border-cyan-400 rounded-md"
              placeholder="Video Time"
              type="text"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm md:text-lg" htmlFor="video-description">Video Description</label>
            <input
              onChange={handleSubChange}
              name="description"
              value={subSec.description}
              className="p-2 border border-cyan-400 rounded-md"
              placeholder="Video Description"
              type="text"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm md:text-lg" htmlFor="video-url">Video URL</label>
            <input
              onChange={handleSubChange}
              name="videoUrl"
              value={subSec.videoUrl}
              className="p-2 border border-cyan-400 rounded-md"
              placeholder="Video URL"
              type="text"
            />
          </div>
          <button onClick={handlePushSub} className="py-2 px-4 bg-cyan-500 text-white rounded-md hover:bg-cyan-600">Add Video</button>
        </div>
        <button onClick={handleSubmit} className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600">Add Section</button>
      </div>
    </div>
  );
};

export default AdminCreateSection;
