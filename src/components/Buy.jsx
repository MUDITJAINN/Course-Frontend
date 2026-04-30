import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";
import { COURSES_COMING_SOON } from "../config/comingSoon";
import Seo from "../seo/Seo";

function Buy() {
  const { courseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = user?.token;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/course/${courseId}`, {
          withCredentials: true,
        });
        setCourse(res.data.course);
      } catch (e) {
        toast.error(e?.response?.data?.errors || "Course not found");
      } finally {
        setLoading(false);
      }
    };
    if (courseId) load();
  }, [courseId]);

  useEffect(() => {
    if (!token || !courseId) return;
    const check = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/user/purchases`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const ids = (res.data.courseData || []).map((c) => String(c._id));
        setHasAccess(ids.includes(String(courseId)));
      } catch {
        setHasAccess(false);
      }
    };
    check();
  }, [token, courseId]);

  useEffect(() => {
    const merchantOrderId =
      searchParams.get("merchantOrderId") || searchParams.get("transactionId");
    if (!courseId || !merchantOrderId || !token) return;

    const verify = async () => {
      try {
        await axios.get(
          `${BACKEND_URL}/course/verify-payment?courseId=${encodeURIComponent(
            courseId
          )}&merchantOrderId=${encodeURIComponent(merchantOrderId)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        toast.success("Payment successful. Course is now in your purchases.");
        setHasAccess(true);
      } catch (e) {
        toast.error(e?.response?.data?.errors || "Payment verification failed");
      } finally {
        setSearchParams({});
      }
    };
    verify();
  }, [searchParams, courseId, token, setSearchParams]);

  const handlePay = async () => {
    if (!token) {
      toast.error("Please login to purchase");
      navigate("/login");
      return;
    }
    setPaying(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/course/create-payment/${encodeURIComponent(courseId)}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      const url = res?.data?.paymentUrl;
      if (!url) {
        toast.error("Payment URL not found");
        return;
      }
      window.location.href = url;
    } catch (e) {
      toast.error(e?.response?.data?.errors || "Could not start payment");
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading course…</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-gray-600">This course is not available.</p>
        <Link to="/courses" className="text-blue-600 hover:underline">
          Back to courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Seo
        path={`/buy/${encodeURIComponent(courseId || "")}`}
        title={course?.title ? `Buy ${course.title} — Programming With Mudit` : "Buy Course — Programming With Mudit"}
        description={
          course?.description
            ? String(course.description).slice(0, 155)
            : "Purchase a course and access it anytime from your account."
        }
        noindex
      />
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src={course.image?.url}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
          <p className="mt-3 text-gray-600">{course.description}</p>
          <p className="mt-4 text-xl font-semibold text-gray-900">₹{course.price}</p>

          <div className="mt-6 flex flex-col gap-3">
            {hasAccess ? (
              <>
                <p className="text-green-700 font-medium">You own this course.</p>
                <Link
                  to="/purchases"
                  className="inline-block text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                  View in My Purchases
                </Link>
              </>
            ) : (
              <>
                {COURSES_COMING_SOON ? (
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-yellow-900">
                    <p className="font-semibold">Purchasing is temporarily unavailable</p>
                    <p className="text-sm mt-1">
                      This listing is visible for preview, but checkout is disabled while the course catalog
                      is being finalized.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        to="/notes"
                        className="inline-flex items-center bg-white border border-yellow-200 text-yellow-900 px-3 py-1.5 rounded-md hover:bg-yellow-100 text-sm"
                      >
                        Browse notes
                      </Link>
                      <Link
                        to="/blog"
                        className="inline-flex items-center bg-white border border-yellow-200 text-yellow-900 px-3 py-1.5 rounded-md hover:bg-yellow-100 text-sm"
                      >
                        Read blog
                      </Link>
                      <Link
                        to="/contact"
                        className="inline-flex items-center bg-white border border-yellow-200 text-yellow-900 px-3 py-1.5 rounded-md hover:bg-yellow-100 text-sm"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handlePay}
                    disabled={paying}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 disabled:opacity-60"
                  >
                    {paying ? "Redirecting to payment…" : "Pay securely with PhonePe"}
                  </button>
                )}
              </>
            )}
            <Link
              to="/courses"
              className="block text-center text-gray-600 hover:text-gray-900 text-sm"
            >
              ← Back to all courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;
