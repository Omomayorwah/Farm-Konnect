/**
 * API Service for Farm Konnect
 * Handles all API communication with the backend
 * Configured for production deployment with environment variable support
 */

// Get API base URL from environment variable or default to localhost
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => {
  return localStorage.getItem('authToken');
};

const setToken = (token) => {
  localStorage.setItem('authToken', token);
};

const removeToken = () => {
  localStorage.removeItem('authToken');
};

const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Add authorization header if token exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

const apiRequestFormData = async (endpoint, formData, options = {}) => {
  const token = getToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    method: options.method || 'POST',
    headers: {
      ...options.headers,
    },
    body: formData,
  };

  // Add authorization header if token exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// ==================== AUTHENTICATION ====================

/**
 * Register a new user
 * @param {Object} userData - { email, password, type }
 * @returns {Promise<Object>} - { message, token, user }
 */
export const register = async (userData) => {
  const data = await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  
  if (data.token) {
    setToken(data.token);
  }
  
  return data;
};

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} - { message, token, user }
 */
export const login = async (credentials) => {
  const data = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  
  if (data.token) {
    setToken(data.token);
  }
  
  return data;
};

/**
 * Get current authenticated user
 * @returns {Promise<Object>} - { user }
 */
export const getCurrentUser = async () => {
  return await apiRequest('/auth/me');
};

/**
 * Logout user (removes token)
 */
export const logout = () => {
  removeToken();
};

// ==================== USERS ====================

/**
 * Update user profile
 * @param {Object} profileData - Profile data to update
 * @returns {Promise<Object>} - Updated user data
 */
export const updateProfile = async (profileData) => {
  return await apiRequest('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
};

/**
 * Get user by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - User data
 */
export const getUser = async (userId) => {
  return await apiRequest(`/users/${userId}`);
};

// ==================== LISTINGS ====================

/**
 * Create a new listing
 * @param {Object} listingData - Listing data
 * @param {File[]} photos - Array of photo files (optional)
 * @returns {Promise<Object>} - { message, listing }
 */
export const createListing = async (listingData, photos = []) => {
  if (photos.length > 0) {
    const formData = new FormData();
    
    // Add listing data fields
    Object.keys(listingData).forEach(key => {
      const value = listingData[key];
      if (value === null || value === undefined) {
        return; // Skip null/undefined values
      }
      
      if (key === 'features' && Array.isArray(value)) {
        // For arrays in FormData, append each item separately
        value.forEach(item => {
          formData.append('features[]', item);
        });
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        // Stringify objects
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    
    // Add photos
    photos.forEach(photo => {
      formData.append('photos', photo);
    });
    
    return await apiRequestFormData('/listings', formData, { method: 'POST' });
  } else {
    return await apiRequest('/listings', {
      method: 'POST',
      body: JSON.stringify(listingData),
    });
  }
};

/**
 * Get all approved listings
 * @returns {Promise<Object>} - { listings }
 */
export const getAllListings = async () => {
  return await apiRequest('/listings');
};

/**
 * Get listing by ID
 * @param {string} listingId - Listing ID
 * @returns {Promise<Object>} - { listing }
 */
export const getListingById = async (listingId) => {
  return await apiRequest(`/listings/${listingId}`);
};

/**
 * Get user's listings
 * @returns {Promise<Object>} - { listings }
 */
export const getMyListings = async () => {
  return await apiRequest('/listings/my/all');
};

/**
 * Update listing
 * @param {string} listingId - Listing ID
 * @param {Object} listingData - Updated listing data
 * @param {File[]} photos - Array of new photo files (optional)
 * @returns {Promise<Object>} - { message, listing }
 */
export const updateListing = async (listingId, listingData, photos = []) => {
  if (photos.length > 0) {
    const formData = new FormData();
    
    // Add listing data fields
    Object.keys(listingData).forEach(key => {
      const value = listingData[key];
      if (value === null || value === undefined) {
        return; // Skip null/undefined values
      }
      
      if (key === 'features' && Array.isArray(value)) {
        // For arrays in FormData, append each item separately
        value.forEach(item => {
          formData.append('features[]', item);
        });
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        // Stringify objects
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    
    // Add photos
    photos.forEach(photo => {
      formData.append('photos', photo);
    });
    
    return await apiRequestFormData(`/listings/${listingId}`, formData, { method: 'PUT' });
  } else {
    return await apiRequest(`/listings/${listingId}`, {
      method: 'PUT',
      body: JSON.stringify(listingData),
    });
  }
};

/**
 * Delete listing
 * @param {string} listingId - Listing ID
 * @returns {Promise<Object>} - { message }
 */
export const deleteListing = async (listingId) => {
  return await apiRequest(`/listings/${listingId}`, {
    method: 'DELETE',
  });
};

// ==================== MESSAGES ====================

/**
 * Send a message
 * @param {Object} messageData - { listingId, toId, content }
 * @returns {Promise<Object>} - { message, message }
 */
export const sendMessage = async (messageData) => {
  return await apiRequest('/messages', {
    method: 'POST',
    body: JSON.stringify(messageData),
  });
};

/**
 * Get messages for a listing
 * @param {string} listingId - Listing ID
 * @returns {Promise<Object>} - { messages }
 */
export const getListingMessages = async (listingId) => {
  return await apiRequest(`/messages/listing/${listingId}`);
};

/**
 * Get all user messages
 * @returns {Promise<Object>} - { messages }
 */
export const getAllMessages = async () => {
  return await apiRequest('/messages/my/all');
};

/**
 * Mark message as read
 * @param {string} messageId - Message ID
 * @returns {Promise<Object>} - { message, message }
 */
export const markMessageAsRead = async (messageId) => {
  return await apiRequest(`/messages/${messageId}/read`, {
    method: 'PUT',
  });
};

// ==================== ADMIN ====================

/**
 * Get all users (Admin only)
 * @returns {Promise<Object>} - { users }
 */
export const getUsers = async () => {
  return await apiRequest('/admin/users');
};

/**
 * Update user status (Admin only)
 * @param {string} userId - User ID
 * @param {string} status - New status ('approved', 'pending', 'rejected')
 * @returns {Promise<Object>} - Updated user data
 */
export const updateUserStatus = async (userId, status) => {
  return await apiRequest(`/admin/users/${userId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
};

/**
 * Get all listings (Admin only)
 * @returns {Promise<Object>} - { listings }
 */
export const getAllListingsAdmin = async () => {
  return await apiRequest('/admin/listings');
};

/**
 * Update listing status (Admin only)
 * @param {string} listingId - Listing ID
 * @param {string} status - New status ('approved', 'pending', 'rejected')
 * @returns {Promise<Object>} - Updated listing data
 */
export const updateListingStatus = async (listingId, status) => {
  return await apiRequest(`/admin/listings/${listingId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
};

/**
 * Get platform statistics (Admin only)
 * @returns {Promise<Object>} - Platform statistics
 */
export const getStats = async () => {
  return await apiRequest('/admin/stats');
};

// ==================== TRANSACTIONS ====================

/**
 * Create a transaction (Admin only)
 * @param {Object} transactionData - Transaction data
 * @returns {Promise<Object>} - Created transaction
 */
export const createTransaction = async (transactionData) => {
  return await apiRequest('/transactions', {
    method: 'POST',
    body: JSON.stringify(transactionData),
  });
};

/**
 * Get transaction by ID
 * @param {string} transactionId - Transaction ID
 * @returns {Promise<Object>} - Transaction data
 */
export const getTransaction = async (transactionId) => {
  return await apiRequest(`/transactions/${transactionId}`);
};

// ==================== HEALTH CHECK ====================

/**
 * Check API health status
 * @returns {Promise<Object>} - { status, message }
 */
export const checkHealth = async () => {
  return await apiRequest('/health');
};

// Export token management functions for external use
export { getToken, setToken, removeToken };

// Export API base URL for reference
export { API_BASE_URL };

