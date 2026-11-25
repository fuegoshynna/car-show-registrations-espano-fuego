import './EmptyState.css'

function EmptyState({
  title = 'No registrations match your filters',
  description = 'Try adjusting your search or filters.',
  onClearFilters,
  clearFiltersLabel = 'Clear filters',
}) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="32" height="32">
          <path d="M8 3h8M9 3v3h6V3M5 7h14l-1 13H6L5 7Z" />
          <path d="M9 11h6M9 15h4" />
        </svg>
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {onClearFilters && (
        <div className="empty-state-action">
          <button
            className="empty-state-button"
            type="button"
            onClick={onClearFilters}
          >
            {clearFiltersLabel}
          </button>
        </div>
      )}
    </div>
  )
}

export default EmptyState
