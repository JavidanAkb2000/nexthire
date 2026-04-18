export default function FilterPanel({ filters, onChange, onClear, isDark }) {
  const inputBase = 'w-full rounded-[12px] border px-3 py-2 text-[13px] outline-none transition focus:border-[#7C4DFF]';
  const inputTheme = isDark
    ? 'border-white/20 bg-[#181822] text-white placeholder:text-white/40'
    : 'border-[#D4D0DF] bg-white text-[#171421] placeholder:text-[#8A84A2]';
  const panelTheme = isDark ? 'bg-[#0E0E1A] border-white/10 text-white' : 'bg-white border-[#D4D0DF] text-[#1C1B2E]';
  const labelClass = isDark ? 'text-white/60' : 'text-[#6F688A]';

  return (
    <div className={`absolute top-full right-0 z-10 mt-2 w-[280px] rounded-2xl border shadow-[0_16px_45px_rgba(0,0,0,0.35)] ${panelTheme}`}>
      <div className="flex flex-col gap-3 p-4">
        <p className={`text-[11px] font-semibold uppercase tracking-[0.25em] ${isDark ? 'text-white/80' : 'text-[#6F688A]'}`}>
          Filters
        </p>

        <div className="space-y-1">
          <label className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${labelClass}`}>Company</label>
          <input
            type="text"
            placeholder="Company"
            value={filters.company}
            onChange={(event) => onChange('company', event.target.value)}
            className={`${inputBase} ${inputTheme}`}
          />
        </div>

        <div className="space-y-1">
          <label className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${labelClass}`}>Role</label>
          <input
            type="text"
            placeholder="Role"
            value={filters.role}
            onChange={(event) => onChange('role', event.target.value)}
            className={`${inputBase} ${inputTheme}`}
          />
        </div>

        <div className="space-y-1">
          <label className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${labelClass}`}>Status</label>
          <select
            value={filters.status}
            onChange={(event) => onChange('status', event.target.value)}
            className={`${inputBase} ${inputTheme} text-[13px]`}
          >
            <option value="">All statuses</option>
            <option value="Applied">Applied</option>
            <option value="Screening">Screening</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
            <option value="Saved">Saved</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${labelClass}`}>DOB</label>
          <input
            type="date"
            value={filters.dob}
            onChange={(event) => onChange('dob', event.target.value)}
            className={`${inputBase} ${inputTheme}`}
          />
        </div>

        <button
          type="button"
          onClick={onClear}
          className="mt-1 text-[13px] font-semibold text-[#7C4DFF] transition hover:text-[#5B3EF5]"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
