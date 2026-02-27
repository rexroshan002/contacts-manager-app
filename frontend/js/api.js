/**
 * Contacts API Client
 * Orchestrates communication with the Express backend.
 */

// Placeholder for your production URL (e.g., https://your-app-name.onrender.com)
const PRODUCTION_API_URL = 'https://your-backend-api-url.com';

const IS_LOCALHOST = 
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1';

// Automatically targets the local port 3000 or your production host
const API_BASE_URL = IS_LOCALHOST 
    ? 'http://localhost:3000' 
    : PRODUCTION_API_URL;

class ContactsAPI {
    /**
     * @param {string} baseUrl - The root URL of the API server
     */
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    /**
     * Checks if the API is configured for the environment.
     * Prevents requests if the PRODUCTION_API_URL hasn't been updated.
     */
    apiAvailable() {
        if (IS_LOCALHOST) return true;
        return Boolean(this.baseUrl) && this.baseUrl !== 'https://your-backend-api-url.com';
    }

    /**
     * Standardized internal fetch wrapper for professional error handling.
     * Matches the JSON response structure of your Express server.
     */
    async #fetchJSON(endpoint, options = {}) {
        if (!this.apiAvailable()) {
            throw new Error('API URL not configured for production. Please update api.js.');
        }

        const url = `${this.baseUrl}${endpoint}`;
        const defaultHeaders = { 'Content-Type': 'application/json' };

        try {
            const response = await fetch(url, {
                ...options,
                headers: { ...defaultHeaders, ...options.headers }
            });

            // Handle the 204 No Content response from your DELETE route
            if (response.status === 204) return true;
            
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'The server encountered an error.');
            }
            
            return data;
        } catch (error) {
            console.error(`[API Error] ${options.method || 'GET'} ${endpoint}:`, error.message);
            throw error;
        }
    }

    /**
     * GET /contacts
     */
    async getAllContacts() {
        return this.#fetchJSON('/contacts');
    }

    /**
     * POST /contacts
     */
    async createContact(contact) {
        return this.#fetchJSON('/contacts', {
            method: 'POST',
            body: JSON.stringify(contact)
        });
    }

    /**
     * PUT /contacts/:id
     */
    async updateContact(id, contact) {
        return this.#fetchJSON(`/contacts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(contact)
        });
    }

    /**
     * DELETE /contacts/:id
     */
    async deleteContact(id) {
        return this.#fetchJSON(`/contacts/${id}`, {
            method: 'DELETE'
        });
    }
}

// Export a single instance for use across the application
const api = new ContactsAPI(API_BASE_URL);