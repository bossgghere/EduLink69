import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { User, Save, FileText, Award } from "lucide-react";
import SideNav from "../components/SideNav";

export default function EditProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    skills: "",
    certificates: "",
    username: "",
    bio: "",
    dob: "",
    contact: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const location = useLocation();
  const editRef = useRef(null);
  const skillsRef = useRef(null);
  const certRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const profile = data.profile || data.user;
        setUser({
          name: profile?.name || "",
          email: profile?.email || "",
          skills: profile?.skills || "",
          certificates: profile?.certificates || "",
          username: profile?.username || "",
          bio: profile?.bio || "",
          dob: profile?.dob || "",
          contact: profile?.contact || "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const section = new URLSearchParams(location.search).get("section");
    if (section === "edit" && editRef.current)
      editRef.current.scrollIntoView({ behavior: "smooth" });
    else if (section === "skills" && skillsRef.current)
      skillsRef.current.scrollIntoView({ behavior: "smooth" });
    else if (section === "certificates" && certRef.current)
      certRef.current.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      setMessage("✅ Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("❌ Failed to update profile. Try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading profile...
      </div>
    );

  return (
    <div className="h-screen w-full bg-gray-100 overflow-hidden">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-30 bg-white shadow-md px-16 py-5 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-800">Edit Profile</h1>
        <div className="flex gap-6 text-2xl">
          <button className="p-3 hover:bg-gray-200 rounded-full">🔔</button>
          <button className="p-3 hover:bg-gray-200 rounded-full">🔍</button>
          <button className="p-3 hover:bg-gray-200 rounded-full">💬</button>
        </div>
      </div>

      {/* Fixed Sidebar below header */}
      <aside className="fixed top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-white shadow-md border-r z-20">
        <SideNav />
      </aside>

      {/* Main Content Area */}
      <div className="absolute top-20 left-64 right-0 bottom-0 px-12 py-10 overflow-y-auto scrollbar-hide">
        <main className="max-w-6xl mx-auto flex flex-col gap-16 pb-28">
          {message && (
            <div className="bg-blue-100 text-blue-700 p-4 rounded-xl text-center font-semibold shadow">
              {message}
            </div>
          )}

          {/* Edit Profile Section */}
          <section
            ref={editRef}
            id="edit-section"
            className="bg-white p-14 rounded-3xl shadow-lg border border-gray-200"
          >
            <h2 className="text-6xl font-bold flex items-center gap-3 mb-8 text-gray-800">
              <User className="text-blue-600" size={100} /> Edit Profile
            </h2>
            <form className="flex flex-col gap-6" onSubmit={handleSave}>
              <label className="text-4xl font-semibold text-black-700">Full Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="border border-gray-300 rounded-lg p-4 text-5xl focus:ring-6 focus:ring-blue-500 outline-none"
              />
              <label className="text-4xl font-semibold text-gray-700">Email</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="border border-gray-300 rounded-lg p-4 text-4xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <label className="text-4xl font-semibold text-gray-700">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="border border-gray-300 rounded-lg p-4 text-4xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <label className="text-4xl font-semibold text-gray-700">Bio</label>
              <input
                type="text"
                placeholder="Add your bio"
                value={user.bio}
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
                className="border border-gray-300 rounded-lg p-4 text-4xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <label className="text-4xl font-semibold text-gray-700">Date of Birth</label>
              <input
                type="text"
                placeholder="Enter date of birth"
                value={user.dob}
                onChange={(e) => setUser({ ...user, dob: e.target.value })}
                className="border border-gray-300 rounded-lg p-4 text-4xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <label className="text-4xl font-semibold text-gray-700">Contact</label>
              <input
                type="text"
                placeholder="Enter mobile number"
                value={user.contact}
                onChange={(e) => setUser({ ...user, contact: e.target.value })}
                className="border border-gray-300 rounded-lg p-4 text-4xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="submit"
                className="mt-6 bg-blue-600 text-white py-4 rounded-lg text-4xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
              >
                <Save size={50} /> Save Changes
              </button>
            </form>
          </section>

          {/* Skills Section */}
          <section
            ref={skillsRef}
            id="skills-section"
            className="bg-white p-14 rounded-3xl shadow-lg border border-gray-200"
          >
            <h2 className="text-6xl font-bold flex items-center gap-3 mb-8 text-gray-800">
              <FileText className="text-green-600" size={90} /> Skills
            </h2>
            <textarea
              rows="8"
              value={user.skills}
              onChange={(e) => setUser({ ...user, skills: e.target.value })}
              placeholder="List your skills here..."
              className="w-full border border-gray-300 rounded-lg p-8 text-4xl focus:ring-2 focus:ring-green-500 outline-none"
            ></textarea>
            <button
              onClick={handleSave}
              className="mt-6 bg-green-600 text-white py-4 rounded-lg text-4xl font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition"
            >
              <Save size={50} /> Update Skills
            </button>
          </section>

          {/* Certificates Section */}
          <section
            ref={certRef}
            id="certificates-section"
            className="bg-white p-14 rounded-3xl shadow-lg border border-gray-200"
          >
            <h2 className="text-6xl font-bold flex items-center gap-3 mb-8 text-gray-800">
              <Award className="text-yellow-600" size={100} /> Certificates
            </h2>
            <textarea
              rows="8"
              value={user.certificates}
              onChange={(e) => setUser({ ...user, certificates: e.target.value })}
              placeholder="List your certificates here..."
              className="w-full border border-gray-300 rounded-lg p-6 text-4xl focus:ring-2 focus:ring-yellow-500 outline-none"
            ></textarea>
            <button
              onClick={handleSave}
              className="mt-6 bg-yellow-600 text-white py-4 rounded-lg text-4xl font-semibold flex items-center justify-center gap-2 hover:bg-yellow-700 transition"
            >
              <Save size={50} /> Update Certificates
            </button>
          </section>
        </main>
      </div>

      {/* Scrollbar hide style */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { width: 0px; background: transparent; }
        .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
        body, html, #root { height: 100%; }
      `}</style>
    </div>
  );
}
