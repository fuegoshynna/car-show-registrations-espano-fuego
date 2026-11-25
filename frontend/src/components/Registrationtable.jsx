import StatusBadge from './StatusBadge.jsx';
import PaymentBadge from './PaymentBadge.jsx';
import EmptyState from './EmptyState.jsx';
import ErrorState from './ErrorState.jsx';

const formatCurrency = (amount) =>
  `₱${Number(amount ?? 0).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDateTime = (isoString) => {
  if (!isoString) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(isoString));
};

export default function RegistrationTable({
  items,
  loading,
  error,
  onRetry,
  onClearFilters,
  hasFilters,
  rowsCount = 6,
}) {
  if (error) {
    return <ErrorState error={error} onRetry={onRetry} />;
  }

  if (!loading && items.length === 0) {
    return <EmptyState hasFilters={hasFilters} onClearFilters={onClearFilters} />;
  }

  return (
    <div className="overflow-x-auto border-t border-slate-200" aria-busy={loading}>
      {loading && (
        <div role="status" className="sr-only">
          Loading registrations...
        </div>
      )}

      <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
        <thead className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th scope="col" className="whitespace-nowrap px-5 py-3.5">Reg. No.</th>
            <th scope="col" className="whitespace-nowrap px-5 py-3.5">Date</th>
            <th scope="col" className="whitespace-nowrap px-5 py-3.5">Participant</th>
            <th scope="col" className="whitespace-nowrap px-5 py-3.5">Car</th>
            <th scope="col" className="whitespace-nowrap px-5 py-3.5">Type</th>
            <th scope="col" className="whitespace-nowrap px-5 py-3.5">Status</th>
            <th scope="col" className="whitespace-nowrap px-5 py-3.5 text-right">Fee / Paid</th>
            <th scope="col" className="whitespace-nowrap px-5 py-3.5">Payment</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {loading
            ? Array.from({ length: rowsCount }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-5 py-4"><div className="h-3.5 w-20 rounded bg-slate-200" /></td>
                  <td className="px-5 py-4"><div className="h-3.5 w-28 rounded bg-slate-200" /></td>
                  <td className="px-5 py-4">
                    <div className="h-3.5 w-32 rounded bg-slate-200" />
                    <div className="mt-1.5 h-2.5 w-24 rounded bg-slate-100" />
                  </td>
                  <td className="px-5 py-4">
                    <div className="h-3.5 w-32 rounded bg-slate-200" />
                    <div className="mt-1.5 h-2.5 w-16 rounded bg-slate-100" />
                  </td>
                  <td className="px-5 py-4"><div className="h-3.5 w-16 rounded bg-slate-200" /></td>
                  <td className="px-5 py-4"><div className="h-5 w-20 rounded-full bg-slate-200" /></td>
                  <td className="px-5 py-4"><div className="ml-auto h-3.5 w-24 rounded bg-slate-200" /></td>
                  <td className="px-5 py-4"><div className="h-5 w-16 rounded-full bg-slate-200" /></td>
                </tr>
              ))
            : items.map((row) => (
                <tr key={row.id} className="transition-colors hover:bg-slate-50/80">
                  <td className="whitespace-nowrap px-5 py-4 text-xs font-semibold text-slate-700">
                    <span className="rounded-md bg-slate-100 px-2 py-1">{row.registrationNumber}</span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-600">
                    {formatDateTime(row.registrationDate)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-slate-900">
                      {row.participantName}
                    </div>
                    <div className="text-xs text-slate-400">
                      {row.contactNumber}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-slate-800">{row.carMakeModel}</div>
                    <div className="text-xs text-slate-400">{row.plateNumber}</div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-700">
                    {row.registrationType}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-right text-xs">
                    <div className="font-medium text-slate-800">
                      {formatCurrency(row.registrationFee)}
                    </div>
                    <div className="text-slate-400">
                      {formatCurrency(row.amountPaid)}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <PaymentBadge paymentStatus={row.paymentStatus} />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}