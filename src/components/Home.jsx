import React, { useEffect, useMemo, useState } from "react";
import logo from "../assets/Programmingwithmudit.png";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaStar,
  FaArrowRight,
  FaCheck,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { HiOutlineAcademicCap, HiOutlineBookOpen, HiOutlineShieldCheck } from "react-icons/hi";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL, TELEGRAM_URL, WHATSAPP_URL } from "../utils/utils";

const PORTFOLIO_URL = "https://muditt-portfolio.netlify.app/";

const testimonials = [
  {
    quote:
      "I was stuck between random YouTube playlists and expensive bootcamps. The notes were structured exactly how I needed for interviews — clear explanations and no fluff.",
    name: "Ananya Sharma",
    role: "Final year, B.Tech CSE · Placed as SDE intern",
    initials: "AS",
  },
  {
    quote:
      "Paid once, downloaded the full PDF, and used it for two months on my commute. Way better value than buying three separate Udemy courses I never finished.",
    name: "Rahul Menon",
    role: "Working professional · Backend developer",
    initials: "RM",
  },
  {
    quote:
      "PhonePe checkout was quick. After payment the download worked immediately and showed up under My Purchases. Support responded on email within a day.",
    name: "Priya Nair",
    role: "Career switcher into tech · Bengaluru",
    initials: "PN",
  },
];

function Home() {
  const [courses, setCourses] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(Boolean(user));
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        setCourses(response.data.courses || []);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/notes/all`, {
          withCredentials: true,
        });
        setNotes(response.data.notes || []);
      } catch (error) {
        console.log("error in fetchNotes ", error);
      }
    };
    fetchNotes();
  }, []);

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
      toast.error(error.response?.data?.errors || "Error in logging out");
    }
  };

  const minCoursePrice = useMemo(() => {
    if (!courses.length) return null;
    const prices = courses.map((c) => Number(c.price)).filter((n) => !Number.isNaN(n));
    if (!prices.length) return null;
    return Math.min(...prices);
  }, [courses]);

  const minNotePrice = useMemo(() => {
    if (!notes.length) return null;
    const prices = notes.map((n) => Number(n.price)).filter((n) => !Number.isNaN(n));
    if (!prices.length) return null;
    return Math.min(...prices);
  }, [notes]);

  const sliderSettings = {
    dots: true,
    infinite: courses.length > 4,
    speed: 500,
    slidesToShow: Math.min(4, Math.max(courses.length, 1)),
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: courses.length > 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, Math.max(courses.length, 1)),
          slidesToScroll: 1,
          infinite: courses.length > 3,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, Math.max(courses.length, 1)),
          slidesToScroll: 1,
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
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-black min-h-screen text-white">
      <div className="container mx-auto px-4 md:px-6 pb-16">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 py-6">
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt=""
              className="w-8 h-8 md:w-10 md:h-10 rounded-full shadow-lg"
            />
            <h1 className="md:text-xl text-lg text-orange-500 font-bold font-poppins">
              Programming With Mudit
            </h1>
          </div>
          <nav className="flex flex-wrap items-center justify-end gap-2 md:gap-3 text-sm md:text-base">
            {/* <Link
              to="/services"
              className="text-gray-300 hover:text-white border border-white/20 rounded-md px-3 py-1.5 md:px-4 md:py-2 transition-colors"
            >
              Services
            </Link>
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white border border-white/20 rounded-md px-3 py-1.5 md:px-4 md:py-2 transition-colors"
            >
              Portfolio
            </a> */}
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="bg-transparent text-white py-1.5 px-3 md:py-2 md:px-4 border border-white/70 rounded-md hover:bg-white hover:text-black duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-transparent text-white py-1.5 px-3 md:py-2 md:px-4 border border-white/70 rounded-md hover:bg-white hover:text-black duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-transparent text-white py-1.5 px-3 md:py-2 md:px-4 border border-white/70 rounded-md hover:bg-white hover:text-black duration-300"
                >
                  Signup
                </Link>
              </>
            )}
          </nav>
        </header>

        {/* Hero */}
        <section className="text-center pt-6 pb-14 md:pt-10 md:pb-20 max-w-3xl mx-auto">
          <p className="text-orange-400/90 text-sm font-semibold tracking-widest uppercase mb-4">
            Learn smarter — not harder
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-poppins leading-tight">
            Structured courses &amp; notes for{" "}
            <span className="text-orange-500">real-world coding</span>
          </h2>
          <p className="text-gray-300 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            One place to preview content, pay securely with PhonePe, and access your purchases
            anytime — built for students and working developers.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-400 transition-colors shadow-lg shadow-orange-900/30"
            >
              Browse courses <FaArrowRight className="text-sm" />
            </Link>
            <Link
              to="/notes"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold border border-white/20 hover:bg-white/15 transition-colors"
            >
              Shop notes
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold border border-orange-500/40 hover:border-orange-400/60 hover:bg-white/10 transition-colors"
            >
              Hire / services
            </Link>
          </div>
        </section>

        {/* Problem */}
        <section className="py-16 md:py-20 border-t border-white/10" id="problem">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">
              The problem
            </p>
            <h3 className="text-3xl md:text-4xl font-bold font-poppins text-white">
              Most learners don&apos;t fail from lack of effort — they fail from lack of structure
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Scattered resources",
                body: "Jumping between videos, PDFs, and blogs makes it hard to track what you’ve actually mastered.",
                icon: HiOutlineBookOpen,
              },
              {
                title: "Unclear progression",
                body: "Without a path, you repeat basics or skip foundations — both hurt when it’s interview time.",
                icon: HiOutlineAcademicCap,
              },
              {
                title: "Trust & access",
                body: "You want to know what you’re buying, pay safely, and keep lifetime access to what you paid for.",
                icon: HiOutlineShieldCheck,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 md:p-8 text-left hover:border-orange-500/30 transition-colors"
              >
                <item.icon className="text-3xl text-orange-500 mb-4" />
                <h4 className="text-xl font-bold text-white mb-2 font-poppins">{item.title}</h4>
                <p className="text-gray-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Solution */}
        <section className="py-16 md:py-20 bg-slate-900/40 rounded-3xl px-4 md:px-10 border border-white/5" id="solution">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">
              The solution
            </p>
            <h3 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-6">
              One platform: preview, pay, learn, revisit
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Courses and notes are organized for clarity. You see previews before you buy, complete
              checkout with PhonePe, and your library lives under{" "}
              <span className="text-white font-medium">My Purchases</span> — only for your account.
            </p>
          </div>
          <ul className="max-w-xl mx-auto space-y-4">
            {[
              "Curated notes with preview pages — full PDF only after purchase",
              "Course checkout aligned with the same secure payment flow",
              "Login required for purchases; downloads protected on the server",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3 text-gray-200">
                <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                  <FaCheck className="text-xs" />
                </span>
                {line}
              </li>
            ))}
          </ul>
          <div className="text-center mt-10">
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 font-medium underline underline-offset-4"
            >
              More about the instructor — portfolio &amp; work
            </a>
          </div>
        </section>

        {/* Demo */}
        <section className="py-16 md:py-24 border-t border-white/10" id="demo">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Demo
            </p>
            <h3 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
              How it works in three steps
            </h3>
            <p className="text-gray-400">
              Same journey for courses and notes — transparent from browse to download.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {[
              { step: "01", title: "Explore", desc: "Open Courses or Notes, read descriptions, and use previews where available." },
              { step: "02", title: "Pay securely", desc: "Checkout with PhonePe. Your order is tied to your logged-in account." },
              { step: "03", title: "Access forever", desc: "Find everything under My Purchases and download notes when you need them." },
            ].map((s) => (
              <div
                key={s.step}
                className="relative text-center md:text-left pl-0 md:pl-4 border-l-0 md:border-l-2 border-orange-500/40"
              >
                <span className="text-orange-500 font-mono text-sm font-bold">{s.step}</span>
                <h4 className="text-xl font-bold text-white mt-2 mb-2 font-poppins">{s.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-6xl mx-auto">
            <h4 className="text-center text-lg font-semibold text-gray-300 mb-8 font-poppins">
              Featured courses
            </h4>
            {courses.length > 0 ? (
              <Slider {...sliderSettings}>
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
                          <h5 className="mb-2 text-lg font-bold text-white line-clamp-2 min-h-[3.5rem]">
                            {course.title}
                          </h5>
                          <p className="text-orange-400 font-semibold mb-4">₹{course.price}</p>
                          <Link
                            to={`/buy/${course._id}`}
                            className="inline-block bg-orange-500 text-white py-2 px-5 rounded-full hover:bg-orange-600 duration-300 text-sm font-semibold"
                          >
                            View &amp; enroll
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <p className="text-center text-gray-500 py-12 border border-dashed border-white/20 rounded-xl">
                New courses will appear here once published from the admin panel.
              </p>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-20 border-t border-white/10" id="testimonials">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Testimonials
            </p>
            <h3 className="text-3xl md:text-4xl font-bold font-poppins text-white">
              What learners say
            </h3>
            <p className="text-gray-500 text-sm mt-3">Sample feedback from early customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t) => (
              <article
                key={t.name}
                className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 flex flex-col h-full hover:border-white/20 transition-colors"
              >
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed flex-grow italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                  <div
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-sm font-bold text-white"
                    aria-hidden
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Pricing — courses, notes & freelance (same section) */}
        <section className="py-16 md:py-20" id="pricing">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Pricing
            </p>
            <h3 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
              Courses, notes &amp; freelance
            </h3>
            <p className="text-gray-300 text-lg">
              Digital products are one-time purchases. Freelance work is quoted per project — no
              subscriptions on the store.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {/* Courses */}
            <div className="flex flex-col bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-orange-500/35 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/30">
              <div className="text-center mb-6">
                <p className="text-orange-400/90 text-xs font-semibold uppercase tracking-wider mb-2">
                  Courses
                </p>
                {minCoursePrice != null ? (
                  <>
                    <p className="text-4xl md:text-5xl font-bold text-white font-poppins">
                      ₹{minCoursePrice}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">from · per course</p>
                  </>
                ) : (
                  <>
                    <p className="text-xl font-semibold text-white">Per listing</p>
                    <p className="text-gray-500 text-sm mt-2">Prices on each course card</p>
                  </>
                )}
              </div>
              <ul className="text-left text-gray-300 text-sm space-y-2.5 flex-grow mb-6">
                <li className="flex items-start gap-2">
                  <FaCheck className="text-green-400 flex-shrink-0 mt-0.5" /> Full course access after
                  payment
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="text-green-400 flex-shrink-0 mt-0.5" /> PhonePe checkout
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="text-green-400 flex-shrink-0 mt-0.5" /> Listed under My purchases
                </li>
              </ul>
              <Link
                to="/courses"
                className="inline-flex w-full justify-center items-center gap-2 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-400 transition-colors text-sm"
              >
                Browse courses <FaArrowRight className="text-sm" />
              </Link>
            </div>

            {/* Notes */}
            <div className="flex flex-col bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-violet-500/35 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/30 md:scale-[1.02] md:z-10">
              <div className="text-center mb-6">
                <p className="text-violet-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Notes
                </p>
                {minNotePrice != null ? (
                  <>
                    <p className="text-4xl md:text-5xl font-bold text-white font-poppins">
                      ₹{minNotePrice}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">from · per PDF pack</p>
                  </>
                ) : (
                  <>
                    <p className="text-xl font-semibold text-white">Per pack</p>
                    <p className="text-gray-500 text-sm mt-2">Each note has its own price</p>
                  </>
                )}
              </div>
              <ul className="text-left text-gray-300 text-sm space-y-2.5 flex-grow mb-6">
                <li className="flex items-start gap-2">
                  <FaCheck className="text-green-400 flex-shrink-0 mt-0.5" /> Preview before you buy
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="text-green-400 flex-shrink-0 mt-0.5" /> Secure PDF download after
                  payment
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="text-green-400 flex-shrink-0 mt-0.5" /> Same PhonePe flow as courses
                </li>
              </ul>
              <Link
                to="/notes"
                className="inline-flex w-full justify-center items-center gap-2 bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-500 transition-colors text-sm"
              >
                Shop notes <FaArrowRight className="text-sm" />
              </Link>
            </div>

            {/* Freelance */}
            <div className="flex flex-col bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-emerald-500/35 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/30">
              <div className="text-center mb-6">
                <p className="text-emerald-400/90 text-xs font-semibold uppercase tracking-wider mb-2">
                  Freelance
                </p>
                <p className="text-2xl md:text-3xl font-bold text-white font-poppins leading-tight">
                  Project-based
                </p>
                <p className="text-gray-400 text-sm mt-3">
                  Typical builds start around{" "}
                  <span className="text-emerald-300 font-semibold">₹4,999</span>
                  <span className="text-gray-500">*</span>
                </p>
                <p className="text-gray-500 text-xs mt-2">*Indicative — final quote after scope</p>
              </div>
              <ul className="text-left text-gray-300 text-sm space-y-2.5 flex-grow mb-6">
                <li className="flex items-start gap-2">
                  <FaCheck className="text-emerald-400/90 flex-shrink-0 mt-0.5" /> Web apps, React &amp;
                  Node
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="text-emerald-400/90 flex-shrink-0 mt-0.5" /> Payments &amp; API
                  integrations
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="text-emerald-400/90 flex-shrink-0 mt-0.5" /> Fixed scope &amp;
                  milestones
                </li>
              </ul>
              <Link
                to="/services"
                className="inline-flex w-full justify-center items-center gap-2 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-500 transition-colors text-sm"
              >
                Request a quote <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-16 md:py-20 mt-4 rounded-3xl bg-gradient-to-r from-orange-600/90 via-orange-500 to-amber-600/90 px-6 md:px-16 text-center border border-orange-400/30"
          id="cta"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white font-poppins mb-4">
            Ready to level up?
          </h3>
          <p className="text-white/90 max-w-2xl mx-auto text-lg mb-10">
            Create a free account, explore the catalog, and unlock content when you&apos;re ready.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-white text-orange-700 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get started free
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-black/20 text-white px-8 py-3.5 rounded-xl font-semibold border-2 border-white/40 hover:bg-black/30 transition-colors"
            >
              View services
            </Link>
          </div>
          {/* <p className="mt-8 text-white/80 text-sm">
            Instructor portfolio:{" "}
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2 hover:text-white"
            >
              muditt-portfolio.netlify.app
            </a>
          </p> */}
        </section>

        <hr className="border-white/20 my-12" />

        {/* Footer */}
        <footer>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="" className="w-10 h-10 rounded-full" />
                <h2 className="text-xl text-orange-500 font-bold font-poppins">
                  Programming With Mudit
                </h2>
              </div>
              <div className="mt-3 ml-2 md:ml-8">
                <p className="mb-2 text-gray-400">Follow us</p>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                    className="text-gray-400 hover:text-[#229ED9]"
                  >
                    <FaTelegramPlane className="text-2xl duration-300" />
                  </a>
                  {WHATSAPP_URL ? (
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="text-gray-400 hover:text-[#25D366]"
                    >
                      <FaWhatsapp className="text-2xl duration-300" />
                    </a>
                  ) : null}
                  <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white">
                    <FaFacebook className="text-2xl hover:text-blue-400 duration-300" />
                  </a>
                  <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white">
                    <FaInstagram className="text-2xl hover:text-pink-600 duration-300" />
                  </a>
                  <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white">
                    <FaTwitter className="text-2xl hover:text-blue-600 duration-300" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4 font-poppins">Connect</h3>
              <ul className="space-y-2 text-gray-400 text-center md:text-left">
                <li>
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white duration-300"
                  >
                    Telegram
                  </a>
                </li>
                {WHATSAPP_URL ? (
                  <li>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white duration-300"
                    >
                      WhatsApp
                    </a>
                  </li>
                ) : null}
                <li>
                  <a
                    href="https://www.youtube.com/channel/UClpI0dEe-QxQ0rp8LrNLjzg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white duration-300"
                  >
                    YouTube — learn coding
                  </a>
                </li>
                <li>
                  <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white duration-300">
                    Portfolio website
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/programmingwithmudit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white duration-300"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4 font-poppins">Explore More</h3>
              <ul className="space-y-2 text-gray-400 text-center md:text-left">
                <li>
                  <Link to="/about" className="hover:text-white duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/mock-interviews" className="hover:text-white duration-300">
                    Mock interviews
                  </Link>
                </li>
                <li>
                  <Link to="/tips" className="hover:text-white duration-300">
                    Tips that move
                  </Link>
                </li>
                <li>
                  <Link to="/coding-hacks" className="hover:text-white duration-300">
                    Coding hacks
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4 font-poppins">Legal</h3>
              <p className="text-gray-500 text-sm mb-4">copyright © {new Date().getFullYear()}</p>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/terms" className="hover:text-white duration-300">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-white duration-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/refund" className="hover:text-white duration-300">
                    Refund &amp; Cancellation
                  </Link>
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