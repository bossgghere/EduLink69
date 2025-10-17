import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import { useParams } from "react-router-dom";
import api from "../services/api";

// Import static images
import DocumentImage from "../assets/document.png";
import VideoImage from "../assets/video.jpg";

export default function MaterialPreviewWithLayout() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course data from API
  useEffect(() => {
  const fakeCourse = {
    title: "Demo Course",
    description: "This is a demo course description.",
    materials: [
      { title: "Sample PDF", type: "pdf", url: "https://example.com/sample.pdf" },
      { title: "Sample Video", type: "video", url: "https://example.com/sample-video.mp4" },
    ],
  };
  setCourse(fakeCourse);
  setLoading(false);
}, []);


  if (loading)
    return (
      <div className="text-center mt-20 text-lg font-semibold text-gray-600">
        Loading course details...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-20 text-red-500 font-medium">{error}</div>
    );

  if (!course)
    return (
      <div className="text-center mt-20 text-gray-500">Course not found.</div>
    );

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gray-100 overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-30 bg-white shadow-md px-16 py-5 flex items-center justify-between">
        <h1 className="text-6xl text-blue-500 font-extrabold">EduLink</h1>
        <div className="flex gap-6 text-4xl">
          <button className="p-3 hover:bg-gray-200 rounded-full">🔔</button>
          <button className="p-3 hover:bg-gray-200 rounded-full">🔍</button>
          <button className="p-3 hover:bg-gray-200 rounded-full">💬</button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex pt-[76px] h-full w-full">
        {/* Sidebar */}
        <div>
          <SideNav />
        </div>

        {/* Main Content */}
        <div className="py-40 px-40">
          {/* Course Title */}
          <h1 className="text-6xl font-bold mb-8 text-blue-700">{course.title}</h1>

          {/* Course Description */}
          <p className="mb-6 text-xl text-gray-700">
            {course.description || "No description available."}
          </p>

          {/* Materials */}
          <h2 className="font-bold text-4xl mb-8 text-gray-800">Materials</h2>

          {course.materials?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
              {course.materials.map((mat, idx) => (
                <div
                  key={idx}
                  className="p-20 bg-blue-200 rounded-2xl shadow hover:shadow-lg transition text-center"
                >
                  {/* Image as button */}
                  <div className="flex justify-center mb-3">
                    <img
                      src={mat.type === "pdf" ? DocumentImage : VideoImage}
                      onError={(e) => (e.target.src = DocumentImage)}
                      alt={mat.type === "pdf" ? "PDF Document" : "Video Material"}
                      className="h-50  object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                      onClick={() => window.open(mat.url, "_blank")}
                    />
                  </div>

                  <div className="font-semibold text-4xl text-gray-800 mb-4 flex">
                    {mat.title}
                  </div>
                  <div className="text-black-500 text-2xl mb-2 flex">
                    {mat.type === "pdf" ? "PDF Document" : "Video Resource"}
                  </div>
                  <div className="text-blue-600 text-2xl underline flex">
                    Click image to open {mat.type === "pdf" ? "PDF" : "Video"}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-2xl italic mt-4">
              No materials available for this course.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
