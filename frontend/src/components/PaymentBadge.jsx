const PAYMENT_STYLES = {
  Unpaid: 'border-red-300 bg-red-50 text-red-700',
  Partial: 'border-amber-300 bg-amber-50 text-amber-800',
  Paid: 'border-green-300 bg-green-50 text-green-700',
};

export default function PaymentBadge({ paymentStatus }) {
  const style = PAYMENT_STYLES[paymentStatus] || 'border-slate-300 bg-slate-100 text-slate-700';

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium ${style}`}
    >
      {paymentStatus}
    </span>
  );
}