import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './context/ThemeContext';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <Routes>
      <Route path="/signin" element={<Navigate to="/login" replace />} />
      <Route path="/signup" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <div className={`min-h-screen font-sans ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-gray-900'}`}>
            {/* Navbar */}
            <nav className={`flex items-center justify-between px-10 py-5 border-b ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
              <span className="text-xl font-bold tracking-tight">NextHire</span>
              <div className={`flex gap-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <a href="#" className={`hover:${isDark ? 'text-white' : 'text-gray-900'}`}>For Candidates</a>
                <a href="#" className={`hover:${isDark ? 'text-white' : 'text-gray-900'}`}>For Companies</a>
                <a href="#" className={`hover:${isDark ? 'text-white' : 'text-gray-900'}`}>About</a>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <button className={`text-sm px-4 py-2 rounded-lg font-medium transition ${isDark ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-black text-white hover:bg-gray-800'}`}>
                  Get Started
                </button>
              </div>
            </nav>

            {/* Hero */}
            <main className="flex flex-col items-center text-center px-6 py-24">
              <span className={`text-xs font-medium px-3 py-1 rounded-full mb-6 uppercase tracking-widest ${isDark ? 'bg-slate-800 text-gray-300' : 'bg-gray-100 text-gray-500'}`}>
                Your Next Opportunity Awaits
              </span>
              <h1 className="text-5xl font-bold leading-tight max-w-2xl mb-6">
                Find the company that will hire <span className="text-indigo-600">you next</span>
              </h1>
              <p className={`text-lg max-w-xl mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                NextHire connects talented people with the right companies — fast, smart, and simple.
              </p>
              <div className="flex gap-4">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 text-sm font-medium transition">
                  Browse Jobs
                </button>
                <button className={`text-sm font-medium px-6 py-3 rounded-lg transition ${isDark ? 'border border-slate-700 text-white hover:bg-slate-800' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                  Post a Job
                </button>
              </div>
            </main>

            {/* Stats */}
            <section className={`flex justify-center gap-16 py-12 border-t text-center ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
              <div>
                <p className="text-3xl font-bold">10k+</p>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Open Positions</p>
              </div>
              <div>
                <p className="text-3xl font-bold">500+</p>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Companies</p>
              </div>
              <div>
                <p className="text-3xl font-bold">95%</p>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Match Rate</p>
              </div>
            </section>
          </div>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
