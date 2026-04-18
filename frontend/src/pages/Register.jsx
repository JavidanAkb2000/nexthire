import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/useTheme';
import ThemeToggle from '../components/ThemeToggle';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Register:', { name, email, password, confirmPassword, agreeTerms });
    navigate('/login');
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

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_1.04fr]">
        <section
          className={`relative hidden min-h-[100svh] items-center justify-center overflow-hidden rounded-r-[42px] px-8 lg:flex lg:px-16 ${
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
              to="/login"
              className="mx-auto mt-14 inline-flex min-w-[390px] items-center justify-center rounded-[28px] bg-gradient-to-r from-violet-500 to-violet-400 px-8 py-5 text-[16px] font-semibold text-white shadow-[0_20px_40px_rgba(124,58,237,0.22)] transition hover:brightness-110"
            >
              ← Register
            </Link>
          </div>
        </section>

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

          <div className="mx-auto flex w-full max-w-[410px] flex-1 flex-col justify-center pt-10">
            <h2 className="text-center text-[32px] font-semibold tracking-tight sm:text-[36px]">Create an account</h2>

            <div className="mt-12 flex items-center gap-4">
              <div className={`h-px flex-1 ${isDark ? 'bg-white/20' : 'bg-[#cfc5ef]'}`} />
              <div
                className={`flex h-[50px] w-[50px] items-center justify-center rounded-full border ${
                  isDark ? 'border-white/40 bg-[#151521]' : 'border-[#bbb0e4] bg-white'
                }`}
              >
                <svg
                  className={`h-[26px] w-[26px] ${isDark ? 'text-white/60' : 'text-[#62568d]'}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path
                    d="M15.8 4.8a2.2 2.2 0 013.1 3.1l-7.9 7.9a3 3 0 01-1.46.8l-2.32.52.52-2.32a3 3 0 01.8-1.46l7.25-7.24z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M14.5 6.1l3.4 3.4" strokeLinecap="round" />
                  <path
                    d="M20 12a8 8 0 11-4.2-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={`h-px flex-1 ${isDark ? 'bg-white/20' : 'bg-[#cfc5ef]'}`} />
            </div>

            <form onSubmit={handleRegister} className="mt-12 space-y-5">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-2xl border px-5 py-4 text-[15px] outline-none transition placeholder:font-sans ${
                  isDark
                    ? 'border-[#4e4a67] bg-[#2b2a37] text-white placeholder:text-white/45 focus:border-violet-500'
                    : 'border-[#c6bbe9] bg-white text-[#1b1630] placeholder:text-[#8c82ac] focus:border-violet-500'
                }`}
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-2xl border px-5 py-4 text-[15px] outline-none transition placeholder:font-sans ${
                  isDark
                    ? 'border-[#4e4a67] bg-[#2b2a37] text-white placeholder:text-white/45 focus:border-violet-500'
                    : 'border-[#c6bbe9] bg-white text-[#1b1630] placeholder:text-[#8c82ac] focus:border-violet-500'
                }`}
              />

              <div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Set password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full rounded-2xl border px-5 py-4 pr-14 text-[15px] outline-none transition placeholder:font-sans ${
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
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path
                        d="M2.46 12.01C3.73 9.84 7 5.33 12 5.33s8.27 4.51 9.54 6.68a1 1 0 010 1c-1.27 2.17-4.54 6.68-9.54 6.68s-8.27-4.51-9.54-6.68a1 1 0 010-1z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12.5" r="3" />
                    </svg>
                  </button>
                </div>
                <p className={`mt-2 pl-1 text-[11px] font-medium ${isDark ? 'text-white/38' : 'text-[#7f769c]'}`}>
                  Must be at least 8 characters
                </p>
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full rounded-2xl border px-5 py-4 pr-14 text-[15px] outline-none transition placeholder:font-sans ${
                      isDark
                        ? 'border-[#4e4a67] bg-[#2b2a37] text-white placeholder:text-white/45 focus:border-violet-500'
                        : 'border-[#c6bbe9] bg-white text-[#1b1630] placeholder:text-[#8c82ac] focus:border-violet-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition ${
                      isDark ? 'text-white/50 hover:text-white/80' : 'text-[#7a6ca7] hover:text-[#564a84]'
                    }`}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path
                        d="M2.46 12.01C3.73 9.84 7 5.33 12 5.33s8.27 4.51 9.54 6.68a1 1 0 010 1c-1.27 2.17-4.54 6.68-9.54 6.68s-8.27-4.51-9.54-6.68a1 1 0 010-1z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12.5" r="3" />
                    </svg>
                  </button>
                </div>
                <p className={`mt-2 pl-1 text-[11px] font-medium ${isDark ? 'text-white/38' : 'text-[#7f769c]'}`}>
                  Passwords must match
                </p>
              </div>

              <label className={`mt-3 flex items-start gap-4 ${isDark ? 'text-white/70' : 'text-[#5e557e]'}`}>
                <button
                  type="button"
                  onClick={() => setAgreeTerms((value) => !value)}
                  className={`relative mt-1 h-7 w-12 rounded-full border transition ${
                    agreeTerms
                      ? 'border-violet-500 bg-violet-500/15'
                      : isDark
                      ? 'border-violet-500 bg-transparent'
                      : 'border-violet-500 bg-white'
                  }`}
                  aria-pressed={agreeTerms}
                  aria-label="Agree to terms"
                >
                  <span
                    className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-violet-500 shadow transition ${
                      agreeTerms ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
                <span className="max-w-[300px] text-[13px] leading-6">
                  By creating an account, you agree to the{' '}
                  <a href="#" className="font-semibold text-inherit underline-offset-2 hover:underline">
                    Terms and Conditions
                  </a>{' '}
                  and our{' '}
                  <a href="#" className="font-semibold text-inherit underline-offset-2 hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>

              <button
                type="submit"
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-500 to-violet-400 px-5 py-4 text-[15px] font-semibold text-white shadow-[0_20px_40px_rgba(124,58,237,0.25)] transition hover:brightness-110"
              >
                Sign Up →
              </button>
            </form>

            <p className={`mt-8 text-center text-[15px] ${isDark ? 'text-white/75' : 'text-[#5d557f]'}`}>
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-violet-500 hover:text-violet-400">
                Sign In
              </Link>
            </p>
          </div>

          <p className={`mt-8 text-sm ${isDark ? 'text-white/35' : 'text-[#7f769c]'}`}>©2026 All rights reserved.</p>
        </section>
      </div>
    </div>
  );
}
