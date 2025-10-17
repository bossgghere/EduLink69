import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginController } from '../controllers/AuthController'
import { Mail, Lock } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const nav = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await loginController({ email, password })
      nav('/home')
    } catch (err) {
      setError(err.message || JSON.stringify(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100">
      {/* Card container covering 90% of the screen */}
      <div className="flex w-[90%] h-[90%] bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* LEFT SIDE — IMAGE (70%) */}
        <div className="w-[70%] flex justify-center items-center bg-gray-200">
          <img
            src="/login.gif"
            alt="Login visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE — LOGIN FORM (30%) */}
        <div className="w-[30%] flex justify-center items-center p-16 bg-white">
          <div className="w-full max-w-lg">
            <div className="flex flex-col items-center mb-10">
              <div className="w-28 h-28 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 mb-4 shadow">
                <svg width={52} height={52} fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 3L1 9l11 6 9-5.18M12 21V9"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-6xl font-bold mb-3">EduLink</h1>
              <div className="text-4xl font-bold mt-2 mb-2">Welcome Back!</div>
              <div className="text-gray-400 mb-3 text-2xl text-center">
                Login to continue your learning journey
              </div>
            </div>

            {error && (
              <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 text-base">
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="flex items-center bg-gray-100 rounded-full px-8 py-6 text-lg">
                <Mail size={40} className="mr-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full bg-transparent focus:outline-none text-2xl"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center bg-gray-100 rounded-full px-6 py-5 text-lg">
                <Lock size={40} className="mr-6 text-gray-400" />
                <input
                  type="password"
                  className="w-full bg-transparent focus:outline-none text-2xl"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-between items-center text-2xl mt-3 mb-3">
                <label className="flex items-center py-4 px-4">
                  <input type="checkbox" className="mr-2 accent-blue-500 h-8 w-8" />
                  Remember me
                </label>
                <a href="#" className="text-blue-600 font-semibold">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-5 rounded-full text-4xl font-bold bg-gradient-to-r from-blue-500 to-sky-400 text-white shadow-lg hover:opacity-90 transition"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="text-center mt-8 text-2xl">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 font-semibold">
                Sign Up
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
