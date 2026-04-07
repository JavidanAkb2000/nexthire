import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/useTheme';

const topChips = ['Applications', 'Resume Match', 'Pipeline Board', 'Analytics', 'Reminders', 'Search'];

const statCards = [
  { value: '5', label: 'Pipeline Stages', icon: 'pipeline' },
  { value: '7', label: 'Core Features', icon: 'layers' },
  { value: '1', label: 'AI Analyzer', icon: 'spark' },
  { value: '4', label: 'Team Members', icon: 'team' },
];

const featureCards = [
  {
    title: 'Track Applications',
    text: 'Create, update, and manage job applications with company, role, salary, status, and notes in one tracker.',
  },
  {
    title: 'Pipeline Board',
    text: 'Move through Applied, Screening, Interview, Offer, and Rejected with a visual hiring workflow.',
  },
  {
    title: 'AI Resume Analyzer',
    text: 'Upload a resume PDF, paste a job description, and receive match score, missing keywords, and improvement tips.',
  },
  {
    title: 'Reminders',
    text: 'Set follow-up dates for applications and stay on top of interviews, deadlines, and next steps.',
  },
  {
    title: 'Analytics',
    text: 'Review weekly activity, offer rate trends, and salary comparisons through a focused performance dashboard.',
  },
  {
    title: 'Search & Filters',
    text: 'Filter by status, company, or role to quickly find the applications and opportunities that matter most.',
  },
];

const team = [
  {
    name: 'Sania Sohail',
    role: 'Frontend & UI/UX Designer',
    line: 'Designed the interface and built the frontend experience across the main flows of NextHire.',
  },
  {
    name: 'Javidan Akbarov',
    role: 'Project Lead',
    line: 'Led the project direction and coordinated the structure and delivery of the platform.',
  },
  {
    name: 'Kadir Kaan Cikilmazkaya',
    role: 'Backend Developer',
    line: 'Worked on backend support and system logic behind the application workflow.',
  },
  {
    name: 'Tsevelmaa',
    role: 'Testing & Research',
    line: 'Supported testing, checking, and research to keep the project clear and usable.',
  },
];

function LogoMark() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#6f5cff]/50 bg-[linear-gradient(135deg,rgba(116,89,255,0.22),rgba(196,99,255,0.08))] shadow-[0_10px_24px_rgba(111,92,255,0.20)]">
      <div className="h-5 w-5 rounded-[5px] bg-[linear-gradient(135deg,#4d78ff,#8a63ff)]" />
      <div className="absolute right-[11px] top-[11px] h-2 w-2 rounded-full bg-[#ff8f4d]" />
      <div className="absolute bottom-[10px] left-[10px] h-[7px] w-[7px] rounded-[2px] bg-[#bfd2ff]" />
    </div>
  );
}

function StatIcon({ type }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (type === 'pipeline') return <svg {...common}><path d="M4 7h5" /><path d="M4 12h10" /><path d="M4 17h14" /></svg>;
  if (type === 'layers') return <svg {...common}><path d="M12 4l8 4-8 4-8-4 8-4z" /><path d="M4 12l8 4 8-4" /><path d="M4 16l8 4 8-4" /></svg>;
  if (type === 'spark') return <svg {...common}><path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3z" /></svg>;
  return <svg {...common}><path d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" /><circle cx="9" cy="8" r="3" /><path d="M22 20v-2a4 4 0 00-3-3.87" /><path d="M16 5.13a3 3 0 010 5.74" /></svg>;
}

function FeatureIcon({ index }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (index === 0) return <svg {...common}><path d="M7 4h10v16H7z" /><path d="M10 8h4" /><path d="M10 12h4" /></svg>;
  if (index === 1) return <svg {...common}><path d="M5 8h14" /><path d="M7 12h10" /><path d="M9 16h6" /></svg>;
  if (index === 2) return <svg {...common}><path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3z" /></svg>;
  if (index === 3) return <svg {...common}><circle cx="12" cy="12" r="8" /><path d="M12 8v4l2.5 2.5" /></svg>;
  if (index === 4) return <svg {...common}><path d="M6 18V9" /><path d="M12 18V5" /><path d="M18 18v-7" /></svg>;
  return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3-3" /></svg>;
}

export default function Landing() {
  const { isDark } = useTheme();

  const shell = isDark ? 'bg-[#0d0d14] text-white' : 'bg-[#eef2ff] text-[#171421]';
  const pageGlow = isDark
    ? 'bg-[radial-gradient(circle_at_26%_30%,rgba(66,104,255,0.22),transparent_28%),radial-gradient(circle_at_76%_38%,rgba(186,86,255,0.18),transparent_25%),radial-gradient(circle_at_78%_72%,rgba(255,142,69,0.16),transparent_24%)]'
    : 'bg-[radial-gradient(circle_at_26%_30%,rgba(66,104,255,0.18),transparent_28%),radial-gradient(circle_at_76%_38%,rgba(186,86,255,0.14),transparent_25%),radial-gradient(circle_at_78%_72%,rgba(255,142,69,0.12),transparent_24%)]';
  const navbar = isDark
    ? 'border-[#2f2d3a] bg-[#171926]/90 shadow-[0_18px_40px_rgba(0,0,0,0.28)]'
    : 'border-[#d5dcf4] bg-white/88 shadow-[0_18px_40px_rgba(82,98,152,0.10)]';
  const panel = isDark
    ? 'border-[#2f2d39] bg-[#171722]/92 shadow-[0_14px_30px_rgba(0,0,0,0.24)]'
    : 'border-[#d8dff5] bg-white/92 shadow-[0_14px_30px_rgba(82,98,152,0.10)]';
  const softText = isDark ? 'text-white/62' : 'text-[#60708f]';
  const titleText = isDark ? 'text-white' : 'text-[#17233f]';
  const sectionTitle = isDark ? 'text-white' : 'text-[#16213b]';
  const outlineButton = isDark
    ? 'border-[#4a475b] bg-white/10 text-white hover:border-[#6f5cff] hover:bg-white/[0.12]'
    : 'border-[#d7def4] bg-white text-[#17233f] hover:border-[#8da6ff]';

  return (
    <div className={`min-h-screen overflow-x-hidden font-sans ${shell}`}>
      <div className={`pointer-events-none fixed inset-0 ${pageGlow}`} />

      <div className="relative z-10 mx-auto w-full max-w-[1680px] px-5 pb-24 pt-5 md:px-10">
        <header className="sticky top-4 z-30">
          <div className={`mx-auto flex w-full max-w-[1460px] flex-wrap items-center justify-between gap-5 rounded-[30px] border px-6 py-5 backdrop-blur-xl md:px-10 ${navbar}`}>
            <div className="flex items-center gap-4">
              <LogoMark />
              <div>
                <p className="text-[15px] font-medium tracking-[0.22em] text-[#8f80ff]">NEXTHIRE</p>
                <h1 className="text-[26px] font-semibold leading-[1.05]">NextHire</h1>
              </div>
            </div>

            <nav className="hidden items-center gap-10 md:flex">
              <a href="#features" className={`text-[17px] font-medium transition hover:text-[#8d7cff] ${softText}`}>Features</a>
              <a href="#about" className={`text-[17px] font-medium transition hover:text-[#8d7cff] ${softText}`}>About Us</a>
              <a href="#team" className={`text-[17px] font-medium transition hover:text-[#8d7cff] ${softText}`}>Team</a>
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                to="/login"
                className={`rounded-[16px] border px-5 py-3 text-[15px] font-medium transition ${outlineButton}`}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="rounded-[16px] bg-[linear-gradient(135deg,#5a6cff,#7c5cff_55%,#b26eff)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_16px_34px_rgba(108,92,255,0.26)] transition hover:translate-y-[-1px] hover:brightness-105"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1460px] scroll-smooth">
          <section className="pt-14 text-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {topChips.map((chip) => (
                <div
                  key={chip}
                  className={`rounded-full border px-5 py-3 text-[14px] font-medium transition hover:translate-y-[-2px] ${panel}`}
                >
                  {chip}
                </div>
              ))}
            </div>

            <div className="mx-auto mt-14 max-w-[1100px]">
              <h2 className={`text-[56px] font-semibold leading-[0.95] tracking-[-0.05em] md:text-[108px] ${titleText}`}>
                <span className="bg-[linear-gradient(90deg,#4a7bff_0%,#6a74ff_36%,#b083ff_68%,#ff8c47_100%)] bg-clip-text text-transparent">
                  NextHire
                </span>
                <br />
                Career Intelligence
              </h2>

              <p className={`mx-auto mt-7 max-w-[900px] text-[21px] leading-[1.75] ${softText}`}>
                A smart job application tracker with AI resume analysis. Keep every application in one place,
                understand your resume match, and move through the hiring process with more clarity.
              </p>

              <div className={`mx-auto mt-10 flex w-full max-w-[620px] items-center justify-center rounded-[22px] border px-7 py-5 ${isDark ? 'border-[#22263a] bg-[#101727]' : 'border-[#dbe2f8] bg-[#101727]'} shadow-[0_20px_42px_rgba(15,23,42,0.26)]`}>
                <code className="text-[18px] text-white">
                  <span className="mr-3 text-[#ff944d]">$</span>
                  track jobs + analyze resume fit
                </code>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
                <a
                  href="#features"
                  className="rounded-[20px] bg-[linear-gradient(135deg,#486eff,#6f5cff_60%,#9c69ff)] px-11 py-5 text-[18px] font-semibold text-white shadow-[0_18px_40px_rgba(90,108,255,0.28)] transition hover:translate-y-[-2px] hover:brightness-105"
                >
                  Explore Features
                </a>
                <a
                  href="#about"
                  className={`rounded-[20px] border px-11 py-5 text-[18px] font-medium transition ${outlineButton}`}
                >
                  Learn More
                </a>
              </div>
            </div>
          </section>

          <section className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {statCards.map((item) => (
              <div
                key={item.label}
                className={`rounded-[30px] border px-8 py-9 text-center transition hover:translate-y-[-4px] ${panel}`}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,rgba(74,123,255,0.18),rgba(160,103,255,0.16))] text-[#5d7cff]">
                  <StatIcon type={item.icon} />
                </div>
                <p className="mt-6 text-[56px] font-semibold leading-none text-[#5d7cff]">{item.value}</p>
                <p className={`mt-3 text-[18px] ${softText}`}>{item.label}</p>
              </div>
            ))}
          </section>

          <section id="features" className="mt-24">
            <div className="mx-auto max-w-[1060px] text-center">
              <h3 className={`text-[48px] font-semibold leading-[1.04] tracking-[-0.04em] md:text-[76px] ${sectionTitle}`}>
                Everything you need for
                <span className="bg-[linear-gradient(90deg,#4a7bff_0%,#6a74ff_34%,#b083ff_68%,#ff8c47_100%)] bg-clip-text text-transparent">
                  {' '}beautifully organized progress
                </span>
              </h3>
              <p className={`mx-auto mt-6 max-w-[920px] text-[20px] leading-[1.75] ${softText}`}>
                NextHire keeps the experience focused: applications, pipeline stages, resume insights,
                reminders, analytics, and search in one clean workflow.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {featureCards.map((card, index) => (
                <div
                  key={card.title}
                  className={`rounded-[30px] border px-8 py-8 transition hover:translate-y-[-5px] ${panel}`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,rgba(74,123,255,0.16),rgba(160,103,255,0.14))] text-[#5d7cff]">
                    <FeatureIcon index={index} />
                  </div>
                  <h4 className={`mt-7 text-[30px] font-semibold leading-[1.1] tracking-[-0.03em] ${sectionTitle}`}>
                    {card.title}
                  </h4>
                  <p className={`mt-5 text-[17px] leading-[1.8] ${softText}`}>{card.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="about" className="mt-20 grid gap-6 xl:grid-cols-3">
            <div className={`rounded-[30px] border px-8 py-8 ${panel}`}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8e7eff]">About Us</p>
              <p className={`mt-5 text-[18px] leading-[1.8] ${softText}`}>
                NextHire is a university project made by four team members who wanted to improve how job seekers track,
                manage, and understand their applications.
              </p>
            </div>
            <div className={`rounded-[30px] border px-8 py-8 ${panel}`}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8e7eff]">Mission</p>
              <p className={`mt-5 text-[18px] leading-[1.8] ${softText}`}>
                Help users stay organized, receive clearer AI resume feedback, and navigate hiring with less confusion.
              </p>
            </div>
            <div className={`rounded-[30px] border px-8 py-8 ${panel}`}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8e7eff]">Vision</p>
              <p className={`mt-5 text-[18px] leading-[1.8] ${softText}`}>
                Build a focused career platform for students and early professionals who want structure and momentum.
              </p>
            </div>
          </section>

          <section id="team" className="mt-20">
            <div className="mx-auto max-w-[940px] text-center">
              <h3 className={`text-[44px] font-semibold tracking-[-0.04em] md:text-[64px] ${sectionTitle}`}>
                The team behind
                <span className="bg-[linear-gradient(90deg,#4a7bff_0%,#6a74ff_34%,#b083ff_68%,#ff8c47_100%)] bg-clip-text text-transparent">
                  {' '}NextHire
                </span>
              </h3>
              <p className={`mx-auto mt-5 max-w-[820px] text-[20px] leading-[1.75] ${softText}`}>
                A university team of four members building a smarter platform for job search tracking and resume analysis.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {team.map((member) => (
                <div
                  key={member.name}
                  className={`rounded-[30px] border px-6 py-7 transition hover:translate-y-[-4px] ${panel}`}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#4f77ff,#7d5cff)] text-[22px] font-semibold text-white shadow-[0_16px_28px_rgba(88,94,255,0.24)]">
                    {member.name
                      .split(' ')
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join('')
                      .toUpperCase()}
                  </div>
                  <h4 className={`mt-6 text-[22px] font-semibold ${sectionTitle}`}>{member.name}</h4>
                  <p className="mt-2 text-[14px] font-medium text-[#8e7eff]">{member.role}</p>
                  <p className={`mt-5 text-[15px] leading-[1.75] ${softText}`}>{member.line}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={`mt-24 rounded-[36px] border px-8 py-14 text-center md:px-14 ${panel}`}>
            <h3 className={`text-[42px] font-semibold leading-[1.08] tracking-[-0.04em] md:text-[70px] ${sectionTitle}`}>
              Ready to build
              <span className="bg-[linear-gradient(90deg,#4a7bff_0%,#6a74ff_34%,#b083ff_68%,#ff8c47_100%)] bg-clip-text text-transparent">
                {' '}better job search habits?
              </span>
            </h3>
            <p className={`mx-auto mt-6 max-w-[920px] text-[20px] leading-[1.75] ${softText}`}>
              Start with NextHire to track applications, analyze resume fit, and keep your hiring process organized in one place.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Link
                to="/register"
                className="rounded-[20px] bg-[linear-gradient(135deg,#486eff,#6f5cff_60%,#9c69ff)] px-11 py-5 text-[18px] font-semibold text-white shadow-[0_18px_40px_rgba(90,108,255,0.28)] transition hover:translate-y-[-2px] hover:brightness-105"
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className={`rounded-[20px] border px-11 py-5 text-[18px] font-medium transition ${outlineButton}`}
              >
                Sign In
              </Link>
            </div>

            <div className={`mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[17px] ${softText}`}>
              <span>Smart application tracking</span>
              <span>AI resume matching</span>
              <span>University team project</span>
            </div>
          </section>
        </main>

        <footer className={`mx-auto mt-16 max-w-[1460px] border-t px-2 pt-12 ${isDark ? 'border-[#242532]' : 'border-[#d7def4]'}`}>
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.7fr_0.8fr]">
            <div>
              <div className="flex items-center gap-4">
                <LogoMark />
                <div>
                  <h4 className={`text-[20px] font-semibold ${sectionTitle}`}>NextHire</h4>
                  <p className={`mt-1 text-[14px] ${softText}`}>Smart Job Application Tracker + AI Resume Analyzer</p>
                </div>
              </div>
              <p className={`mt-6 max-w-[620px] text-[17px] leading-[1.8] ${softText}`}>
                NextHire helps users track applications, review resume fit with AI, manage reminders, and understand job search progress more clearly.
              </p>
            </div>

            <div>
              <h5 className={`text-[16px] font-semibold ${sectionTitle}`}>Resources</h5>
              <div className={`mt-5 space-y-4 text-[16px] ${softText}`}>
                <a href="#features" className="block transition hover:text-[#8e7eff]">Features</a>
                <a href="#about" className="block transition hover:text-[#8e7eff]">About Us</a>
                <a href="#team" className="block transition hover:text-[#8e7eff]">Team</a>
              </div>
            </div>

            <div>
              <h5 className={`text-[16px] font-semibold ${sectionTitle}`}>Platform</h5>
              <div className={`mt-5 space-y-4 text-[16px] ${softText}`}>
                <p>Application tracker</p>
                <p>Resume analyzer</p>
                <p>Performance dashboard</p>
                <p>Reminders</p>
              </div>
            </div>
          </div>

          <div className={`mt-12 flex flex-wrap items-center justify-between gap-4 border-t py-7 text-[15px] ${isDark ? 'border-[#242532] text-white/48' : 'border-[#d7def4] text-[#7887a6]'}`}>
            <p>Built with React + Tailwind CSS for the NextHire university project.</p>
            <p>Designed for a smarter and clearer hiring journey.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
