/**
 * Main Application Controller
 * Handles UI state + API orchestration
 */

class ContactsApp {
    constructor() {
        this.contacts = [];
        this.editingId = null;
        this.isSubmitting = false;

        // Elements
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.cancelBtn = document.getElementById('cancel-btn');
        this.contactsList = document.getElementById('contacts-list');
        this.countEl = document.getElementById('contacts-count');
        this.loadingEl = document.getElementById('loading-contacts');
        this.emptyEl = document.getElementById('no-contacts');
        this.errorEl = document.getElementById('error-contacts');

        this.init();
    }

    async init() {
        if (!api.apiAvailable()) {
            utils.showMessage(
                'API unavailable. Running in read-only mode.',
                'error'
            );
            this.disableForm();
            return;
        }

        await this.loadContacts();

        this.form.addEventListener('submit', e => this.handleSubmit(e));
        this.cancelBtn.addEventListener('click', () => this.resetForm());
    }

    async loadContacts() {
        try {
            utils.setLoading(this.loadingEl, true);
            this.contacts = await api.getAllContacts();
            this.render();
        } catch (err) {
            this.showError(err.message);
        } finally {
            utils.setLoading(this.loadingEl, false);
        }
    }

    render() {
        this.contactsList.innerHTML = '';
        this.countEl.textContent = this.contacts.length;

        if (this.contacts.length === 0) {
            this.emptyEl.hidden = false;
            return;
        }

        this.emptyEl.hidden = true;

        this.contacts.forEach(contact => {
            const card = this.createCard(contact);
            this.contactsList.appendChild(card);
        });
    }

    createCard(contact) {
        const div = document.createElement('div');
        div.className = 'contact-card';

        div.innerHTML = `
            <div class="contact-header">
                <div>
                    <div class="contact-name">${utils.escape(contact.name)}</div>
                    <div class="contact-details">
                        <div><strong>Phone:</strong> ${utils.escape(contact.phone)}</div>
                        ${contact.email ? `<div><strong>Email:</strong> ${utils.escape(contact.email)}</div>` : ''}
                    </div>
                </div>
                <div class="contact-actions">
                    <button class="btn btn-small btn-edit">Edit</button>
                    <button class="btn btn-small btn-delete">Delete</button>
                </div>
            </div>
        `;

        div.querySelector('.btn-edit').onclick = () => this.startEdit(contact);
        div.querySelector('.btn-delete').onclick = () => this.remove(contact.id);

        return div;
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.isSubmitting) return;

        const data = {
            name: this.form.name.value.trim(),
            phone: this.form.phone.value.trim(),
            email: this.form.email.value.trim()
        };

        const validation = utils.validateContact(data);
        if (!validation.isValid) {
            utils.showMessage(validation.errors[0], 'error');
            return;
        }

        try {
            this.setSubmitting(true);

            if (this.editingId) {
                const updated = await api.updateContact(this.editingId, data);
                this.contacts = this.contacts.map(c =>
                    c.id === this.editingId ? updated : c
                );
                utils.showMessage('Contact updated');
            } else {
                const created = await api.createContact(data);
                this.contacts.push(created);
                utils.showMessage('Contact added');
            }

            this.resetForm();
            this.render();
        } catch (err) {
            utils.showMessage(err.message, 'error');
        } finally {
            this.setSubmitting(false);
        }
    }

    async remove(id) {
        if (!confirm('Delete this contact?')) return;

        try {
            await api.deleteContact(id);
            this.contacts = this.contacts.filter(c => c.id !== id);
            this.render();
            utils.showMessage('Contact deleted');
        } catch (err) {
            utils.showMessage(err.message, 'error');
        }
    }

    startEdit(contact) {
        this.editingId = contact.id;
        this.form.name.value = contact.name;
        this.form.phone.value = contact.phone;
        this.form.email.value = contact.email || '';

        this.submitBtn.querySelector('.btn-text').textContent = 'Update Contact';
        this.cancelBtn.hidden = false;
        this.form.scrollIntoView({ behavior: 'smooth' });
    }

    resetForm() {
        this.editingId = null;
        this.form.reset();
        this.cancelBtn.hidden = true;
        this.submitBtn.querySelector('.btn-text').textContent = 'Add Contact';
    }

    setSubmitting(state) {
        this.isSubmitting = state;
        this.submitBtn.disabled = state;
        this.submitBtn.querySelector('.btn-text').hidden = state;
        this.submitBtn.querySelector('.btn-loader').hidden = !state;
    }

    disableForm() {
        [...this.form.elements].forEach(el => el.disabled = true);
    }

    showError(msg) {
        this.errorEl.textContent = msg;
        this.errorEl.hidden = false;
    }
}

document.addEventListener('DOMContentLoaded', () => new ContactsApp());