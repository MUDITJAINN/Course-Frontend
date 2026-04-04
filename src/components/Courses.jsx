
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API call
import { FaCircleUser } from "react-icons/fa6";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse, FaDownload } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi"; // Import menu and close icons
import logo from "../assets/Programmingwithmudit.png";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar
  const [activeView, setActiveView] = useState("store"); // "store" | "purchases"
  const [coursePurchases, setCoursePurchases] = useState([]);
  const [purchasedCourseIds, setPurchasedCourseIds] = useState(() => new Set());
  const navigate = useNavigate();

  console.log("courses: ", courses);

  // Check token
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        console.log(response.data.courses);
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = user?.token;
    if (!token) {
      setCoursePurchases([]);
      setPurchasedCourseIds(new Set());
      return;
    }
    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/purchases`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const list = response.data.courseData || [];
        setCoursePurchases(list);
        setPurchasedCourseIds(new Set(list.map((c) => String(c._id))));
      } catch (error) {
        console.log("Failed to fetch course purchases", error);
      }
    };
    fetchPurchases();
  }, [isLoggedIn]);

  // Toggle sidebar for mobile devices
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Hamburger menu button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 text-3xl text-gray-800"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <HiX /> : <HiMenu />} {/* Toggle menu icon */}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-100 w-64 p-5 transform z-10 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="flex items-center mb-10 mt-10 md:mt-0">
          <img src={logo} alt="Profile" className="rounded-full h-12 w-12" />
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/" className="flex items-center">
                <RiHome2Fill className="mr-2" /> Home
              </Link>
            </li>
            <li className="mb-4">
              <button
                type="button"
                onClick={() => setActiveView("store")}
                className={`flex items-center ${activeView === "store" ? "text-blue-500" : ""}`}
              >
                <FaDiscourse className="mr-2" /> Courses
              </button>
            </li>
            <li className="mb-4">
              <button
                type="button"
                onClick={() => setActiveView("purchases")}
                className={`flex items-center ${activeView === "purchases" ? "text-blue-500" : ""}`}
              >
                <FaDownload className="mr-2" /> Course Purchases
              </button>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center">
                <IoMdSettings className="mr-2" /> Settings
              </a>
            </li>
            <li>
              {!isLoggedIn && (
                <Link to={"/login"} className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-0 w-full bg-white p-10">
        {activeView === "purchases" ? (
          <>
            <header className="flex justify-between items-center mb-10">
              <h1 className="text-xl font-bold">My Course Purchases</h1>
            </header>
            <div className="overflow-y-auto h-[75vh]">
              {coursePurchases.length === 0 ? (
                <p className="text-center text-gray-500">No purchased courses yet.</p>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {coursePurchases.map((course, idx) => (
                    <div
                      key={`p-${course._id}-${idx}`}
                      className="border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                      <img
                        src={course.image?.url}
                        alt={course.title}
                        className="rounded mb-4"
                      />
                      <h2 className="font-bold text-lg mb-2">{course.title}</h2>
                      <p className="text-gray-600 mb-4">
                        {course.description.length > 500
                          ? `${course.description.slice(0, 500)}...`
                          : course.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xl">₹{course.price}</span>
                        <span className="text-green-600">Purchased</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <header className="flex justify-between items-center mb-10">
              <h1 className="text-xl font-bold">Courses</h1>
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Type here to search..."
                    className="border border-gray-300 rounded-l-full px-4 py-2 h-10 focus:outline-none"
                  />
                  <button className="h-10 border border-gray-300 rounded-r-full px-4 flex items-center justify-center">
                    <FiSearch className="text-xl text-gray-600" />
                  </button>
                </div>

                <FaCircleUser className="text-4xl text-blue-600" />
              </div>
            </header>

            {/* Vertically Scrollable Courses Section */}
            <div className="overflow-y-auto h-[75vh]">
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : courses.length === 0 ? (
                <p className="text-center text-gray-500">
                  No course posted yet by admin
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {courses.map((course) => {
                    const owned = purchasedCourseIds.has(String(course._id));
                    return (
                      <div
                        key={course._id}
                        className="border border-gray-200 rounded-lg p-4 shadow-sm"
                      >
                        <img
                          src={course.image?.url}
                          alt={course.title}
                          className="rounded mb-4"
                        />
                        <h2 className="font-bold text-lg mb-2">{course.title}</h2>
                        <p className="text-gray-600 mb-4">
                          {course.description.length > 500
                            ? `${course.description.slice(0, 500)}...`
                            : course.description}
                        </p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-bold text-xl">₹{course.price}</span>
                          {owned ? (
                            <span className="text-green-600 font-medium">Purchased</span>
                          ) : (
                            <span className="text-gray-500 text-sm">Pay to unlock</span>
                          )}
                        </div>

                        {owned ? (
                          <Link
                            to="/purchases"
                            className="block text-center bg-green-600 w-full text-white px-4 py-2 rounded-lg hover:bg-green-700 duration-300"
                          >
                            View in My Purchases
                          </Link>
                        ) : (
                          <Link
                            to={`/buy/${course._id}`}
                            className="block text-center bg-orange-500 w-full text-white px-4 py-2 rounded-lg hover:bg-orange-600 duration-300"
                          >
                            Buy Now
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Courses;