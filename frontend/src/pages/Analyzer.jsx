import { useId, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/useTheme';
import { useProfile } from '../context/useProfile';

const uploadSources = [
  'Upload from device',
  'Google Drive',
  'Dropbox',
  'OneDrive',
  'LinkedIn URL',
  'Portfolio URL',
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

function CloudUploadIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2A2A2A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 16.5A3.5 3.5 0 0017 10h-.4A5.6 5.6 0 006 11.2 3.8 3.8 0 006.5 19H12" />
      <path d="M12 12v8" />
      <path d="M9 15l3-3 3 3" />
    </svg>
  );
}

function RobotIcon() {
  return (
    <svg width="170" height="170" viewBox="0 0 170 170" fill="none">
      <circle cx="85" cy="18" r="7" fill="#9C9CA4" />
      <rect x="81.5" y="25" width="7" height="18" rx="3.5" fill="#9C9CA4" />
      <rect x="23" y="50" width="124" height="96" rx="36" fill="#9C9CA4" />
      <rect x="36" y="61" width="98" height="54" rx="27" fill="#1F1F2A" />
      <ellipse cx="63" cy="88" rx="13" ry="17" fill="#9C9CA4" />
      <ellipse cx="107" cy="88" rx="13" ry="17" fill="#9C9CA4" />
      <rect x="73" y="124" width="24" height="18" rx="9" fill="#1F1F2A" />
      <rect x="79" y="129" width="12" height="8" rx="4" fill="#9C9CA4" />
      <rect x="10" y="87" width="5" height="38" rx="2.5" fill="#9C9CA4" />
      <rect x="155" y="87" width="5" height="38" rx="2.5" fill="#9C9CA4" />
    </svg>
  );
}

export default function Analyzer() {
  const { isDark } = useTheme();
  const { profile } = useProfile();
  const fileInputId = useId();
  const [jobDescription, setJobDescription] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [selectedSource, setSelectedSource] = useState(uploadSources[0]);
  const [selectedFile, setSelectedFile] = useState('');

  const shell = isDark ? 'bg-[#111119] text-white' : 'bg-[#F6F3FF] text-[#171421]';
  const sidebar = isDark ? 'bg-[#1B1B25] border-[#4A475B]' : 'bg-[#FBFAFE] border-[#D4D0DF]';
  const panel = isDark ? 'bg-[#1F1F2A] border-[#4A475B]' : 'bg-white border-[#D4D0DF]';
  const softText = isDark ? 'text-white/55' : 'text-[#6F688A]';
  const brightText = isDark ? 'text-white' : 'text-[#171421]';

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/dashboard', active: false },
    { label: 'Applications', icon: 'applications', to: '/applications', active: false },
    { label: 'Analyzer', icon: 'analyzer', to: '/analyzer', active: true },
    { label: 'Performance', icon: 'performance', to: '/performance', active: false },
    { label: 'Reminders', icon: 'reminders', to: '/reminders', active: false },
  ];

  const sourceHint = useMemo(() => {
    if (selectedSource === 'Upload from device') return 'Choose a PDF, DOC, DOCX, TXT, or RTF file';
    if (selectedSource.endsWith('URL')) return 'Paste a public profile or portfolio link below';
    return `Connect from ${selectedSource}`;
  }, [selectedSource]);

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

        <main className="px-[66px] pb-12 pt-10">
          <div className="flex w-[1090px] items-center justify-between">
            <div>
              <h2 className={`text-[28px] font-semibold leading-[34px] ${brightText}`}>AI Resume Analyzer</h2>
              <p className={`${softText} mt-1 text-[14px] leading-[20px]`}>Optimize your resume for every job with AI</p>
            </div>
            <ThemeToggle />
          </div>

          <section className="mt-16 grid w-[1090px] grid-cols-[522px_522px] gap-[46px]">
            <div className={`min-h-[765px] rounded-[16px] border ${panel} px-9 py-7`}>
              <h3 className="text-[20px] font-semibold leading-none">Add Your Information</h3>
              <p className={`${softText} mt-3 text-[13px] leading-[18px]`}>
                Paste the job description and upload your resume to get AI-powered insights.
              </p>

              <div className="mt-12">
                <label className="text-[16px] font-medium">Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Enter your job description"
                  className={`mt-3 h-[126px] w-full resize-none rounded-[14px] border px-4 py-3 text-[16px] outline-none ${
                    isDark
                      ? 'border-[#4A475B] bg-[#2B2A37] text-white placeholder:text-white/45'
                      : 'border-[#D4D0DF] bg-[#F6F3FF] text-[#171421] placeholder:text-[#8A84A2]'
                  }`}
                />
                <p className={`${softText} mt-2 text-[12px]`}>Paste the job description</p>
              </div>

              <div className="mt-11">
                <label className="text-[16px] font-medium">Upload CV</label>

                <div className="mt-4 flex items-center gap-3">
                  <div className="relative">
                    <select
                      value={selectedSource}
                      onChange={(e) => setSelectedSource(e.target.value)}
                      className={`h-[44px] appearance-none rounded-[12px] border px-4 pr-11 text-[14px] font-medium outline-none transition ${
                        isDark
                          ? 'border-[#57536A] bg-[#32313E] text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] focus:border-[#7C4DFF]'
                          : 'border-[#D4D0DF] bg-[#F5F2FF] text-[#171421] shadow-[0_4px_10px_rgba(42,33,68,0.06)] focus:border-[#7C4DFF]'
                      }`}
                    >
                      {uploadSources.map((source) => (
                        <option key={source} value={source}>
                          {source}
                        </option>
                      ))}
                    </select>
                    <span className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] ${softText}`}>▼</span>
                  </div>
                  <span className={`${softText} text-[12px]`}>{sourceHint}</span>
                </div>

                <label
                  htmlFor={fileInputId}
                  className={`mt-4 flex h-[220px] cursor-pointer flex-col items-center justify-center rounded-[16px] border border-dashed ${
                    isDark ? 'border-[#71717D] bg-[#2B2A37]' : 'border-[#B8B3CA] bg-[#F6F3FF]'
                  }`}
                >
                  <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#C9C9CC]">
                    <CloudUploadIcon />
                  </div>
                  <p className="mt-5 text-[14px] font-medium">{selectedFile || 'Choose a file or drag & drop it here'}</p>
                  <p className={`${softText} mt-2 text-[13px]`}>Maximum 500 MB file size</p>
                </label>
                <input
                  id={fileInputId}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.rtf"
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files?.[0]?.name || '')}
                />

                <p className="mt-5 text-[13px]">Or upload from URL</p>
                <div
                  className={`mt-2 flex h-[42px] items-center gap-3 rounded-[14px] border px-4 ${
                    isDark ? 'border-[#4A475B] bg-[#2B2A37]' : 'border-[#D4D0DF] bg-[#F6F3FF]'
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={softText}>
                    <path d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07L10 5" />
                    <path d="M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 107.07 7.07L14 19" />
                  </svg>
                  <input
                    value={urlValue}
                    onChange={(e) => setUrlValue(e.target.value)}
                    placeholder="Drop your link here"
                    className={`w-full bg-transparent text-[16px] outline-none ${isDark ? 'placeholder:text-white/35' : 'placeholder:text-[#8A84A2]'}`}
                  />
                </div>
              </div>

              <div className="mt-12 flex gap-5">
                <button className="h-[42px] w-[174px] rounded-[14px] border border-[#7C4DFF] text-[16px] font-semibold text-[#8B5CF6] transition hover:bg-[#7C4DFF]/10">
                  Save
                </button>
                <button className="flex h-[42px] w-[234px] items-center justify-center rounded-[14px] bg-gradient-to-r from-[#7C4DFF] to-[#8D6BFF] text-[16px] font-semibold text-white shadow-[0_12px_28px_rgba(124,77,255,0.24)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_16px_34px_rgba(124,77,255,0.34)] active:translate-y-0 active:scale-[0.985] focus:outline-none focus:ring-2 focus:ring-violet-400/70">
                  Analyze Resume
                </button>
              </div>
            </div>

            <div className={`min-h-[765px] rounded-[16px] border ${panel} px-9 py-7`}>
              <h3 className="text-[20px] font-semibold leading-none">Analysis Result</h3>
              <p className={`${softText} mt-3 text-[13px] leading-[18px]`}>Review your match score</p>

              <div className="mt-[180px] flex flex-col items-center text-center">
                <RobotIcon />
                <p className={`${softText} mt-8 max-w-[300px] text-[14px] leading-[20px]`}>
                  See how your resume matches the job and discover ways to improve it.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}