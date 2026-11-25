import './LoadingState.css';

export default function LoadingScreen() {
  return (
    <main className="loading-screen" role="status" aria-live="polite">
      <div className="loading-content">
        <span className="loading-spinner" aria-hidden="true" />
        <h1>Loading registrations...</h1>
        <p>Preparing your Dashboard, Please wait.</p>
      </div>
    </main>
  );
}
