/**
 * Debug utility functions for tracking application issues
 */

// Utility for consistent debug logging
export const debugLog = (component, message, data) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${component}] ${message}`, data || '');
  }
};

// Enhanced debug log with timestamp
export const debugLogWithTime = (component, message, data) => {
  if (process.env.NODE_ENV === 'development') {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${component}] ${message}`, data || '');
  }
};

// Inspect DOM elements and log issues
export const inspectElements = (selector) => {
  if (process.env.NODE_ENV === 'development') {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      console.log(`No elements found matching selector: ${selector}`);
    } else {
      console.log(`Found ${elements.length} elements matching selector: ${selector}`, elements);

      // Check for potential issues
      elements.forEach(el => {
        // Check for class attribute instead of className
        if (el.hasAttribute('class') && el.tagName !== 'svg' && el.tagName !== 'path') {
          console.warn('Element using class attribute instead of className:', el);
        }
      });
    }
  }
};

/**
 * Monitor React component lifecycle
 * @param {string} componentName - Name of the component
 * @param {string} lifecycleHook - Name of lifecycle hook
 * @param {object} props - Component props
 */
export const debugComponent = (componentName, lifecycleHook, props = {}) => {
  if (process.env.NODE_ENV === 'development') {
    debugLog(componentName, `${lifecycleHook}`, { props });
  }
};

/**
 * Debug event handlers
 * @param {string} component - Component name
 * @param {string} eventName - Name of the event
 * @param {Event} event - Event object
 */
export const debugEvent = (component, eventName, event) => {
  if (process.env.NODE_ENV === 'development') {
    debugLog(component, `Event "${eventName}" triggered`, {
      target: event.target.tagName,
      id: event.target.id,
      className: event.target.className
    });
  }
};

/**
 * Debug authentication flow
 * @param {string} stage - Current stage in the auth flow
 * @param {object} data - Relevant data for this stage
 */
export const debugAuth = (stage, data = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    // Filter sensitive data
    const filteredData = {...data};
    if (filteredData.password) filteredData.password = '***FILTERED***';
    if (filteredData.token) filteredData.token = '***FILTERED***';

    console.group(`Auth Flow: ${stage}`);
    console.log(filteredData);

    // Add additional auth debug info for specific stages
    if (stage === 'Email Verification Error') {
      console.warn('Common causes for email verification failures:');
      console.warn('1. Authentication methods not properly imported');
      console.warn('2. Network connectivity issues');
      console.warn('3. Project configuration problems');
    }

    console.groupEnd();
  }
};

/**
 * Debug user profile completion
 * @param {string} stage - Current stage in profile completion
 * @param {object} data - Profile data at this stage
 */
export const debugProfile = (stage, data = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    console.group(`Profile Completion: ${stage}`);
    console.log(data);
    console.groupEnd();
  }
};

/**
 * Debug registration process
 * @param {number} step - Current registration step
 * @param {string} action - Action being performed
 * @param {object} data - Form data at current step
 */
export const debugRegistration = (step, action, data = {}) => {
  if (process.env.NODE_ENV === 'development') {
    debugLogWithTime('Registration', `Step ${step}: ${action}`, {
      ...(data && typeof data === 'object' ? data : { data })
    });
  }
};

/**
 * Debug Google authentication flow specifically
 * @param {string} stage - Current stage in Google auth flow
 * @param {object} data - Relevant user data at this stage
 */
export const debugGoogleAuth = (stage, data = {}) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🔐 Google Auth Flow: ${stage}`);
    
    // Filter sensitive data for safer logging
    const filteredData = {...data};
    if (filteredData.token) filteredData.token = '***FILTERED***';
    if (filteredData.idToken) filteredData.idToken = '***FILTERED***';
    if (filteredData.accessToken) filteredData.accessToken = '***FILTERED***';
    
    // Log consent-related information with enhanced details
    if (filteredData.prompt) {
      console.log('🔐 Consent prompt mode:', filteredData.prompt);
    }
    
    if (filteredData.scopes) {
      console.log('📋 Requested scopes:', filteredData.scopes);
    }
    
    if (stage === 'OAuth Initialization') {
      console.log('🚀 Starting OAuth flow with consent parameters');
      console.log('⚙️ Provider configuration:', {
        prompt: filteredData.prompt,
        scopes: filteredData.scopes,
        accessType: 'offline',
        includeGrantedScopes: true
      });
    }
    
    if (stage === 'OAuth Success') {
      console.log('✅ OAuth authentication successful');
      console.log('👤 User profile obtained');
      console.log('🔑 Access token:', filteredData.access
