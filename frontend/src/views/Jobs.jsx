import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import SideNav from "../components/SideNav";
import FilterSidebar from "../components/FilterSidebar";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [minSalary, setMinSalary] = useState(0);
  const [remote, setRemote] = useState(false);
  const [partTime, setPartTime] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/jobs", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setJobs(data.jobs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const clearAll = () => {
    setQ("");
    setLocation("");
    setMinSalary(0);
    setRemote(false);
    setPartTime(false);
  };

  const filteredJobs = jobs
    .filter((j) => j.title?.toLowerCase().includes(q.toLowerCase()))
    .filter(
      (j) => !location || j.location.toLowerCase().includes(location.toLowerCase())
    )
    .filter((j) => !remote || (j.jobType && j.jobType.toLowerCase() === "remote"))
    .filter(
      (j) => !partTime || (j.jobType && j.jobType.toLowerCase() === "part-time")
    )
    .filter((j) => {
      const num =
        typeof j.salaryRange === "string"
          ? parseInt(j.salaryRange.replace(/[^\d]/g, ""))
          : 0;
      return num >= minSalary;
    });

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading job opportunities...
      </div>
    );

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* HEADER */}
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

      {/* FIXED SIDENAV BELOW HEADER */}
      <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)]  bg-white shadow-md border-r z-20">
        <SideNav />
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col flex-1 mt-20">
        {/* MAIN BODY (scrollable center + right filter) */}
        <div className="flex flex-1 py-24 sm:py-32 lg:py-40 overflow-hidden">
          {/* JOB LIST */}
          <main className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-10">
          <div className="max-w-3xl mx-auto flex flex-col gap-4 sm:gap-6">
              <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">
                  {filteredJobs.length} Job{filteredJobs.length !== 1 && "s"} Found
                </h2>
              </div>

              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job._id || job.id}
                    className="card-glass p-8 py-10 rounded-2xl hover:shadow-xl transition-all"
                  >
                    <JobCard job={job} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-lg sm:text-xl lg:text-2xl mt-8 sm:mt-12 text-center">
                  No jobs found matching your criteria
                </p>
              )}
            </div>
          </main>

          {/* FILTER SIDEBAR */}
<aside className="w-full sm:w-[360px] lg:w-[420px] min-w-0 sm:min-w-[360px] lg:min-w-[420px] card-glass border-l rounded-l-2xl p-4 sm:p-6 lg:p-8 overflow-y-auto">
  <FilterSidebar
    q={q}
    setQ={setQ}
    location={location}
    setLocation={setLocation}
    minSalary={minSalary}
    setMinSalary={setMinSalary}
    remote={remote}
    setRemote={setRemote}
    partTime={partTime}
    setPartTime={setPartTime}
    clearAll={clearAll}
  />
</aside>

        </div>
      </div>
    </div>
  );
}
