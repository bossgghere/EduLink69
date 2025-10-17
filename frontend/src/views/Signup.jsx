import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupController } from '../controllers/AuthController'
import { User, Mail, Lock, Phone, Calendar, Users } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/datepicker.css'


export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState(null)
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const nav = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }
    try {
      await signupController({ name, email, password, phone, dob, gender })
      nav('/')
    } catch (err) {
      setError(err.message || JSON.stringify(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100">
      {/* Card covering 90% of screen */}
      <div className="flex w-[90%] h-[90%] bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* LEFT SIDE — IMAGE (70%) */}
        <div className="w-[70%] flex justify-center items-center bg-gray-200">
          <img
            src="/signup.gif"
            alt="Signup visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE — SIGNUP FORM (30%) */}
        <div className="w-[30%] flex justify-center items-center p-16 bg-white overflow-y-auto">
          <div className="w-full max-w-lg">
            <button onClick={() => nav(-1)} className="mb-8 py-4 text-blue font-extrabold text-6xl">&larr;</button>
            <h2 className="text-6xl font-bold mb-2">Create Account</h2>
            <div className="text-gray-500 mb-6 text-2xl">Start your learning journey today</div>

            {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 text-2xl">{error}</div>}

            <form onSubmit={onSubmit} className="space-y-6">
              <Input icon={<User size={40} />} value={name} setValue={setName} placeholder="Full Name" />
              <Input icon={<Mail size={40} />} value={email} setValue={setEmail} placeholder="Email Address" />
              <Input icon={<Phone size={40} />} value={phone} setValue={setPhone} placeholder="Phone Number" type="tel" />

              {/* Custom DatePicker */}
              <div className="flex items-center bg-gray-100 rounded-full px-6 py-5 text-5xl">
                <Calendar size={40} />
                <DatePicker
                  selected={dob}
                  onChange={(date) => setDob(date)}
                  placeholderText="Select Date of Birth"
                  dateFormat="dd/MM/yyyy"
                  className="w-full bg-transparent focus:outline-none ml-3 text-2xl p-4 cursor-pointer"
                  calendarClassName="custom-datepicker-calendar"
                  popperClassName="custom-datepicker-popper"
                />

              </div>

              <Select
                icon={<Users size={40} />}
                value={gender}
                setValue={setGender}
                placeholder="Select Gender"
                options={[
                  { value: '', label: 'Select Gender' },
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' }
                ]}
              />
              <Input icon={<Lock size={40} />} value={password} setValue={setPassword} placeholder="Password" type="password" />
              <Input icon={<Lock size={40} />} value={confirmPassword} setValue={setConfirmPassword} placeholder="Confirm Password" type="password" />

              <div className="flex items-center mt-2">
                <input type="checkbox" className="mr-4 w-8 h-8 accent-blue-500 cursor-pointer" required />
                <span className="text-xl">
                  I agree to the <a className="text-blue-600 font-semibold" href="#">Terms & Conditions</a>
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-5 rounded-full text-2xl font-bold mt-2 bg-gradient-to-r from-blue-500 to-sky-400 text-white shadow-lg hover:opacity-90 transition"
              >
                {loading ? 'Signing...' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function Input({ icon, value, setValue, placeholder, type = 'text' }) {
  return (
    <div className="flex items-center bg-gray-100 rounded-full px-6 py-5 text-5xl">
      {icon}
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent focus:outline-none ml-3 text-2xl p-4 cursor-pointer"
        required
      />
    </div>
  )
}

function Select({ icon, value, setValue, options, placeholder }) {
  return (
    <div className="flex items-center bg-gray-100 rounded-full px-7 py-6 text-2xl">
      {icon}
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-transparent focus:outline-none ml-3 text-2xl cursor-pointer"
        required
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.value === ''} hidden={opt.value === ''}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
