import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/useTheme';
import { useProfile } from '../context/useProfile';

const tabs = ['All(19)', 'Applied', 'Interview', 'Screening', 'Offer', 'Rejected', 'Saved'];

const rows = [
  { company: 'Google', role: 'Software engineer', status: 'Applied', salary: '$117,500', applied: 'Mar 25, 2026', accent: 'blue', mode: 'Hybrid', icon: 'G' },
  { company: 'Meta', role: 'Product designer', status: 'Applied', salary: '$124,000', applied: 'Mar 21, 2026', accent: 'blue', mode: 'Remote', icon: 'M' },
  { company: 'Google', role: 'Software engineer', status: 'Interview', salary: '$117,500', applied: 'Mar 25, 2026', accent: 'yellow', mode: 'Hybrid', icon: 'G' },
  { company: 'Microsoft', role: 'Frontend developer', status: 'Interview', salary: '$126,300', applied: 'Mar 20, 2026', accent: 'yellow', mode: 'Hybrid', icon: 'M' },
  { company: 'Airbnb', role: 'UX researcher', status: 'Interview', salary: '$119,800', applied: 'Mar 16, 2026', accent: 'yellow', mode: 'Remote', icon: 'A' },
  { company: 'Stripe', role: 'UX designer', status: 'Screening', salary: '$118,600', applied: 'Mar 18, 2026', accent: 'amber', mode: 'Hybrid', icon: 'S' },
  { company: 'Notion', role: 'Visual designer', status: 'Offer', salary: '$122,400', applied: 'Mar 14, 2026', accent: 'green', mode: 'Remote', icon: 'N' },
  { company: 'Shopify', role: 'Product designer', status: 'Offer', salary: '$127,900', applied: 'Mar 11, 2026', accent: 'green', mode: 'Remote', icon: 'S' },
  { company: 'Dropbox', role: 'UI designer', status: 'Rejected', salary: '$104,200', applied: 'Mar 7, 2026', accent: 'red', mode: 'Hybrid', icon: 'D' },
];

const savedRows = [
  { company: 'OpenAI', role: 'Product designer', status: 'Saved', salary: '$158,000', dueDate: 'Apr 09, 2026', accent: 'pink', mode: 'Hybrid', icon: 'O' },
  { company: 'Netflix', role: 'Frontend engineer', status: 'Saved', salary: '$149,500', dueDate: 'Apr 12, 2026', accent: 'pink', mode: 'Remote', icon: 'N' },
  { company: 'Adobe', role: 'UX researcher', status: 'Saved', salary: '$136,200', dueDate: 'Apr 14, 2026', accent: 'pink', mode: 'Hybrid', icon: 'A' },
  { company: 'Duolingo', role: 'Interaction designer', status: 'Saved', salary: '$131,400', dueDate: 'Apr 18, 2026', accent: 'pink', mode: 'Remote', icon: 'D' },
];

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

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

export default function Applications() {
  const { isDark } = useTheme();
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState('All(19)');

  const shell = isDark ? 'bg-[#111119] text-white' : 'bg-[#F6F3FF] text-[#171421]';
  const sidebar = isDark ? 'bg-[#1B1B25] border-[#4A475B]' : 'bg-[#FBFAFE] border-[#D4D0DF]';
  const panel = isDark ? 'bg-[#1F1F2A] border-[#4A475B]' : 'bg-white border-[#D4D0DF]';
  const softText = isDark ? 'text-white/55' : 'text-[#6F688A]';
  const brightText = isDark ? 'text-white' : 'text-[#171421]';
  const tableColumns = '1.5fr 1.7fr 1.1fr 0.95fr 1.15fr 0.9fr';
  const isSavedTab = activeTab === 'Saved';
  const visibleRows = useMemo(() => {
    if (activeTab === 'All(19)') return rows;
    if (isSavedTab) return savedRows;
    return rows.filter((row) => row.status.toLowerCase() === activeTab.toLowerCase());
  }, [activeTab, isSavedTab]);

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
              className={`${softText} uppercase`}
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
            {navItems.map((item) => {
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
                  {item.active && <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-[#8B5CF6]" />}
                  <SidebarIcon type={item.icon} active={item.active} />
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

              if (item.to === '#') {
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

        <main className="px-[76px] pb-12 pt-8">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>

          <div className="mt-4">
            <h2 className="text-[28px] font-semibold leading-[34px]">Applications</h2>
            <p className={`${softText} mt-1 text-[14px] leading-[20px]`}>Track you getting hired process</p>
          </div>

          <section className={`mt-10 min-h-[858px] w-[1120px] rounded-[16px] border ${panel} px-[48px] pb-[46px] pt-[28px]`}>
            <div className="flex items-center justify-between">
              <div className="flex gap-5">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`h-[33px] rounded-full border px-[15px] text-[14px] font-semibold leading-none transition ${
                      activeTab === tab
                        ? 'border-[#8B5CF6] bg-[#3B2D77] text-white shadow-[0_0_0_1px_rgba(139,92,246,0.2)]'
                        : isDark
                        ? 'border-[#3B3949] text-white/90'
                        : 'border-[#D4D0DF] text-[#171421]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <Link
                to="/add-application"
                className="flex h-[42px] w-[224px] items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-[#7C4DFF] to-[#8D6BFF] text-[16px] font-semibold text-white shadow-[0_12px_28px_rgba(124,77,255,0.24)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_16px_34px_rgba(124,77,255,0.34)] active:translate-y-0 active:scale-[0.985] focus:outline-none focus:ring-2 focus:ring-violet-400/70"
              >
                <span>New Application</span>
                <span className="text-[17px] leading-none">⊕</span>
              </Link>
            </div>

            <div className={`mt-8 overflow-hidden rounded-[24px] border ${isDark ? 'border-[#595665] bg-[#3B3A46]' : 'border-[#D4D0DF] bg-[#ECEAF2]'}`}>
              <div
                className={`grid h-[46px] items-center px-8 text-[14px] font-semibold ${isDark ? 'text-white/95' : 'text-[#171421]'}`}
                style={{ gridTemplateColumns: tableColumns }}
              >
                <span>Company</span>
                <span>Role</span>
                <span>Status</span>
                <span>Salary</span>
                <span>{isSavedTab ? 'Due Date' : 'Applied'}</span>
                <span className="pr-2 text-right">Actions</span>
              </div>
            </div>

            <div className="px-8">
              {visibleRows.map((row, index) => (
                <div
                  key={`${row.status}-${index}`}
                  className={`grid h-[66px] items-center border-b ${isDark ? 'border-[#373544]' : 'border-[#E6E2EF]'}`}
                  style={{ gridTemplateColumns: tableColumns }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-[29px] w-[29px] items-center justify-center rounded-[10px] border text-[17px] leading-none ${iconClasses[row.accent]}`}>
                      {row.icon}
                    </div>
                    <div>
                      <p className={`text-[14px] font-medium leading-[18px] ${brightText}`}>{row.company}</p>
                      <p className={`${softText} text-[13px] leading-[15px]`}>{row.mode}</p>
                    </div>
                  </div>

                  <p className={`text-[14px] leading-[18px] ${brightText}`}>{row.role}</p>

                  <div>
                    <span className={`inline-flex min-w-[105px] items-center justify-center rounded-full border px-4 py-[5px] text-[14px] font-semibold ${statusClasses[row.accent]}`}>
                      {row.status}
                    </span>
                  </div>

                  <p className={`text-[14px] leading-[18px] ${brightText}`}>{row.salary}</p>
                  <p className={`text-[14px] leading-[18px] ${brightText}`}>{isSavedTab ? row.dueDate : row.applied}</p>

                  <div className="flex items-center justify-end gap-4 pr-2">
                    <button className={`transition ${isDark ? 'text-white/85 hover:text-white' : 'text-[#171421] hover:text-[#000000]'}`} aria-label="Edit application">
                      <EditIcon />
                    </button>
                    <button className="text-[#FF5252] transition hover:text-[#FF7A7A]" aria-label="Delete application">
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
