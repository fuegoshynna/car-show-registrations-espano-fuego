import { useState } from 'react';

const TYPE_FEES = {
  Exhibitor: 1500,
  Competitor: 2500,
  VIP: 5000,
};

export default function NewRegistrationModal({ isOpen, onClose, onSuccess, onCreate }) {
  const [form, setForm] = useState({
    participantName: '',
    contactNumber: '',
    email: '',
    address: '',
    carMakeModel: '',
    plateNumber: '',
    registrationType: 'Exhibitor',
    registrationFee: 1500,
    amountPaid: 0,
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleTypeChange = (newType) => {
    setForm((prev) => ({
      ...prev,
      registrationType: newType,
      registrationFee: TYPE_FEES[newType] ?? 1500,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError('');
    setSubmitting(true);

    try {
      await onCreate({
        ...form,
        registrationFee: Number(form.registrationFee),
        amountPaid: Number(form.amountPaid),
      });
      onSuccess();
      onClose();
    } catch (err) {
      if (err.errors) {
        setFieldErrors(err.errors);
      } else {
        setGeneralError(err.detail || err.message || 'Unable to save registration.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const getFieldError = (pascalKey, camelKey) =>
    fieldErrors[pascalKey]?.[0] || fieldErrors[camelKey]?.[0] || '';

  return (
    <div className="registration-modal fixed inset-0 z-50 flex items-center justify-center bg-[#101820]/65 p-4 backdrop-blur-sm">
      <div role="dialog" aria-modal="true" aria-labelledby="registration-modal-title" className="max-h-[calc(100vh-2rem)] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#e5e2dc] bg-white p-6 shadow-2xl shadow-slate-950/25 sm:p-7">
        <div className="mb-5 flex items-start justify-between border-b border-[#ebe9e4] pb-4">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b91216]">Car Show 2027</p>
            <h2 id="registration-modal-title" className="text-xl font-bold tracking-tight text-[#17212b]">New Registration</h2>
            <p className="mt-1 text-xs text-slate-500">Add a participant and their vehicle to the entry list.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close registration form"
            className="rounded-lg px-2.5 py-1.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        {generalError && (
          <div className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Participant Name *</label>
            <input
              type="text"
              value={form.participantName}
              onChange={(e) => setForm({ ...form, participantName: e.target.value })}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm"
            />
            {getFieldError('ParticipantName', 'participantName') && (
              <p className="mt-1 text-xs text-red-600">{getFieldError('ParticipantName', 'participantName')}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">Contact Number *</label>
              <input
                type="text"
                value={form.contactNumber}
                onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm"
              />
              {getFieldError('ContactNumber', 'contactNumber') && (
                <p className="mt-1 text-xs text-red-600">{getFieldError('ContactNumber', 'contactNumber')}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm"
              />
              {getFieldError('Email', 'email') && (
                <p className="mt-1 text-xs text-red-600">{getFieldError('Email', 'email')}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Address *</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm"
            />
            {getFieldError('Address', 'address') && (
              <p className="mt-1 text-xs text-red-600">{getFieldError('Address', 'address')}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">Car Make / Model *</label>
              <input
                type="text"
                placeholder="e.g. Toyota Supra MK4"
                value={form.carMakeModel}
                onChange={(e) => setForm({ ...form, carMakeModel: e.target.value })}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm"
              />
              {getFieldError('CarMakeModel', 'carMakeModel') && (
                <p className="mt-1 text-xs text-red-600">{getFieldError('CarMakeModel', 'carMakeModel')}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">Plate Number *</label>
              <input
                type="text"
                placeholder="e.g. ABC 1234"
                value={form.plateNumber}
                onChange={(e) => setForm({ ...form, plateNumber: e.target.value })}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm uppercase"
              />
              {getFieldError('PlateNumber', 'plateNumber') && (
                <p className="mt-1 text-xs text-red-600">{getFieldError('PlateNumber', 'plateNumber')}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700">Type</label>
              <select
                value={form.registrationType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm"
              >
                <option value="Exhibitor">Exhibitor</option>
                <option value="Competitor">Competitor</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">Fee (₱)</label>
              <input
                type="number"
                step="0.01"
                value={form.registrationFee}
                onChange={(e) => setForm({ ...form, registrationFee: e.target.value })}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">Amount Paid (₱)</label>
              <input
                type="number"
                step="0.01"
                value={form.amountPaid}
                onChange={(e) => setForm({ ...form, amountPaid: e.target.value })}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm"
              />
              {getFieldError('AmountPaid', 'amountPaid') && (
                <p className="mt-1 text-xs text-red-600">{getFieldError('AmountPaid', 'amountPaid')}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-[#ebe9e4] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#e5e2dc] bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-[#b91216] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#9f1014] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}