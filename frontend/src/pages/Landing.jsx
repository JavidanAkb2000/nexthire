import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/useTheme';

// ─── Data ────────────────────────────────────────────────────────────────────

const statCards = [
  { value: '5', label: 'Pipeline stages', icon: 'pipeline' },
  { value: '7', label: 'Core features',   icon: 'layers'   },
  { value: '1', label: 'AI analyzer',     icon: 'spark'    },
  { value: '4', label: 'Team members',    icon: 'team'     },
];

const featureCards = [
  { title: 'Track applications',  text: 'Create, update, and manage job applications with company, role, salary, status, and notes in one tracker.',                               icon: 0 },
  { title: 'Pipeline board',      text: 'Move through Applied, Screening, Interview, Offer, and Rejected with a visual hiring workflow.',                                          icon: 1 },
  { title: 'AI resume analyzer',  text: 'Upload a resume PDF, paste a job description, and receive match score, missing keywords, and improvement tips.',                           icon: 2 },
  { title: 'Reminders',           text: 'Set follow-up dates for applications and stay on top of interviews, deadlines, and next steps.',                                          icon: 3 },
  { title: 'Analytics',           text: 'Review weekly activity, offer rate trends, and salary comparisons through a focused performance dashboard.',                               icon: 4 },
  { title: 'Search & filters',    text: 'Filter by status, company, or role to quickly find the applications and opportunities that matter most.',                                  icon: 5 },
];

const team = [
  { id: 'ja', name: 'Javidan Akbarov',   role: 'Project Lead & AI Engineer',  line: 'Led the project direction and coordinated the structure and delivery of the platform.'        },
  { id: 'ts', name: 'Tsevelmaa Yeruult', role: 'UI/UX Designer & Testing',    line: 'Supported testing, checking, and research to keep the project clear and usable.'               },
  { id: 'ss', name: 'Sania Sohail',      role: 'Frontend Developer',          line: 'Designed the interface and built the frontend experience across the main flows of NextHire.'  },
  { id: 'kk', name: 'Kadir Kaan',        role: 'Backend Developer',           line: 'Worked on backend support and system logic behind the application workflow.'                  },
];

const TW_PHRASES = [
  'track jobs + analyze resume fit',
  'find your dream role faster',
  'stay organized, get hired',
];

const roadmapData = [
  { tag: 'About Us', side: 'left',  text: 'NextHire is a university project built by four dedicated members. We realized that job hunting isn’t just about applying, it’s about managing the momentum of your career journey.' },
  { tag: 'Mission',  side: 'right', text: 'To empower job seekers with "Career Intelligence." We combine traditional tracking with AI-driven resume insights to ensure your application actually matches the role.' },
  { tag: 'Vision',   side: 'left',  text: 'We envision a world where every early-career professional has a personal HQ for their growth, turning a chaotic job search into a beautifully organized path to success.' }
];

// ─── Typewriter hook ──────────────────────────────────────────────────────────

function useTypewriter(phrases) {
  const [display, setDisplay] = useState('');
  const state = useRef({ pi: 0, ci: 0, deleting: false });

  useEffect(() => {
    let timer;
    function tick() {
      const { pi, ci, deleting } = state.current;
      const word = phrases[pi];
      if (!deleting) {
        const next = ci + 1;
        setDisplay(word.slice(0, next));
        state.current.ci = next;
        if (next === word.length) {
          state.current.deleting = true;
          timer = setTimeout(tick, 1800);
        } else {
          timer = setTimeout(tick, 60);
        }
      } else {
        const next = ci - 1;
        setDisplay(word.slice(0, next));
        state.current.ci = next;
        if (next === 0) {
          state.current.deleting = false;
          state.current.pi = (pi + 1) % phrases.length;
          timer = setTimeout(tick, 400);
        } else {
          timer = setTimeout(tick, 38);
        }
      }
    }
    timer = setTimeout(tick, 800);
    return () => clearTimeout(timer);
  }, [phrases]);

  return display;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function StatIcon({ type }) {
  const p = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (type === 'pipeline') return <svg {...p}><path d="M4 7h5"/><path d="M4 12h10"/><path d="M4 17h14"/></svg>;
  if (type === 'layers')   return <svg {...p}><path d="M12 4l8 4-8 4-8-4 8-4z"/><path d="M4 12l8 4 8-4"/><path d="M4 16l8 4 8-4"/></svg>;
  if (type === 'spark')    return <svg {...p}><path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3z"/></svg>;
  return <svg {...p}><path d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/><circle cx="9" cy="8" r="3"/><path d="M22 20v-2a4 4 0 00-3-3.87"/><path d="M16 5.13a3 3 0 010 5.74"/></svg>;
}

function FeatureIcon({ index }) {
  const p = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (index === 0) return <svg {...p}><path d="M7 4h10v16H7z"/><path d="M10 8h4"/><path d="M10 12h4"/></svg>;
  if (index === 1) return <svg {...p}><path d="M5 8h14"/><path d="M7 12h10"/><path d="M9 16h6"/></svg>;
  if (index === 2) return <svg {...p}><path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3z"/></svg>;
  if (index === 3) return <svg {...p}><circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 2.5"/></svg>;
  if (index === 4) return <svg {...p}><path d="M6 18V9"/><path d="M12 18V5"/><path d="M18 18v-7"/></svg>;
  return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>;
}

function LogoMark({ size = 24, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: size, color, fontWeight: 400, lineHeight: 1 }}>NextHire</span>
      <span style={{ display: 'inline-block', width: Math.round(size * 0.32), height: Math.round(size * 0.32), borderRadius: '50%', background: '#7c5cff', marginLeft: 1, marginBottom: Math.round(size * 0.42), flexShrink: 0 }} />
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Landing() {
  const { isDark } = useTheme();
  const twText = useTypewriter(TW_PHRASES);
  const [scrollProgress, setScrollProgress] = useState(0);
  const roadmapRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!roadmapRef.current) return;
      const rect = roadmapRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = rect.top - windowHeight * 0.4;
      const end = rect.bottom - windowHeight * 0.6;
      const total = end - start;
      const current = -start;
      const progress = Math.min(Math.max(current / total, 0), 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bg          = isDark ? '#0d0d14'           : '#f0f2ff';
  const surface     = isDark ? 'rgba(23,23,34,0.92)'   : 'rgba(255,255,255,0.92)';
  const navBorder   = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(124,92,255,0.2)';
  const textPrimary = isDark ? '#ffffff'               : '#16173f';
  const textSoft    = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(22,23,63,0.56)';
  const cardBorder  = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(124,92,255,0.16)';
  const codebarBg   = isDark ? '#0a0f1e'               : '#1a1f3a';
  const ctaInnerBg  = isDark ? 'rgba(13,13,20,0.88)'   : 'rgba(255,255,255,0.95)';
  const footerLine  = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(124,92,255,0.15)';
  const footerMuted = isDark ? 'rgba(255,255,255,0.3)'  : 'rgba(22,23,63,0.35)';
  const indigoPrimary = '#6366f1';

  const gradStyle = {
    background: 'linear-gradient(90deg,#486eff 0%,#7c5cff 40%,#b083ff 70%,#ff8c47 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }

        .tw-cursor { display: inline-block; width: 2px; height: 1.1em; background: #b083ff; margin-left: 2px; vertical-align: middle; animation: blink 0.8s step-end infinite; }
        @keyframes blink { 0%,100%{ opacity:1 } 50%{ opacity:0 } }

        .btn-nav-signin { padding: 8px 18px; border-radius: 12px; border: 1.5px solid #7c5cff; background: transparent; color: #7c5cff; font-size: 14px; font-weight: 500; cursor: pointer; transition: 0.2s; }
        .btn-nav-signin:hover { background: rgba(124,92,255,0.05); }

        .btn-nav-signup { padding: 9px 20px; border-radius: 12px; border: none; background: linear-gradient(135deg,#486eff,#7c5cff 60%,#b083ff); color: #fff; font-size: 14px; font-weight: 500; cursor: pointer; transition: transform 0.18s, box-shadow 0.18s; }
        .btn-nav-signup:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(124,92,255,0.3); }

        .btn-hero-primary { padding: 12px 28px; border-radius: 14px; border: none; background: #7c5cff; color: #fff; font-weight: 500; cursor: pointer; transition: 0.2s; }
        .btn-hero-primary:hover { transform: translateY(-2px); background: #6366f1; box-shadow: 0 8px 24px rgba(124,92,255,0.3); }
        
        .btn-hero-outline { padding: 12px 28px; border-radius: 14px; border: 1.5px solid #7c5cff; background: transparent; color: #7c5cff; font-weight: 500; cursor: pointer; transition: 0.2s; }
        .btn-hero-outline:hover { background: rgba(124,92,255,0.05); }

        .nh-feature:hover { transform: translateY(-5px); border-color: rgba(124,92,255,0.42) !important; }
        .nh-footer-link { display: block; margin-bottom: 9px; text-decoration: none; transition: color 0.2s; }
        .nh-footer-link:hover { color: #7c5cff !important; }

        .roadmap-item { opacity: 0.1; transform: translateY(20px); transition: 0.8s ease-out; }
        .roadmap-item.active { opacity: 1; transform: translateY(0); }

        .team-card-container { perspective: 1000px; height: 320px; }
        .team-card-inner {
          position: relative; width: 100%; height: 100%;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }
        .team-card-container:hover .team-card-inner { transform: rotateY(180deg); }

        .card-front, .card-back {
          position: absolute; width: 100%; height: 100%;
          backface-visibility: hidden; border-radius: 24px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 24px; border: 1.5px solid ${cardBorder};
        }
        .card-back { transform: rotateY(180deg); background: ${indigoPrimary}; color: white; }

        .initials-glow-circle {
          width: 58px; height: 58px; border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid white; color: white;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 20px; margin-bottom: 18px;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(124, 92, 255, 0.8);
        }

        .nh-cta-wrap { position: relative; border-radius: 36px; padding: 2px; overflow: hidden; text-align: center; }
        .nh-cta-wrap::before {
          content: ''; position: absolute; inset: 0; background: linear-gradient(120deg,rgba(72,110,255,0.5),rgba(124,92,255,0.6),rgba(255,140,71,0.4));
          background-size: 300% 300%; animation: gradMove 6s ease infinite;
        }
        .nh-cta-inner { position: relative; padding: 60px 40px; border-radius: 34px; z-index: 1; }
        @keyframes gradMove { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
      `}</style>

      <div style={{ background: bg, color: textPrimary, fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', transition: 'background 0.3s' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* ── NAV ── */}
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', background: surface, border: `0.5px solid ${navBorder}`, borderRadius: 28, margin: '14px 20px 0', backdropFilter: 'blur(18px)', position: 'sticky', top: 10, zIndex: 100 }}>
            <LogoMark size={24} color={textPrimary} />
            
            <div style={{ display: 'flex', gap: 28 }}>
              {[['Features', '#features'], ['About', '#about'], ['Team', '#team']].map(([l, h]) => (
                <a key={l} href={h} style={{ textDecoration: 'none', fontSize: 16, color: textSoft }}>{l}</a>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Link to="/register"><button className="btn-nav-signup">Sign up</button></Link>
              <Link to="/login"><button className="btn-nav-signin">Sign in</button></Link>
              <ThemeToggle />
            </div>
          </nav>

          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 60px' }}>
            
            {/* ── HERO ── */}
            <div style={{ textAlign: 'center', marginTop: 80 }}>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 64, lineHeight: 1, color: textPrimary, marginBottom: 20 }}>
                <span style={gradStyle}>NextHire</span><br />Career Intelligence
              </h1>
              <p style={{ maxWidth: 640, margin: '0 auto 32px', fontSize: 18, color: textSoft, lineHeight: 1.6 }}>
                Track applications, analyze resume fit with AI, and stay organized through the hiring journey.
              </p>
              <div style={{ background: codebarBg, borderRadius: 16, padding: '16px 28px', margin: '0 auto 40px', maxWidth: 480, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#ff8c47' }}>$</span><span>{twText}</span><span className="tw-cursor" />
              </div>
            </div>

            {/* ── STATS ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
              {statCards.map(item => (
                <div key={item.label} style={{ background: surface, border: `0.5px solid ${cardBorder}`, borderRadius: 24, padding: '32px 20px', textAlign: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(124,92,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', color: '#7c5cff' }}>
                    <StatIcon type={item.icon} />
                  </div>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, color: '#7c5cff', margin: '12px 0 4px' }}>{item.value}</p>
                  <p style={{ fontSize: 14, color: textSoft }}>{item.label}</p>
                </div>
              ))}
            </div>

            {/* ── FEATURES ── */}
            <div id="features" style={{ margin: '100px 0 40px', textAlign: 'center' }}>
               <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42 }}>Platform Features</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {featureCards.map(card => (
                <div key={card.title} className="nh-feature" style={{ background: surface, border: `1.5px solid ${cardBorder}`, borderRadius: 24, padding: 28, transition: '0.3s' }}>
                  <div style={{ width: 44, height: 44, background: 'rgba(124,92,255,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c5cff', marginBottom: 20 }}>
                    <FeatureIcon index={card.icon} />
                  </div>
                  <h3 style={{ fontSize: 20, marginBottom: 10 }}>{card.title}</h3>
                  <p style={{ fontSize: 14, color: textSoft, lineHeight: 1.6 }}>{card.text}</p>
                </div>
              ))}
            </div>

            {/* ── ABOUT ── */}
            <div id="about" ref={roadmapRef} style={{ margin: '100px auto', position: 'relative', maxWidth: 900 }}>
              <div style={{ textAlign: 'center', marginBottom: 80 }}>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42 }}>About NextHire</h2>
                <p style={{ color: textSoft, marginTop: 10 }}>Defining our journey and core principles.</p>
              </div>

              <div style={{ position: 'absolute', left: '50%', top: 140, bottom: 40, width: 4, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(124,92,255,0.1)', transform: 'translateX(-50%)', borderRadius: 2 }}>
                <div style={{ width: '100%', height: `${scrollProgress * 100}%`, background: '#7c5cff', boxShadow: '0 0 20px #7c5cff', transition: 'height 0.1s linear' }} />
              </div>

              {roadmapData.map((item, i) => (
                <div key={item.tag} className={`roadmap-item ${scrollProgress > (i * 0.3) ? 'active' : ''}`} style={{ 
                  display: 'flex', 
                  justifyContent: item.side === 'left' ? 'flex-start' : 'flex-end',
                  marginBottom: 80,
                  width: '100%',
                  position: 'relative'
                }}>
                  <div style={{ 
                    position: 'absolute', left: '50%', top: 20, width: 14, height: 14, 
                    background: scrollProgress > (i * 0.3) ? '#7c5cff' : (isDark ? '#1a1a24' : '#fff'), 
                    border: '3px solid #7c5cff', borderRadius: '50%', transform: 'translateX(-50%)', zIndex: 2,
                    boxShadow: scrollProgress > (i * 0.3) ? '0 0 15px #7c5cff' : 'none',
                    transition: '0.4s'
                  }} />

                  <div style={{ width: '44%', background: surface, padding: 32, borderRadius: 24, border: `1.5px solid ${cardBorder}` }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#b083ff', letterSpacing: 2, textTransform: 'uppercase' }}>{item.tag}</span>
                    <p style={{ marginTop: 15, fontSize: 15, color: textSoft, lineHeight: 1.7 }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── TEAM ── */}
            <div id="team" style={{ margin: '100px 0 40px', textAlign: 'center' }}>
               <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42 }}>Meet the Team</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
              {team.map(member => (
                <div key={member.id} className="team-card-container">
                  <div className="team-card-inner">
                    <div className="card-front" style={{ background: surface }}>
                      <div style={{ width: 55, height: 55, borderRadius: '50%', background: 'linear-gradient(135deg,#486eff,#7c5cff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18, marginBottom: 15 }}>
                        {member.id === 'ts' ? 'TY' : member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <h4 style={{ fontSize: 17, marginBottom: 4 }}>{member.name}</h4>
                      <p style={{ fontSize: 12, color: '#7c5cff', fontWeight: 600 }}>{member.role}</p>
                    </div>
                    <div className="card-back">
                      <div className="initials-glow-circle">
                         {member.id === 'ts' ? 'TY' : member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <h4 style={{ fontSize: 16, marginBottom: 12, fontWeight: 700 }}>{member.name}</h4>
                      <p style={{ fontSize: 13, textAlign: 'center', lineHeight: 1.6, opacity: 0.9 }}>{member.line}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── ANIMATED CTA ── */}
            <div className="nh-cta-wrap" style={{ marginTop: 80 }}>
              <div className="nh-cta-inner" style={{ background: ctaInnerBg }}>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, lineHeight: 1.1, color: textPrimary }}>
                  Ready to build <span style={gradStyle}>better job search habits?</span>
                </h2>
                <p style={{ margin: '14px auto 0', maxWidth: 560, fontSize: 14, lineHeight: 1.8, color: textSoft }}>
                  Start with NextHire to track applications, analyze resume fit, and keep your hiring process organized in one place.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
                  <Link to="/register"><button className="btn-hero-primary">Create account</button></Link>
                  <Link to="/login">  <button className="btn-hero-outline">Sign in</button></Link>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', marginTop: 22 }}>
                  {['Smart application tracking', 'AI resume matching', 'University team project'].map(t => (
                    <span key={t} style={{ fontSize: 12, color: textSoft }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* ── FOOTER ── */}
          <footer style={{ borderTop: `0.5px solid ${footerLine}`, padding: '36px 20px 28px', marginTop: 44 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.7fr 0.8fr', gap: 32, maxWidth: 1100, margin: '0 auto' }}>
              <div>
                <div style={{ marginBottom: 14 }}><LogoMark size={20} color={textPrimary} /></div>
                <p style={{ fontSize: 12, lineHeight: 1.85, color: textSoft, maxWidth: 340 }}>
                  NextHire helps users track applications, review resume fit with AI, manage reminders, and understand job search progress more clearly.
                </p>
              </div>
              <div>
                <h5 style={{ fontSize: 13, fontWeight: 500, color: textPrimary, marginBottom: 14 }}>Resources</h5>
                {[['Features', '#features'], ['About us', '#about'], ['Team', '#team']].map(([l, h]) => (
                  <a key={l} href={h} className="nh-footer-link" style={{ fontSize: 12, color: textSoft }}>{l}</a>
                ))}
              </div>
              <div>
                <h5 style={{ fontSize: 13, fontWeight: 500, color: textPrimary, marginBottom: 14 }}>Platform</h5>
                {['Application tracker', 'Resume analyzer', 'Performance dashboard', 'Reminders'].map(l => (
                  <p key={l} style={{ fontSize: 12, color: textSoft, marginBottom: 9 }}>{l}</p>
                ))}
              </div>
            </div>
            <div style={{ maxWidth: 1100, margin: '18px auto 0', borderTop: `0.5px solid ${footerLine}`, paddingTop: 14, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 11, color: footerMuted }}>
              <span>Built with React + Tailwind CSS for the NextHire university project.</span>
              <span>Designed for a smarter and clearer hiring journey.</span>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}
