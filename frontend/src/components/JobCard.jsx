import React from 'react'

export default function JobCard({ job }) {
  return (
    <div className="bg-transparent rounded-2xl p-0 h-100 flex flex-col sm:flex-row justify-between items-start sm:items-center
      w-full max-w-3xl mx-auto min-h-[130px]">
      <div className="flex items-center gap-6 mb-4 sm:mb-0">
        <div className="h-16 w-16 sm:h-20 sm:w-20 bg-white/70 backdrop-blur rounded-xl flex items-center justify-center text-4xl sm:text-6xl font-bold text-blue-600 shadow">
          {job.companyLogo ? (
            <img src={job.companyLogo} alt={job.company} className="h-full w-full object-contain rounded" />
          ) : (
            job.company?.charAt(0)
          )}
        </div>
        <div className="min-w-0">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 truncate">{job.title}</h2>
          <p className="text-gray-700 text-sm sm:text-lg lg:text-2xl truncate">{job.company}</p>
          <p className="text-xs sm:text-base lg:text-2xl text-gray-600 mt-1 break-words">
            📍 {job.location} • {job.experienceLevel} • {job.salaryRange}
          </p>
          <p className="text-xs sm:text-base lg:text-2xl text-gray-600 mt-1">
            Posted on {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : (job.posted ? new Date(job.posted).toLocaleDateString() : "")}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:items-end space-y-2">
        <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs select-none">{job.jobType}</span>
        <button className="bg-indigo-600 text-white rounded-xl px-6 sm:px-7 py-2 text-xl sm:text-4xl font-semibold hover:bg-indigo-700 transition shadow">
          Apply
        </button>
      </div>
    </div>
  )
}
