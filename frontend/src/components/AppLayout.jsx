import { Link } from 'react-router-dom';
import { useState } from 'react';

import SidebarToggle from './SidebarToggle';
import { useProfile } from '../context/useProfile';
import { useTheme } from '../context/useTheme';

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', to: '/dashboard' },
  { label: 'Applications', icon: 'applications', to: '/applications' },
  { label: 'Analyzer', icon: 'analyzer', to: '/analyzer' },
  { label: 'Performance', icon: 'performance', to: '/performance' },
  { label: 'Reminders', icon: 'reminders', to: '/reminders' },
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

export default function AppLayout({ active, children, mainClassName = '' }) {
  const { isDark } = useTheme();
  const { profile } = useProfile();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const shell = isDark ? 'bg-[#111119] text-white' : 'bg-[#F6F3FF] text-[#171421]';
  const sidebar = isDark ? 'bg-[#1B1B25] border-[#4A475B]' : 'bg-[#FBFAFE] border-[#D4D0DF]';
  const softText = isDark ? 'text-white/55' : 'text-[#6F688A]';
  const brightText = isDark ? 'text-white' : 'text-[#171421]';
  const cols = sidebarOpen ? 'grid-cols-[272px_1fr]' : 'grid-cols-[80px_1fr]';
  const mainBaseClass = sidebarOpen ? '' : 'mx-auto max-w-screen-2xl px-4';

  return (
    <div className={`min-h-screen font-sans ${shell}`}>
      <div className={`grid min-h-screen ${cols}`}>
        <aside
          className={`flex flex-col border-r transition-all duration-300 ${sidebar} ${sidebarOpen ? 'w-[272px]' : 'w-[80px]'}`}
        >
          <div className={`border-b border-inherit ${sidebarOpen ? 'px-[18px] pb-7 pt-8' : 'py-4'}`}>
            <div className={`flex items-center gap-3 ${sidebarOpen ? '' : 'justify-center'}`}>
              <SidebarToggle open={sidebarOpen} onToggle={() => setSidebarOpen((prev) => !prev)} />
              {sidebarOpen && (
                <h1
                  className={brightText}
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
              )}
            </div>
          </div>

          {sidebarOpen && (
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
          )}

          <nav className={`flex flex-1 flex-col gap-4 px-[10px] ${sidebarOpen ? 'mt-14' : 'mt-0 hidden'}`}>
            {navItems.map((item) => {
              const isActive = item.label === active;
              return (
                <Link key={item.label} to={item.to}>
                  <div
                    className={`relative flex min-h-[56px] items-center gap-4 rounded-[16px] border px-6 py-4 ${
                      isActive
                        ? 'border-[#504B63] bg-[#2C2345] text-[#8B5CF6]'
                        : isDark
                        ? 'border-transparent text-white/90'
                        : 'border-transparent text-[#171421]'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-[10px] top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-[#8B5CF6]" />
                    )}
                    <SidebarIcon type={item.icon} active={isActive} />
                    <span
                      className="whitespace-nowrap"
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: isActive ? 500 : 400,
                        fontSize: '16px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {sidebarOpen && (
            <div className="mt-auto border-t border-inherit px-[18px] pb-7 pt-6">
              <Link
                to="/profile"
                className={`flex items-center gap-4 rounded-[18px] px-3 py-3 ${isDark ? 'bg-white/[0.03]' : 'bg-[#F1EFF7]'}`}
              >
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
                  <p className={`${softText} mt-1 truncate text-[12px] font-medium uppercase tracking-[0.08em]`}>
                    {profile.membership}
                  </p>
                </div>
              </Link>
            </div>
          )}
        </aside>

        <main className={`${mainBaseClass} ${mainClassName}`.trim()}>
          {children}
        </main>
      </div>
    </div>
  );
}
