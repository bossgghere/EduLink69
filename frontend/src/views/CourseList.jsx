import React, { useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import CourseCard from '../components/CourseCard'
import { fetchCourses } from '../controllers/CourseController'

const categories = ['All', 'Development', 'Design', 'Business']

export default function CourseList() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchCourses()
        setCourses(list)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading courses...
      </div>
    )

  const filteredCourses =
    activeCategory === 'All'
      ? courses
      : courses.filter(c => c.category.toLowerCase().includes(activeCategory.toLowerCase()))

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/** Header */}
      <div className="fixed top-0 left-0 w-full z-30 px-4 sm:px-8 lg:px-16 py-3 sm:py-4">
        <div className="glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 font-extrabold">EduLink</h1>
          <div className="flex gap-2 sm:gap-4 lg:gap-6 text-2xl sm:text-3xl lg:text-4xl">
            <button className="p-2 sm:p-3 hover:bg-white/60 rounded-full">🔔</button>
            <button className="p-2 sm:p-3 hover:bg-white/60 rounded-full">🔍</button>
            <button className="p-2 sm:p-3 hover:bg-white/60 rounded-full">💬</button>
          </div>
        </div>
      </div>

      {/** Sidebar */}
      <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-md border-r z-20">
        <SideNav />
      </aside>

      {/** Main Content */}
      <main className="mt-32 sm:mt-36 lg:mt-40 px-4 sm:px-6 lg:px-10 scrollbar-hide">
        {/** Tabs */}
        <div className="flex gap-3 sm:gap-6 lg:gap-10 mb-6 sm:mb-10 lg:mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
            className={`text-base sm:text-xl lg:text-3xl px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold shadow-sm border transition
                ${
                  cat === activeCategory
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-900 border-gray-300 hover:bg-blue-50'
                }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/** Continue Learning */}
        <section className="mb-10 w-full">
          <div className="rounded-3xl p-6 sm:p-8 card-glass mb-8 w-full flex flex-col gap-3">
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500">Continue Learning</h2>
            <div className="text-lg sm:text-2xl font-semibold">Flutter Development Masterclass</div>
            <div className="text-sm sm:text-xl text-gray-700">Chapter 5: State Management</div>
            <div className="w-full bg-blue-200/40 rounded h-2 mt-2 overflow-hidden">
              <div className="bg-indigo-500 h-2 rounded" style={{ width: '65%' }} />
            </div>
            <div className="text-right font-semibold text-base sm:text-2xl mt-2 text-indigo-700">65%</div>
          </div>
        </section>

        {/** Recommended Courses */}
        <section className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Recommended</h2>
            <button className="text-blue-600 font-semibold hover:underline">
              <div className='text-2xl'>
                 See All
              </div>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 lg:gap-12 w-full">
            {filteredCourses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </section>
      </main>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { width: 0px; background: transparent; }
        .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </div>
  )
}
