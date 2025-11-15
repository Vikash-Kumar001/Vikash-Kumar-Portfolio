/**
 * Track page view
 * @param {string} path - Page path
 */
export const trackPageView = (path) => {
  if (import.meta.env.VITE_PLAUSIBLE_DOMAIN) {
    // Plausible automatically tracks page views
    if (window.plausible) {
      window.plausible('pageview');
    }
  } else if (import.meta.env.VITE_GA4_MEASUREMENT_ID && window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA4_MEASUREMENT_ID, {
      page_path: path,
    });
  }
};

/**
 * Track custom event
 * @param {string} eventName - Event name
 * @param {Object} props - Event properties
 */
export const trackEvent = (eventName, props = {}) => {
  if (import.meta.env.VITE_PLAUSIBLE_DOMAIN && window.plausible) {
    window.plausible(eventName, { props });
  } else if (import.meta.env.VITE_GA4_MEASUREMENT_ID && window.gtag) {
    window.gtag('event', eventName, props);
  }
};

/**
 * Track form submission
 * @param {string} formName - Form name/identifier
 */
export const trackFormSubmission = (formName) => {
  trackEvent('form_submit', { form_name: formName });
};

/**
 * Track project view
 * @param {string} projectName - Project name
 */
export const trackProjectView = (projectName) => {
  trackEvent('project_view', { project_name: projectName });
};

