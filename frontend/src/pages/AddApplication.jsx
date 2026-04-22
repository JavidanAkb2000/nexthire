import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/useTheme';
import { useProfile } from '../context/useProfile';
import api from '../api'; 

function SidebarIcon({ type, active }) {
  const color = active ? '#8B5CF6' : 'currentColor';
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (type === 'dashboard') return <svg {...common}><path d="M4 11.5L12 5l8 6.5" /><path d="M6.5 10.5V18h11v-7.5" /></svg>;
  if (type === 'applications') return <svg {...common}><path d="M8 7h12" /><path d="M8 12h12" /><path d="M8 17h12" /><path d="M4 7h.01" /><path d="M4 12h.01" /><path d="M4 17h.01" /></svg>;
  if (type === 'analyzer') return <svg {...common}><path d="M7 7l10 10" /><path d="M14 6l4 4" /><path d="M6 14l4 4" /><path d="M11 4l2 2" /><path d="M4 11l2 2" /></svg>;
  if (type === 'performance') return <svg {...common}><path d="M4 17l5-5 4 4 7-8" /><path d="M20 8h-5" /></svg>;
  return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 8v4l2.5 2.5" /></svg>;
}
  
export default function AddApplication() {
  const { isDark } = useTheme();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company: '', role: '', status: 'Applied', salary: '', location: '', appliedDate: '', notes: '',
  });

  const shell = isDark ? 'bg-[#111119] text-white' : 'bg-[#F6F3FF] text-[#171421]';
  const sidebar = isDark ? 'bg-[#1B1B25] border-[#4A475B]' : 'bg-[#FBFAFE] border-[#D4D0DF]';
  const panel = isDark ? 'bg-[#1F1F2A] border-[#4A475B]' : 'bg-white border-[#D4D0DF]';
  const softText = isDark ? 'text-white/55' : 'text-[#6F688A]';
  const brightText = isDark ? 'text-white' : 'text-[#171421]';
  const secondaryButton = isDark ? 'border-[#5D5870] bg-[#343341] text-white hover:bg-[#3A3949]' : 'border-[#CFC8E4] bg-[#EEEAF9] text-[#2A2144] hover:bg-[#E5DFFD]';

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/dashboard', active: false },
    { label: 'Applications', icon: 'applications', to: '/applications', active: false },
    { label: 'Analyzer', icon: 'analyzer', to: '/analyzer', active: false },
    { label: 'Performance', icon: 'performance', to: '/performance', active: false },
    { label: 'Reminders', icon: 'reminders', to: '/reminders', active: true },
  ];
  
  const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('applications/', {
        company_name: form.company,
        job_title: form.role,
        status: form.status.toLowerCase(),
        salary: form.salary ? parseInt(form.salary, 10) : null,
        location: form.location,
        application_date: form.appliedDate || new Date().toISOString().split('T')[0],
        notes: form.notes
      });
      alert("Harika! Yeni iş başvurusu başarıyla veritabanına kaydedildi.");
      navigate('/applications'); 
    } catch (error) {
      alert("Django'nun Hatası: " + JSON.stringify(error.response?.data)); 
    }
  };

  return (
    <div className={`min-h-screen font-sans ${shell}`}>
      <div className="grid min-h-screen grid-cols-[272px_1fr]">
        <aside className={`flex flex-col border-r ${sidebar}`}>
          <div className="border-b border-inherit px-[18px] pb-7 pt-8">
            <h1 className={`${brightText} whitespace-nowrap`} style={{ fontFamily: 'Sitka, Georgia, serif', fontWeight: 700, fontSize: '34px' }}>
              NextHire<span className="align-top text-[0.45em] text-violet-500">•</span>
            </h1>
          </div>
          <div className="px-[18px] pt-6"><p className={`${softText} uppercase text-[9px]`}>Main Menu</p></div>
          <nav className="mt-14 flex flex-1 flex-col gap-4 px-[10px]">
            {['Dashboard', 'Applications', 'Analyzer', 'Performance', 'Reminders'].map((label) => (
              <Link key={label} to={`/${label.toLowerCase()}`}>
                <div className={`flex min-h-[56px] items-center gap-4 rounded-[16px] border px-6 py-4 border-transparent ${isDark ? 'text-white/90' : 'text-[#171421]'}`}>
                  <SidebarIcon type={label.toLowerCase()} active={false} />
                  <span className="whitespace-nowrap text-[16px]">{label}</span>
                </div>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="px-[68px] pb-12 pt-8">
          <div className="flex items-center justify-between">
            <Link to="/applications" className={`inline-flex h-[36px] items-center gap-2 rounded-[12px] border px-4 text-[14px] font-medium ${secondaryButton}`}>
              <span>←</span><span>Back</span>
            </Link>
            <ThemeToggle />
          </div>

          <div className="mt-8">
            <h2 className="text-[28px] font-semibold">Add New Application</h2>
          </div>

          <section className={`mt-10 w-[980px] rounded-[18px] border ${panel} px-10 py-9`}>
            <div className="grid grid-cols-2 gap-6">
              {[
                ['Company', 'company', 'Google'], 
                ['Role', 'role', 'Frontend Developer'],
                ['Salary', 'salary', '120000'], 
                ['Location', 'location', 'Remote']
              ].map(([label, key, placeholder]) => (
                <div key={label}>
                  <p className={`${softText} text-[12px] uppercase`}>{label}</p>
                  <input 
                    type="text" 
                    value={form[key]} 
                    onChange={(e) => {
                      let val = e.target.value;
                      if (key === 'salary') {
                        val = val.replace(/[^0-9]/g, '');
                      }
                      updateField(key, val);
                    }} 
                    placeholder={placeholder} 
                    className={`mt-2 h-[48px] w-full rounded-[14px] border px-4 outline-none ${isDark ? 'border-[#4A475B] bg-[#2B2A37] text-white placeholder:text-white/35' : 'border-[#D4D0DF] bg-[#F6F3FF] text-[#171421] placeholder:text-[#8A84A2]'}`} 
                  />
                </div>
              ))}
              
              <div>
                <p className={`${softText} text-[12px] uppercase`}>Status</p>
                <div className="relative mt-2">
                  <select value={form.status} onChange={(e) => updateField('status', e.target.value)} className={`h-[48px] w-full appearance-none rounded-[14px] border px-4 pr-11 text-[15px] outline-none transition ${isDark ? 'border-[#4A475B] bg-[#2B2A37] text-white' : 'border-[#D4D0DF] bg-[#F6F3FF] text-[#171421]'}`}>
                    {['Applied', 'Interview', 'Screening', 'Offer', 'Rejected', 'Saved'].map((value) => <option key={value}>{value}</option>)}
                  </select>
                  <span className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] ${softText}`}>▼</span>
                </div>
              </div>
              
              <div>
                <p className={`${softText} text-[12px] uppercase`}>Applied Date</p>
                <input type="date" value={form.appliedDate} onChange={(e) => updateField('appliedDate', e.target.value)} className={`mt-2 h-[48px] w-full rounded-[14px] border px-4 outline-none ${isDark ? 'border-[#4A475B] bg-[#2B2A37] text-white' : 'border-[#D4D0DF] bg-[#F6F3FF] text-[#171421]'}`} />
              </div>
            </div>

            <div className="mt-6">
              <p className={`${softText} text-[12px] uppercase tracking-[0.08em]`}>Notes</p>
              <textarea
                value={form.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                placeholder="Add application notes, recruiter details, or next steps"
                className={`mt-2 h-[170px] w-full resize-none rounded-[14px] border px-4 py-4 text-[15px] outline-none ${isDark ? 'border-[#4A475B] bg-[#2B2A37] text-white placeholder:text-white/35' : 'border-[#D4D0DF] bg-[#F6F3FF] text-[#171421] placeholder:text-[#8A84A2]'}`}
              />
            </div>

            <div className="mt-8 flex gap-4">
              <Link to="/applications" className={`flex h-[42px] items-center rounded-[14px] border px-6 text-[15px] ${secondaryButton}`}>Cancel</Link>
              <button onClick={handleSave} className="h-[42px] rounded-[14px] bg-gradient-to-r from-[#7C4DFF] to-[#8D6BFF] px-7 text-[15px] font-semibold text-white">Save Application</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}