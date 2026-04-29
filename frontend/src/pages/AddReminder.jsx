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

export default function AddReminder() {
  const { isDark } = useTheme();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', company: '', dueDate: '', notes: '', priority: 'Medium' });

  const shell = isDark ? 'bg-[#111119] text-white' : 'bg-[#F6F3FF] text-[#171421]';
  const sidebar = isDark ? 'bg-[#1B1B25] border-[#4A475B]' : 'bg-[#FBFAFE] border-[#D4D0DF]';
  const panel = isDark ? 'bg-[#1F1F2A] border-[#4A475B]' : 'bg-white border-[#D4D0DF]';
  const softText = isDark ? 'text-white/55' : 'text-[#6F688A]';
  const brightText = isDark ? 'text-white' : 'text-[#171421]';
  const secondaryButton = isDark
    ? 'border-[#5D5870] bg-[#343341] text-white shadow-[0_8px_18px_rgba(0,0,0,0.18)] hover:bg-[#3A3949]'
    : 'border-[#CFC8E4] bg-[#EEEAF9] text-[#2A2144] shadow-[0_8px_18px_rgba(88,72,150,0.08)] hover:bg-[#E5DFFD]';

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/dashboard' },
    { label: 'Applications', icon: 'applications', to: '/applications' },
    { label: 'Analyzer', icon: 'analyzer', to: '/analyzer' },
    { label: 'Performance', icon: 'performance', to: '/performance' },
    { label: 'Reminders', icon: 'reminders', to: '/reminders' },
  ];

  const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  // --- GÜNCELLENEN KISIM ---
  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title) {
        alert("Lütfen en azından bir başlık (Reminder Title) girin!");
        return;
    }
    try {
      // BURASI DEĞİŞTİ: Başına 'applications/' eklendi
      await api.post('applications/api-reminders/', {
        title: form.title,
        company: form.company,
        due_date: form.dueDate || null,
        priority: form.priority,
        notes: form.notes
      });
      navigate('/reminders');
    } catch (error) {
      console.error("Hata:", error);
      alert("Hatırlatıcı kaydedilemedi. Backend çalışıyor mu kontrol edin.");
    }
  };

  return (
    <div className={`min-h-screen font-sans ${shell}`}>
      <div className="grid min-h-screen grid-cols-[272px_1fr]">
        <aside className={`flex flex-col border-r ${sidebar}`}>
          <div className="border-b border-inherit px-[18px] pb-7 pt-8">
            <h1 className={`${brightText} whitespace-nowrap`} style={{ fontFamily: 'Sitka, Georgia, serif', fontWeight: 700, fontSize: '34px', lineHeight: '34px' }}>
              NextHire<span className="align-top text-[0.45em] text-violet-500">•</span>
            </h1>
          </div>
          <div className="px-[18px] pt-6">
            <p className={`${softText} uppercase text-[9px] leading-[16px] tracking-[0.02em]`}>Main Menu</p>
          </div>
          <nav className="mt-14 flex flex-1 flex-col gap-4 px-[10px]">
            {navItems.map((item) => (
              <Link key={item.label} to={item.to}>
                <div className={`flex min-h-[56px] items-center gap-4 rounded-[16px] border px-6 py-4 ${isDark ? 'border-transparent text-white/90' : 'border-transparent text-[#171421]'}`}>
                  <SidebarIcon type={item.icon} active={false} />
                  <span className="whitespace-nowrap text-[16px]">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>
          <div className="mt-auto border-t border-inherit px-[18px] pb-7 pt-6">
            <Link to="/profile" className={`flex items-center gap-4 rounded-[18px] px-3 py-3 ${isDark ? 'bg-white/[0.03]' : 'bg-[#F1EFF7]'}`}>
              {/* BURASI KORUMAYA ALINDI */}
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

        <main className="px-[68px] pb-12 pt-8">
          <div className="flex items-center justify-between">
            <Link to="/reminders" className={`inline-flex h-[36px] items-center gap-2 rounded-[12px] border px-4 text-[14px] font-medium transition ${secondaryButton}`}>
              <span>←</span><span>Back</span>
            </Link>
            <ThemeToggle />
          </div>

          <div className="mt-8">
            <h2 className="text-[28px] font-semibold leading-[34px]">Add New Reminder</h2>
            <p className={`${softText} mt-1 text-[14px] leading-[20px]`}>Create a follow-up task and keep your job search on schedule.</p>
          </div>

          <section className={`mt-10 w-[960px] rounded-[18px] border ${panel} px-10 py-9`}>
            <div className="grid grid-cols-2 gap-6">
              {[
                ['Reminder Title', 'title', 'Send portfolio update'],
                ['Company', 'company', 'Spotify'],
                ['Due Date', 'dueDate', '2026-04-12'],
                ['Priority', 'priority', 'Medium'],
              ].map(([label, key, placeholder]) => (
                <div key={label}>
                  <p className={`${softText} text-[12px] uppercase tracking-[0.08em]`}>{label}</p>
                  {key === 'priority' ? (
                    <div className="relative mt-2">
                      <select
                        value={form.priority}
                        onChange={(e) => updateField('priority', e.target.value)}
                        className={`h-[44px] w-full appearance-none rounded-[12px] border px-4 pr-11 text-[14px] font-medium outline-none transition ${
                          isDark
                            ? 'border-[#57536A] bg-[#32313E] text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] focus:border-[#7C4DFF]'
                            : 'border-[#D4D0DF] bg-[#F5F2FF] text-[#171421] shadow-[0_4px_10px_rgba(42,33,68,0.06)] focus:border-[#7C4DFF]'
                        }`}
                      >
                        {['Low', 'Medium', 'High'].map((value) => <option key={value}>{value}</option>)}
                      </select>
                      <span className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] ${softText}`}>▼</span>
                    </div>
                  ) : (
                    <input
                      type={key === 'dueDate' ? 'date' : 'text'}
                      value={form[key]}
                      onChange={(e) => updateField(key, e.target.value)}
                      placeholder={placeholder}
                      className={`mt-2 h-[48px] w-full rounded-[14px] border px-4 text-[15px] outline-none ${isDark ? 'border-[#4A475B] bg-[#2B2A37] text-white placeholder:text-white/35' : 'border-[#D4D0DF] bg-[#F6F3FF] text-[#171421] placeholder:text-[#8A84A2]'}`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className={`${softText} text-[12px] uppercase tracking-[0.08em]`}>Notes</p>
              <textarea
                value={form.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                placeholder="Add any reminder details here"
                className={`mt-2 h-[160px] w-full resize-none rounded-[14px] border px-4 py-4 text-[15px] outline-none ${isDark ? 'border-[#4A475B] bg-[#2B2A37] text-white placeholder:text-white/35' : 'border-[#D4D0DF] bg-[#F6F3FF] text-[#171421] placeholder:text-[#8A84A2]'}`}
              />
            </div>

            <div className="mt-8 flex gap-4">
              <button onClick={() => navigate('/reminders')} className={`h-[42px] rounded-[14px] border px-6 text-[15px] font-medium transition ${secondaryButton}`}>Cancel</button>
              <button onClick={handleSave} className="h-[42px] rounded-[14px] bg-gradient-to-r from-[#7C4DFF] to-[#8D6BFF] px-7 text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(124,77,255,0.24)] transition hover:brightness-110">Save Reminder</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}