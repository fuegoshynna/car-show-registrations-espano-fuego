import './ErrorState.css'

export default function ErrorState({ error, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <p className="error-state-title">Cannot reach the API...</p>
      <p className="error-state-message">
        {error || 'Please check your connection and try again.'}
      </p>
      {onRetry && (
        <button className="error-state-button" type="button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}
