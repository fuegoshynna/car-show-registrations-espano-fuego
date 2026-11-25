import KpiCard from './KpiCard.jsx';

const formatPeso = (amount) =>
  `₱${Number(amount ?? 0).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatCount = (num) => Number(num ?? 0).toLocaleString('en-PH');

export default function KpiCards({ summary, loading }) {
  return (
    <section
      aria-label="Key Performance Indicators"
      className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5"
    >
      <KpiCard
        title="Total Registrations"
        value={formatCount(summary?.totalRegistrations)}
        subtitle={`${formatCount(summary?.pending)} pending · ${formatCount(summary?.cancelled)} cancelled`}
        loading={loading}
        icon={
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        }
      />
      <KpiCard
        title="Total Payments"
        value={formatPeso(summary?.totalPayments)}
        subtitle={`Total fees: ${formatPeso(summary?.totalFees)}`}
        loading={loading}
        icon={
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
        }
      />
      <KpiCard
        title="Uncollected Payments"
        value={formatPeso(summary?.uncollectedPayments)}
        subtitle="Remaining balance"
        loading={loading}
        icon={
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
        }
      />
      <KpiCard
        title="Confirmed"
        value={formatCount(summary?.confirmed)}
        subtitle="Approved entries"
        loading={loading}
        icon={
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        }
      />
      <KpiCard
        title="Checked In"
        value={formatCount(summary?.checkedIn)}
        subtitle="Arrived at Coliseum"
        loading={loading}
        icon={
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <polyline points="16 11 18 13 22 9" />
          </svg>
        }
      />
    </section>
  );
}