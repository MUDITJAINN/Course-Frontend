import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Courses from "./components/Courses";
import Buy from "./components/Buy";
import Purchases from "./components/Purchases";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import RefundAndCancellation from "./components/RefundAndCancellation";
import Notes from "./components/Notes";
import AdminPanel from "./components/AdminPanel";
import Services from "./components/Services";
import Settings from "./components/Settings";
import FavoritesNotes from "./components/favorites/FavoritesNotes";
import FavoritesCourses from "./components/favorites/FavoritesCourses";
import About from "./components/About";
import MockInterviews from "./components/MockInterviews";
import Tips from "./components/Tips";
import CodingHacks from "./components/CodingHacks";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/buy/:courseId" element={<Buy />} />
        <Route path="/purchases" element={<Purchases/>}/>
        <Route path="/notes" element={<Notes />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/services" element={<Services />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/favorites/notes" element={<FavoritesNotes />} />
        <Route path="/favorites/courses" element={<FavoritesCourses />} />
        <Route path="/about" element={<About />} />
        <Route path="/mock-interviews" element={<MockInterviews />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/coding-hacks" element={<CodingHacks />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<RefundAndCancellation />} />
      </Routes>
    </div>
  );
}
export default App;