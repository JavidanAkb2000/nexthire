import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/useTheme';
 
// ─── Data ────────────────────────────────────────────────────────────────────
 
const topChips = ['Applications', 'Resume Match', 'Pipeline Board', 'Analytics', 'Reminders', 'Search'];
 
const statCards = [
  { value: '5', label: 'Pipeline stages', icon: 'pipeline' },
  { value: '7', label: 'Core features',   icon: 'layers'   },
  { value: '1', label: 'AI analyzer',     icon: 'spark'    },
  { value: '4', label: 'Team members',    icon: 'team'     },
];
 
const featureCards = [
  { title: 'Track applications',  text: 'Create, update, and manage job applications with company, role, salary, status, and notes in one tracker.',                                icon: 0 },
  { title: 'Pipeline board',      text: 'Move through Applied, Screening, Interview, Offer, and Rejected with a visual hiring workflow.',                                           icon: 1 },
  { title: 'AI resume analyzer',  text: 'Upload a resume PDF, paste a job description, and receive match score, missing keywords, and improvement tips.',                           icon: 2 },
  { title: 'Reminders',           text: 'Set follow-up dates for applications and stay on top of interviews, deadlines, and next steps.',                                           icon: 3 },
  { title: 'Analytics',           text: 'Review weekly activity, offer rate trends, and salary comparisons through a focused performance dashboard.',                               icon: 4 },
  { title: 'Search & filters',    text: 'Filter by status, company, or role to quickly find the applications and opportunities that matter most.',                                  icon: 5 },
];
 
const team = [
  { name: 'Sania Sohail',            role: 'Frontend Developer',         line: 'Designed the interface and built the frontend experience across the main flows of NextHire.'  },
  { name: 'Javidan Akbarov',         role: 'Project Lead & AI Engineer',  line: 'Led the project direction and coordinated the structure and delivery of the platform.'        },
  { name: 'Kadir Kaan Cikilmazkaya', role: 'Backend Developer',           line: 'Worked on backend support and system logic behind the application workflow.'                  },
  { name: 'Tsevelmaa',               role: 'UI/UX Designer & Testing',    line: 'Supported testing, checking, and research to keep the project clear and usable.'              },
];
 
const TW_PHRASES = [
  'track jobs + analyze resume fit',
  'find your dream role faster',
  'stay organized, get hired',
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
  }, []);
 
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
 
// ─── Logo ─────────────────────────────────────────────────────────────────────
 
function LogoMark({ size = 22, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: size, color, fontWeight: 400, lineHeight: 1 }}>
        NextHire
      </span>
      <span style={{
        display: 'inline-block',
        width: Math.round(size * 0.32),
        height: Math.round(size * 0.32),
        borderRadius: '50%',
        background: '#7c5cff',
        marginLeft: 1,
        marginBottom: Math.round(size * 0.42),
        flexShrink: 0,
      }} />
    </div>
  );
}
 
// ─── Main ─────────────────────────────────────────────────────────────────────
 
export default function Landing() {
  const { isDark } = useTheme();
  const twText = useTypewriter(TW_PHRASES);
 
  // Semantic tokens that flip with theme
  const bg          = isDark ? '#0d0d14'               : '#f0f2ff';
  const surface     = isDark ? 'rgba(23,23,34,0.92)'   : 'rgba(255,255,255,0.92)';
  const navBorder   = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(124,92,255,0.2)';
  const textPrimary = isDark ? '#ffffff'               : '#16173f';
  const textSoft    = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(22,23,63,0.56)';
  const cardBorder  = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(124,92,255,0.16)';
  const codebarBg   = isDark ? '#0a0f1e'               : '#1a1f3a';
  const footerLine  = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(124,92,255,0.15)';
  const footerMuted = isDark ? 'rgba(255,255,255,0.3)'  : 'rgba(22,23,63,0.35)';
  const ctaInnerBg  = isDark ? 'rgba(13,13,20,0.88)'   : 'rgba(240,242,255,0.94)';
  const chipBg      = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(124,92,255,0.06)';
 
  // Shared gradient text style
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
        * { box-sizing: border-box; margin: 0; padding: 0; }
 
        /* Typewriter cursor */
        .tw-cursor {
          display: inline-block; width: 2px; height: 1.1em;
          background: #b083ff; margin-left: 2px; vertical-align: middle;
          animation: blink 0.8s step-end infinite;
        }
        @keyframes blink { 0%,100%{ opacity:1 } 50%{ opacity:0 } }
 
        /* Chip hover */
        .nh-chip { transition: border-color 0.18s, color 0.18s, transform 0.18s; cursor: default; }
        .nh-chip:hover { border-color: rgba(124,92,255,0.55) !important; color: #7c5cff !important; transform: translateY(-2px); }
 
        /* Nav link hover */
        .nh-navlink { text-decoration: none; transition: color 0.15s; }
        .nh-navlink:hover { color: #7c5cff !important; }
 
        /* ── Sign In: purple outline, turns purple fill on hover ── */
        .btn-signin {
          padding: 9px 20px; border-radius: 12px; font-size: 13px;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          border: 1.5px solid #7c5cff;
          background: transparent;
          color: #7c5cff;
          transition: background 0.18s, box-shadow 0.18s, transform 0.15s;
        }
        .btn-signin:hover  { background: rgba(124,92,255,0.14); box-shadow: 0 0 0 3px rgba(124,92,255,0.18); }
        .btn-signin:active { transform: scale(0.97); }
 
        /* ── Sign Up: gradient fill ── */
        .btn-signup {
          padding: 9px 22px; border-radius: 12px; border: none;
          background: linear-gradient(135deg,#486eff,#7c5cff 60%,#b083ff);
          color: #fff; font-size: 13px; font-weight: 500;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          box-shadow: 0 8px 24px rgba(124,92,255,0.28);
          transition: transform 0.18s, box-shadow 0.18s, filter 0.18s;
        }
        .btn-signup:hover  { transform: translateY(-1px); box-shadow: 0 12px 32px rgba(124,92,255,0.4); filter: brightness(1.08); }
        .btn-signup:active { transform: scale(0.97); }
 
        /* ── Hero outline (Learn more / Sign in in CTA): same purple border/text ── */
        .btn-hero-outline {
          padding: 14px 36px; border-radius: 16px;
          border: 1.5px solid #7c5cff;
          background: transparent; color: #7c5cff;
          font-size: 15px; font-family: 'DM Sans', sans-serif; cursor: pointer;
          transition: background 0.18s, box-shadow 0.18s, transform 0.2s;
        }
        .btn-hero-outline:hover  { background: rgba(124,92,255,0.12); box-shadow: 0 0 0 3px rgba(124,92,255,0.18); transform: translateY(-2px); }
        .btn-hero-outline:active { transform: scale(0.97); }
 
        /* ── Hero primary (Explore / Create account): gradient fill ── */
        .btn-hero-primary {
          padding: 14px 36px; border-radius: 16px; border: none;
          background: linear-gradient(135deg,#486eff,#7c5cff 60%,#b083ff);
          color: #fff; font-size: 15px; font-weight: 500;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          box-shadow: 0 14px 34px rgba(108,92,255,0.3);
          transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
        }
        .btn-hero-primary:hover  { transform: translateY(-2px); box-shadow: 0 20px 44px rgba(108,92,255,0.44); filter: brightness(1.08); }
        .btn-hero-primary:active { transform: scale(0.97); }
 
        /* Card hover lifts */
        .nh-stat    { transition: transform 0.2s; }
        .nh-stat:hover    { transform: translateY(-4px); }
        .nh-feature { transition: transform 0.2s, border-color 0.2s; }
        .nh-feature:hover { transform: translateY(-5px); border-color: rgba(124,92,255,0.42) !important; }
        .nh-member  { transition: transform 0.2s; }
        .nh-member:hover  { transform: translateY(-4px); }
 
        /* Animated CTA border */
        .nh-cta-wrap { position: relative; border-radius: 30px; padding: 2px; overflow: hidden; }
        .nh-cta-wrap::before {
          content: ''; position: absolute; inset: 0; border-radius: 30px;
          background: linear-gradient(120deg,rgba(72,110,255,0.65),rgba(124,92,255,0.65),rgba(176,131,255,0.55),rgba(255,140,71,0.55),rgba(72,110,255,0.65));
          background-size: 300% 300%;
          animation: gradMove 5s ease infinite; z-index: 0;
        }
        @keyframes gradMove { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .nh-cta-inner { position: relative; z-index: 1; border-radius: 28px; padding: 52px 36px; text-align: center; backdrop-filter: blur(20px); }
 
        /* Footer link hover */
        .nh-footer-link { text-decoration: none; display: block; margin-bottom: 9px; transition: color 0.15s; }
        .nh-footer-link:hover { color: #7c5cff !important; }
      `}</style>
 
      <div style={{ background: bg, color: textPrimary, fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', overflowX: 'hidden', transition: 'background 0.3s, color 0.3s' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
 
          {/* ── NAV ── */}
          <nav style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 28px', background: surface,
            border: `0.5px solid ${navBorder}`, borderRadius: 28,
            margin: '14px 20px 0', backdropFilter: 'blur(18px)',
            flexWrap: 'wrap', gap: 12, position: 'sticky', top: 10, zIndex: 100,
            transition: 'background 0.3s, border-color 0.3s',
          }}>
            <LogoMark size={22} color={textPrimary} />
 
            <div style={{ display: 'flex', gap: 28 }}>
              {[['Features', '#features'], ['About us', '#about'], ['Team', '#team']].map(([label, href]) => (
                <a key={label} href={href} className="nh-navlink" style={{ fontSize: 14, color: textSoft }}>{label}</a>
              ))}
            </div>
 
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ThemeToggle />
              <Link to="/login">   <button className="btn-signin">Sign in</button></Link>
              <Link to="/register"><button className="btn-signup">Sign up</button></Link>
            </div>
          </nav>
 
          {/* ── MAIN ── */}
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 60px' }}>
 
            {/* Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 44 }}>
              {topChips.map(chip => (
                <span key={chip} className="nh-chip" style={{
                  padding: '8px 18px', borderRadius: 999,
                  border: `0.5px solid ${cardBorder}`,
                  background: chipBg, fontSize: 12, color: textSoft,
                }}>{chip}</span>
              ))}
            </div>
 
            {/* Hero */}
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 54, lineHeight: 0.97, letterSpacing: '-0.02em', color: textPrimary, marginBottom: 20 }}>
                <span style={gradStyle}>NextHire</span><br />Career Intelligence
              </h1>
 
              <p style={{ maxWidth: 640, margin: '0 auto 28px', fontSize: 15, lineHeight: 1.8, color: textSoft }}>
                A smart job application tracker with AI resume analysis. Keep every application in one place, understand your resume match, and move through the hiring process with more clarity.
              </p>
 
              {/* Typewriter bar */}
              <div style={{
                background: codebarBg, borderRadius: 16, padding: '16px 28px',
                margin: '0 auto 28px', maxWidth: 500, fontFamily: 'monospace',
                fontSize: 15, color: '#fff', textAlign: 'left',
                border: '0.5px solid rgba(72,110,255,0.35)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ color: '#ff8c47', fontWeight: 500 }}>$</span>
                <span>{twText}</span>
                <span className="tw-cursor" />
              </div>
 
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="#features"><button className="btn-hero-primary">Explore features</button></a>
                <a href="#about">  <button className="btn-hero-outline">Learn more</button></a>
              </div>
            </div>
 
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginTop: 40 }}>
              {statCards.map(item => (
                <div key={item.label} className="nh-stat" style={{ background: surface, border: `0.5px solid ${cardBorder}`, borderRadius: 24, padding: '28px 20px', textAlign: 'center' }}>
                  <div style={{ width: 50, height: 50, borderRadius: 15, background: 'rgba(124,92,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', color: '#7c5cff' }}>
                    <StatIcon type={item.icon} />
                  </div>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: '#7c5cff', margin: '12px 0 6px', lineHeight: 1 }}>{item.value}</p>
                  <p style={{ fontSize: 12, color: textSoft }}>{item.label}</p>
                </div>
              ))}
            </div>
 
            {/* Features */}
            <div id="features" style={{ textAlign: 'center', margin: '60px 0 32px' }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, lineHeight: 1.05, color: textPrimary }}>
                Everything you need for <span style={gradStyle}>beautifully organized progress</span>
              </h2>
              <p style={{ margin: '14px auto 0', maxWidth: 640, fontSize: 14, lineHeight: 1.8, color: textSoft }}>
                NextHire keeps the experience focused: applications, pipeline stages, resume insights, reminders, analytics, and search in one clean workflow.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {featureCards.map(card => (
                <div key={card.title} className="nh-feature" style={{ background: surface, border: `0.5px solid ${cardBorder}`, borderRadius: 22, padding: 24 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: 'rgba(124,92,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c5cff', marginBottom: 16 }}>
                    <FeatureIcon index={card.icon} />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 500, color: textPrimary, marginBottom: 9 }}>{card.title}</h3>
                  <p style={{ fontSize: 12, lineHeight: 1.85, color: textSoft }}>{card.text}</p>
                </div>
              ))}
            </div>
 
            {/* About */}
            <div id="about" style={{ textAlign: 'center', margin: '52px 0 28px' }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, color: textPrimary }}>About the project</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {[
                { tag: 'About us', text: 'NextHire is a university project made by four team members who wanted to improve how job seekers track, manage, and understand their applications.' },
                { tag: 'Mission',  text: 'Help users stay organized, receive clearer AI resume feedback, and navigate hiring with less confusion.' },
                { tag: 'Vision',   text: 'Build a focused career platform for students and early professionals who want structure and momentum.' },
              ].map(c => (
                <div key={c.tag} style={{ background: surface, border: `0.5px solid ${cardBorder}`, borderRadius: 20, padding: 22 }}>
                  <p style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.14em', color: '#b083ff', textTransform: 'uppercase', marginBottom: 12 }}>{c.tag}</p>
                  <p style={{ fontSize: 12, lineHeight: 1.85, color: textSoft }}>{c.text}</p>
                </div>
              ))}
            </div>
 
            {/* Team */}
            <div id="team" style={{ textAlign: 'center', margin: '52px 0 28px' }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, color: textPrimary }}>
                The team behind <span style={gradStyle}>NextHire</span>
              </h2>
              <p style={{ margin: '14px auto 0', maxWidth: 580, fontSize: 14, lineHeight: 1.8, color: textSoft }}>
                A university team of four members building a smarter platform for job search tracking and resume analysis.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {team.map(member => (
                <div key={member.name} className="nh-member" style={{ background: surface, border: `0.5px solid ${cardBorder}`, borderRadius: 22, padding: 22 }}>
                  <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'linear-gradient(135deg,#486eff,#7c5cff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 500, color: '#fff', marginBottom: 14 }}>
                    {member.name.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase()}
                  </div>
                  <h4 style={{ fontSize: 14, fontWeight: 500, color: textPrimary, marginBottom: 4 }}>{member.name}</h4>
                  <p style={{ fontSize: 10, color: '#b083ff', marginBottom: 10, fontWeight: 500 }}>{member.role}</p>
                  <p style={{ fontSize: 11, lineHeight: 1.8, color: textSoft }}>{member.line}</p>
                </div>
              ))}
            </div>
 
            {/* Animated CTA */}
            <div className="nh-cta-wrap" style={{ marginTop: 44 }}>
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
