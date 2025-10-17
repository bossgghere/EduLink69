import React from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn, clearToken } from '../utils/auth'

export default function Navbar() {
  const logged = isLoggedIn()
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">LMS Web</Link>
        <div className="flex items-center gap-4">
          <Link to="/courses">Courses</Link>
          {logged ? (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={() => { clearToken(); window.location.href = '/login' }} className="text-sm bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm bg-blue-500 text-white px-3 py-1 rounded">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
