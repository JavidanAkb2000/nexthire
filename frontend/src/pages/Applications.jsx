import { useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/useTheme';
import { useProfile } from '../context/useProfile';
import api from '../api';

const tabs = ['All', 'Applied', 'Interview', 'Screening', 'Offer', 'Rejected', 'Saved'];

const getAccentFromStatus = (status) => {
  const map = {
    'Applied': 'blue',
    'Interview': 'yellow',
    'Screening': 'amber',
    'Offer': 'green',
    'Rejected': 'red',
    'Saved': 'pink'
  };
  return map[status] || 'blue';
};

const statusClasses = {
  blue: 'border-[#3B82F6] bg-[#172843] text-[#3B82F6]',
  yellow: 'border-[#FACC15] bg-[#4A4216] text-[#FACC15]',
  amber: 'border-[#F59E0B] bg-[#4B3212] text-[#FFB21E]',
  green: 'border-[#22C55E] bg-[#173A2A] text-[#2DDF7F]',
  red: 'border-[#FF5252] bg-[#432125] text-[#FF5C5C]',
  pink: 'border-[#EC4899] bg-[#4B213B] text-[#F472B6]',
};

const iconClasses = {
  blue: 'border-[#3B82F6] text-[#3B82F6]',
  yellow: 'border-[#FACC15] text-[#FACC15]',
  amber: 'border-[#F59E0B] text-[#F59E0B]',
  green: 'border-[#22C55E] text-[#22C55E]',
  red: 'border-[#FF5252] text-[#FF5252]',
  pink: 'border-[#EC4899] text-[#EC4899]',
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

function EditIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 113 3L7 19l-4 1 1-4 12.5-12.5z" /></svg>;
}

function TrashIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></svg>;
}

function StatusDropdown({ value, onChange, isDark, options, inputBg }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full mt-1.5">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-[14px] font-semibold outline-none transition-all ${isDark ? 'border-white/10' : 'border-black/10'} bg-transparent`}
      >
        <span className={isDark ? 'text-white' : 'text-[#171421]'}>{value}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className={`absolute left-0 right-0 top-[calc(100%+6px)] z-[200] rounded-xl border shadow-2xl overflow-hidden ${isDark ? 'bg-[#1F1F2A] border-[#4A475B]' : 'bg-white border-[#D4D0DF]'}`}>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-3 text-[13px] font-semibold transition-colors ${
                value === opt
                  ? isDark ? 'bg-[#2C2345] text-[#8B5CF6]' : 'bg-[#EDE9FF] text-[#8B5CF6]'
                  : isDark ? 'text-white hover:bg-white/5' : 'text-[#171421] hover:bg-[#F6F3FF]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Applications() {
  const { isDark } = useTheme();
  const { profile } = useProfile();
  
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    date: 'All Dates',
    status: 'Any Status',
    role: ''
  });

  const shell = isDark ? 'bg-[#111119] text-white' : 'bg-[#F6F3FF] text-[#171421]';
  const sidebar = isDark ? 'bg-[#1B1B25] border-[#4A475B]' : 'bg-[#FBFAFE] border-[#D4D0DF]';
  const panel = isDark ? 'bg-[#1F1F2A] border-[#4A475B]' : 'bg-white border-[#D4D0DF]';
  const softText = isDark ? 'text-white/55' : 'text-[#6F688A]';
  const brightText = isDark ? 'text-white' : 'text-[#171421]';
  const inputBg = isDark ? 'bg-[#252531] border-[#4A475B]' : 'bg-[#F1EFF7] border-[#D4D0DF]';
  const filterPanel = isDark ? 'bg-[#1F1F2A] border-[#4A475B]' : 'bg-[#FFFFFF] border-[#D4D0DF]';
  
  const tableColumns = '1.5fr 1.7fr 1.1fr 0.95fr 1.15fr 0.9fr';

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('applications/');
        const appList = Array.isArray(response.data) ? response.data : [];

        const formattedData = appList.map(app => {
          // %100 ÇÖKMEZ (BULLETPROOF) METİN DÖNÜŞÜMLERİ
          const rawCompany = String(app.company_name || 'Unknown').trim();
          const rawStatus = String(app.status || 'Applied').trim();

          const iconChar = rawCompany ? String(rawCompany.charAt(0) || 'U').toUpperCase() : 'U';
          const formattedStatus = rawStatus ? String(rawStatus.charAt(0) || 'A').toUpperCase() + rawStatus.slice(1).toLowerCase() : 'Applied';

          // BURASI DÜZELDİ: app.application_date olarak okunuyor
          let rawDate = app.application_date || app.created_at || '';
          if (rawDate && typeof rawDate === 'string') {
              rawDate = rawDate.split('T')[0];
          } else {
              rawDate = '';
          }

          let formattedDate = '-';
          if (rawDate) {
            const d = new Date(rawDate);
            if (!isNaN(d)) {
              formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(d);
            }
          }
          
          return {
            id: app.id,
            company: rawCompany || 'Unknown',
            role: String(app.job_title || 'Unknown'),
            status: formattedStatus,
            salary: String(app.salary || '-'),
            mode: String(app.location || '-'),
            applied: formattedDate,
            rawDate: rawDate,
            notes: String(app.notes || ''),
            accent: getAccentFromStatus(formattedStatus),
            icon: iconChar
          };
        });
        
        setData(formattedData);
      } catch (error) {
        console.error("Başvurular yüklenirken hata oluştu:", error);
      }
    };
    fetchApplications();
  }, []);

  const uniqueDates = useMemo(() => {
    const dates = data.map(row => row.applied).filter(d => d !== '-');
    return ['All Dates', ...new Set(dates)];
  }, [data]);
  
  const visibleRows = useMemo(() => {
    let source = [...data];
    if (activeTab !== 'All') {
      source = source.filter((row) => row.status.toLowerCase() === activeTab.toLowerCase());
    }
    if (searchQuery) {
      source = source.filter(row => row.company.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (filters.date !== 'All Dates') {
      source = source.filter(row => row.applied === filters.date);
    }
    if (filters.status !== 'Any Status') {
      source = source.filter(row => row.status === filters.status);
    }
    if (filters.role) {
      source = source.filter(row => row.role.toLowerCase().includes(filters.role.toLowerCase()));
    }
    return source;
  }, [activeTab, data, searchQuery, filters]);

  const handleDelete = async () => {
    try {
      await api.delete(`applications/${deleteId}/`);
      setData(data.filter(item => item.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Silme işlemi başarısız:", error);
      alert("Başvuru silinirken bir hata oluştu.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        company_name: editItem.company,
        job_title: editItem.role,
        status: editItem.status.toLowerCase(),
        salary: editItem.salary && editItem.salary !== '-' ? parseInt(editItem.salary, 10) : null,
        location: editItem.mode,
        // BURASI DÜZELDİ: applied_date yerine application_date yazıldı!
        application_date: editItem.rawDate || null,
        notes: editItem.notes
      };
      // ... gerisi aynı ...
      
      await api.patch(`applications/${editItem.id}/`, payload);
      
      setData(data.map(item => {
        if (item.id === editItem.id) {
           const safeComp = String(editItem.company || 'Unknown').trim();
           const safeIcon = safeComp ? String(safeComp.charAt(0) || 'U').toUpperCase() : 'U';
           return {
             ...editItem,
             company: safeComp || 'Unknown',
             accent: getAccentFromStatus(editItem.status),
             icon: safeIcon
           };
        }
        return item;
      }));
      setEditItem(null);
    } catch(error) {
      console.error("Güncelleme hatası:", error);
      alert("Başvuru güncellenirken bir hata oluştu.");
    }
  };

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/dashboard', active: false },
    { label: 'Applications', icon: 'applications', to: '/applications', active: true },
    { label: 'Analyzer', icon: 'analyzer', to: '/analyzer', active: false },
    { label: 'Performance', icon: 'performance', to: '/performance', active: false },
    { label: 'Reminders', icon: 'reminders', to: '/reminders', active: false },
  ];

  return (
    <div className={`min-h-screen font-sans ${shell}`}>
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className={`${panel} w-[400px] rounded-2xl p-8 shadow-2xl border`}>
            <h3 className="text-xl font-bold">Delete Application?</h3>
            <p className={`${softText} mt-2`}>This action cannot be undone. Are you sure you want to remove this entry?</p>
            <div className="mt-8 flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 rounded-xl bg-gray-500/10 py-3 font-semibold hover:bg-gray-500/20">Cancel</button>
              <button onClick={handleDelete} className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}

      {editItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className={`${panel} w-[800px] rounded-[24px] border p-10 shadow-2xl`}>
            <h2 className="text-[24px] font-bold">Edit Application</h2>
            <p className={`${softText} mb-8`}>Update your job application details and tracking status.</p>
            <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Company</label>
                <input className={`rounded-xl border p-4 outline-none ${inputBg}`} value={editItem.company} onChange={(e) => setEditItem({...editItem, company: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Role</label>
                <input className={`rounded-xl border p-4 outline-none ${inputBg}`} value={editItem.role} onChange={(e) => setEditItem({...editItem, role: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Salary</label>
                {/* BURASI GÜNCELLENDİ: type="text" ve Regex kontrolü */}
                <input 
                  type="text"
                  className={`rounded-xl border p-4 outline-none ${inputBg}`} 
                  value={editItem.salary !== '-' ? editItem.salary : ''} 
                  onChange={(e) => {
                    // Rakam olmayan tüm karakterleri anında yok et
                    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                    setEditItem({...editItem, salary: onlyNumbers});
                  }} 
                  placeholder="Örn: 120000"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Location</label>
                <input className={`rounded-xl border p-4 outline-none ${inputBg}`} value={editItem.mode} onChange={(e) => setEditItem({...editItem, mode: e.target.value})} />
              </div>

              <div className="col-span-2 flex flex-col gap-3">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Status</label>
                <StatusDropdown
                  value={editItem.status}
                  options={tabs.slice(1)}
                  onChange={(val) => setEditItem({ ...editItem, status: val, accent: getAccentFromStatus(val) })}
                  isDark={isDark}
                  inputBg={inputBg}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Applied Date</label>
                <input 
                  type="date"
                  className={`rounded-xl border p-4 outline-none ${inputBg}`} 
                  value={editItem.rawDate || ''} 
                  onChange={(e) => {
                    const newDate = e.target.value;
                    const formatted = newDate ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(newDate)) : '-';
                    setEditItem({...editItem, rawDate: newDate, applied: formatted});
                  }}
                />
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Notes</label>
                <textarea rows="4" className={`rounded-xl border p-4 outline-none ${inputBg} resize-none`} placeholder="Add application notes, recruiter details, or next steps" value={editItem.notes} onChange={(e) => setEditItem({...editItem, notes: e.target.value})} />
              </div>
              <div className="col-span-2 mt-4 flex gap-4">
                <button type="button" onClick={() => setEditItem(null)} className={`h-14 flex-1 rounded-xl font-bold transition ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}>Cancel</button>
                <button type="submit" className="h-14 flex-1 rounded-xl bg-[#8B5CF6] font-bold text-white shadow-lg shadow-violet-500/20 hover:brightness-110">Save Application</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid min-h-screen grid-cols-[272px_1fr]">
        <aside className={`flex flex-col border-r ${sidebar}`}>
          <div className="border-b border-inherit px-[18px] pb-7 pt-8">
            <h1 className={`${brightText} whitespace-nowrap`} style={{ fontFamily: 'Sitka, Georgia, serif', fontWeight: 700, fontSize: '34px' }}>
              NextHire<span className="align-top text-[0.45em] text-violet-500">•</span>
            </h1>
          </div>
          <nav className="mt-14 flex flex-1 flex-col gap-4 px-[10px]">
            {navItems.map((item) => (
              <Link key={item.label} to={item.to} className={`flex min-h-[56px] items-center gap-4 rounded-[16px] border px-6 py-4 ${item.active ? 'relative border-[#504B63] bg-[#2C2345] text-[#8B5CF6]' : 'border-transparent'}`}>
                {item.active && <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-[#8B5CF6]" />}
                <SidebarIcon type={item.icon} active={item.active} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="px-[76px] pb-12 pt-8">
          <div className="flex justify-end"><ThemeToggle /></div>
          
          <div className="mt-4 flex items-start justify-between">
            <div>
              <h2 className="text-[32px] font-bold">Applications</h2>
              <p className={`${softText} mt-1 text-[15px]`}>Track you getting hired process</p>
            </div>

            <div className="flex items-center gap-3 relative">
              <div className={`flex h-[44px] w-[340px] items-center gap-3 rounded-xl border px-4 ${inputBg}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input 
                  type="text" 
                  placeholder="Search company..." 
                  className="bg-transparent outline-none text-[14px] w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex h-[44px] w-[44px] items-center justify-center rounded-xl border transition ${isFilterOpen ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]' : inputBg}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
              </button>

              {isFilterOpen && (
                <div className={`absolute right-0 top-[56px] z-50 w-[280px] rounded-2xl border p-5 shadow-2xl ${filterPanel}`}>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Date Applied</label>
                      <StatusDropdown
                        value={filters.date}
                        options={uniqueDates}
                        onChange={(val) => setFilters({...filters, date: val})}
                        isDark={isDark}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</label>
                      <StatusDropdown
                        value={filters.status}
                        options={['Any Status', ...tabs.slice(1)]}
                        onChange={(val) => setFilters({...filters, status: val})}
                        isDark={isDark}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Role</label>
                      <input 
                        type="text"
                        placeholder="Type role..."
                        className={`mt-1.5 w-full rounded-xl border bg-transparent p-3 text-[14px] font-semibold outline-none ${isDark ? 'border-white/10' : 'border-black/10'}`}
                        value={filters.role}
                        onChange={(e) => setFilters({...filters, role: e.target.value})}
                      />
                    </div>
                    <button 
                      onClick={() => setFilters({ date: 'All Dates', status: 'Any Status', role: '' })}
                      className="mt-2 text-[12px] font-semibold text-[#8B5CF6] hover:underline text-center"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <section className={`mt-10 rounded-[16px] border ${panel} px-[48px] pb-[46px] pt-[28px]`}>
            <div className="flex items-center justify-between">
              <div className="flex gap-5">
                {tabs.map((tab) => {
                  const count = tab === 'All' ? data.length : data.filter(d => d.status === tab).length;
                  return (
                    <button 
                      key={tab} 
                      onClick={() => setActiveTab(tab)} 
                      className={`h-[33px] rounded-full border px-[15px] text-[14px] font-semibold transition ${activeTab === tab ? 'border-[#8B5CF6] bg-[#3B2D77] text-white' : 'border-[#3B3949]'}`}
                    >
                      {tab}{tab === 'All' ? `(${count})` : ''}
                    </button>
                  );
                })}
              </div>
              <Link to="/add-application" className="flex h-[42px] w-[224px] items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-[#7C4DFF] to-[#8D6BFF] font-semibold text-white shadow-lg">
                New Application ⊕
              </Link>
            </div>

            <div className={`mt-8 overflow-hidden rounded-[24px] border ${isDark ? 'border-[#595665] bg-[#3B3A46]' : 'border-[#D4D0DF] bg-[#ECEAF2]'}`}>
              <div className="grid h-[46px] items-center px-8 text-[14px] font-semibold" style={{ gridTemplateColumns: tableColumns }}>
                <span>Company</span><span>Role</span><span>Status</span><span>Salary</span><span>{activeTab === 'Saved' ? 'Due Date' : 'Applied'}</span><span className="text-right pr-2">Actions</span>
              </div>
            </div>

            <div className="px-8">
              {visibleRows.length > 0 ? (
                visibleRows.map((row) => (
                  <div key={row.id} className={`grid h-[66px] items-center border-b ${isDark ? 'border-[#373544]' : 'border-[#E6E2EF]'}`} style={{ gridTemplateColumns: tableColumns }}>
                    <div className="flex items-center gap-3">
                      <div className={`flex h-[29px] w-[29px] items-center justify-center rounded-[10px] border font-bold ${iconClasses[row.accent]}`}>{row.icon}</div>
                      <div><p className="text-[14px] font-medium">{row.company}</p><p className={`${softText} text-[13px]`}>{row.mode}</p></div>
                    </div>
                    <p className="text-[14px]">{row.role}</p>
                    <div>
                      <button 
                        onClick={() => setActiveTab(row.status)}
                        className={`inline-flex min-w-[105px] items-center justify-center rounded-full border px-4 py-[5px] text-[12px] font-bold uppercase transition hover:brightness-110 active:scale-95 ${statusClasses[row.accent]}`}
                      >
                        {row.status}
                      </button>
                    </div>
                    <p className="text-[14px]">{row.salary}</p>
                    <p className="text-[14px]">{row.applied}</p>
                    <div className="flex items-center justify-end gap-4 pr-2">
                      <button onClick={() => setEditItem(row)} className="hover:text-violet-400 transition"><EditIcon /></button>
                      <button onClick={() => setDeleteId(row.id)} className="text-[#FF5252] hover:text-red-400 transition"><TrashIcon /></button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center">
                  <p className={softText}>No applications found matching your search.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}