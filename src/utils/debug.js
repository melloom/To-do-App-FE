/**
 * Debug utility functions for tracking application issues
 */

// Utility for consistent debug logging
export const debugLog = (component, message, data) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${component}] ${message}`, data || '');
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
