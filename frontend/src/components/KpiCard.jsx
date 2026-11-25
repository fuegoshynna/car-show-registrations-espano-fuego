export default function KpiCard({ title, value, subtitle, icon, loading = false }) {
  if (loading) {
    return (
      <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="h-9 w-9 rounded-lg bg-slate-100" />
        </div>
        <div className="mt-5 h-8 w-24 rounded bg-slate-200" />
        <div className="mt-2 h-3 w-20 rounded bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="flex min-h-36 flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium leading-5 text-slate-600">{title}</span>
        {icon && (
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
            {icon}
          </span>
        )}
      </div>

      <div className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
        {value}
      </div>

      {subtitle && (
        <p className="mt-1.5 text-xs text-slate-500">{subtitle}</p>
      )}
    </div>
  );
}