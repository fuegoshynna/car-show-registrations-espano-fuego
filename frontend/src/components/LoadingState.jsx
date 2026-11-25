import './LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <main className="loading-screen" role="status" aria-live="polite">
      <div className="loading-content">
        <span className="loading-spinner" aria-hidden="true" />
        <h1>Loading</h1>
        <p>Please wait before proceeding in the registrations. ;)</p>
      </div>
    </main>
  );
}
