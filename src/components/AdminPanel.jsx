import axios from "axios";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function AdminPanel() {
  const [adminAuth, setAdminAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("admin")) || null;
    } catch {
      return null;
    }
  });
  const [activeTab, setActiveTab] = useState("course");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adminLogin, setAdminLogin] = useState({ email: "", password: "" });
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });
  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    price: "",
    pages: "",
    previewImageUrl: "",
    downloadFileUrl: "",
  });

  const adminToken = useMemo(() => adminAuth?.token || "", [adminAuth]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/admin/login`, adminLogin, {
        withCredentials: true,
      });
      localStorage.setItem("admin", JSON.stringify(response.data));
      setAdminAuth(response.data);
      toast.success("Admin login successful");
    } catch (error) {
      toast.error(error?.response?.data?.errors || "Admin login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/admin/logout`, { withCredentials: true });
    } finally {
      localStorage.removeItem("admin");
      setAdminAuth(null);
      toast.success("Admin logged out");
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!courseData.image) {
      toast.error("Please upload a course image");
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", courseData.title);
      formData.append("description", courseData.description);
      formData.append("price", courseData.price);
      formData.append("image", courseData.image);

      await axios.post(`${BACKEND_URL}/course/create`, formData, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success("Course created");
      setCourseData({ title: "", description: "", price: "", image: null });
    } catch (error) {
      toast.error(error?.response?.data?.errors || "Course creation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${BACKEND_URL}/notes/create`, noteData, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success("Note created");
      setNoteData({
        title: "",
        description: "",
        price: "",
        pages: "",
        previewImageUrl: "",
        downloadFileUrl: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.errors || "Note creation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!adminToken) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <form
          onSubmit={handleAdminLogin}
          className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-sm p-6"
        >
          <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
          <p className="text-gray-600 mb-5">Only admin credentials can access this page.</p>
          <input
            type="email"
            placeholder="Admin email"
            value={adminLogin.email}
            onChange={(e) => setAdminLogin({ ...adminLogin, email: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
            required
          />
          <input
            type="password"
            placeholder="Admin password"
            value={adminLogin.password}
            onChange={(e) => setAdminLogin({ ...adminLogin, password: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSubmitting ? "Please wait..." : "Login as Admin"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button
            type="button"
            onClick={handleAdminLogout}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-3 mb-5">
          <button
            type="button"
            onClick={() => setActiveTab("course")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "course" ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            Add Course
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("note")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "note" ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            Add Note
          </button>
        </div>

        {activeTab === "course" ? (
          <form
            onSubmit={handleCreateCourse}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Create Course</h2>
            <input
              type="text"
              placeholder="Course title"
              value={courseData.title}
              onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
              required
            />
            <textarea
              placeholder="Course description"
              value={courseData.description}
              onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 h-28"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={courseData.price}
              onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
              required
            />
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) =>
                setCourseData({ ...courseData, image: e.target.files?.[0] || null })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              {isSubmitting ? "Saving..." : "Create Course"}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleCreateNote}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Create Note</h2>
            <input
              type="text"
              placeholder="Note title"
              value={noteData.title}
              onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
              required
            />
            <textarea
              placeholder="Note description"
              value={noteData.description}
              onChange={(e) => setNoteData({ ...noteData, description: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 h-28"
              required
            />
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <input
                type="number"
                placeholder="Price"
                value={noteData.price}
                onChange={(e) => setNoteData({ ...noteData, price: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
              <input
                type="number"
                placeholder="Pages"
                value={noteData.pages}
                onChange={(e) => setNoteData({ ...noteData, pages: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Preview image URL (e.g. /react.png)"
              value={noteData.previewImageUrl}
              onChange={(e) => setNoteData({ ...noteData, previewImageUrl: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
              required
            />
            <input
              type="text"
              placeholder="Download file URL (e.g. /notes/DSA.pdf)"
              value={noteData.downloadFileUrl}
              onChange={(e) => setNoteData({ ...noteData, downloadFileUrl: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              {isSubmitting ? "Saving..." : "Create Note"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
