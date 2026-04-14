import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/useTheme';
import { useProfile } from '../context/useProfile';
import api from '../api';

const statusStyles = {
  applied: { accent: 'blue', label: 'Applied' },
  interview: { accent: 'yellow', label: 'Interview' },
  screening: { accent: 'amber', label: 'Screening' },
  offer: { accent: 'green', label: 'Offer' },
  rejected: { accent: 'red', label: 'Rejected' },
  saved: { accent: 'pink', label: 'Saved' },
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

function EditIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 113 3L7 19l-4 1 1-4 12.5-12.5z" /></svg>; }
function TrashIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></svg>; }

export default function Applications() {
  const { isDark } = useTheme();
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState('All');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('applications/');
      setApplications(response.data);
    } catch (error) {
      console.error("Veriler çekilemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Bu başvuruyu silmek istediğinize emin misiniz?");
    if (!isConfirmed) return;

    try {
      await api.delete(`applications/${id}/`);
      setApplications(applications.filter(app => app.id !== id));
      alert("Başvuru başarıyla silindi!");
    } catch (error) {
      alert("Silinirken bir hata oluştu.");
    }
  };

  const handleEdit = () => {
    alert("Düzenleme ve Detay sayfası henüz yapılmadı. Bir sonraki adımımız bu olabilir!");
  };

  const shell = isDark ? 'bg-[#111119] text-white' : 'bg-[#F6F3FF] text-[#171421]';
  const sidebar = isDark ? 'bg-[#1B1B25] border-[#4A475B]' : 'bg-[#FBFAFE] border-[#D4D0DF]';
  const panel = isDark ? 'bg-[#1F1F2A] border-[#4A475B]' : 'bg-white border-[#D4D0DF]';
  const softText = isDark ? 'text-white/55' : 'text-[#6F688A]';
  const brightText = isDark ? 'text-white' : 'text-[#171421]';
  const tableColumns = '1.5fr 1.7fr 1.1fr 0.95fr 1.15fr 0.9fr';

  const visibleRows = useMemo(() => {
    if (activeTab === 'All') return applications;
    return applications.filter((app) => app.status?.toLowerCase() === activeTab.toLowerCase());
  }, [activeTab, applications]);

  const tabs = ['All', 'Applied', 'Interview', 'Screening', 'Offer', 'Rejected', 'Saved'];

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/dashboard', active: false },
    { label: 'Applications', icon: 'applications', to: '/applications', active: true },
    { label: 'Analyzer', icon: 'analyzer', to: '/analyzer', active: false },
    { label: 'Performance', icon: 'performance', to: '/performance', active: false },
    { label: 'Reminders', icon: 'reminders', to: '/reminders', active: false },
  ];

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
            {navItems.map((item) => (
              <Link key={item.label} to={item.to}>
                <div className={`flex min-h-[56px] items-center gap-4 rounded-[16px] border px-6 py-4 ${item.active ? 'relative border-[#504B63] bg-[#2C2345] text-[#8B5CF6]' : isDark ? 'border-transparent text-white/90' : 'border-transparent text-[#171421]'}`}>
                  {item.active && <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-[#8B5CF6]" />}
                  <SidebarIcon type={item.icon} active={item.active} />
                  <span className="whitespace-nowrap text-[16px]">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="px-[76px] pb-12 pt-8">
          <div className="flex justify-end"><ThemeToggle /></div>
          <div className="mt-4">
            <h2 className="text-[28px] font-semibold leading-[34px]">Applications</h2>
          </div>

          <section className={`mt-10 min-h-[858px] w-[1120px] rounded-[16px] border ${panel} px-[48px] pb-[46px] pt-[28px]`}>
            <div className="flex items-center justify-between">
              <div className="flex gap-5">
                {tabs.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`h-[33px] rounded-full border px-[15px] text-[14px] font-semibold transition ${activeTab === tab ? 'border-[#8B5CF6] bg-[#3B2D77] text-white' : isDark ? 'border-[#3B3949] text-white/90' : 'border-[#D4D0DF] text-[#171421]'}`}>
                    {tab}{tab === 'All' ? `(${applications.length})` : ''}
                  </button>
                ))}
              </div>
              <Link to="/add-application" className="flex h-[42px] w-[224px] items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-[#7C4DFF] to-[#8D6BFF] text-[16px] font-semibold text-white">
                <span>New Application</span><span className="text-[17px]">⊕</span>
              </Link>
            </div>

            <div className={`mt-8 overflow-hidden rounded-[24px] border ${isDark ? 'border-[#595665] bg-[#3B3A46]' : 'border-[#D4D0DF] bg-[#ECEAF2]'}`}>
              <div className={`grid h-[46px] items-center px-8 text-[14px] font-semibold ${isDark ? 'text-white/95' : 'text-[#171421]'}`} style={{ gridTemplateColumns: tableColumns }}>
                <span>Company</span><span>Role</span><span>Status</span><span>Salary</span><span>Applied</span><span className="pr-2 text-right">Actions</span>
              </div>
            </div>

            <div className="px-8">
              {loading ? (
                <div className="py-10 text-center">Yükleniyor...</div>
              ) : visibleRows.length === 0 ? (
                <div className="py-10 text-center text-[#8B5CF6]">Henüz kayıtlı bir başvurun yok.</div>
              ) : visibleRows.map((app) => {
                const style = statusStyles[app.status?.toLowerCase()] || { accent: 'blue', label: app.status };
                return (
                  <div key={app.id} className={`grid h-[66px] items-center border-b ${isDark ? 'border-[#373544]' : 'border-[#E6E2EF]'}`} style={{ gridTemplateColumns: tableColumns }}>
                    <div className="flex items-center gap-3">
                      <div className={`flex h-[29px] w-[29px] items-center justify-center rounded-[10px] border text-[17px] font-bold uppercase ${iconClasses[style.accent]}`}>
                        {app.company_name ? app.company_name[0] : '?'}
                      </div>
                      <div>
                        <p className={`text-[14px] font-medium leading-[18px] ${brightText}`}>{app.company_name}</p>
                        <p className={`${softText} text-[13px] leading-[15px]`}>{app.location || 'Belirtilmedi'}</p>
                      </div>
                    </div>
                    <p className={`text-[14px] leading-[18px] ${brightText}`}>{app.job_title}</p>
                    <div>
                      {/* DÜZELTİLDİ: Sania'nın orijinal tasarımı (Büyük harf değil, İlk harfi büyük "Applied" şeklinde) */}
                      <span className={`inline-flex min-w-[105px] items-center justify-center rounded-full border px-4 py-[5px] text-[13px] font-medium capitalize ${statusClasses[style.accent]}`}>
                        {app.status?.toLowerCase()}
                      </span>
                    </div>
                    <p className={`text-[14px] leading-[18px] ${brightText}`}>{app.salary || '-'}</p>
                    <p className={`text-[14px] leading-[18px] ${brightText}`}>{app.applied_date}</p>
                    <div className="flex items-center justify-end gap-4 pr-2">
                      <button onClick={handleEdit} className={`transition ${isDark ? 'text-white/85 hover:text-white' : 'text-[#171421] hover:text-[#8B5CF6]'}`}><EditIcon /></button>
                      <button onClick={() => handleDelete(app.id)} className="text-[#FF5252] transition hover:text-[#FF7A7A]"><TrashIcon /></button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}