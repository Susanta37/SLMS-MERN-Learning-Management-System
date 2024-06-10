import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="https://placehold.co/32x32"
                alt="Course"
                className="w-8 h-8"
              />
              <div>
                <p className="text-sm text-zinc-500">New Course Available</p>
                <p className="text-blue-500">
                  <a href="#" className="underline">
                    Introduction to Web Development
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="https://placehold.co/32x32"
                alt="Course"
                className="w-8 h-8"
              />
              <div>
                <p className="text-sm text-zinc-500">New Course Available</p>
                <p className="text-blue-500">
                  <a href="#" className="underline">
                    Mastering Data Science
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <img
                src="https://placehold.co/48x48"
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-sm text-zinc-500">1 day ago</p>
                <p className="text-blue-500">
                  <a href="#" className="underline">
                    John Doe
                  </a>{" "}
                  posted a review on{" "}
                  <a href="#" className="underline">
                    JavaScript Essentials
                  </a>
                </p>
                <p className="text-zinc-700 dark:text-zinc-300">
                  This course is a great introduction to JavaScript. It covers
                  all the basics and has plenty of practical examples.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <img
                src="https://placehold.co/48x48"
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-sm text-zinc-500">2 days ago</p>
                <p className="text-blue-500">
                  <a href="#" className="underline">
                    Jane Smith
                  </a>{" "}
                  posted a review on{" "}
                  <a href="#" className="underline">
                    Advanced CSS Techniques
                  </a>
                </p>
                <p className="text-zinc-700 dark:text-zinc-300">
                  The advanced CSS techniques course is well-structured and
                  very informative. I learned a lot of new tricks.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <img
                src="https://placehold.co/48x48"
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-sm text-zinc-500">3 days ago</p>
                <p className="text-blue-500">
                  <a href="#" className="underline">
                    Alex Johnson
                  </a>{" "}
                  posted a review on{" "}
                  <a href="#" className="underline">
                    Python for Data Analysis
                  </a>
                </p>
                <p className="text-zinc-700 dark:text-zinc-300">
                  This course is a must for anyone interested in data analysis
                  using Python. The instructor explains everything clearly.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-green-500 text-white p-4 rounded-lg">
              <h3 className="text-lg font-bold">Featured Course:</h3>
              <p>Machine Learning for Beginners</p>
              <button className="mt-2 bg-white text-green-500 px-4 py-2 rounded">
                Enroll Now
              </button>
            </div>

            <div className="bg-purple-500 text-white p-4 rounded-lg">
              <h3 className="text-lg font-bold">Special Offer:</h3>
              <p>50% Off on All Web Development Courses</p>
              <button className="mt-2 bg-white text-purple-500 px-4 py-2 rounded">
                Grab the Deal
              </button>
            </div>

            <div className="bg-zinc-800 text-white p-4 rounded-lg">
              <h3 className="text-lg font-bold">Join Our Community</h3>
              <p>Connect with other learners and instructors</p>
              <button className="mt-2 bg-white text-zinc-800 px-4 py-2 rounded">
                Join Now
              </button>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
              <h3 className="text-lg font-bold">Upcoming Events</h3>
              <p>Webinar on AI and Machine Learning</p>
              <img
                src="https://placehold.co/48x48"
                alt="Event"
                className="w-12 h-12 mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
