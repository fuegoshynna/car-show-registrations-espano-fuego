export default function KpiCard({ title, value, subtitle, icon, loading = false }) {
  if (loading) {
    return (
      <div className="animate-pulse rounded-2xl border border-[#e5e2dc] bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="h-10 w-10 rounded-xl bg-slate-100" />
        </div>
        <div className="mt-5 h-8 w-24 rounded bg-slate-200" />
        <div className="mt-2 h-3 w-20 rounded bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="group relative flex min-h-36 flex-col justify-between overflow-hidden rounded-2xl border border-[#e5e2dc] bg-white p-5 shadow-sm shadow-slate-900/[0.025] transition duration-200 hover:-translate-y-0.5 hover:border-[#e6b7b8] hover:shadow-md">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#b91216] to-[#284163] opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-2">
        <span className="text-[13px] font-semibold leading-5 text-slate-500">{title}</span>
        {icon && (
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fbecee] text-[#b91216]">
            {icon}
          </span>
        )}
      </div>

      <div className="mt-4 text-[26px] font-bold tracking-tight text-[#17212b]">
        {value}
      </div>

      {subtitle && (
        <p className="mt-1.5 text-xs text-slate-500">{subtitle}</p>
      )}
    </div>
  );
}