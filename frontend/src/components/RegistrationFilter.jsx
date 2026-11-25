export default function RegistrationFilters({
  searchInput,
  onSearchChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
  onClearFilters,
}) {
  const hasFilters = Boolean(searchInput || typeFilter || statusFilter);

  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-[minmax(240px,1fr)_auto_auto_auto] sm:items-center">
      {/* Search participant name */}
      <div className="relative w-full">
        <label htmlFor="search-participant" className="sr-only">
          Search participant name
        </label>
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" x2="16.65" y1="21" y2="16.65" />
        </svg>
        <input
          id="search-participant"
          type="text"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search participant name..."
          className="w-full rounded-xl border border-[#e5e2dc] bg-[#fbfaf8] py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#284163] focus:ring-2 focus:ring-[#284163]/10"
        />
      </div>

      {/* Type dropdown */}
      <div>
        <label htmlFor="filter-type" className="sr-only">
          Type
        </label>
        <select
          id="filter-type"
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value)}
          className="w-full rounded-xl border border-[#e5e2dc] bg-[#fbfaf8] px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#284163] focus:ring-2 focus:ring-[#284163]/10 sm:w-auto"
        >
          <option value="">Type</option>
          <option value="Exhibitor">Exhibitor</option>
          <option value="Competitor">Competitor</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      {/* Status dropdown */}
      <div>
        <label htmlFor="filter-status" className="sr-only">
          Status
        </label>
        <select
          id="filter-status"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full rounded-xl border border-[#e5e2dc] bg-[#fbfaf8] px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#284163] focus:ring-2 focus:ring-[#284163]/10 sm:w-auto"
        >
          <option value="">Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="CheckedIn">Checked In</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Clear button */}
      <button
        type="button"
        onClick={onClearFilters}
        disabled={!hasFilters}
        className="rounded-xl border border-[#e5e2dc] bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-[#e6b7b8] hover:bg-[#fdf4f4] hover:text-[#b91216] disabled:cursor-not-allowed disabled:opacity-45"
      >
        Clear
      </button>
    </div>
  );
}