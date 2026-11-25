import { useState, useEffect, useCallback, useRef } from 'react';
import * as registrationsApi from '../Api/registrationApi.js';
import { useDebounce } from '../hooks/useDebounce.js';
import KpiCards from '../components/KpiCards.jsx';
import RegistrationFilters from '../components/RegistrationFilter.jsx';
import RegistrationTable from '../components/Registrationtable.jsx';
import Pagination from '../components/Pagination.jsx';
import NewRegistrationModal from '../components/NewRegistrationsModal.jsx';
import LoadingScreen from '../components/LoadingState.jsx';

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
  const [minimumLoadingTimeComplete, setMinimumLoadingTimeComplete] = useState(false);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumLoadingTimeComplete(true);
    }, 30_000);

    return () => clearTimeout(timer);
  }, []);

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

  if (!initialLoadComplete || !minimumLoadingTimeComplete) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#f1f3f5] px-4 py-5 text-slate-900 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <header className="relative isolate overflow-hidden rounded-[24px] bg-[#284163] px-6 py-7 text-white shadow-xl shadow-slate-900/10 sm:px-9 sm:py-8">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -right-10 -top-32 h-80 w-80 rounded-full border-[42px] border-white/[0.035]" />
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border border-white/[0.06]" />
            <div className="absolute inset-y-0 right-0 hidden w-[46%] bg-[linear-gradient(135deg,transparent_0%,transparent_43%,rgba(255,255,255,0.025)_43%,rgba(255,255,255,0.025)_44%,transparent_44%,transparent_54%,rgba(255,255,255,0.025)_54%,rgba(255,255,255,0.025)_55%,transparent_55%)] sm:block" />
          </div>
          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#b91216] text-white shadow-lg shadow-[#b91216]/20">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-[30px]">
                  Car Show <span className="text-[#f0b8b9]">2027</span>
                </h1>
                <p className="mt-1.5 text-sm text-slate-300">
                  Sorsogon City Coliseum <span className="mx-1.5 text-slate-500">/</span> Participant &amp; vehicle registry
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#b91216] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:bg-[#9f1014] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b91216]"
            >
              <span aria-hidden="true" className="text-lg leading-none">+</span>
              New Registration
            </button>
          </div>
        </header>

        <section aria-label="Registration summary" aria-busy={summaryLoading}>
          <KpiCards summary={summary} loading={summaryLoading} />
        </section>

        <section
          aria-labelledby="registrations-heading"
          aria-busy={loading}
          className="overflow-hidden rounded-[20px] border border-[#e5e2dc] bg-white shadow-sm shadow-slate-900/[0.035]"
        >
          <div className="border-b border-[#ebe9e4] px-5 py-5 sm:px-7">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b91216]">The entry list</p>
                <h2 id="registrations-heading" className="text-xl font-bold tracking-tight text-[#17212b]">
                  Registrations
                </h2>
              </div>
              <p className="text-xs font-medium text-slate-500">
                {data.totalCount.toLocaleString()} {data.totalCount === 1 ? 'vehicle' : 'vehicles'} registered
              </p>
            </div>
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

          <RegistrationTable
            items={data.items}
            loading={loading}
            error={error}
            onRetry={handleRefreshAll}
            onClearFilters={handleClearFilters}
            hasFilters={hasFilters}
            rowsCount={pageSize}
          />

          {!error && (
            <div className="border-t border-[#ebe9e4] bg-[#fdfdfc] px-5 py-4 sm:px-7">
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