import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home as HomeIcon,
  Briefcase,
  PlayCircle,
  User,
  PlusCircle as PlusCircleIcon,
  LayoutDashboard as LayoutDashboardIcon,
  Settings
} from 'lucide-react'
import PostModal from './PostModal'

export default function SideNav({ onAddPost }) {
  const loc = useLocation()
  const active = (p) => loc.pathname === p
  const [open] = useState(true)
  const [showPostModal, setShowPostModal] = useState(false)

  return (
    <>
      <nav
        className={`relative min-h-full transition-all duration-300 glass border-r rounded-r-2xl
          ${open ? 'w-80 flex flex-col gap-6' : 'w-40 flex flex-col items-center'}`}
        style={{ minHeight: '100%' }}
      >

        {/* Menu items */}
        <div className={`mt-40 flex-1 ${open ? 'flex flex-col gap-2 sm:gap-4 lg:gap-6' : 'flex flex-col gap-6 items-center'}`}>
          <Link to="/home" className={`flex items-center ${open ? 'gap-4 px-5 py-4' : 'py-4'} rounded-lg hover:bg-white/60 transition font-bold ${active('/') ? 'bg-blue-100 text-blue-600' : ''}`}>
            <HomeIcon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
            {open && <span className="text-base sm:text-xl lg:text-3xl font-bold">Home</span>}
          </Link>

          <Link to="/jobs" className={`flex items-center ${open ? 'gap-4 px-5 py-4' : 'py-4'} rounded-lg hover:bg-white/60 transition font-bold ${active('/jobs') ? 'bg-blue-100 text-blue-600' : ''}`}>
            <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
            {open && <span className="text-base sm:text-xl lg:text-3xl font-bold">Jobs</span>}
          </Link>

          {/* Post Button (opens modal) */}
          <button
            onClick={() => setShowPostModal(true)}
            className={`flex items-center w-full text-left ${open ? 'gap-4 px-5 py-4' : 'py-4 justify-center'} rounded-lg hover:bg-white/60 transition font-bold`}
          >
            <PlusCircleIcon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
            {open && <span className="text-base sm:text-xl lg:text-3xl font-bold">Post</span>}
          </button>

          <Link to="/courses" className={`flex items-center ${open ? 'gap-4 px-5 py-4' : 'py-4'} rounded-lg hover:bg-white/60 transition font-bold ${active('/courses') ? 'bg-blue-100 text-blue-600' : ''}`}>
            <PlayCircle className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
            {open && <span className="text-base sm:text-xl lg:text-3xl font-bold">LMS</span>}
          </Link>

          <Link to="/dashboard" className={`flex items-center ${open ? 'gap-4 px-5 py-4' : 'py-4'} rounded-lg hover:bg-white/60 transition font-bold ${active('/dashboard') ? 'bg-blue-100 text-blue-600' : ''}`}>
            <LayoutDashboardIcon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
            {open && <span className="text-base sm:text-xl lg:text-3xl font-bold">Dashboard</span>}
          </Link>
        </div>

        {/* Bottom Profile & Settings */}
        <div className={`absolute bottom-8 left-0 w-full ${open ? 'px-4' : ''}`}>
          <Link to="/profile" className={`flex items-center ${open ? "gap-4 px-5 py-4" : "justify-center py-4"} rounded-lg hover:bg-white/60 transition font-bold ${active('/profile') ? 'bg-blue-100 text-blue-600' : ''}`}>
            <User className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
            {open && <span className="text-base sm:text-xl lg:text-3xl font-bold">Profile</span>}
          </Link>
          {/* <Link to="/settings" className={`flex items-center ${open ? "gap-4 px-5 py-4" : "justify-center py-4"} rounded-lg hover:bg-white/60 transition font-bold ${active('/settings') ? 'bg-blue-100 text-blue-600' : ''}`}>
            <Settings className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
            {open && <span className="text-base sm:text-xl lg:text-3xl font-bold">Settings</span>}
          </Link> */}
        </div>
      </nav>

      {/* Post Modal */}
      <PostModal
        open={showPostModal}
        onClose={() => setShowPostModal(false)}
        onPost={(p) => {
          if (typeof onAddPost === 'function') {
            onAddPost(p);
          } else {
            // Fallback: persist to localStorage so the Home feed picks it up on next visit
            try {
              const raw = localStorage.getItem('posts') || '[]'
              const posts = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : []
              const enriched = {
                ...p,
                id: Date.now(),
                user: 'You',
                likes: 0,
                comments: [],
                createdAt: new Date().toISOString(),
              }
              const next = [...posts, enriched]
              localStorage.setItem('posts', JSON.stringify(next))
            } catch {}
          }
          setShowPostModal(false);
        }}
      />
    </>
  )
}
