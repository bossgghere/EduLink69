import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Camera,
  BarChart2,
  FileText,
  Briefcase,
  Bookmark,
  Settings,
  HelpCircle,
  Info,
  LogOut,
  Award,
  X,
  Upload,
} from "lucide-react";
import SideNav from "../components/SideNav";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.profile || data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading profile...
      </div>
    );

  if (!user)
    return (
      <div className="h-screen flex items-center justify-center text-red-500 text-lg">
        Failed to load profile.
      </div>
    );

  const openDetailsSection = (section) => {
    navigate(`/EditProfile${section}`);
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 w-full z-30 bg-white shadow-md px-4 sm:px-8 lg:px-16 py-3 sm:py-4 flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Profile</h1>
        <div className="flex gap-2 sm:gap-4 lg:gap-6 text-2xl">
          <button className="p-2 sm:p-3 hover:bg-gray-200 rounded-full">🔔</button>
          <button className="p-2 sm:p-3 hover:bg-gray-200 rounded-full">🔍</button>
          <button className="p-2 sm:p-3 hover:bg-gray-200 rounded-full">💬</button>
        </div>
      </div>

      {/* Fixed sidebar below header */}
      <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-md border-r z-20">
        <SideNav />
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 ml-64 mt-16 px-4 sm:px-8 lg:px-10 py-6 sm:py-8 overflow-hidden">
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            {/* Profile Card */}
            <div className="flex flex-col items-start card-glass p-6 sm:p-10 lg:p-12 rounded-3xl hover:shadow-2xl hover:ring-2 hover:ring-blue-200 transition-all duration-150 group">
              <div className="relative">
                <div className="rounded-full bg-blue-100 h-28 w-28 sm:h-36 sm:w-36 lg:h-40 lg:w-40 flex items-center justify-center">
                  <User size={56} className="sm:hidden text-blue-500" />
                  <User size={72} className="hidden sm:block lg:hidden text-blue-500" />
                  <User size={80} className="hidden lg:block text-blue-500" />
                </div>
                <button className="absolute bottom-2 right-2 bg-blue-600 rounded-full p-2 sm:p-3 border-4 border-white shadow">
                  <Camera size={22} className="sm:hidden text-white" />
                  <Camera size={24} className="hidden sm:block lg:hidden text-white" />
                  <Camera size={28} className="hidden lg:block text-white" />
                </button>
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 transition">
                {user.name || "Your Name"}
              </h2>
              <div className="text-gray-500 text-base sm:text-xl lg:text-2xl mb-4">{user.email}</div>
              <div className="flex gap-6 sm:gap-10 lg:gap-16 mt-2 mb-6">
                <ProfileStat label="Courses" value={user.courses || 0} />
                <ProfileStat label="Connections" value={user.connections || 0} />
                <ProfileStat label="Posts" value={user.posts || 0} />
              </div>
              <button
                onClick={() => openDetailsSection("edit")}
                className="border-2 border-blue-500 text-blue-600 text-base sm:text-xl lg:text-2xl rounded-lg px-6 sm:px-8 py-2 sm:py-3 font-semibold hover:bg-blue-50 transition mb-2"
              >
                Edit Profile
              </button>
            </div>

            {/* Menu Cards */}
            <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:gap-10 mt-8">
              <div className="bg-white rounded-3xl shadow-md overflow-hidden">
                <MenuLink
                  to="/dashboard"
                  icon={<BarChart2 />}
                  label="Dashboard"
                  desc="Your statistics summary"
                />
                <MenuItem
                  onClick={() => openDetailsSection("skills")}
                  icon={<FileText />}
                  label="Skills & Resume"
                  desc="Manage your professional profile"
                />
                <MenuItem
                  onClick={() => setShowUploadModal(true)}
                  icon={<Briefcase />}
                  label="Upload Resume"
                  desc="Add or update your CV"
                />
                <MenuItem
                  onClick={() => openDetailsSection("certificates")}
                  icon={<Award />}
                  label="Certificates"
                  desc="View your achievements"
                />
                <MenuItem
                  icon={<Bookmark />}
                  label="Saved Posts"
                  desc="Your bookmarked content"
                />
              </div>

              <div className="card-glass rounded-3xl overflow-hidden">
                <MenuItem
                  icon={<Settings />}
                  label="Settings"
                  desc="Privacy, notifications, etc"
                />
                <MenuItem
                  icon={<HelpCircle />}
                  label="Help & Support"
                  desc="Get help and contact us"
                />
                <MenuItem
                  icon={<Info />}
                  label="About"
                  desc="App version and info"
                />
              </div>

              <div className="card-glass rounded-3xl overflow-hidden">
                {/* ✅ Pass logout handler */}
                <MenuLogout
                  icon={<LogOut />}
                  label="Logout"
                  desc="Sign out from your account"
                  onLogout={handleLogout}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Upload Resume Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 shadow-lg w-[500px] relative">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-3xl font-bold mb-4 text-center">Upload Resume</h2>
            <form className="flex flex-col gap-5">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="border p-3 rounded-lg text-lg"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 rounded-lg text-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
              >
                <Upload size={22} /> Upload
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Inline scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
}

function ProfileStat({ label, value }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-blue-600 font-bold text-5xl">{value}</span>
      <span className="text-gray-600 text-xl">{label}</span>
    </div>
  );
}

function MenuItem({ icon, label, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center px-8 py-5 border-b last:border-b-0 cursor-pointer hover:bg-blue-50 transition"
    >
      <div className="mr-7 bg-blue-100 p-4 rounded-lg flex items-center justify-center hover:bg-blue-200 transition">
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-2xl">{label}</div>
        <div className="text-gray-500 text-lg">{desc}</div>
      </div>
      <div className="text-gray-300 font-extrabold text-3xl">{">"}</div>
    </div>
  );
}

function MenuLink({ to, icon, label, desc }) {
  return (
    <Link
      to={to}
      className="flex items-center px-8 py-5 border-b last:border-b-0 hover:bg-blue-50 transition"
    >
      <div className="mr-7 bg-blue-100 p-4 rounded-lg flex items-center justify-center hover:bg-blue-200 transition">
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-2xl">{label}</div>
        <div className="text-gray-500 text-lg">{desc}</div>
      </div>
      <div className="text-gray-300 font-extrabold text-3xl">{">"}</div>
    </Link>
  );
}

function MenuLogout({ icon, label, desc, onLogout }) {
  return (
    <button
      onClick={onLogout}
      className="w-full flex items-center px-8 py-5 text-left last:border-b-0 hover:bg-red-50 transition"
    >
      <div className="mr-7 bg-red-100 p-4 rounded-lg flex items-center justify-center hover:bg-red-200 transition">
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-2xl text-red-600">{label}</div>
        <div className="text-gray-500 text-lg">{desc}</div>
      </div>
    </button>
  );
}
