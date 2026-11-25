import './ErrorState.css'

function ErrorState({
  title = 'Something went wrong',
  description = 'We couldn’t load the registrations. Please try again.',
  onRetry,
  retryLabel = 'Try again',
}) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="32" height="32">
          <path d="M12 3 2.5 20h19L12 3Z" />
          <path d="M12 9v5M12 17.5v.5" />
        </svg>
      </div>
      <h3 className="error-state-title">{title}</h3>
      <p className="error-state-description">{description}</p>
      {onRetry && (
        <button className="error-state-button" type="button" onClick={onRetry}>
          {retryLabel}
        </button>
      )}
    </div>
  )
}

export default ErrorState
