function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 border-b border-gray-100">
        <span className="text-xl font-bold tracking-tight">NextHire</span>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-900">For Candidates</a>
          <a href="#" className="hover:text-gray-900">For Companies</a>
          <a href="#" className="hover:text-gray-900">About</a>
        </div>
        <button className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800">
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <main className="flex flex-col items-center text-center px-6 py-24">
        <span className="text-xs font-medium bg-gray-100 text-gray-500 px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
          Your Next Opportunity Awaits
        </span>
        <h1 className="text-5xl font-bold leading-tight max-w-2xl mb-6">
          Find the company that will hire <span className="text-indigo-600">you next</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mb-10">
          NextHire connects talented people with the right companies — fast, smart, and simple.
        </p>
        <div className="flex gap-4">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 text-sm font-medium">
            Browse Jobs
          </button>
          <button className="border border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 text-sm font-medium">
            Post a Job
          </button>
        </div>
      </main>

      {/* Stats */}
      <section className="flex justify-center gap-16 py-12 border-t border-gray-100 text-center">
        <div>
          <p className="text-3xl font-bold">10k+</p>
          <p className="text-gray-400 text-sm mt-1">Open Positions</p>
        </div>
        <div>
          <p className="text-3xl font-bold">500+</p>
          <p className="text-gray-400 text-sm mt-1">Companies</p>
        </div>
        <div>
          <p className="text-3xl font-bold">95%</p>
          <p className="text-gray-400 text-sm mt-1">Match Rate</p>
        </div>
      </section>

    </div>
  )
}

export default App
