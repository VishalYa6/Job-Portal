/**
 * Application Configuration
 * 
 * Change these values to match your backend environment
 */

const config = {
  // API Configuration
  API: {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  },

  // App Configuration
  APP: {
    NAME: 'JobPortal',
    VERSION: '1.0.0',
    DESCRIPTION: 'A modern job portal application',
  },

  // Feature Flags
  FEATURES: {
    ENABLE_NOTIFICATIONS: false,
    ENABLE_ANALYTICS: false,
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
  },

  // Token
  TOKEN: {
    STORAGE_KEY: 'token',
    USER_STORAGE_KEY: 'user',
  },
};

export default config;
