import { useId, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/useTheme';
import { useProfile } from '../context/useProfile';

// --- ICONS ---
function SidebarIcon({ type, active }) {
  const color = active ? '#8B5CF6' : 'currentColor';
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (type === 'dashboard') return <svg {...common}><path d="M4 11.5L12 5l8 6.5" /><path d="M6.5 10.5V18h11v-7.5" /></svg>;
  if (type === 'applications') return <svg {...common}><path d="M8 7h12" /><path d="M8 12h12" /><path d="M8 17h12" /><path d="M4 7h.01" /><path d="M4 12h.01" /><path d="M4 17h.01" /></svg>;
  if (type === 'analyzer') return <svg {...common}><path d="M7 7l10 10" /><path d="M14 6l4 4" /><path d="M6 14l4 4" /><path d="M11 4l2 2" /><path d="M4 11l2 2" /></svg>;
  if (type === 'performance') return <svg {...common}><path d="M4 17l5-5 4 4 7-8" /><path d="M20 8h-5" /></svg>;
  return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 8v4l2.5 2.5" /></svg>;
}

function CloudUploadIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 16.5A3.5 3.5 0 0017 10h-.4A5.6 5.6 0 006 11.2 3.8 3.8 0 006.5 19H12" /><path d="M12 12v8" /><path d="M9 15l3-3 3 3" />
    </svg>
  );
}

function RobotIcon() {
  return (
    <svg width="170" height="170" viewBox="0 0 170 170" fill="none">
      <circle cx="85" cy="18" r="7" fill="#9C9CA4" /><rect x="81.5" y="25" width="7" height="18" rx="3.5" fill="#9C9CA4" />
      <rect x="23" y="50" width="124" height="96" rx="36" fill="#9C9CA4" /><rect x="36" y="61" width="98" height="54" rx="27" fill="#1F1F2A" />
      <ellipse cx="63" cy="88" rx="13" ry="17" fill="#9C9CA4" /><ellipse cx="107" cy="88" rx="13" ry="17" fill="#9C9CA4" />
      <rect x="73" y="124" width="24" height="18" rx="9" fill="#1F1F2A" /><rect x="79" y="129" width="12" height="8" rx="4" fill="#9C9CA4" />
    </svg>
  );
}

// --- DETAILED SIDEBAR COMPONENT ---
function DetailedReport({ isOpen, onClose, data, isDark }) {
  if (!data) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity" onClick={onClose} />}

      {/* Panel */}
      <div className={`fixed inset-y-0 right-0 z-[70] w-full max-w-[500px] shadow-2xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} ${isDark ? 'bg-[#1B1B25] text-white' : 'bg-white text-[#171421]'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`p-6 border-b ${isDark ? 'border-white/10' : 'border-black/10'} flex items-center justify-between`}>
            <div>
              <h3 className="text-xl font-bold">Analysis Insight</h3>
              <p className="text-xs opacity-50 uppercase tracking-widest mt-1">Full detailed report</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-500/10 rounded-full transition-colors">✕</button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-10">
            {/* Match Score & Verdict */}
            <section className="text-center">
                <div className="inline-block p-6 rounded-3xl bg-violet-500/10 border border-violet-500/20 mb-4">
                    <span className="text-4xl font-black text-violet-500">{data.match_score}%</span>
                </div>
                <p className="text-sm italic leading-relaxed opacity-80">"{data.verdict}"</p>
            </section>

            {/* Strengths */}
            <section>
              <h4 className="text-[13px] font-bold uppercase tracking-wider text-green-400 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" /> Key Strengths
              </h4>
              <div className="space-y-3">
                {data.strengths?.map((s, i) => (
                  <div key={i} className={`p-4 rounded-xl text-[13px] ${isDark ? 'bg-white/5' : 'bg-black/5'} border-l-2 border-green-400`}>{s}</div>
                ))}
              </div>
            </section>

            {/* Improvements */}
            <section>
              <h4 className="text-[13px] font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Improvements
              </h4>
              <div className="space-y-3">
                {data.improvements?.map((imp, i) => (
                  <div key={i} className={`p-4 rounded-xl text-[13px] ${isDark ? 'bg-white/5' : 'bg-black/5'} border-l-2 border-amber-400`}>{imp}</div>
                ))}
              </div>
            </section>

            {/* Keywords */}
            <section>
              <h4 className="text-[13px] font-bold uppercase tracking-wider text-violet-400 mb-4">Keywords Mapping</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] opacity-50 mb-2">FOUND IN RESUME</p>
                  <div className="flex flex-wrap gap-2">
                    {data.matched_keywords?.map((k, i) => (
                      <span key={i} className="px-2.5 py-1 bg-violet-500/10 text-violet-400 rounded-md text-[11px] border border-violet-500/20">{k}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] opacity-50 mb-2">MISSING KEYWORDS</p>
                  <div className="flex flex-wrap gap-2">
                    {data.missing_keywords?.map((k, i) => (
                      <span key={i} className="px-2.5 py-1 bg-red-500/10 text-red-400 rounded-md text-[11px] border border-red-500/20">{k}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

// --- MAIN ANALYZER COMPONENT ---
export default function Analyzer() {
  const { isDark } = useTheme();
  const { profile } = useProfile();
  const fileInputId = useId();

  const [jobDescription, setJobDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const shell = isDark ? 'bg-[#111119] text-white' : 'bg-[#F6F3FF] text-[#171421]';
  const sidebar = isDark ? 'bg-[#1B1B25] border-[#4A475B]' : 'bg-[#FBFAFE] border-[#D4D0DF]';
  const panel = isDark ? 'bg-[#1F1F2A] border-[#4A475B]' : 'bg-white border-[#D4D0DF]';
  const softText = isDark ? 'text-white/55' : 'text-[#6F688A]';
  const brightText = isDark ? 'text-white' : 'text-[#171421]';

  const handleAnalyze = async () => {
    if (!selectedFile || !jobDescription) return alert("Fill all fields!");
    setIsLoading(true);
    const token = localStorage.getItem('access_token');
    const formData = new FormData();
    formData.append('resume', selectedFile);
    formData.append('job_description', jobDescription);

    try {
      const resp = await axios.post('http://127.0.0.1:8000/api/analyzer/analyze-resume/', formData, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      setAnalysisResult(resp.data);
    } catch (err) {
      console.error(err);
      alert("Analysis failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/dashboard', active: false },
    { label: 'Applications', icon: 'applications', to: '/applications', active: false },
    { label: 'Analyzer', icon: 'analyzer', to: '/analyzer', active: true },
    { label: 'Performance', icon: 'performance', to: '/performance', active: false },
    { label: 'Reminders', icon: 'reminders', to: '/reminders', active: false },
  ];

  return (
    <div className={`min-h-screen font-sans ${shell}`}>
      <div className="grid min-h-screen grid-cols-[272px_1fr]">
        {/* Sidebar Navigation */}
        <aside className={`flex flex-col border-r ${sidebar}`}>
          <div className="border-b border-inherit px-5 pb-7 pt-8">
            <h1 className={`${brightText} font-bold text-3xl`} style={{ fontFamily: 'Sitka, serif' }}>
              NextHire<span className="text-violet-500">•</span>
            </h1>
          </div>
          <nav className="mt-14 px-3 space-y-4">
            {navItems.map((item) => (
              <Link key={item.label} to={item.to}>
                <div className={`flex items-center gap-4 rounded-2xl border px-6 py-4 transition-all ${item.active ? 'border-[#504B63] bg-[#2C2345] text-[#8B5CF6]' : 'border-transparent text-gray-500'}`}>
                  <SidebarIcon type={item.icon} active={item.active} />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="px-16 pt-10 pb-12 relative overflow-hidden">
          <div className="flex w-full max-w-[1090px] items-center justify-between mb-16">
            <div>
              <h2 className={`text-3xl font-bold ${brightText}`}>AI Resume Analyzer</h2>
              <p className={`${softText} mt-1`}>Optimize your professional profile</p>
            </div>
            <ThemeToggle />
          </div>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-[1090px]">
            {/* Input Card */}
            <div className={`rounded-3xl border ${panel} p-9 shadow-sm`}>
              <h3 className="text-xl font-bold mb-8">Data Input</h3>
              <div className="space-y-8">
                <div>
                  <label className="text-sm font-semibold mb-3 block">Job Description</label>
                  <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste job requirements..."
                    className={`w-full h-32 rounded-2xl border p-4 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/20 ${isDark ? 'bg-[#2B2A37] border-white/10' : 'bg-gray-50'}`} />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-3 block">Resume File</label>
                  <label htmlFor={fileInputId} className={`flex h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed transition hover:bg-violet-500/5 ${isDark ? 'border-white/20 bg-[#2B2A37]' : 'border-gray-300'}`}>
                    <CloudUploadIcon />
                    <p className="mt-4 text-xs font-medium">{selectedFile ? selectedFile.name : 'Drop PDF or Click to browse'}</p>
                  </label>
                  <input id={fileInputId} type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files[0])} />
                </div>
                <button onClick={handleAnalyze} disabled={isLoading} className="w-full h-14 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
                  {isLoading ? "Analyzing..." : "Launch Analysis"}
                </button>
              </div>
            </div>

            {/* Main Result Card */}
            <div className={`rounded-3xl border ${panel} p-9 shadow-sm flex flex-col`}>
              <h3 className="text-xl font-bold mb-8">Score Overview</h3>
              {analysisResult ? (
                <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
                  <div className="relative">
                    <svg width="160" height="160" viewBox="0 0 100 100" className="transform -rotate-90">
                        <circle cx="50" cy="50" r="45" fill="none" stroke={isDark ? '#2B2A37' : '#F1F1F1'} strokeWidth="8" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#8B5CF6" strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * analysisResult.match_score) / 100} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-black text-4xl">{analysisResult.match_score}%</div>
                  </div>
                  <p className={`${softText} max-w-[280px]`}>{analysisResult.verdict?.substring(0, 80)}...</p>
                  <button onClick={() => setIsSidebarOpen(true)} className="px-8 py-3 rounded-xl border border-violet-500 text-violet-500 font-bold hover:bg-violet-500 hover:text-white transition-all">
                    View Full Analysis
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-center items-center text-center opacity-40">
                  <RobotIcon />
                  <p className="mt-6 text-sm">Waiting for input data...</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* DETAILED SIDEBAR */}
      <DetailedReport
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        data={analysisResult}
        isDark={isDark}
      />
    </div>
  );
}