/**
 * Utility helpers
 */

const utils = {
    showMessage(message, type = 'success') {
        const container = document.getElementById('message-container');
        const div = document.createElement('div');
        div.className = `message ${type}`;
        div.textContent = message;

        container.appendChild(div);
        setTimeout(() => div.remove(), 4000);
    },

    validateContact(contact) {
        const errors = [];

        if (!contact.name || contact.name.length < 2)
            errors.push('Name must be at least 2 characters');

        if (!contact.phone || contact.phone.length < 10)
            errors.push('Phone must be at least 10 digits');

        if (
            !contact.email || 
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
        ) {
            errors.push('Valid email address is required');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    },

    setLoading(el, show) {
        el.hidden = !show;
    },

    escape(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
};