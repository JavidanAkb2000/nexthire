import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/useTheme';
import { useProfile } from '../context/useProfile';

const initialActiveReminders = [
  { id: 1, task: 'Send portfolio update', company: 'Spotify', due: 'Due Today' },
  { id: 2, task: 'Confirm interview time', company: 'Airbnb', due: 'Tomorrow' },
  { id: 3, task: 'Submit design challenge', company: 'Figma', due: 'Due Today' },
  { id: 4, task: 'Share updated resume', company: 'Stripe', due: 'Apr 08' },
  { id: 5, task: 'Prepare case study deck', company: 'Notion', due: 'Apr 09' },
  { id: 6, task: 'Follow up with recruiter', company: 'Canva', due: 'Apr 10' },
  { id: 7, task: 'Review salary range', company: 'Meta', due: 'Apr 11' },
];

const initialCompletedReminders = [
  { id: 101, task: 'Send thank-you email', company: 'Shopify', due: 'Done' },
  { id: 102, task: 'Update CV headline', company: 'Dropbox', due: 'Done' },
  { id: 103, task: 'Upload portfolio PDF', company: 'Google', due: 'Done' },
];

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

export default function Reminders() {
  const { isDark } = useTheme();
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState('Active');
  const [activeReminders, setActiveReminders] = useState(initialActiveReminders);
  const [completedReminders, setCompletedReminders] = useState(initialCompletedReminders);

  const shell = isDark ? 'bg-[#111119] text-white' : 'bg-[#F6F3FF] text-[#171421]';
  const sidebar = isDark ? 'bg-[#1B1B25] border-[#4A475B]' : 'bg-[#FBFAFE] border-[#D4D0DF]';
  const softText = isDark ? 'text-white/55' : 'text-[#6F688A]';
  const brightText = isDark ? 'text-white' : 'text-[#171421]';
  const rowBg = isDark ? 'bg-[#1F1F2A]' : 'bg-white';
  const rowText = isDark ? 'text-white/80' : 'text-[#171421]';
  const mutedRowText = isDark ? 'text-white/65' : 'text-[#6F688A]';
  const dividerText = isDark ? 'text-white/70' : 'text-[#8D86A8]';
  const visibleReminders = activeTab === 'Active' ? activeReminders : completedReminders;

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/dashboard', active: false },
    { label: 'Applications', icon: 'applications', to: '/applications', active: false },
    { label: 'Analyzer', icon: 'analyzer', to: '/analyzer', active: false },
    { label: 'Performance', icon: 'performance', to: '/performance', active: false },
    { label: 'Reminders', icon: 'reminders', to: '/reminders', active: true },
  ];

  const toggleReminder = (item) => {
    if (activeTab === 'Active') {
      setActiveReminders((current) => current.filter((entry) => entry.id !== item.id));
      setCompletedReminders((current) => [{ ...item, due: 'Done' }, ...current]);
      return;
    }

    setCompletedReminders((current) => current.filter((entry) => entry.id !== item.id));
    setActiveReminders((current) => [{ ...item, due: 'Due Today' }, ...current]);
  };

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

        <main className="px-[68px] pb-12 pt-4">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>

          <div className="mt-4 flex items-start justify-between">
            <div>
              <h2 className="text-[28px] font-semibold leading-[34px]">Reminders</h2>
              <p className={`${softText} mt-1 text-[14px] leading-[20px]`}>Stay on top of your follow-ups</p>
            </div>

            <Link
              to="/add-reminder"
              className="flex h-[44px] w-[198px] items-center justify-center rounded-[14px] bg-gradient-to-r from-[#7C4DFF] to-[#8D6BFF] text-[16px] font-semibold text-white shadow-[0_12px_28px_rgba(124,77,255,0.24)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_16px_34px_rgba(124,77,255,0.34)] active:translate-y-0 active:scale-[0.985] focus:outline-none focus:ring-2 focus:ring-violet-400/70"
            >
              Add Reminder
            </Link>
          </div>

          <div className="mt-16">
            <div className={`flex h-[54px] w-[328px] items-center rounded-full border p-[4px] ${isDark ? 'border-[#3A3947] bg-[#1F1F2A]' : 'border-[#D4D0DF] bg-white'}`}>
              {['Active', 'Completed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex h-full flex-1 items-center justify-center rounded-full text-[16px] font-semibold transition ${
                    activeTab === tab
                      ? isDark
                        ? 'bg-[#3A3947] text-white'
                        : 'bg-[#E8E3F8] text-[#171421]'
                      : isDark
                      ? 'text-white'
                      : 'text-[#171421]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <section className="mt-14 w-full max-w-[1210px] space-y-[18px]">
            {visibleReminders.map((item) => (
              <div
                key={item.id}
                className={`flex min-h-[58px] w-full items-center justify-between gap-6 rounded-[14px] px-8 py-3 ${rowBg}`}
              >
                <div className="flex min-w-0 flex-1 items-center">
                  <button
                    type="button"
                    onClick={() => toggleReminder(item)}
                    className={`mr-8 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[4px] border transition ${
                      activeTab === 'Active'
                        ? 'border-[#7C4DFF] hover:bg-[#7C4DFF]/10'
                        : 'border-[#7C4DFF] bg-[#7C4DFF] text-white shadow-[0_4px_12px_rgba(124,77,255,0.26)]'
                    }`}
                    aria-label={activeTab === 'Active' ? 'Mark reminder completed' : 'Move reminder back to active'}
                  >
                    {activeTab === 'Completed' ? <span className="text-[14px] font-bold leading-none">✓</span> : ''}
                  </button>

                  <div className={`min-w-0 text-[17px] leading-none ${rowText}`}>
                    <span
                      className={`${
                        activeTab === 'Completed'
                          ? `${mutedRowText} line-through decoration-[#8B5CF6] decoration-[1px]`
                          : ''
                      }`}
                    >
                      {item.task}
                    </span>
                    <span className={`mx-4 ${dividerText}`}>|</span>
                    <span
                      className={`${
                        activeTab === 'Completed'
                          ? `${mutedRowText} line-through decoration-[#8B5CF6] decoration-[1px]`
                          : rowText
                      }`}
                    >
                      {item.company}
                    </span>
                  </div>
                </div>

                <span
                  className={`inline-flex min-w-[108px] shrink-0 items-center justify-center rounded-full border px-4 py-[5px] text-[14px] font-semibold ${
                    item.due === 'Done'
                      ? 'border-[#22C55E] bg-[#173A2A] text-[#2DDF7F]'
                      : 'border-[#F59E0B] bg-[#4B3212] text-[#FFB21E]'
                  }`}
                >
                  {item.due}
                </span>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
