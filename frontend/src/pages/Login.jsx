import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/useTheme';
import ThemeToggle from '../components/ThemeToggle';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password, rememberMe });
    navigate('/dashboard');
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden font-sans ${
        isDark ? 'bg-[#111119] text-white' : 'bg-[#f5f2ff] text-[#1b1630]'
      }`}
    >
      <div className="absolute right-6 top-6 z-20">
        <ThemeToggle />
      </div>

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.04fr_1fr]">
        <section
          className={`relative flex min-h-[100svh] flex-col px-6 pb-10 pt-8 sm:px-10 lg:px-16 ${
            isDark ? 'bg-[#101018]' : 'bg-[#faf8ff]'
          }`}
        >
          <div>
            <h1
              className={`text-[36px] font-bold leading-[40px] tracking-normal ${isDark ? 'text-white' : 'text-black'}`}
              style={{ fontFamily: 'Sitka, Georgia, serif' }}
            >
              NextHire<span className="align-top text-[0.45em] text-violet-500">•</span>
            </h1>
            <p
              className={`mt-1 text-[12px] font-semibold leading-[14px] tracking-normal ${isDark ? 'text-white/45' : 'text-[#6d6785]'}`}
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Apply. Track. Get Hired
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-[390px] flex-1 flex-col justify-center">
            <h2 className="text-center text-4xl font-semibold tracking-tight sm:text-[3rem]">Sign In</h2>

            <div className="mt-8 flex items-center gap-4">
              <div className={`h-px flex-1 ${isDark ? 'bg-white/20' : 'bg-[#cfc5ef]'}`} />
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full border ${
                  isDark ? 'border-white/40 bg-[#151521]' : 'border-[#bbb0e4] bg-white'
                }`}
              >
                <span className={`text-3xl leading-none ${isDark ? 'text-white/65' : 'text-[#62568d]'}`}>→</span>
              </div>
              <div className={`h-px flex-1 ${isDark ? 'bg-white/20' : 'bg-[#cfc5ef]'}`} />
            </div>

            <form onSubmit={handleLogin} className="mt-10 space-y-5">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-2xl border px-5 py-4 text-base outline-none transition placeholder:font-sans ${
                  isDark
                    ? 'border-[#4e4a67] bg-[#2b2a37] text-white placeholder:text-white/45 focus:border-violet-500'
                    : 'border-[#c6bbe9] bg-white text-[#1b1630] placeholder:text-[#8c82ac] focus:border-violet-500'
                }`}
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-2xl border px-5 py-4 pr-14 text-base outline-none transition placeholder:font-sans ${
                    isDark
                      ? 'border-[#4e4a67] bg-[#2b2a37] text-white placeholder:text-white/45 focus:border-violet-500'
                      : 'border-[#c6bbe9] bg-white text-[#1b1630] placeholder:text-[#8c82ac] focus:border-violet-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition ${
                    isDark ? 'text-white/50 hover:text-white/80' : 'text-[#7a6ca7] hover:text-[#564a84]'
                  }`}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 3l18 18" strokeLinecap="round" />
                      <path
                        d="M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-.58"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.88 5.09A10.94 10.94 0 0112 4.91c5 0 8.27 4.61 9 5.79a1 1 0 010 1.09 16.3 16.3 0 01-4.34 4.57"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.61 6.61A16.23 16.23 0 003 10.79a1 1 0 000 1.09C3.73 13.06 7 17.67 12 17.67c1.45 0 2.77-.39 3.95-.95"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path
                        d="M2.46 12.01C3.73 9.84 7 5.33 12 5.33s8.27 4.51 9.54 6.68a1 1 0 010 1c-1.27 2.17-4.54 6.68-9.54 6.68s-8.27-4.51-9.54-6.68a1 1 0 010-1z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12.5" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              <div
                className={`flex items-center justify-between gap-4 text-sm ${
                  isDark ? 'text-white/70' : 'text-[#5e557e]'
                }`}
              >
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-violet-500 bg-transparent accent-violet-500"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-[#2d2156]'}`}>
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="mt-3 w-full rounded-2xl bg-gradient-to-r from-violet-500 to-violet-400 px-5 py-4 text-base font-semibold text-white shadow-[0_20px_40px_rgba(124,58,237,0.25)] transition hover:brightness-110"
              >
                Sign In →
              </button>
            </form>

            <p className={`mt-6 text-center text-base ${isDark ? 'text-white/75' : 'text-[#5d557f]'}`}>
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-medium text-violet-500 hover:text-violet-400">
                Sign Up
              </Link>
            </p>
          </div>

          <p className={`mt-8 text-sm ${isDark ? 'text-white/35' : 'text-[#7f769c]'}`}>©2026 All rights reserved.</p>
        </section>

        <section
          className={`relative hidden min-h-[100svh] items-center justify-center overflow-hidden rounded-l-[42px] px-8 lg:flex lg:px-16 ${
            isDark ? 'bg-[#1c1b26]' : 'bg-[#ebe5ff]'
          }`}
        >
          <div
            className={`absolute inset-0 ${
              isDark
                ? 'bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_30%)]'
                : 'bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.55),transparent_30%)]'
            }`}
          />

          <div className="relative w-full max-w-2xl text-center">
            <h2 className="text-[52px] font-semibold leading-tight xl:text-[56px]">Hello, welcome to</h2>

            <div className="mt-8 flex items-center gap-6">
              <div className={`h-px flex-1 ${isDark ? 'bg-white/20' : 'bg-[#bfb1ea]'}`} />
              <h3
                className="text-center text-[48px] font-normal italic leading-[52px] tracking-normal"
                style={{ fontFamily: 'Sitka, Georgia, serif' }}
              >
                <span className={isDark ? 'text-white/95' : 'text-[#2a2144]'}>Next</span>
                <span className={isDark ? 'text-white/95' : 'text-[#2a2144]'}>Hire</span>
                <span className="align-top text-2xl not-italic text-violet-500">•</span>
              </h3>
              <div className={`h-px flex-1 ${isDark ? 'bg-white/20' : 'bg-[#bfb1ea]'}`} />
            </div>

            <p className={`mx-auto mt-7 max-w-xl text-center text-[16px] font-normal leading-[100%] tracking-normal ${isDark ? 'text-white/45' : 'text-[#695f8b]'}`}>
              Organize your job search and move forward with confidence.
            </p>

            <Link
              to="/register"
              className={`mx-auto mt-14 inline-flex min-w-[390px] items-center justify-center rounded-2xl border px-8 py-4 text-xl font-semibold transition ${
                isDark
                  ? 'border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white'
                  : 'border-violet-500 text-violet-600 hover:bg-violet-500 hover:text-white'
              }`}
            >
              Register →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
