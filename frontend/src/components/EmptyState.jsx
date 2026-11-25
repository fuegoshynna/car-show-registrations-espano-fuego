import './EmptyState.css'

export default function EmptyState({ hasFilters, onClearFilters }) {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <div className="empty-state-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M8 6h13M8 12h13M8 18h13" />
          <path d="M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
        </svg>
      </div>
      <p className="empty-state-title">
        {hasFilters ? 'No registrations match your filters' : 'No registrations yet'}
      </p>
      <p className="empty-state-description">
        {hasFilters
          ? 'Try adjusting your search or clearing the selected filters.'
          : 'New entries will appear here once they have been registered.'}
      </p>
      {hasFilters && onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="empty-state-button"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
