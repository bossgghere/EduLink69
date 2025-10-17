import React from 'react'

export default function FilterSidebar({
  q,
  setQ,
  location,
  setLocation,
  minSalary,
  setMinSalary,
  remote,
  setRemote,
  partTime,
  setPartTime,
  clearAll
}) {
  return (
    <aside className="w-full bg-white rounded-2xl shadow-xl p-10 flex flex-col gap-8 sticky top-8 text-xl">
      <h2 className="text-5xl font-extrabold mb-3 flex items-center gap-4">
        <span className="text-6xl">🔎</span> Filters
      </h2>
      <input
        type="text"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Profile (e.g. React, Dev)"
        className="w-full border-2 rounded-xl px-5 py-3 mb-3 text-2xl"
      />
      <input
        type="text"
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder="Location (e.g. Delhi)"
        className="w-full border-2 rounded-xl px-5 py-3 mb-3 text-2xl"
      />
      <label className="flex gap-4 items-center text-xl">
        <input type="checkbox" checked={remote} onChange={e => setRemote(e.target.checked)} className="scale-150 accent-blue-600 w-5 h-5" />
        <div className='text-2xl'>
           Work from home
        </div>
      </label>
      <label className="flex gap-4 items-center text-xl mb-1">
        <input type="checkbox" checked={partTime} onChange={e => setPartTime(e.target.checked)} className="scale-150 accent-blue-600 w-5 h-5" />
        <div className='text-2xl'>
           Part-time
        </div>
      </label>
      <label className="flex gap-4 items-center text-xl mb-1">
        <input type="checkbox" checked={partTime} onChange={e => setPartTime(e.target.checked)} className="scale-150 accent-blue-600 w-5 h-5" />
        <div className='text-2xl'>
           Intern
        </div>
      </label>
      <label className="mt-2 text-2xl font-bold">
        Desired monthly stipend (₹)
      </label>
      <input
        type="range"
        min={0}
        max={100000}
        step={500}
        value={minSalary}
        onChange={e => setMinSalary(Number(e.target.value))}
        className="w-full mb-1 accent-indigo-600"
      />
      <div className="flex justify-between text-xl text-black-400 mb-2 font-semibold">
        <span>0</span>
        <span>2K</span>
        <span>4K</span>
        <span>6K</span>
        <span>8K</span>
        <span>10K+</span>
      </div>
      <button
        className="text-blue-600 text-2xl underline font-bold self-start"
        onClick={clearAll}
      >Clear all</button>
    </aside>
  );
}
