import { Routes, Route } from 'react-router-dom'
import Login from './views/Login'
import Signup from './views/Signup'
import Dashboard from './views/Dashboard'
import CourseList from './views/CourseList'
import CourseDetail from './views/CourseDetail'
import Profile from './views/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import Jobs from './views/Jobs'
import Home from './views/Home'
import EditProfile from './views/EditProfile'

export default function App() {

  

  return (
    <div className="min-h-screen">
      
      <div className="container mx-auto p-4">
      
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<ProtectedRoute><CourseList /></ProtectedRoute>} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="EditProfileedit" element={<EditProfile />} />
          <Route path="/EditProfileskills" element={<EditProfile />} />
          <Route path="EditProfilecertificates" element={<EditProfile />} />

        </Routes>
        
      </div>
    </div>
  )
}
