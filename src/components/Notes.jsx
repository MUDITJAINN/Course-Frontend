import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const NOTES = [
  {
    id: "react-basics",
    title: "React Basics Notes",
    description:
      "Components, props, state, hooks, routing, and beginner project notes.",
    pages: 42,
    price: 149,
    previewImage: "/react.png",
    downloadFile: "/notes/react-basics-notes.txt",
  },
  {
    id: "DSA",
    title: "DSA using Java Interview Notes",
    description:
      "Arrays, strings, linked list, recursion, trees, and interview revision notes.",
    pages: 37,
    price: 199,
    previewImage: "/java.avif",
    downloadFile: "/notes/DSA.pdf",
  },
  {
    id: "gate-cs",
    title: "GATE CS Notes",
    description:
      "Complete GATE CS quick revision notes for OS, DBMS, CN, TOC, and Aptitude.",
    pages: 75,
    price: 249,
    previewImage: "/GATE.jpeg",
    downloadFile: "/notes/gate-cs-notes.txt",
  },
];

const PURCHASE_KEY = "notes-store-purchases";

function Notes() {
  const [previewNote, setPreviewNote] = useState(null);
  const [purchasedNotes, setPurchasedNotes] = useState(() => {
    try {
      const stored = localStorage.getItem(PURCHASE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const purchasedSet = useMemo(() => new Set(purchasedNotes), [purchasedNotes]);

  const handleBuy = (note) => {
    const confirmed = window.confirm(
      `Buy "${note.title}" for Rs. ${note.price}? This demo unlocks it instantly.`
    );
    if (!confirmed) return;

    if (!purchasedSet.has(note.id)) {
      const next = [...purchasedNotes, note.id];
      setPurchasedNotes(next);
      localStorage.setItem(PURCHASE_KEY, JSON.stringify(next));
    }
  };

  const handleShowEmail = () => {
    window.alert("Contact email: jainmuditt@gmail.com");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notes Store</h1>
            <p className="text-gray-600 mt-1">
              First page preview is visible. Buy to unlock full download access.
            </p>
          </div>
          <Link
            to="/courses"
            className="bg-gray-900 text-white px-4 py-2 rounded-md w-fit hover:bg-gray-700 duration-300"
          >
            Back to Courses
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {NOTES.map((note) => {
            const isPurchased = purchasedSet.has(note.id);
            return (
              <div
                key={note.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={note.previewImage}
                    alt={`${note.title} first page preview`}
                    className="w-full h-56 object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full">
                    First page preview
                  </span>
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
                      disabled={isPurchased}
                      className={`px-4 py-2 rounded-md text-white ${
                        isPurchased
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {isPurchased ? "Purchased" : "Buy & Unlock"}
                    </button>

                    <a
                      href={isPurchased ? note.downloadFile : "#"}
                      download
                      className={`px-4 py-2 rounded-md text-white ${
                        isPurchased
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-green-300 pointer-events-none"
                      }`}
                    >
                      Download Notes
                    </a>

                    <button
                      type="button"
                      onClick={handleShowEmail}
                      className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
                    >
                      Contact to Send Manually
                    </button>
                    {note.id === "DSA" && (
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
          })}
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
                src={`${previewNote.downloadFile}#page=1&toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-[70vh] border rounded-md pointer-events-none"
              />
              <iframe
                title="DSA page 2 preview"
                src={`${previewNote.downloadFile}#page=2&toolbar=0&navpanes=0&scrollbar=0`}
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
