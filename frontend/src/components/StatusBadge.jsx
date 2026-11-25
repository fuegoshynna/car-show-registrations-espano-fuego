const STATUS_STYLES = {
  Pending: 'border-slate-300 bg-slate-100 text-slate-700',
  Confirmed: 'border-sky-300 bg-sky-50 text-sky-700',
  CheckedIn: 'border-emerald-300 bg-emerald-50 text-emerald-700',
  Cancelled: 'border-rose-300 bg-rose-50 text-rose-700',
};

const STATUS_LABELS = {
  Pending: 'Pending',
  Confirmed: 'Confirmed',
  CheckedIn: 'Checked In',
  Cancelled: 'Cancelled',
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || 'border-slate-300 bg-slate-100 text-slate-700';
  const label = STATUS_LABELS[status] || status;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium ${style}`}
    >
      {label}
    </span>
  );
}