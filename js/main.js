/**
 * CDN Example JavaScript Library
 * Version: 1.0.0
 */

(function(window) {
  'use strict';

  // CDN Utilities
  const CDN = {
    version: '1.0.0',
    
    /**
     * Initialize the library
     */
    init: function() {
      console.log('CDN Library v' + this.version + ' initialized');
    },
    
    /**
     * Utility function to load external scripts dynamically
     * @param {string} url - The URL of the script to load
     * @param {function} callback - Callback function after script loads
     */
    loadScript: function(url, callback) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = callback || function() {};
      document.head.appendChild(script);
    },
    
    /**
     * Utility function to load external stylesheets dynamically
     * @param {string} url - The URL of the stylesheet to load
     */
    loadStylesheet: function(url) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
    },
    
    /**
     * Utility function to fetch JSON data
     * @param {string} url - The URL to fetch from
     * @returns {Promise} Promise that resolves with JSON data
     */
    fetchJSON: function(url) {
      return fetch(url)
        .then(response => response.json())
        .catch(error => {
          console.error('Error fetching JSON:', error);
          throw error;
        });
    }
  };

  // Expose CDN to global scope
  window.CDN = CDN;

  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      CDN.init();
    });
  } else {
    CDN.init();
  }

})(window);
