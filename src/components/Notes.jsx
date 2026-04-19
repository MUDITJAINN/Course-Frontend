import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaBook, FaDownload } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/Programmingwithmudit.png";
import { BACKEND_URL } from "../utils/utils";
import ProfileMenu from "./ProfileMenu";
import { getFavoriteNotesSet, toggleFavoriteNote } from "../utils/favorites";

function Notes() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeView, setActiveView] = useState("store");
  const [notes, setNotes] = useState([]);
  const [previewNote, setPreviewNote] = useState(null);
  const [purchasedNotes, setPurchasedNotes] = useState([]);
  const [loadingNoteId, setLoadingNoteId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteNotes, setFavoriteNotes] = useState(() => getFavoriteNotesSet());
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = user?.token;

  const purchasedSet = useMemo(() => new Set(purchasedNotes.map(String)), [purchasedNotes]);

  const filteredStoreNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        (n.title && n.title.toLowerCase().includes(q)) ||
        (n.description && String(n.description).toLowerCase().includes(q))
    );
  }, [notes, searchQuery]);

  const filteredPurchasedNotes = useMemo(() => {
    const list = notes.filter((n) => purchasedSet.has(String(n._id)));
    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (n) =>
        (n.title && n.title.toLowerCase().includes(q)) ||
        (n.description && String(n.description).toLowerCase().includes(q))
    );
  }, [notes, purchasedSet, searchQuery]);

  const isFavorite = (noteId) => favoriteNotes.has(String(noteId));
  const onToggleFavorite = (noteId) => {
    const next = toggleFavoriteNote(noteId);
    setFavoriteNotes(new Set(next));
  };

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/notes/all`, {
        withCredentials: true,
      });
      setNotes(response.data.notes || []);
    } catch (error) {
      toast.error("Failed to load notes");
    }
  };

  const fetchPurchasedNotes = async () => {
    if (!token) return;
    try {
      // Fetch purchased note IDs for this logged-in user only.
      const response = await axios.get(`${BACKEND_URL}/notes/my-purchased`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setPurchasedNotes(response.data.noteIds || []);
    } catch (error) {
      console.log("Error in fetchPurchasedNotes", error);
    }
  };

  const downloadNote = async (note) => {
    if (!token) {
      toast.error("Please login to download");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/notes/download/${encodeURIComponent(note._id)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = (note.title || "note").replace(/\s+/g, "_");
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(error?.response?.data?.errors || "Download failed");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    fetchPurchasedNotes();
  }, [token]);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  useEffect(() => {
    // On return from PhonePe, frontend receives noteId + transactionId in URL.
    // We verify on backend before unlocking anything on UI.
    const noteId = searchParams.get("noteId");
    const merchantOrderId =
      searchParams.get("merchantOrderId") || searchParams.get("transactionId");
    if (!noteId || !merchantOrderId || !token) return;

    const verifyPayment = async () => {
      try {
        await axios.get(
          `${BACKEND_URL}/notes/verify-payment?noteId=${encodeURIComponent(
            noteId
          )}&merchantOrderId=${encodeURIComponent(merchantOrderId)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        toast.success("Payment successful. Notes unlocked.");
        fetchPurchasedNotes();
      } catch (error) {
        toast.error(error?.response?.data?.errors || "Payment verification failed");
      } finally {
        setSearchParams({});
      }
    };

    verifyPayment();
  }, [searchParams, token, setSearchParams]);

  const handleBuy = async (note) => {
    if (!token) {
      toast.error("Please login to buy notes");
      navigate("/login");
      return;
    }

    setLoadingNoteId(note._id);
    try {
      // Backend creates PhonePe transaction and returns redirect URL.
      const response = await axios.post(
        `${BACKEND_URL}/notes/create-payment/${encodeURIComponent(note._id)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const paymentUrl = response?.data?.paymentUrl;
      if (!paymentUrl) {
        toast.error("Payment URL not found");
        return;
      }

      // Redirect user to PhonePe hosted payment page.
      window.location.href = paymentUrl;
    } catch (error) {
      toast.error(error?.response?.data?.errors || "Could not initiate payment");
    } finally {
      setLoadingNoteId(null);
    }
  };

  const handleShowEmail = () => {
    window.alert("Contact email: jainmuditt@gmail.com");
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.errors || "Error in logging out");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <button
        className="md:hidden fixed top-4 left-4 z-20 text-3xl text-gray-800"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <HiX /> : <HiMenu />}
      </button>

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
                className={`flex items-center ${
                  activeView === "store" ? "text-blue-500" : ""
                }`}
              >
                <FaBook className="mr-2" /> Notes
              </button>
            </li>
            <li className="mb-4">
              <button
                type="button"
                onClick={() => setActiveView("purchases")}
                className={`flex items-center ${
                  activeView === "purchases" ? "text-blue-500" : ""
                }`}
              >
                <FaDownload className="mr-2" /> Notes Purchases
              </button>
            </li>
            <li className="mb-4">
              <Link to="/settings" className="flex items-center">
                <IoMdSettings className="mr-2" /> Settings
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/favorites/notes" className="flex items-center">
                <FaRegHeart className="mr-2" /> Favorites
              </Link>
            </li>
            <li>
              {!isLoggedIn ? (
                <Link to="/login" className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center text-gray-800 hover:text-red-600"
                >
                  <IoLogOut className="mr-2" /> Logout
                </button>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      <div className="w-full ml-0 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {activeView === "purchases" ? "My Notes Purchases" : "Notes Store"}
              </h1>
              <p className="text-gray-600 mt-1">
                {activeView === "purchases"
                  ? "View all notes purchased by your account."
                  : "First page preview is visible. Buy to unlock full download access."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto lg:max-w-md">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeView === "purchases"
                    ? "Search your purchases..."
                    : "Search notes..."
                }
                className="flex-1 min-w-[180px] border border-gray-300 rounded-l-lg px-3 py-2 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Search notes"
              />
              <span className="h-10 border border-l-0 border-gray-300 rounded-r-lg px-3 flex items-center bg-gray-50 shrink-0">
                <FiSearch className="text-lg text-gray-600" />
              </span>
              <ProfileMenu />
            </div>
          </div>
          {activeView === "purchases" ? (
            <div>
              {notes.filter((note) => purchasedSet.has(String(note._id))).length > 0 ? (
                filteredPurchasedNotes.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {filteredPurchasedNotes.map((note) => (
                      <div
                        key={`purchased-${note._id}`}
                        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                      >
                        <h4 className="font-semibold text-gray-900">{note.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{note.pages} pages</p>
                        <button
                          type="button"
                          onClick={() => downloadNote(note)}
                          className="inline-block mt-3 px-3 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700"
                        >
                          Download
                        </button>
                      </div>
                    ))}
                </div>
                ) : (
                  <p className="text-gray-500">No notes match your search.</p>
                )
              ) : (
                <p className="text-gray-500">No purchased notes yet.</p>
              )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredStoreNotes.length === 0 ? (
                <p className="text-gray-500 col-span-full text-center py-8">
                  {notes.length === 0 ? "Loading..." : "No notes match your search."}
                </p>
              ) : (
              filteredStoreNotes.map((note) => {
                const isPurchased = purchasedSet.has(String(note._id));
                return (
                  <div
                    key={note._id}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={note.previewImageUrl}
                        alt={`${note.title} first page preview`}
                        loading="lazy"
                        className="w-full h-56 object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full">
                        First page preview
                      </span>
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(note._id)}
                        className="absolute top-3 right-3 bg-white/95 hover:bg-white text-gray-900 rounded-full w-9 h-9 flex items-center justify-center shadow"
                        title={isFavorite(note._id) ? "Remove from favorites" : "Add to favorites"}
                        aria-label={isFavorite(note._id) ? "Unfavorite note" : "Favorite note"}
                      >
                        {isFavorite(note._id) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart className="text-gray-700" />
                        )}
                      </button>
                    </div>

                    <div className="p-5">
                      <h2 className="text-xl font-semibold text-gray-900">{note.title}</h2>
                      <p className="text-gray-600 mt-2">{note.description}</p>
                      <div className="mt-4 text-sm text-gray-700 space-y-1">
                        <p>
                          <span className="font-medium">Pages:</span> {note.pages}
                        </p>
                        <p>
                          <span className="font-medium">Price:</span> Rs. {note.price}
                        </p>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      onClick={() => handleBuy(note)}
                      disabled={isPurchased || loadingNoteId === note._id}
                      className={`px-4 py-2 rounded-md text-white ${
                        isPurchased || loadingNoteId === note._id
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {isPurchased
                        ? "Purchased"
                        : loadingNoteId === note._id
                        ? "Processing..."
                        : "Buy & Unlock"}
                    </button>

                        <button
                          type="button"
                          disabled={!isPurchased}
                          onClick={() => downloadNote(note)}
                          className={`px-4 py-2 rounded-md text-white ${
                            isPurchased
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Download Notes
                        </button>

                        <button
                          type="button"
                          onClick={handleShowEmail}
                          className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
                        >
                          Contact to Send Manually
                        </button>
                        {note.downloadFileUrl?.toLowerCase().endsWith(".pdf") && (
                          <button
                            type="button"
                            onClick={() => setPreviewNote(note)}
                            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                          >
                            Preview First 2 Pages
                          </button>
                        )}
                      </div>

                      <p className="mt-4 text-sm text-teal-700">
                        {isPurchased
                          ? "Access unlocked. You can download now."
                          : "Preview only. Purchase to unlock complete notes."}
                      </p>
                    </div>
                  </div>
                );
              })
              )}
            </div>
          )}
        </div>
      </div>
      {previewNote && (
        <div className="fixed inset-0 z-50 bg-black/70 px-4 py-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto bg-white rounded-lg p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {previewNote.title} - First 2 Pages Preview
              </h3>
              <button
                type="button"
                onClick={() => setPreviewNote(null)}
                className="bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Only page 1 and page 2 are shown in preview. Purchase to unlock full download.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <iframe
                title="DSA page 1 preview"
                src={`${BACKEND_URL}/notes/preview/${encodeURIComponent(
                  previewNote._id
                )}#page=1&toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-[70vh] border rounded-md pointer-events-none"
              />
              <iframe
                title="DSA page 2 preview"
                src={`${BACKEND_URL}/notes/preview/${encodeURIComponent(
                  previewNote._id
                )}#page=2&toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-[70vh] border rounded-md pointer-events-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;
