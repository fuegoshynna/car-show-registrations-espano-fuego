import './LoadingState.css'

function LoadingState({ message = 'Loading registrations...' }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-state-spinner" aria-hidden="true" />
      <span>{message}</span>
    </div>
  )
}

export default LoadingState