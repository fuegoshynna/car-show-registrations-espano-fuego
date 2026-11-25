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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-lg rounded-lg border border-slate-300 bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-base font-bold text-slate-900">New Registration</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded px-2 py-1 text-sm font-semibold text-slate-500 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        {generalError && (
          <div className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-sm">
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

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-slate-300 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}