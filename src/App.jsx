import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Seo from "./seo/Seo";

const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const Courses = lazy(() => import("./components/Courses"));
const Buy = lazy(() => import("./components/Buy"));
const Purchases = lazy(() => import("./components/Purchases"));
const TermsAndConditions = lazy(() => import("./components/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const RefundAndCancellation = lazy(() => import("./components/RefundAndCancellation"));
const Notes = lazy(() => import("./components/Notes"));
const AdminPanel = lazy(() => import("./components/AdminPanel"));
const Services = lazy(() => import("./components/Services"));
const Settings = lazy(() => import("./components/Settings"));
const FavoritesNotes = lazy(() => import("./components/favorites/FavoritesNotes"));
const FavoritesCourses = lazy(() => import("./components/favorites/FavoritesCourses"));
const About = lazy(() => import("./components/About"));
const MockInterviews = lazy(() => import("./components/MockInterviews"));
const Tips = lazy(() => import("./components/Tips"));
const CodingHacks = lazy(() => import("./components/CodingHacks"));
const Blog = lazy(() => import("./components/Blog"));
const BlogPost = lazy(() => import("./components/BlogPost"));
const Contact = lazy(() => import("./components/Contact"));
function App() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="min-h-[40vh] flex items-center justify-center text-gray-600">
            Loading…
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Seo
                  path="/"
                  title="Programming With Mudit — Learn MERN, React & Backend"
                  description="Learn MERN stack with structured courses and notes. Explore tutorials, mock interviews, and developer services."
                />
                <Home />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Seo
                  path="/login"
                  title="Login — Programming With Mudit"
                  description="Login to access your purchases, favorites, and account settings."
                  noindex
                />
                <Login />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Seo
                  path="/signup"
                  title="Sign Up — Programming With Mudit"
                  description="Create your account to purchase courses/notes and access them anytime."
                  noindex
                />
                <Signup />
              </>
            }
          />
          <Route
            path="/courses"
            element={
              <>
                <Seo
                  path="/courses"
                  title="Courses — Programming With Mudit"
                  description="Browse programming courses for MERN stack, React, backend development, and interview prep."
                />
                <Courses />
              </>
            }
          />
          <Route path="/buy/:courseId" element={<Buy />} />
          <Route
            path="/purchases"
            element={
              <>
                <Seo
                  path="/purchases"
                  title="My Purchases — Programming With Mudit"
                  description="Access your purchased courses and notes."
                  noindex
                />
                <Purchases />
              </>
            }
          />
          <Route
            path="/notes"
            element={
              <>
                <Seo
                  path="/notes"
                  title="Notes — Programming With Mudit"
                  description="Download structured programming notes for interview prep and fast revision."
                />
                <Notes />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
                <Seo path="/admin" title="Admin — Programming With Mudit" description="Admin panel." noindex />
                <AdminPanel />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <Seo
                  path="/services"
                  title="Services — Hire a Freelance Developer"
                  description="Hire a freelance MERN/React developer for web apps, bug fixes, and new features."
                />
                <Services />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <Seo
                  path="/settings"
                  title="Settings — Programming With Mudit"
                  description="Manage your profile and preferences."
                  noindex
                />
                <Settings />
              </>
            }
          />
          <Route
            path="/favorites/notes"
            element={
              <>
                <Seo
                  path="/favorites/notes"
                  title="Favorite Notes — Programming With Mudit"
                  description="Your saved notes."
                  noindex
                />
                <FavoritesNotes />
              </>
            }
          />
          <Route
            path="/favorites/courses"
            element={
              <>
                <Seo
                  path="/favorites/courses"
                  title="Favorite Courses — Programming With Mudit"
                  description="Your saved courses."
                  noindex
                />
                <FavoritesCourses />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Seo
                  path="/about"
                  title="About — Programming With Mudit"
                  description="About Programming With Mudit: teaching, content, and learning resources."
                />
                <About />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Seo
                  path="/contact"
                  title="Contact — Programming With Mudit"
                  description="Contact Programming With Mudit for support, course/notes questions, or freelance services."
                />
                <Contact />
              </>
            }
          />
          <Route
            path="/mock-interviews"
            element={
              <>
                <Seo
                  path="/mock-interviews"
                  title="Mock Interviews — Programming With Mudit"
                  description="Practice mock interviews and improve your problem-solving, MERN, and system design skills."
                />
                <MockInterviews />
              </>
            }
          />
          <Route
            path="/tips"
            element={
              <>
                <Seo
                  path="/tips"
                  title="Tips — Programming With Mudit"
                  description="Actionable coding tips, interview tips, and productivity improvements."
                />
                <Tips />
              </>
            }
          />
          <Route
            path="/coding-hacks"
            element={
              <>
                <Seo
                  path="/coding-hacks"
                  title="Coding Hacks — Programming With Mudit"
                  description="Short practical coding hacks for React, JavaScript, and MERN."
                />
                <CodingHacks />
              </>
            }
          />
          <Route
            path="/terms"
            element={
              <>
                <Seo path="/terms" title="Terms & Conditions — Programming With Mudit" description="Terms and conditions." />
                <TermsAndConditions />
              </>
            }
          />
          <Route
            path="/privacy"
            element={
              <>
                <Seo path="/privacy" title="Privacy Policy — Programming With Mudit" description="Privacy policy." />
                <PrivacyPolicy />
              </>
            }
          />
          <Route
            path="/refund"
            element={
              <>
                <Seo
                  path="/refund"
                  title="Refund & Cancellation — Programming With Mudit"
                  description="Refund and cancellation policy."
                />
                <RefundAndCancellation />
              </>
            }
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;