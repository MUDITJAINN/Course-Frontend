import React, { useEffect, useState } from "react";
import logo from "../assets/Programmingwithmudit.png";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // token
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        console.log(response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  // logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-black min-h-screen">
      <div className="text-white container mx-auto px-4 md:px-6 pb-10">
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt=""
              className="w-8 h-8 md:w-10 md:h-10 rounded-full shadow-lg"
            />
            <h1 className="md:text-2xl text-orange-500 font-bold">
              Programming With Mudit
            </h1>
          </div>
          <div className="space-x-2 md:space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-transparent text-white text-xs md:text-base md:py-2 md:px-4 p-2 border border-white/70 rounded-md hover:bg-white hover:text-black duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="bg-transparent text-white text-xs md:text-base md:py-2 md:px-4 p-2 border border-white/70 rounded-md hover:bg-white hover:text-black duration-300"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="bg-transparent text-white text-xs md:text-base md:py-2 md:px-4 p-2 border border-white/70 rounded-md hover:bg-white hover:text-black duration-300"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        {/* Main section */}
        <section className="text-center py-16 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-500 leading-tight">
            Programming With Mudit
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto mt-5">
            Sharpen your skills with courses crafted by experts.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
            <Link
              to={"/courses"}
              className="bg-green-500 text-white p-2 md:py-3 md:px-6 rounded-md font-semibold hover:bg-white duration-300 hover:text-black"
            >
              Explore Courses
            </Link>
            <Link
              to={"/notes"}
              className="bg-purple-500 text-white p-2 md:py-3 md:px-6 rounded-md font-semibold hover:bg-white duration-300 hover:text-black"
            >
              Explore Notes
            </Link>
            <Link
              to={"https://www.youtube.com/channel/UClpI0dEe-QxQ0rp8LrNLjzg"}
              className="bg-white text-black p-2 md:py-3 md:px-6 rounded-md font-semibold hover:bg-green-500 duration-300 hover:text-white"
            >
              Free Videos
            </Link>
          </div>
        </section>
        <section className="pb-8 md:pb-12">
          <Slider className="" {...settings}>
            {courses.map((course) => (
              <div key={course._id} className="p-4">
                <div className="relative flex-shrink-0 transition-transform duration-300 transform hover:-translate-y-1">
                  <div className="bg-slate-900/90 border border-white/10 rounded-xl overflow-hidden shadow-xl">
                    <img
                      className="mt-4 h-36 w-full object-contain"
                      src={course.image?.url}
                      alt=""
                    />
                    <div className="p-6 text-center">
                      <h2 className="mb-4 text-xl font-bold text-white line-clamp-1">
                        {course.title}
                      </h2>
                      <Link to={`/buy/${course._id}`} className="inline-block mt-2 bg-orange-500 text-white py-2 px-5 rounded-full hover:bg-blue-500 duration-300">
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <hr className="border-white/20" />
        {/* Footer */}
        <footer className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="" className="w-10 h-10 rounded-full" />
                <h1 className="text-2xl text-orange-500 font-bold">
                  Programming With Mudit
                </h1>
              </div>
              <div className="mt-3 ml-2 md:ml-8">
                <p className="mb-2">Follow us</p>
                <div className="flex space-x-4">
                  <a href="#" aria-label="Facebook">
                    <FaFacebook className="text-2xl hover:text-blue-400 duration-300" />
                  </a>
                  <a href="#" aria-label="Instagram">
                    <FaInstagram className="text-2xl hover:text-pink-600 duration-300" />
                  </a>
                  <a href="#" aria-label="Twitter">
                    <FaTwitter className="text-2xl hover:text-blue-600 duration-300" />
                  </a>
                </div>
              </div>
            </div>

            <div className="items-center mt-6 md:mt-0 flex flex-col">
              <h3 className="text-lg font-semibold md:mb-4">connects</h3>
              <ul className=" space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">
                  youtube- learn coding
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  telegram- learn coding
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Github- learn coding
                </li>
              </ul>
            </div>
            <div className="items-center mt-6 md:mt-0 flex flex-col">
              <h3 className="text-lg font-semibold mb-4">
                copyrights &#169; 2025
              </h3>
              <ul className="space-y-2 text-center text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">
                    <Link to="/terms">Terms & Conditions</Link>
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                    <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                    <Link to="/refund">Refund & Cancellation</Link>
                </li>
                </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;