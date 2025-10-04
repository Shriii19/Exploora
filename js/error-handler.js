/**
 * Global Error Handler for Travel Explorer
 * Provides centralized error handling and logging
 */

class ErrorHandler {
    constructor() {
        this.errors = [];
        this.init();
    }
    
    init() {
        // Global error handler for unhandled errors
        window.addEventListener('error', (event) => {
            this.logError({
                type: 'JavaScript Error',
                message: event.message,
                source: event.filename,
                line: event.lineno,
                column: event.colno,
                stack: event.error?.stack
            });
        });
        
        // Global handler for unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.logError({
                type: 'Unhandled Promise Rejection',
                message: event.reason?.message || event.reason,
                stack: event.reason?.stack
            });
        });
        
        console.log('🛡️ Error handler initialized');
    }
    
    /**
     * Log an error with context
     * @param {Object} error - Error information
     */
    logError(error) {
        const errorInfo = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            ...error
        };
        
        this.errors.push(errorInfo);
        
        // Keep only last 50 errors to prevent memory issues
        if (this.errors.length > 50) {
            this.errors = this.errors.slice(-50);
        }
        
        // Log to console in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.error('Error logged:', errorInfo);
        }
        
        // In production, you might want to send errors to a logging service
        // this.sendToLoggingService(errorInfo);
    }
    
    /**
     * Handle API errors consistently
     * @param {Error} error - API error
     * @param {string} context - Context where error occurred
     */
    handleApiError(error, context = 'API') {
        let userMessage = 'Service temporarily unavailable. Please try again later.';
        
        if (error.message.includes('404')) {
            userMessage = 'Requested information not found.';
        } else if (error.message.includes('401')) {
            userMessage = 'Authentication error. Please check API configuration.';
        } else if (error.message.includes('429')) {
            userMessage = 'Too many requests. Please wait a moment and try again.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
            userMessage = 'Network error. Please check your internet connection.';
        }
        
        this.logError({
            type: `${context} Error`,
            message: error.message,
            stack: error.stack,
            userMessage
        });
        
        return userMessage;
    }
    
    /**
     * Handle DOM errors safely
     * @param {Function} operation - DOM operation to perform
     * @param {string} context - Context description
     * @param {*} fallback - Fallback value if operation fails
     */
    safeDomOperation(operation, context = 'DOM Operation', fallback = null) {
        try {
            return operation();
        } catch (error) {
            this.logError({
                type: 'DOM Error',
                message: error.message,
                context,
                stack: error.stack
            });
            return fallback;
        }
    }
    
    /**
     * Get error summary for debugging
     */
    getErrorSummary() {
        const recent = this.errors.slice(-10);
        return {
            totalErrors: this.errors.length,
            recentErrors: recent,
            errorTypes: [...new Set(this.errors.map(e => e.type))]
        };
    }
    
    /**
     * Clear error log
     */
    clearErrors() {
        this.errors = [];
    }
}

// Create global instance
const errorHandler = new ErrorHandler();

// Utility functions for common error handling patterns
export function safeQuerySelector(selector, context = document) {
    return errorHandler.safeDomOperation(
        () => context.querySelector(selector),
        `Query selector: ${selector}`
    );
}

export function safeQuerySelectorAll(selector, context = document) {
    return errorHandler.safeDomOperation(
        () => Array.from(context.querySelectorAll(selector)),
        `Query selector all: ${selector}`,
        []
    );
}

export function safeElementOperation(element, operation, context = 'Element operation', fallback = null) {
    if (!element) {
        errorHandler.logError({
            type: 'DOM Error',
            message: 'Element is null or undefined',
            context
        });
        return fallback;
    }
    
    return errorHandler.safeDomOperation(operation, context, fallback);
}

export function safeApiCall(apiPromise, context = 'API Call') {
    return apiPromise.catch(error => {
        const userMessage = errorHandler.handleApiError(error, context);
        throw new Error(userMessage);
    });
}

export function safeLocalStorage(operation, key, defaultValue = null) {
    return errorHandler.safeDomOperation(() => {
        if (operation === 'get') {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } else if (operation === 'set') {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return true;
        } else if (operation === 'remove') {
            localStorage.removeItem(key);
            return true;
        }
    }, `LocalStorage ${operation}: ${key}`, defaultValue);
}

// Export error handler instance
export { errorHandler };

// Make available globally for debugging
window.ErrorHandler = errorHandler;