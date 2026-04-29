import { useTheme } from '../context/useTheme';

export default function SidebarToggle({
  open,
  onToggle,
  variant = 'floating',
  className = '',
}) {
  const { isDark } = useTheme();
  const colors = isDark
    ? {
        ring: 'ring-white/40',
        text: 'text-white',
        border: 'border-white/20',
        bg: 'bg-white/5',
      }
    : {
        ring: 'ring-[#1B1B25]/40',
        text: 'text-[#1B1B25]',
        border: 'border-[#1B1B25]/20',
        bg: 'bg-white',
      };

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`
        ${variant === 'header' ? 'px-3 py-2' : 'h-10 w-10'}
        z-50 inline-flex items-center justify-center rounded-full border transition duration-200 focus:outline-none focus:ring-2 shadow-[0_10px_22px_rgba(0,0,0,0.18)]
        ${colors.border} ${colors.bg} ${colors.text} focus:ring ${colors.ring} ${className}
      `}
      aria-label={open ? 'Hide sidebar' : 'Show sidebar'}
    >
      <span className="sr-only">{open ? 'Hide sidebar' : 'Show sidebar'}</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </svg>
    </button>
  );
}
