import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/useTheme';
import { useProfile } from '../context/useProfile';

const metricCards = [
  { title: 'Total Applications', value: '42', note: '+4 this week', tone: 'green', icon: 'file' },
  { title: 'Offer Rate', value: '12%', note: '-1% this week', tone: 'red', icon: 'hand' },
  { title: 'Average Salary', value: '$145k', note: 'Updated this week', tone: 'green', icon: 'wallet' },
  { title: 'Response Rate', value: '36%', note: '+5% this week', tone: 'green', icon: 'mail' },
];

const weeklyValues = [5, 9, 6, 4, 3, 2, 7];
const breakdown = [
  { label: 'Screening', value: 14, color: '#F59E0B' },
  { label: 'Interview', value: 12, color: '#FACC15' },
  { label: 'Rejected', value: 7, color: '#FF5757' },
  { label: 'Offers', value: 5, color: '#22C55E' },
  { label: 'No response', value: 4, color: '#A3A3A3' },
];

const overviewCards = [
  { title: 'Average Salary', value: '$145k', note: 'Across all applications' },
  { title: 'Top Role', value: 'ML Engineer', note: 'Most applied position' },
  { title: 'Highest Offer', value: '$170k', note: 'OpenAI' },
  { title: 'Most Active Week', value: '12 Applications', note: '07 Mar - 16 March' },
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

function MetricIcon({ type }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#7C4DFF',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (type === 'file') {
    return (
      <svg {...common}>
        <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M9 14h6" />
        <path d="M9 18h6" />
      </svg>
    );
  }

  if (type === 'hand') {
    return (
      <svg {...common}>
        <path d="M8 13V8a1 1 0 112 0v5" />
        <path d="M10 13v-2a1 1 0 112 0v2" />
        <path d="M12 13v-1a1 1 0 112 0v1" />
        <path d="M14 13v-1a1 1 0 112 0v3a5 5 0 01-5 5H8a4 4 0 01-4-4v-3a1 1 0 112 0v1" />
        <circle cx="17" cy="7" r="1.5" />
      </svg>
    );
  }

  if (type === 'wallet') {
    return (
      <svg {...common}>
        <rect x="3" y="6" width="18" height="12" rx="3" />
        <path d="M16 10h5" />
        <circle cx="16.5" cy="12" r="1" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="4" y="5" width="16" height="14" rx="4" />
      <path d="M7 9l5 4 5-4" />
    </svg>
  );
}

export default function Performance() {
  const { isDark } = useTheme();
  const { profile } = useProfile();

  const shell = isDark ? 'bg-[#111119] text-white' : 'bg-[#F6F3FF] text-[#171421]';
  const sidebar = isDark ? 'bg-[#1B1B25] border-[#4A475B]' : 'bg-[#FBFAFE] border-[#D4D0DF]';
  const panel = isDark ? 'bg-[#1F1F2A] border-[#4A475B]' : 'bg-white border-[#D4D0DF]';
  const softText = isDark ? 'text-white/55' : 'text-[#6F688A]';
  const brightText = isDark ? 'text-white' : 'text-[#171421]';

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/dashboard', active: false },
    { label: 'Applications', icon: 'applications', to: '/applications', active: false },
    { label: 'Analyzer', icon: 'analyzer', to: '/analyzer', active: false },
    { label: 'Performance', icon: 'performance', to: '/performance', active: true },
    { label: 'Reminders', icon: 'reminders', to: '/reminders', active: false },
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${shell}`}>
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

              if (item.to === '#') return <div key={item.label}>{content}</div>;
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

        <main className="px-[72px] pb-10 pt-4">
          <div className="mt-4">
            <div className="flex w-[1090px] items-center justify-between">
              <h2 className={`text-[28px] font-semibold leading-[34px] ${brightText}`}>Performance</h2>
              <ThemeToggle />
            </div>
            <p className={`${softText} mt-1 text-[14px] leading-[20px]`}>Visualize your job search process</p>
          </div>

          <section className="mt-14 grid w-[1090px] grid-cols-4 gap-7">
            {metricCards.map((card) => (
              <div key={card.title} className={`h-[130px] rounded-[22px] border ${panel} px-6 py-5 shadow-sm`}>
                <div className="flex items-start gap-5">
                  <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full border border-[#7C4DFF]">
                    <MetricIcon type={card.icon} />
                  </div>
                  <div>
                    <p className={`${softText} text-[15px] leading-[18px]`}>{card.title}</p>
                    <p className={`${brightText} mt-3 text-[18px] font-semibold leading-none`}>{card.value}</p>
                    <p className={`mt-3 text-[12px] ${card.tone === 'red' ? 'text-[#FF5757]' : 'text-[#22E37D]'}`}>{card.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="mt-7 grid w-[1090px] grid-cols-[1.08fr_1fr] gap-10">
            <div className={`h-[430px] rounded-[18px] border ${panel} px-12 py-9 shadow-sm`}>
              <h3 className={`text-[22px] font-semibold leading-none ${brightText}`}>Weekly Activity</h3>
              <p className={`${softText} mt-2 text-[13px]`}>Application sent per day</p>

              <div className="mt-8 flex h-[215px] items-end justify-between gap-2">
                {weeklyValues.map((value, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <span className={`text-[12px] ${brightText}`}>{value}</span>
                    <div className={`flex h-[182px] w-[48px] items-end rounded-[12px] ${isDark ? 'bg-[#3A2F69]' : 'bg-[#E5E0F2]'} p-[2px]`}>
                      <div
                        className={`w-full rounded-[10px] ${index === 4 ? 'bg-[#7C5CFF]' : 'bg-[#5A46A8]'}`}
                        style={{ height: `${40 + value * 15}px` }}
                      />
                    </div>
                    <span className={`${softText} mt-1 text-[12px]`}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-[13px] font-medium text-[#8B5CF6]">36 applications this week</p>
              <p className="mt-2 text-[13px] font-medium text-[#22E37D]">↗ 12% compared to last week</p>
            </div>

            <div className={`h-[430px] rounded-[18px] border ${panel} px-12 py-9 shadow-sm`}>
              <h3 className={`text-[22px] font-semibold leading-none ${brightText}`}>Status Breakdown</h3>
              <p className={`${softText} mt-2 text-[13px]`}>Application sent per day</p>

              <div className="mt-10">
                <div className="flex h-[28px] overflow-hidden rounded-[4px] bg-gray-100/10">
                  {breakdown.map((item) => (
                    <div key={item.label} style={{ width: `${(item.value / 42) * 100}%`, backgroundColor: item.color }} />
                  ))}
                </div>
                <p className={`mt-2 text-right text-[13px] ${isDark ? 'text-white/85' : 'text-[#171421]/85'}`}>Total Applications (42)</p>
              </div>

              <div className="mt-8 space-y-5">
                {breakdown.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <span className="h-[8px] w-[8px] rounded-full" style={{ backgroundColor: item.color }} />
                    <span className={`text-[16px] ${isDark ? 'text-white/90' : 'text-[#171421]/90'}`}>{item.label} ({item.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={`mt-7 w-[1090px] rounded-[18px] border ${panel} px-12 py-9 shadow-sm`}>
            <h3 className={`text-[22px] font-semibold leading-none ${brightText}`}>Overview</h3>
            <p className={`${softText} mt-2 text-[13px]`}>See the insights across your applications.</p>

            <div className="mt-7 grid grid-cols-4 gap-8">
              {overviewCards.map((card) => (
                <div key={card.title} className={`min-h-[112px] rounded-[22px] border ${panel} px-8 py-5 shadow-sm`}>
                  <p className={`${softText} text-[14px]`}>{card.title}</p>
                  <p className="mt-5 text-[18px] font-medium text-[#8B5CF6]">{card.value}</p>
                  <p className={`${softText} mt-5 text-[12px] not-italic`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    {card.note}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}