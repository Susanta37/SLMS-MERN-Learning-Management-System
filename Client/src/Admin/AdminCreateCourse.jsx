import React, { useState } from "react";
import axios from "axios";
import { url } from "../Utilities/serverUrl";
import toast from "react-hot-toast";
import Loader from "../Utilities/Loader";

const AdminCreateCourse = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    thumbnail: "",
    price: "",
    user: [],
    section: [],
  });

  const handleImage = async (e) => {
    setLoading(true);
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "gsvon2yxLMS");
    formData.append("cloud_name", "dcyuvyc65");

    try {
      const resImage = await axios.post("https://api.cloudinary.com/v1_1/dcyuvyc65/image/upload", formData);
      const imageURL = resImage.data.url;
      setImage(imageURL);

      setFormData((prevFormData) => ({
        ...prevFormData,
        thumbnail: imageURL,
      }));
    } catch (error) {
      console.log('Error during image upload:', error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${url}/course/create`, formData);
      if (data?.success) {
        toast.success(data?.message);
        setFormData({
          name: "",
          type: "",
          description: "",
          thumbnail: "",
          price: "",
          user: [],
          section: [],
        });
        setImage("");  // Clear the image state as well
      }
    } catch (error) {
      console.log('Error during form submission:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-8">
      <form className="w-full h-[95%] flex justify-center flex-col items-center bg-white shadow-md rounded-lg p-8" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6">Create A Course</h2>
        <div className="w-full md:w-[50%] space-y-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-300 p-2 rounded-md"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="type" className="font-medium">Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              className="border border-gray-300 p-2 rounded-md"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="font-medium">Description:</label>
            <textarea
              id="description"
              name="description"
              className="border border-gray-300 p-2 rounded-md"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="thumbnail" className="font-medium">Thumbnail:</label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              className="border border-gray-300 p-2 rounded-md"
              onChange={handleImage}
          
            />
            {formData.thumbnail && (
              <img src={formData.thumbnail} alt="Thumbnail" className="h-24 w-24 mt-4 object-cover rounded-md" />
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="font-medium">Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              className="border border-gray-300 p-2 rounded-md"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCreateCourse;
