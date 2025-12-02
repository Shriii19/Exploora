// Toast Notification System
(function() {
    'use strict';

    class ToastNotification {
        constructor() {
            this.container = this.createContainer();
            this.toasts = [];
        }

        createContainer() {
            let container = document.querySelector('.toast-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'toast-container';
                document.body.appendChild(container);
            }
            return container;
        }

        show(options = {}) {
            const {
                title = '',
                message = '',
                type = 'info',
                duration = 4000,
                closable = true
            } = options;

            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            
            const icons = {
                success: 'fa-check',
                error: 'fa-times',
                warning: 'fa-exclamation',
                info: 'fa-info'
            };

            toast.innerHTML = `
                <div class="toast-icon">
                    <i class="fas ${icons[type]}"></i>
                </div>
                <div class="toast-content">
                    ${title ? `<div class="toast-title">${title}</div>` : ''}
                    <div class="toast-message">${message}</div>
                </div>
                ${closable ? '<button class="toast-close" aria-label="Close"><i class="fas fa-times"></i></button>' : ''}
            `;

            this.container.appendChild(toast);
            this.toasts.push(toast);

            // Trigger animation
            requestAnimationFrame(() => {
                toast.classList.add('show');
            });

            // Close button handler
            if (closable) {
                const closeBtn = toast.querySelector('.toast-close');
                closeBtn.addEventListener('click', () => this.hide(toast));
            }

            // Auto-hide
            if (duration > 0) {
                setTimeout(() => this.hide(toast), duration);
            }

            return toast;
        }

        hide(toast) {
            toast.classList.remove('show');
            toast.classList.add('hide');
            
            setTimeout(() => {
                toast.remove();
                this.toasts = this.toasts.filter(t => t !== toast);
            }, 400);
        }

        success(message, title = 'Success') {
            return this.show({ title, message, type: 'success' });
        }

        error(message, title = 'Error') {
            return this.show({ title, message, type: 'error' });
        }

        warning(message, title = 'Warning') {
            return this.show({ title, message, type: 'warning' });
        }

        info(message, title = 'Info') {
            return this.show({ title, message, type: 'info' });
        }

        clearAll() {
            this.toasts.forEach(toast => this.hide(toast));
        }
    }

    // Create global instance
    window.Toast = new ToastNotification();

    // Example usage on form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (this.id === 'newsletterForm') {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                window.Toast.success(`You're subscribed! Check ${email} for confirmation.`, 'Welcome Aboard!');
                this.reset();
            }
        });
    });
})();
