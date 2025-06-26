/**
 * Application Configuration
 */
const config = {
  // Backend API URL - Using local backend
  apiUrl: 'https://backend-notify-f8a9.onrender.com',
  
  // Server wake up settings
  server: {
    // Time to wait for server to wake up (in milliseconds)
    wakeUpTimeout: 30000,
    
    // How often to retry connecting to the server (in milliseconds)
    retryInterval: 5000,
    
    // Maximum number of retries before showing error
    maxRetries: 6
  }
};

export default config; 