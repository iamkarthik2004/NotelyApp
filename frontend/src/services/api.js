import config from '../config/config';

// Use the API URL from the config
const API_URL = config.apiUrl;

/**
 * Check if the backend server is running
 * @returns {Promise<boolean>} - True if server is running, false otherwise
 */
export const checkServerStatus = async () => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Adding a timeout to the fetch using AbortController
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });
    
    return response.ok;
  } catch (error) {
    console.error('Server health check failed:', error);
    return false;
  }
};

/**
 * Wake up the server by sending a request to the wake-up endpoint
 * @returns {Promise<boolean>} - True if server woke up successfully
 */
export const wakeUpServer = async () => {
  try {
    const response = await fetch(`${API_URL}/wake-up`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to wake up server:', error);
    return false;
  }
};

/**
 * Get all notes from the backend
 * @returns {Promise<Array>} - Array of notes
 */
export const getNotes = async () => {
  try {
    const response = await fetch(`${API_URL}/api/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

/**
 * Create a new note
 * @param {Object} note - The note to create
 * @returns {Promise<Object>} - The created note
 */
export const createNote = async (note) => {
  try {
    const response = await fetch(`${API_URL}/api/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create note');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export default {
  checkServerStatus,
  wakeUpServer,
  getNotes,
  createNote
}; 