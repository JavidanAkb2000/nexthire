import { useDeferredValue, useState, useMemo } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import ThemeToggle from '../components/ThemeToggle'; 
import { useTheme } from '../context/useTheme'; 
import { useProfile } from '../context/useProfile'; 

const stats = [ 
  { label: 'Total applied', value: '18', delta: '+3 this week', tone: 'blue' }, 
  { label: 'Total offered', value: '5', delta: '+1 this week', tone: 'green' }, 
  { label: 'Total interviewed', value: '10', delta: '+2 this week', tone: 'yellow' }, 
  { label: 'Total rejected', value: '13', delta: '+4 this week', tone: 'red' }, 
]; 

const pipeline = [ 
  { 
    title: 'Applied', 
    tone: 'blue', 
    cards: [ 
      { company: 'Google', role: 'Product Designer', age: '2 days ago' }, 
      { company: 'Spotify', role: 'Product Designer', age: '4 days ago' }, 
      { company: 'Notion', role: 'Product Designer', age: '6 days ago' }, 
    ], 
  }, 
  { 
    title: 'Screening', 
    tone: 'yellow', 
    cards: [ 
      { company: 'Airbnb', role: 'Product Designer', age: '2 days ago' }, 
      { company: 'Canva', role: 'Product Designer', age: '5 days ago' }, 
    ], 
  }, 
  { 
    title: 'Interview', 
    tone: 'amber', 
    cards: [{ company: 'Figma', role: 'Product Designer', age: '2 days ago' }], 
  }, 
  { 
    title: 'Offer', 
    tone: 'green', 
    cards: [ 
      { company: 'Stripe', role: 'Product Designer', age: '1 day ago' }, 
      { company: 'Shopify', role: 'Product Designer', age: '3 days ago' }, 
    ], 
  }, 
  { 
    title: 'Rejected', 
    tone: 'red', 
    cards: [{ company: 'Dropbox', role: 'Product Designer', age: '6 days ago' }], 
  }, 
]; 

const reminders = [ 
  { tone: 'red', title: 'Send resume', detail: 'Spotify · Due today' }, 
  { tone: 'amber', title: 'Update CV', detail: 'Airbnb · Tomorrow' }, 
  { tone: 'green', title: 'Write follow-up', detail: 'Figma · Friday' }, 
  { tone: 'green', title: 'Prepare portfolio', detail: 'Shopify · Next week' }, 
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

  const common = { 
    width: 18, 
    height: 18, 
    viewBox: '0 0 24 24', 
    fill: 'none', 
    stroke: color, 
    strokeWidth: 1.9, 
    strokeLinecap: 'round', 
    strokeLinejoin: 'round', 
  }; 

  if (type === 'dashboard') { 
    return ( 
      <svg {...common}> 
        <path d="M4 11.5L12 5l8 6.5" /> 
        <path d="M6.5 10.5V18h11v-7.5" /> 
      </svg> 
    ); 
  } 

  if (type === 'applications') { 
    return ( 
      <svg {...common}> 
        <path d="M8 7h12" /> 
        <path d="M8 12h12" /> 
        <path d="M8 17h12" /> 
        <path d="M4 7h.01" /> 
        <path d="M4 12h.01" /> 
        <path d="M4 17h.01" /> 
      </svg> 
    ); 
  } 

  if (type === 'analyzer') { 
    return ( 
      <svg {...common}> 
        <path d="M7 7l10 10" /> 
        <path d="M14 6l4 4" /> 
        <path d="M6 14l4 4" /> 
        <path d="M11 4l2 2" /> 
        <path d="M4 11l2 2" /> 
      </svg> 
    ); 
  } 

  if (type === 'performance') { 
    return ( 
      <svg {...common}> 
        <path d="M4 17l5-5 4 4 7-8" /> 
        <path d="M20 8h-5" /> 
      </svg> 
    ); 
  } 

  return ( 
    <svg {...common}> 
      <circle cx="12" cy="12" r="8.5" /> 
      <path d="M12 8v4l2.5 2.5" /> 
    </svg> 
  ); 
} 

export default function Dashboard() { 
  const { isDark } = useTheme(); 
  const { profile } = useProfile(); 
  const navigate = useNavigate(); 
  const [search, setSearch] = useState(''); 
  const [showFilterMenu, setShowFilterMenu] = useState(false); 
  const [filters, setFilters] = useState({ date: '', status: '', role: '' }); 
  
  const [openDropdown, setOpenDropdown] = useState(null); 

  const deferredSearch = useDeferredValue(search); 

  const filteredPipeline = useMemo(() => { 
    return pipeline.map(column => { 
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
  }, [deferredSearch, filters]); 

  const shell = isDark ? 'bg-[#111119] text-white' : 'bg-[#F6F3FF] text-[#171421]'; 
  const sidebar = isDark ? 'bg-[#1B1B25] border-[#4A475B]' : 'bg-[#FBFAFE] border-[#D4D0DF]'; 
  const panel = isDark ? 'bg-[#1F1F2A] border-[#4A475B]' : 'bg-white border-[#D4D0DF]'; 
  const softText = isDark ? 'text-white/55' : 'text-[#6F688A]'; 
  const brightText = isDark ? 'text-white' : 'text-[#171421]'; 

  const uniqueDates = Array.from(new Set(pipeline.flatMap(col => col.cards.map(c => c.age)))); 

  return ( 
    <div className={`min-h-screen font-sans ${shell}`}> 
      {/* Updated grid to be responsive: 1 column on tablet, 2 on laptop */}
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr] xl:grid-cols-[272px_1fr]"> 
        <aside className={`hidden lg:flex flex-col border-r ${sidebar}`}> 
          <div className="border-b border-inherit px-[18px] pb-7 pt-8"> 
            <h1 
              className={`${brightText} whitespace-nowrap`} 
              style={{ 
                fontFamily: 'Sitka, Georgia, serif', 
                fontWeight: 700, 
                fontSize: '34px', 
                lineHeight: '34px', 
                letterSpacing: '0%', 
              }} 
            > 
              NextHire<span className="align-top text-[0.45em] text-violet-500">•</span> 
            </h1> 
          </div> 

          <div className="px-[18px] pt-6"> 
            <p 
              className={`${softText.toString()} uppercase`} 
              style={{ 
                fontFamily: 'Inter, system-ui, sans-serif', 
                fontWeight: 500, 
                fontSize: '9px', 
                lineHeight: '16px', 
                letterSpacing: '2%', 
              }} 
            > 
              Main Menu 
            </p> 
          </div> 

          <nav className="mt-14 flex flex-1 flex-col gap-4 px-[10px]"> 
            {[ 
              { label: 'Dashboard', icon: 'dashboard', active: true, to: '/dashboard' }, 
              { label: 'Applications', icon: 'applications', active: false, to: '/applications' }, 
              { label: 'Analyzer', icon: 'analyzer', active: false, to: '/analyzer' }, 
              { label: 'Performance', icon: 'performance', active: false, to: '/performance' }, 
              { label: 'Reminders', icon: 'reminders', active: false, to: '/reminders' }, 
            ].map((item) => { 
              const content = ( 
                <div 
                  className={`flex min-h-[56px] items-center gap-4 rounded-[16px] border px-6 py-4 ${ 
                    item.active 
                      ? 'relative border-[#504B63] bg-[#2C2345] text-[#8B5CF6]' 
                      : isDark 
                      ? 'border-transparent text-white/90' 
                      : 'border-transparent text-[#171421]' 
                  }`} 
                > 
                  {item.active && <span className="absolute left-[10px] top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-[#8B5CF6]" />} 
                  <SidebarIcon type={item.icon} active={Boolean(item.active)} /> 
                  <span 
                    className="whitespace-nowrap" 
                    style={{ 
                      fontFamily: 'Inter, system-ui, sans-serif', 
                      fontWeight: item.active ? 500 : 400, 
                      fontSize: '16px', 
                      lineHeight: '100%', 
                      letterSpacing: '0%', 
                    }} 
                  > 
                    {item.label} 
                  </span> 
                </div> 
              ); 

              if (!item.to) { 
                return <div key={item.label}>{content}</div>; 
              } 

              return ( 
                <Link key={item.label} to={item.to}> 
                  {content} 
                </Link> 
              ); 
            })} 
          </nav> 

          <div className="mt-auto border-t border-inherit px-[18px] pb-7 pt-6"> 
            <Link to="/profile" className={`flex items-center gap-4 rounded-[18px] px-3 py-3 ${isDark ? 'bg-white/[0.03]' : 'bg-[#F1EFF7]'}`}> 
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#5B48D6] text-[18px] font-semibold text-white"> 
                {profile.fullName 
                  .split(' ') 
                  .slice(0, 2) 
                  .map((part) => part[0]) 
                  .join('') 
                  .toUpperCase()} 
              </div> 
              <div className="min-w-0"> 
                <p className={`${brightText} truncate text-[15px] font-semibold leading-[18px]`}>{profile.fullName}</p> 
                <p className={`${softText} mt-1 truncate text-[12px] font-medium uppercase tracking-[0.08em]`}>{profile.membership}</p> 
              </div> 
            </Link> 
          </div> 
        </aside> 

        <main className="px-6 lg:px-11 pb-10 pt-4 overflow-x-hidden"> 
          <header className={`flex flex-wrap items-center justify-between border-b pb-4 gap-4 ${isDark ? 'border-[#4A475B]' : 'border-[#D4D0DF]'}`}> 
            <div className="shrink-0"> 
              <h2 className="text-xl lg:text-2xl font-semibold">Hello, Alex!</h2> 
              <p className={`mt-2 text-[10px] font-medium uppercase tracking-wider ${softText}`}>Saturday, March 28</p> 
            </div> 

            <div className="flex-1 min-w-[300px] flex justify-center order-3 lg:order-none w-full lg:w-auto"> 
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
                  <button onClick={() => setShowFilterMenu(!showFilterMenu)} className={`group flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${isDark ? 'border-white/12 bg-[#2B2A37] hover:border-violet-500' : 'border-[#DCCFFF] bg-white hover:border-violet-500'}`}> 
                    <svg className={`${softText} group-hover:text-violet-500`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg> 
                  </button> 
                  {showFilterMenu && ( 
                    <div className={`absolute right-0 top-12 z-50 w-64 rounded-xl border p-4 shadow-2xl ${panel}`}> 
                      <div className="space-y-4"> 
                        <div> 
                          <label className={`block text-[10px] font-bold uppercase tracking-wider ${softText} mb-1.5`}>Date Applied</label> 
                          <div className="relative"> 
                            <button onClick={() => setOpenDropdown(openDropdown === 'date' ? null : 'date')} className={`flex w-full items-center justify-between rounded-lg border bg-transparent p-2.5 text-sm outline-none ${isDark ? 'border-white/10 text-white' : 'border-gray-200 text-gray-900'}`}>
                              <span>{filters.date || 'All Dates'}</span>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
                            </button>
                            {openDropdown === 'date' && (
                              <div className={`absolute left-0 top-full z-[60] mt-1 w-full overflow-hidden rounded-lg border shadow-xl ${isDark ? 'bg-[#1F1F2A] border-white/10' : 'bg-white border-gray-200'}`}>
                                <div className="px-3 py-2 text-sm cursor-pointer hover:bg-violet-500/10" onClick={() => { setFilters({...filters, date: ''}); setOpenDropdown(null); }}>All Dates</div>
                                {uniqueDates.map(date => ( 
                                  <div key={date} className="px-3 py-2 text-sm cursor-pointer hover:bg-violet-500/10" onClick={() => { setFilters({...filters, date: date}); setOpenDropdown(null); }}>{date}</div> 
                                ))} 
                              </div>
                            )}
                          </div> 
                        </div> 
                        <div> 
                          <label className={`block text-[10px] font-bold uppercase tracking-wider ${softText} mb-1.5`}>Status</label> 
                          <div className="relative"> 
                            <button onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')} className={`flex w-full items-center justify-between rounded-lg border bg-transparent p-2.5 text-sm outline-none ${isDark ? 'border-white/10 text-white' : 'border-gray-200 text-gray-900'}`}>
                              <span className="capitalize">{filters.status || 'Any Status'}</span>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
                            </button>
                            {openDropdown === 'status' && (
                              <div className={`absolute left-0 top-full z-[60] mt-1 w-full overflow-hidden rounded-lg border shadow-xl ${isDark ? 'bg-[#1F1F2A] border-white/10' : 'bg-white border-gray-200'}`}>
                                <div className="px-3 py-2 text-sm cursor-pointer hover:bg-violet-500/10" onClick={() => { setFilters({...filters, status: ''}); setOpenDropdown(null); }}>Any Status</div>
                                {['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'].map(s => ( 
                                  <div key={s} className="px-3 py-2 text-sm cursor-pointer hover:bg-violet-500/10" onClick={() => { setFilters({...filters, status: s.toLowerCase()}); setOpenDropdown(null); }}>{s}</div> 
                                ))} 
                              </div>
                            )}
                          </div> 
                        </div> 
                        <div> 
                          <label className={`block text-[10px] font-bold uppercase tracking-wider ${softText} mb-1.5`}>Role</label> 
                          <input type="text" value={filters.role} placeholder="Type role..." className={`w-full rounded-lg border bg-transparent p-2.5 text-sm outline-none ${isDark ? 'border-white/10 placeholder:text-white/30' : 'border-gray-200 placeholder:text-gray-400'}`} onChange={(e) => setFilters({...filters, role: e.target.value})} /> 
                        </div> 
                        <button onClick={() => setFilters({ date: '', status: '', role: '' })} className="w-full text-center text-[11px] text-violet-500 hover:underline mt-2">Clear Filters</button> 
                      </div> 
                    </div> 
                  )} 
                </div> 
              </div> 
            </div> 

            <div className="flex shrink-0 items-center gap-4"> 
              <Link to="/add-application" className="flex h-10 w-full lg:w-[215px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#8D6BFF] px-6 text-white shadow-lg transition hover:-translate-y-0.5"> 
                <span className="font-medium">New Application</span> 
                <span className="text-lg leading-none">⊕</span> 
              </Link> 
              <ThemeToggle /> 
            </div> 
          </header> 

          <section className="mt-8 flex gap-5 overflow-x-auto pb-4 scrollbar-hide"> 
            {stats.map((stat) => ( 
              <div key={stat.label} className={`h-[104px] w-[220px] lg:w-[249px] shrink-0 rounded-xl border px-6 lg:px-8 py-4 text-left shadow-sm ${panel} ${toneClasses[stat.tone]}`}> 
                <div className="flex h-full flex-col justify-between"> 
                  <div className="min-w-0"> 
                    <p className={`${softText} text-[12px] font-medium tracking-tight`}>{stat.label}</p> 
                    <p className={`${brightText} mt-1 text-[22px] lg:text-[24px] font-semibold`}>{stat.value}</p> 
                  </div> 
                  <div className="flex items-center justify-between text-[11px]"> 
                    <span className={stat.tone === 'red' ? 'text-[#FF5252]' : 'text-[#22C55E]'}>{stat.delta}</span> 
                    <Link to="/applications" className={`${softText} hover:underline`}>See more</Link> 
                  </div> 
                </div> 
              </div> 
            ))} 
          </section> 

          <section className="mt-10"> 
            <div className="flex items-end justify-between"> 
              <div> 
                <h3 className="text-lg lg:text-xl font-medium">Application Pipeline</h3> 
                <p className={`mt-2 text-sm ${softText}`}>Drag cards to update status</p> 
              </div> 
              <Link to="/applications" className="flex h-8 w-[110px] items-center justify-center rounded-xl border border-violet-500 text-xs text-violet-500 transition hover:bg-violet-500 hover:text-white">See All →</Link> 
            </div> 

            {/* Changed from 5 columns to 1-5 columns based on screen size */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"> 
              {filteredPipeline.map((column) => ( 
                <div key={column.title} className="w-full"> 
                  <div className={`flex h-8 w-full items-center gap-2 rounded-lg border-[1.5px] px-3 ${badgeClasses[column.tone]}`}> 
                    <span className="text-[10px]">●</span> 
                    <span className="truncate text-xs font-semibold uppercase tracking-wider">{column.title}</span> 
                  </div> 

                  <div className="mt-4 space-y-3"> 
                    {column.cards.map((card, index) => ( 
                      <div key={`${column.title}-${index}`} className={`h-[84px] w-full rounded-xl border ${panel} px-4 py-3 transition-all hover:border-violet-400 hover:shadow-md cursor-pointer`}> 
                        <div className="flex h-full flex-col justify-center"> 
                          <p className={`${brightText} truncate text-[14px] font-semibold`}>{card.company}</p> 
                          <p className={`${softText} mt-0.5 truncate text-[11px]`}>{card.role}</p> 
                          <p className={`${softText} mt-1.5 text-[10px]`}>{card.age}</p> 
                        </div> 
                      </div> 
                    ))} 
                    {column.cards.length === 0 && ( 
                      <div className={`h-[84px] w-full rounded-xl border border-dashed flex items-center justify-center opacity-40 ${isDark ? 'border-white/10' : 'border-gray-200'}`}> 
                        <span className="text-[10px]">No matches</span> 
                      </div> 
                    )} 
                  </div> 
                </div> 
              ))} 
            </div> 
          </section> 

          <section className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"> 
            <div className={`w-full rounded-xl border ${panel} p-5 flex flex-col`}> 
              <div className="flex items-start justify-between"> 
                <div><h4 className="text-[16px] font-semibold">Weekly Activity</h4><p className={`${softText} text-[11px]`}>Applications sent per day</p></div> 
                <span className="rounded-md bg-violet-500/10 px-2 py-1 text-[9px] text-violet-400">Mar 24 - Mar 31</span> 
              </div> 
              <div className="mt-6 flex h-[160px] items-end justify-between gap-2"> 
                {[5, 9, 6, 4, 3, 2, 7].map((v, i) => ( 
                  <div key={i} className="flex flex-1 flex-col items-center gap-2"> 
                    <span className="text-[10px]">{v}</span> 
                    <div className="w-full bg-violet-500/10 rounded-full h-full flex items-end overflow-hidden"> 
                      <div className="w-full bg-gradient-to-t from-violet-600 to-violet-400 rounded-full" style={{ height: `${v * 10}%` }} /> 
                    </div> 
                  </div> 
                ))} 
              </div> 
              <p className="mt-5 text-sm text-violet-400 font-medium">36 applications this week</p> 
            </div> 

            <div className={`w-full rounded-xl border ${panel} p-5 flex flex-col`}> 
              <h4 className="text-[16px] font-semibold">AI Resume Analyzer</h4> 
              <p className={`${softText} text-[11px]`}>Last Scan: 2 days ago</p> 
              <div className="mt-6 flex items-center gap-4"> 
                <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-[10px] border-violet-500 border-r-transparent animate-pulse"> 
                  <span className="text-lg font-bold">66%</span> 
                </div> 
                <div className="flex-1 space-y-3"> 
                  <div className="text-[11px] flex items-center gap-2 text-red-400 font-semibold"><span className="text-lg">⊗</span> Missing Keywords</div> 
                  <div className="flex flex-wrap gap-1.5"> 
                    {['Figma', 'UX Research'].map(t => <span key={t} className="bg-violet-500/10 px-2 py-1 rounded text-[10px] text-violet-300">{t}</span>)} 
                  </div> 
                </div> 
              </div> 
              <button className="mt-auto w-full py-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-semibold hover:bg-violet-500 hover:text-white transition">Analyze New Resume</button> 
            </div> 

            <div className={`w-full rounded-xl border ${panel} p-5 flex flex-col`}> 
              <div className="flex items-center justify-between"><h4 className="text-[16px] font-semibold">Reminders</h4><button className="text-xs text-violet-500">Add ⊕</button></div> 
              <div className="mt-4 space-y-3"> 
                {reminders.map((r, i) => ( 
                  <Link key={i} to="/reminders" className={`block p-3 rounded-lg border border-inherit bg-inherit hover:border-violet-500/40 transition`}> 
                    <div className="flex items-center justify-between"> 
                      <div className="flex items-center gap-3"><span className={r.tone === 'red' ? 'text-red-500' : 'text-green-500'}>●</span><div><p className="text-xs font-medium">{r.title}</p><p className={`${softText} text-[10px]`}>{r.detail}</p></div></div> 
                      <span className={softText}>→</span> 
                    </div> 
                  </Link> 
                ))} 
              </div> 
            </div> 
          </section> 
        </main> 
      </div> 
    </div> 
  ); 
}