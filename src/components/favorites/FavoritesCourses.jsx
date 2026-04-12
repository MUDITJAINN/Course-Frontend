import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { BACKEND_URL } from "../../utils/utils";
import { getFavoriteCoursesSet, toggleFavoriteCourse } from "../../utils/favorites";

function FavoritesCourses() {
  const [courses, setCourses] = useState([]);
  const [favorites, setFavorites] = useState(() => getFavoriteCoursesSet());
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/course/courses`, { withCredentials: true });
        setCourses(res.data.courses || []);
      } catch {
        toast.error("Failed to load courses");
      }
    };
    load();
  }, []);

  const favList = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = courses.filter((c) => favorites.has(String(c._id)));
    if (!q) return list;
    return list.filter(
      (c) =>
        (c.title && c.title.toLowerCase().includes(q)) ||
        (c.description && String(c.description).toLowerCase().includes(q))
    );
  }, [courses, favorites, query]);

  const unfav = (courseId) => {
    const next = toggleFavoriteCourse(courseId);
    setFavorites(new Set(next));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Favorite Courses</h1>
            <p className="text-gray-600 text-sm mt-1">Saved courses for later.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/favorites/courses" className="text-sm font-semibold text-blue-600">
              Courses
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/favorites/notes" className="text-sm text-gray-600 hover:text-gray-900">
              Notes
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 max-w-md mb-6">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search favorite courses..."
            className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="h-10 border border-l-0 border-gray-300 rounded-r-lg px-3 flex items-center bg-white">
            <FiSearch className="text-lg text-gray-600" />
          </span>
        </div>

        {favList.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <p className="text-gray-700 font-semibold">No favorite courses yet.</p>
            <p className="text-gray-500 text-sm mt-1">Go to Courses and tap the heart to save.</p>
            <Link to="/courses" className="inline-block mt-4 text-blue-600 hover:underline">
              Browse courses →
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {favList.map((course) => (
              <div
                key={course._id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              >
                <div className="relative">
                  <img
                    src={course.image?.url}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => unfav(course._id)}
                    className="absolute top-3 right-3 bg-white/95 rounded-full w-9 h-9 flex items-center justify-center shadow"
                    title="Remove from favorites"
                    aria-label="Remove from favorites"
                  >
                    <FaHeart className="text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 line-clamp-1">{course.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mt-1">{course.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-gray-900 font-semibold">₹{course.price}</span>
                    <Link to={`/buy/${course._id}`} className="text-blue-600 text-sm hover:underline">
                      Open →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesCourses;

