import { useState, useEffect, useCallback, useRef } from 'react';
import * as registrationsApi from '../api/registrationsApi.js';
import { useDebounce } from '../hooks/useDebounce.js';
import KpiCards from '../components/KpiCards.jsx';
import RegistrationFilters from '../components/RegistrationFilters.jsx';
import RegistrationTable from '../components/Registrationtable.jsx';
import Pagination from '../components/Pagination.jsx';
import NewRegistrationModal from '../components/NewRegistrationModal.jsx';
import LoadingScreen from '../components/LoadingScreen.jsx';

export default function RegistrationsPage() {
  const [searchInput, setSearchInput] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const debouncedName = useDebounce(searchInput, 400);

  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const initialRequestsPending = useRef(new Set(['summary', 'registrations']));

  const [data, setData] = useState({
    items: [],
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const markInitialRequestComplete = useCallback((request) => {
    initialRequestsPending.current.delete(request);
    if (initialRequestsPending.current.size === 0) {
      setInitialLoadComplete(true);
    }
  }, []);

  const loadSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const res = await registrationsApi.getSummary();
      setSummary(res);
    } catch {
      // Handled via table error state if API is down
    } finally {
      setSummaryLoading(false);
      markInitialRequestComplete('summary');
    }
  }, [markInitialRequestComplete]);

  const loadRegistrations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await registrationsApi.getRegistrations({
        participantName: debouncedName,
        type: typeFilter,
        status: statusFilter,
        page,
        pageSize,
      });
      setData(res);
    } catch (err) {
      setError(err.message || 'Cannot reach the API...');
    } finally {
      setLoading(false);
      markInitialRequestComplete('registrations');
    }
  }, [debouncedName, typeFilter, statusFilter, page, pageSize, markInitialRequestComplete]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadSummary();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadSummary]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadRegistrations();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadRegistrations]);

  const handleSearchChange = (val) => {
    setSearchInput(val);
    setPage(1);
  };

  const handleTypeChange = (val) => {
    setTypeFilter(val);
    setPage(1);
  };

  const handleStatusChange = (val) => {
    setStatusFilter(val);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setTypeFilter('');
    setStatusFilter('');
    setPage(1);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPage(1);
  };

  const handleRefreshAll = () => {
    loadSummary();
    loadRegistrations();
  };

  const hasFilters = Boolean(searchInput || typeFilter || statusFilter);

  if (!initialLoadComplete) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        {/* Top Header Bar (Matches Wireframe) */}
        <header className="flex flex-col gap-4 rounded-xl border border-slate-300 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 text-slate-700">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                Car Show 2027
              </h1>
              <p className="text-xs text-slate-500">
                Sorsogon City Coliseum • Participant &amp; Vehicle Registry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              <span aria-hidden="true" className="text-base leading-none">+</span>
              New Registration
            </button>
          </div>
        </header>

        {/* 5 KPI Cards Row (No Extra Section Title Above) */}
        <section aria-label="Registration summary" aria-busy={summaryLoading}>
          <KpiCards summary={summary} loading={summaryLoading} />
        </section>

        {/* Main Registrations Card */}
        <section
          aria-labelledby="registrations-heading"
          aria-busy={loading}
          className="overflow-hidden rounded-xl border border-slate-300 bg-white"
        >
          {/* Title on Left, Filters Inline on Right (Matches Wireframe) */}
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <h2
              id="registrations-heading"
              className="text-lg font-bold tracking-tight text-slate-900"
            >
              Registrations
            </h2>

            <RegistrationFilters
              searchInput={searchInput}
              onSearchChange={handleSearchChange}
              typeFilter={typeFilter}
              onTypeChange={handleTypeChange}
              statusFilter={statusFilter}
              onStatusChange={handleStatusChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* 8-Column Data Table + Loading / Empty / Error States */}
          <RegistrationTable
            items={data.items}
            loading={loading}
            error={error}
            onRetry={handleRefreshAll}
            onClearFilters={handleClearFilters}
            hasFilters={hasFilters}
            rowsCount={pageSize}
          />

          {/* Footer Pagination Bar */}
          {!error && (
            <div className="border-t border-slate-200 bg-white px-5 py-3">
              <Pagination
                page={data.page}
                pageSize={data.pageSize}
                totalCount={data.totalCount}
                totalPages={data.totalPages}
                loading={loading}
                onPageChange={setPage}
                onPageSizeChange={handlePageSizeChange}
              />
            </div>
          )}
        </section>
      </div>

      <NewRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleRefreshAll}
        onCreate={registrationsApi.createRegistration}
      />
    </div>
  );
}