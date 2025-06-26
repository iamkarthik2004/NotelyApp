import { useState, useEffect } from 'react';
import '../styles/Loading.css';

const Loading = ({ isLoading, serverStatus, onRetryConnect, retryAttempts, maxRetries }) => {
  const [loadingDots, setLoadingDots] = useState('');
  const [showRetry, setShowRetry] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Loading dots animation
  useEffect(() => {
    if (!isLoading) return;

    const intervalId = setInterval(() => {
      setLoadingDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, [isLoading]);

  // Time elapsed counter
  useEffect(() => {
    if (!isLoading || serverStatus === 'active') return;

    const intervalId = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isLoading, serverStatus]);

  // Show retry button after 20 seconds if still loading
  useEffect(() => {
    if (!isLoading) return;
    
    const timer = setTimeout(() => {
      setShowRetry(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  // Reset timeElapsed when retrying
  useEffect(() => {
    if (serverStatus === 'checking') {
      setTimeElapsed(0);
      setShowRetry(false);
    }
  }, [serverStatus]);

  if (!isLoading) return null;

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds} seconds`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <h2>Loading Notely App{loadingDots}</h2>
        
        {serverStatus === 'checking' && (
          <div className="status-message">
            <p>Connecting to server...</p>
            <p className="time-elapsed">Time elapsed: {formatTime(timeElapsed)}</p>
          </div>
        )}
        
        {serverStatus === 'inactive' && (
          <div className="server-status">
            <div className="status-icon">💤</div>
            <p className="server-message">
              Server is waking up from sleep mode
            </p>
            <p className="wake-up-message">This may take up to 30 seconds{loadingDots}</p>
            <div className="time-info">
              <p className="time-elapsed">Time elapsed: {formatTime(timeElapsed)}</p>
            </div>
            {retryAttempts > 0 && (
              <div className="retry-info">
                <p>Connection attempt {retryAttempts} of {maxRetries}</p>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{
                      width: `${(retryAttempts / maxRetries) * 100}%`,
                      backgroundColor: retryAttempts === maxRetries ? '#ff4444' : '#00F5FF'
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}

        {serverStatus === 'failed' && (
          <div className="server-status error">
            <div className="status-icon">⚠️</div>
            <p className="server-error">
              Connection failed after {maxRetries} attempts
            </p>
            <p className="error-details">
              The server is taking longer than expected to respond.
              This could be due to high traffic or server maintenance.
            </p>
            <div className="time-info">
              <p className="time-elapsed">Time elapsed: {formatTime(timeElapsed)}</p>
            </div>
            {showRetry && (
              <button className="retry-button" onClick={onRetryConnect}>
                <span>Try Again</span>
                <i className="fas fa-redo-alt"></i>
              </button>
            )}
          </div>
        )}
        
        <div className="loading-note">
          <p>
            <i className="fas fa-info-circle"></i>
            This app uses a free hosting service that automatically puts the server to sleep after inactivity.
            First-time loads may take longer while the server wakes up.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading; 