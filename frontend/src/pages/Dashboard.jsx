import { useDeferredValue, useState, useMemo , useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import ThemeToggle from '../components/ThemeToggle'; 
import { useTheme } from '../context/useTheme'; 
import { useProfile } from '../context/useProfile'; 
import api from '../api';

const stats = [ 
  { label: 'Total applied', value: '18', delta: '+3 this week', tone: 'blue' }, 
  { label: 'Total offered', value: '5', delta: '+1 this week', tone: 'green' }, 
  { label: 'Total interviewed', value: '10', delta: '+2 this week', tone: 'yellow' }, 
  { label: 'Total rejected', value: '13', delta: '+4 this week', tone: 'red' }, 
]; 

const toneClasses = { 
  blue: 'border-l-[#3B82F6] border-l-4', 
  green: 'border-l-[#22C55E] border-l-4', 
  yellow: 'border-l-[#FACC15] border-l-4', 
  amber: 'border-l-[#F59E0B] border-l-4', 
  red: 'border-l-[#FF5252] border-l-4', 
}; 

const badgeClasses = { 
  blue: 'bg-[#1D2A4A] text-[#3B82F6]', 
  green: 'bg-[#173A2A] text-[#2DDF7F]', 
  yellow: 'bg-[#463C12] text-[#FACC15]', 
  amber: 'bg-[#4A3214] text-[#F59E0B]', 
  red: 'bg-[#432125] text-[#FF5252]', 
}; 

function SidebarIcon({ type, active }) { 
  const color = active ? '#8B5CF6' : 'currentColor'; 
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' }; 
  if (type === 'dashboard') return <svg {...common}><path d="M4 11.5L12 5l8 6.5" /><path d="M6.5 10.5V18h11v-7.5" /></svg>; 
  if (type === 'applications') return <svg {...common}><path d="M8 7h12" /><path d="M8 12h12" /><path d="M8 17h12" /><path d="M4 7h.01" /><path d="M4 12h.01" /><path d="M4 17h.01" /></svg>; 
  if (type === 'analyzer') return <svg {...common}><path d="M7 7l10 10" /><path d="M14 6l4 4" /><path d="M6 14l4 4" /><path d="M11 4l2 2" /><path d="M4 11l2 2" /></svg>; 
  if (type === 'performance') return <svg {...common}><path d="M4 17l5-5 4 4 7-8" /><path d="M20 8h-5" /></svg>; 
  return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 8v4l2.5 2.5" /></svg>; 
} 

export default function Dashboard() { 
  const { isDark } = useTheme(); 
  const { profile } = useProfile(); 
  const navigate = useNavigate();

  const [liveStats, setLiveStats] = useState(null);
  const [analyzerData, setAnalyzerData] = useState({ match_score: null, missing_keywords: [], last_scan: null });
  const [livePipeline, setLivePipeline] = useState([
    { title: 'Applied', tone: 'blue', cards: [] },
    { title: 'Screening', tone: 'yellow', cards: [] },
    { title: 'Interview', tone: 'amber', cards: [] },
    { title: 'Offer', tone: 'green', cards: [] },
    { title: 'Rejected', tone: 'red', cards: [] },
  ]);

  const [weeklyData, setWeeklyData] = useState({ data: [], total_this_week: 0 });
  const [liveReminders, setLiveReminders] = useState([]);

  const refreshData = async () => {
    try {
      const [statsRes, pipeRes, weeklyRes, analyzerRes, remindersRes] = await Promise.all([
        api.get('applications/dashboard/stats/'),
        api.get('applications/applications/pipeline/'),
        api.get('applications/dashboard/weekly-activity/'),
        // BURANI DÜZƏLTDİM: Bayaq verdiyin loglarda işləyən düzgün endpoint budur
        api.get('analyzer/last-analysis/'),
        api.get('applications/api-reminders/')
      ]);

      setLiveStats(statsRes.data);
      setWeeklyData(weeklyRes.data);
      setAnalyzerData(analyzerRes.data);
      setLiveReminders(remindersRes.data);

      const pData = pipeRes.data;
      setLivePipeline([
        { title: 'Applied', tone: 'blue', cards: pData.applied || [] },
        { title: 'Screening', tone: 'yellow', cards: pData.screening || [] },
        { title: 'Interview', tone: 'amber', cards: pData.interview || [] },
        { title: 'Offer', tone: 'green', cards: pData.offer || [] },
        { title: 'Rejected', tone: 'red', cards: pData.rejected || [] },
      ]);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const [draggedCard, setDraggedCard] = useState(null);

  const handleDragStart = (e, card, sourceColumn) => {
    setDraggedCard({ id: card.id, sourceColumn });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, targetColumn) => {
    e.preventDefault();
    if (!draggedCard || draggedCard.sourceColumn === targetColumn) return;

    try {
      await api.patch(`applications/${draggedCard.id}/`, {
        status: targetColumn.toLowerCase()
      });
      await refreshData();
    } catch (error) {
      console.error("Güncelleme hatası:", error);
    }
    setDraggedCard(null);
  };

  const displayStats = [
    { label: 'Total applied', value: liveStats?.total_applied || '0', delta: `+${liveStats?.applied_this_week || 0} this week`, tone: 'blue' },
    { label: 'Total offered', value: liveStats?.total_offered || '0', delta: `+${liveStats?.offered_this_week || 0} this week`, tone: 'green' },
    { label: 'Total interviewed', value: liveStats?.total_interviewed || '0', delta: `+${liveStats?.interviewed_this_week || 0} this week`, tone: 'yellow' },
    { label: 'Total rejected', value: liveStats?.total_rejected || '0', delta: `+${liveStats?.rejected_this_week || 0} this week`, tone: 'red' },
  ];

  const [search, setSearch] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filters, setFilters] = useState({ date: '', status: '', role: '' });
  const [openDropdown, setOpenDropdown] = useState(null);

  const deferredSearch = useDeferredValue(search);

  const filteredPipeline = useMemo(() => {
    return livePipeline.map(column => {
      if (filters.status && column.title.toLowerCase() !== filters.status.toLowerCase()) {
        return { ...column, cards: [] };
      }
      const filteredCards = column.cards.filter(card => {
        const matchesSearch =
          card.company.toLowerCase().includes(deferredSearch.toLowerCase()) ||
          card.role.toLowerCase().includes(deferredSearch.toLowerCase());
        const matchesDate = filters.date === '' || card.age === filters.date;
        const matchesRole = filters.role === '' || card.role.toLowerCase().includes(filters.role.toLowerCase());
        return matchesSearch && matchesDate && matchesRole;
      });
      return { ...column, cards: filteredCards };
    });
  }, [deferredSearch, filters, livePipeline]);

  const shell = isDark ? 'bg-[#111119] text-white' : 'bg-[#F6F3FF] text-[#171421]';
  const sidebar = isDark ? 'bg-[#1B1B25] border-[#4A475B]' : 'bg-[#FBFAFE] border-[#D4D0DF]';
  const panel = isDark ? 'bg-[#1F1F2A] border-[#4A475B]' : 'bg-white border-[#D4D0DF]';
  const softText = isDark ? 'text-white/55' : 'text-[#6F688A]';
  const brightText = isDark ? 'text-white' : 'text-[#171421]';

  const uniqueDates = Array.from(new Set(livePipeline.flatMap(col => col.cards.map(c => c.age))));
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());

  const todayObj = new Date();
  const lastWeekObj = new Date();
  lastWeekObj.setDate(todayObj.getDate() - 6);
  const formatRangeDate = (date) => `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
  const dateRangeStr = `${formatRangeDate(lastWeekObj)}-${formatRangeDate(todayObj)}`;

  const firstName = profile?.fullName ? profile.fullName.split(' ')[0] : 'User';

  return (
    <div className={`min-h-screen font-sans ${shell}`}>
      <div className="flex min-h-screen">
        <aside className={`flex w-[272px] shrink-0 flex-col border-r ${sidebar}`}>
          <div className="border-b border-inherit px-[18px] pb-7 pt-8">
            <h1 className={`${brightText} whitespace-nowrap`} style={{ fontFamily: 'Sitka, Georgia, serif', fontWeight: 700, fontSize: '34px', lineHeight: '34px' }}>
              NextHire<span className="align-top text-[0.45em] text-violet-500">•</span>
            </h1>
          </div>
          <div className="px-[18px] pt-6">
            <p className={`${softText} uppercase text-[9px] font-medium`}>Main Menu</p>
          </div>
          <nav className="mt-14 flex flex-1 flex-col gap-4 px-[10px]">
            {[
              { label: 'Dashboard', icon: 'dashboard', active: true, to: '/dashboard' },
              { label: 'Applications', icon: 'applications', active: false, to: '/applications' },
              { label: 'Analyzer', icon: 'analyzer', active: false, to: '/analyzer' },
              { label: 'Performance', icon: 'performance', active: false, to: '/performance' },
              { label: 'Reminders', icon: 'reminders', active: false, to: '/reminders' },
            ].map((item) => (
              <Link key={item.label} to={item.to}>
                <div className={`flex min-h-[56px] items-center gap-4 rounded-[16px] border px-6 py-4 ${item.active ? 'relative border-[#504B63] bg-[#2C2345] text-[#8B5CF6]' : 'border-transparent text-inherit opacity-90'}`}>
                  {item.active && <span className="absolute left-[10px] top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-[#8B5CF6]" />}
                  <SidebarIcon type={item.icon} active={Boolean(item.active)} />
                  <span className="whitespace-nowrap text-[16px]">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>
          <div className="mt-auto border-t border-inherit px-[18px] pb-7 pt-6">
            <Link to="/profile" className={`flex items-center gap-4 rounded-[18px] px-3 py-3 ${isDark ? 'bg-white/[0.03]' : 'bg-[#F1EFF7]'}`}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#5B48D6] text-[18px] font-semibold text-white">
                {profile?.fullName ? profile.fullName.split(' ').slice(0, 2).map((part) => part[0]).join('').toUpperCase() : 'U'}
              </div>
              <div className="min-w-0">
                <p className={`${brightText} truncate text-[15px] font-semibold leading-[18px]`}>{profile?.fullName || 'User'}</p>
                <p className={`${softText} mt-1 truncate text-[12px] font-medium uppercase tracking-[0.08em]`}>{profile?.membership || 'Member'}</p>
              </div>
            </Link>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col px-8 pb-10 pt-4 xl:px-11">
          <header className={`flex items-start justify-between border-b pb-4 ${isDark ? 'border-[#4A475B]' : 'border-[#D4D0DF]'}`}>
            <div className="shrink-0">
              <h2 className="text-[24px] font-semibold">Hello, {firstName}!</h2>
              <p className={`mt-2 ${softText} text-[10px] uppercase tracking-wider`}>{today}</p>
            </div>

            <div className="flex flex-1 items-center justify-center px-6">
              <div className="flex w-full max-w-md items-center gap-3">
                <div className={`flex h-10 flex-1 items-center gap-3 rounded-xl border px-4 ${isDark ? 'border-white/12 bg-[#2B2A37]' : 'border-[#DCCFFF] bg-white'}`}>
                  <svg className={softText} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3.5-3.5" />
                  </svg>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search company..."
                    className={`w-full bg-transparent text-sm outline-none ${isDark ? 'placeholder:text-white/40' : 'placeholder:text-[#8A84A2]'}`}
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className={`group flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${isDark ? 'border-white/12 bg-[#2B2A37] hover:border-violet-500 hover:bg-violet-500/10' : 'border-[#DCCFFF] bg-white hover:border-violet-500 hover:bg-violet-50'}`}
                  >
                    <svg className={`${softText} group-hover:text-violet-500 transition-colors`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                  </button>

                  {showFilterMenu && (
                    <div className={`absolute right-0 top-12 z-50 w-64 rounded-xl border p-4 shadow-2xl ${panel}`}>
                      <div className="space-y-4">
                        <div>
                          <label className={`block text-[10px] font-bold uppercase tracking-wider ${softText} mb-1.5`}>Date Applied</label>
                          <div className="relative">
                            <button
                              onClick={() => setOpenDropdown(openDropdown === 'date' ? null : 'date')}
                              className={`flex w-full items-center justify-between rounded-lg border bg-transparent p-2.5 text-sm outline-none ${isDark ? 'border-white/10 text-white' : 'border-gray-200 text-gray-900'}`}
                            >
                              <span>{filters.date || 'All Dates'}</span>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform ${openDropdown === 'date' ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
                            </button>
                            {openDropdown === 'date' && (
                              <div className={`absolute left-0 top-full z-[60] mt-1 w-full overflow-hidden rounded-lg border shadow-xl ${isDark ? 'bg-[#1F1F2A] border-white/10' : 'bg-white border-gray-200'}`}>
                                <div
                                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-violet-500/10 flex items-center justify-between ${filters.date === '' ? 'text-violet-500 font-medium' : ''}`}
                                  onClick={() => { setFilters({...filters, date: ''}); setOpenDropdown(null); }}
                                >
                                  All Dates
                                  {filters.date === '' && <span>✓</span>}
                                </div>
                                {uniqueDates.map(date => (
                                  <div
                                    key={date}
                                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-violet-500/10 flex items-center justify-between ${filters.date === date ? 'text-violet-500 font-medium' : ''}`}
                                    onClick={() => { setFilters({...filters, date: date}); setOpenDropdown(null); }}
                                  >
                                    {date}
                                    {filters.date === date && <span>✓</span>}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className={`block text-[10px] font-bold uppercase tracking-wider ${softText} mb-1.5`}>Status</label>
                          <div className="relative">
                            <button
                              onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
                              className={`flex w-full items-center justify-between rounded-lg border bg-transparent p-2.5 text-sm outline-none ${isDark ? 'border-white/10 text-white' : 'border-gray-200 text-gray-900'}`}
                            >
                              <span className="capitalize">{filters.status || 'Any Status'}</span>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform ${openDropdown === 'status' ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
                            </button>
                            {openDropdown === 'status' && (
                              <div className={`absolute left-0 top-full z-[60] mt-1 w-full overflow-hidden rounded-lg border shadow-xl ${isDark ? 'bg-[#1F1F2A] border-white/10' : 'bg-white border-gray-200'}`}>
                                <div
                                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-violet-500/10 flex items-center justify-between ${filters.status === '' ? 'text-violet-500 font-medium' : ''}`}
                                  onClick={() => { setFilters({...filters, status: ''}); setOpenDropdown(null); }}
                                >
                                  Any Status
                                  {filters.status === '' && <span>✓</span>}
                                </div>
                                {['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'].map(s => (
                                  <div
                                    key={s}
                                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-violet-500/10 flex items-center justify-between ${filters.status === s.toLowerCase() ? 'text-violet-500 font-medium' : ''}`}
                                    onClick={() => { setFilters({...filters, status: s.toLowerCase()}); setOpenDropdown(null); }}
                                  >
                                    {s}
                                    {filters.status === s.toLowerCase() && <span>✓</span>}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className={`block text-[10px] font-bold uppercase tracking-wider ${softText} mb-1.5`}>Role</label>
                          <input
                            type="text"
                            value={filters.role}
                            placeholder="Type role..."
                            className={`w-full rounded-lg border bg-transparent p-2.5 text-sm outline-none ${isDark ? 'border-white/10 placeholder:text-white/30' : 'border-gray-200 placeholder:text-gray-400'}`}
                            onChange={(e) => setFilters({...filters, role: e.target.value})}
                          />
                        </div>
                        <button
                          onClick={() => setFilters({ date: '', status: '', role: '' })}
                          className="w-full text-center text-[11px] text-violet-500 hover:underline mt-2"
                        >
                          Clear Filters
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <Link to="/add-application" className="flex h-10 w-[215px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#8D6BFF] text-white shadow-lg transition hover:-translate-y-0.5">
                <span className="font-medium">New Application</span><span className="text-lg">⊕</span>
              </Link>
              <ThemeToggle />
            </div>
          </header>

          <section className="mt-8 flex gap-5">
            {displayStats.map((stat) => (
              <div key={stat.label} className={`flex-1 rounded-xl border px-6 py-4 ${panel} ${toneClasses[stat.tone]}`}>
                <p className={`${softText} text-[12px] font-medium`}>{stat.label}</p>
                <p className={`${brightText} mt-2 text-[24px] font-semibold`}>{stat.value}</p>
                <div className="mt-3 flex items-center justify-between text-[12px]">
                  <span className={stat.tone === 'red' ? 'text-[#FF5252]' : 'text-[#22C55E]'}>{stat.delta}</span>
                  <Link to="/applications" className={`${softText} hover:underline`}>See more</Link>
                </div>
              </div>
            ))}
          </section>

          <section className="mt-10">
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-[20px] font-semibold">Application Pipeline</h3>
                <p className={`mt-2 ${softText} text-[14px]`}>Drag cards to update status</p>
              </div>
              <Link to="/applications" className="flex h-8 w-[125px] items-center justify-center gap-1 rounded-xl border-[1.5px] border-violet-500 text-sm text-violet-500 transition hover:bg-violet-500 hover:text-white">
                See All <span>→</span>
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-5 gap-4">
              {filteredPipeline.map((column) => (
                <div key={column.title} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, column.title)} className="min-w-0">
                  <div className={`flex h-8 items-center gap-2 rounded-lg border-[1.5px] px-3 ${badgeClasses[column.tone]}`}>
                    <span className="text-xs">●</span><span className="truncate text-sm font-medium">{column.title}</span>
                  </div>
                  <div className="mt-4 space-y-3 min-h-[150px]">
                    {column.cards.map((card, idx) => (
                      <div key={card.id} draggable onDragStart={(e) => handleDragStart(e, card, column.title)} className={`rounded-xl border ${panel} p-3 cursor-grab active:cursor-grabbing hover:border-violet-400 transition-all`}>
                        <p className={`${brightText} truncate text-[13px] font-semibold`}>{card.company}</p>
                        <p className={`${softText} truncate text-[11px] mt-1`}>{card.role}</p>
                        <p className={`${softText} text-[11px] mt-1`}>{card.age}</p>
                      </div>
                    ))}
                    {column.cards.length === 0 && <div className="border border-dashed border-gray-500/20 rounded-xl h-24 flex items-center justify-center opacity-20 text-[10px]">Empty</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 grid grid-cols-3 gap-6">
            <div className={`rounded-xl border ${panel} p-5`}>
              <div className="flex justify-between items-start">
                <h4 className="text-[17px] font-semibold">Weekly Activity</h4>
                <span className="text-[9px] bg-[#332E59] px-2 py-1 rounded text-white/80">{dateRangeStr}</span>
              </div>
              <div className="mt-6 flex h-[172px] items-end justify-between gap-1.5">
                {(weeklyData?.data?.length > 0 ? weeklyData.data : Array(7).fill({count: 0})).map((item, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-[11px] font-medium">{item.count}</span>
                    <div className="flex h-[148px] w-full items-end rounded-full bg-[#322A57] p-[4px]">
                      <div
                        className={`w-full transition-all duration-500 rounded-b-full ${item.count > 0 ? 'bg-gradient-to-t from-[#7C4DFF] to-[#5D4AB5] rounded-t-full' : 'opacity-0'}`}
                        style={{ height: `${Math.min(140, 60 + (item.count || 0) * 10)}px` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[12px] leading-[16px] text-violet-400">{weeklyData.total_this_week} applications this week</p>
              <p className={`${softText} mt-1 text-[11px]`}>↗ {weeklyData.change_percentage}% compared to last week</p>
            </div>

            {/* --- UPDATED AI RESUME ANALYZER CARD --- */}
            <div className={`rounded-[22px] border ${panel} p-7 flex flex-col`}>
              <h4 className="text-[17px] font-bold leading-none">AI Resume Analyzer</h4>
              <p className={`${softText} mt-2 text-[12px]`}>
                Last Scan: {analyzerData.last_scan || 'No scans performed yet'}
              </p>

              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="relative flex h-[130px] w-[130px] items-center justify-center">
                  <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" fill="none" stroke={isDark ? '#2B2A37' : '#F1F1F7'} strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="8"
                      strokeDasharray="276"
                      // match_score birbaşa backend-dən gəlir
                      strokeDashoffset={276 - (276 * (analyzerData?.match_score || 0)) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <span className="text-[28px] font-black">{analyzerData?.match_score || 0}%</span>
                </div>

                <div className="mt-8 w-full">
                  <p className={`${softText} mb-3 text-center text-[11px] font-bold uppercase tracking-wider`}>
                    Missing Keywords
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {analyzerData?.missing_keywords?.length > 0 ? (
                      analyzerData.missing_keywords.slice(0, 3).map((word, i) => (
                        <span key={i} className="rounded-lg bg-[#5B48D6]/10 px-3 py-1.5 text-[11px] font-semibold text-[#8B5CF6]">
                          {word}
                        </span>
                      ))
                    ) : (
                      <p className="text-[11px] opacity-40">No missing data</p>
                    )}
                  </div>
                </div>
              </div>

              <Link to="/analyzer" className="mt-6">
                <div className="flex h-[44px] items-center justify-center rounded-[12px] bg-[#2C2345] text-[13px] font-bold text-[#8B5CF6] transition hover:bg-[#352a53]">
                  Analyze New Resume ↗
                </div>
              </Link>
            </div>

            <div className={`h-[348px] w-full rounded-xl border ${panel} px-5 py-5 flex flex-col`}>
              <div className="flex items-center justify-between gap-4">
                <Link to="/reminders" className="text-[17px] font-semibold leading-tight hover:text-violet-400 transition">
                  Reminders
                </Link>
                <Link to="/add-reminder" className="shrink-0 rounded-xl border border-violet-500 px-3 py-2 text-[12px] font-medium text-violet-500 transition hover:bg-violet-500/10">
                  Add ⊕
                </Link>
              </div>
              
              {Array.isArray(liveReminders) && liveReminders.filter(r => !r.is_completed).length > 0 ? (
                <div className="mt-4 space-y-2.5 overflow-y-auto pr-1">
                  {liveReminders.filter(r => !r.is_completed).slice(0, 4).map((reminder) => {
                    let dotColor = 'text-[#22C55E]'; 
                    if (reminder.priority === 'Medium') dotColor = 'text-[#F59E0B]'; 
                    if (reminder.priority === 'High') dotColor = 'text-[#FF5252]'; 

                    return (
                      <Link 
                        key={reminder.id} 
                        to="/reminders" 
                        className={`flex h-[58px] w-full shrink-0 rounded-[10px] border-[1.2px] ${panel} px-3 py-2.5 transition hover:border-violet-400/50 items-center`}
                      >
                        <div className="flex w-full items-center justify-between gap-[10px]">
                          <div className="flex min-w-0 items-start gap-3">
                            <span className={`shrink-0 ${dotColor}`}>●</span>
                            <div className="min-w-0">
                              <p className="truncate text-[13px] font-semibold leading-[16px]">
                                {reminder.title}
                              </p>
                              <p className={`${softText} mt-1 truncate text-[11px] leading-[12px]`}>
                                {reminder.company} · {reminder.due_date || 'Pending'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-center text-center pb-[72px]">
                  <p className={`${softText} text-[12px]`}>No upcoming reminders.</p>
                </div>
              )}
            </div>
          </section> 
        </main> 
      </div> 
    </div> 
  ); 
}