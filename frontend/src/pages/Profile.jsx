import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/useTheme';
import { useProfile } from '../context/useProfile';

const notificationOptions = [
  'Interview reminders',
  'Weekly summary',
  'Resume analysis updates',
  'Saved jobs alerts',
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

export default function Profile() {
  const { isDark } = useTheme();
  const { profile, setProfile, defaultProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [draftProfile, setDraftProfile] = useState(defaultProfile);
  const [notifications, setNotifications] = useState({
    'Interview reminders': true,
    'Weekly summary': true,
    'Resume analysis updates': true,
    'Saved jobs alerts': true,
  });
  const [draftNotifications, setDraftNotifications] = useState({
    'Interview reminders': true,
    'Weekly summary': true,
    'Resume analysis updates': true,
    'Saved jobs alerts': true,
  });

  const shell = isDark ? 'bg-[#111119] text-white' : 'bg-[#F6F3FF] text-[#171421]';
  const sidebar = isDark ? 'bg-[#1B1B25] border-[#4A475B]' : 'bg-[#FBFAFE] border-[#D4D0DF]';
  const panel = isDark ? 'bg-[#1F1F2A] border-[#4A475B]' : 'bg-white border-[#D4D0DF]';
  const softText = isDark ? 'text-white/55' : 'text-[#6F688A]';
  const brightText = isDark ? 'text-white' : 'text-[#171421]';

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/dashboard' },
    { label: 'Applications', icon: 'applications', to: '/applications' },
    { label: 'Analyzer', icon: 'analyzer', to: '/analyzer' },
    { label: 'Performance', icon: 'performance', to: '/performance' },
    { label: 'Reminders', icon: 'reminders', to: '/reminders' },
  ];

  const startEditing = () => {
    setDraftProfile(profile);
    setDraftNotifications(notifications);
    setIsEditing(true);
  };

  const saveChanges = () => {
    setProfile(draftProfile);
    setNotifications(draftNotifications);
    setIsEditing(false);
  };

  const cancelChanges = () => {
    setDraftProfile(profile);
    setDraftNotifications(notifications);
    setIsEditing(false);
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
              }}
            >
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
            <div className={`flex items-center gap-4 rounded-[18px] px-3 py-3 ${isDark ? 'bg-white/[0.03]' : 'bg-[#F1EFF7]'}`}>
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
            </div>
          </div>
        </aside>

        <main className="px-[68px] pb-12 pt-8">
          <div className="flex items-center justify-between">
            <Link
              to="/applications"
              className={`inline-flex h-[36px] items-center gap-2 rounded-[12px] border px-4 text-[14px] font-medium ${isDark ? 'border-[#4A475B] bg-[#1F1F2A] text-white/90' : 'border-[#D4D0DF] bg-white text-[#171421]'}`}
            >
              <span>←</span>
              <span>Back</span>
            </Link>
            <ThemeToggle />
          </div>

          <div className="mt-8 flex items-start justify-between">
            <div>
            <h2 className="text-[28px] font-semibold leading-[34px]">Profile / Settings</h2>
            <p className={`${softText} mt-1 text-[14px] leading-[20px]`}>Manage your personal information and preferences</p>
            </div>
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={cancelChanges}
                    className={`h-[40px] rounded-[12px] border px-5 text-[14px] font-medium ${isDark ? 'border-[#4A475B] bg-[#1F1F2A] text-white/90' : 'border-[#D4D0DF] bg-white text-[#171421]'}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveChanges}
                    className="h-[40px] rounded-[12px] bg-gradient-to-r from-[#7C4DFF] to-[#8D6BFF] px-5 text-[14px] font-semibold text-white shadow-[0_12px_28px_rgba(124,77,255,0.24)]"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={startEditing}
                  className={`h-[40px] rounded-[12px] border px-5 text-[14px] font-medium ${isDark ? 'border-[#4A475B] bg-[#1F1F2A] text-white/90' : 'border-[#D4D0DF] bg-white text-[#171421]'}`}
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          <section className="mt-10 grid w-[1090px] grid-cols-[340px_1fr] gap-8">
            <div className={`rounded-[18px] border ${panel} px-8 py-9`}>
              <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full bg-[#5B48D6] text-[34px] font-semibold text-white">
                {profile.fullName
                  .split(' ')
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join('')
                  .toUpperCase()}
              </div>
              <h3 className="mt-6 text-[28px] font-semibold">{profile.fullName}</h3>
              <p className={`${softText} mt-2 text-[14px] uppercase tracking-[0.08em]`}>{profile.membership}</p>

              <div className="mt-8 space-y-5">
                <div>
                  <p className={`${softText} text-[12px] uppercase tracking-[0.08em]`}>Email</p>
                  <p className="mt-1 text-[16px]">{profile.email}</p>
                </div>
                <div>
                  <p className={`${softText} text-[12px] uppercase tracking-[0.08em]`}>Location</p>
                  <p className="mt-1 text-[16px]">{profile.location}</p>
                </div>
                <div>
                  <p className={`${softText} text-[12px] uppercase tracking-[0.08em]`}>Target Role</p>
                  <p className="mt-1 text-[16px]">{profile.targetRole}</p>
                </div>
              </div>
            </div>

            <div className={`rounded-[18px] border ${panel} px-10 py-9`}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  ['Full Name', 'fullName'],
                  ['Email Address', 'email'],
                  ['Phone Number', 'phone'],
                  ['Preferred Role', 'preferredRole'],
                  ['Work Mode', 'workMode'],
                  ['Salary Target', 'salaryTarget'],
                ].map(([label, key]) => (
                  <div key={label}>
                    <p className={`${softText} text-[12px] uppercase tracking-[0.08em]`}>{label}</p>
                    {isEditing ? (
                      <input
                        value={draftProfile[key]}
                        onChange={(e) => setDraftProfile((current) => ({ ...current, [key]: e.target.value }))}
                        className={`mt-2 w-full rounded-[14px] border px-4 py-3 text-[15px] outline-none ${isDark ? 'border-[#4A475B] bg-[#2B2A37] text-white' : 'border-[#D4D0DF] bg-[#F6F3FF] text-[#171421]'}`}
                      />
                    ) : (
                      <div className={`mt-2 rounded-[14px] border px-4 py-3 text-[15px] ${isDark ? 'border-[#4A475B] bg-[#2B2A37]' : 'border-[#D4D0DF] bg-[#F6F3FF]'}`}>
                        {profile[key]}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className={`${softText} text-[12px] uppercase tracking-[0.08em]`}>Notifications</p>
                <div className="mt-3 grid grid-cols-2 gap-4">
                  {notificationOptions.map((label) => (
                    <label key={label} className={`flex items-center gap-3 rounded-[14px] border px-4 py-3 ${isDark ? 'border-[#4A475B] bg-[#2B2A37]' : 'border-[#D4D0DF] bg-[#F6F3FF]'}`}>
                      <input
                        type="checkbox"
                        checked={isEditing ? draftNotifications[label] : notifications[label]}
                        onChange={(e) =>
                          isEditing
                            ? setDraftNotifications((current) => ({ ...current, [label]: e.target.checked }))
                            : undefined
                        }
                        disabled={!isEditing}
                        className="h-4 w-4 accent-violet-500"
                      />
                      <span className="text-[15px]">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
