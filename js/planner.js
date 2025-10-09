// Trip Planner JavaScript
class TripPlanner {
    constructor() {
        this.currentTrip = null;
        this.currentDayIndex = null;
        this.init();
    }

    init() {
        this.loadSavedTrips();
        this.attachEventListeners();
        this.checkForAutoSave();
    }

    attachEventListeners() {
        // Main actions
        document.getElementById('newTripBtn')?.addEventListener('click', () => this.createNewTrip());
        document.getElementById('startPlanningBtn')?.addEventListener('click', () => this.createNewTrip());
        document.getElementById('loadTripBtn')?.addEventListener('click', () => this.openLoadTripModal());
        document.getElementById('saveTripBtn')?.addEventListener('click', () => this.saveTrip());
        document.getElementById('exportTripBtn')?.addEventListener('click', () => this.exportToPDF());
        document.getElementById('shareTripBtn')?.addEventListener('click', () => this.openShareTripModal());
        
        // Timeline actions
        document.getElementById('addDayBtn')?.addEventListener('click', () => this.addDay());
        document.getElementById('collapseAllBtn')?.addEventListener('click', () => this.collapseAllDays());
        
        // Trip details form
        document.getElementById('tripName')?.addEventListener('input', (e) => this.updateTripDetails());
        document.getElementById('tripDestination')?.addEventListener('input', (e) => {
            this.updateTripDetails();
            this.loadSuggestions(e.target.value);
        });
        document.getElementById('tripStartDate')?.addEventListener('change', () => this.updateTripDetails());
        document.getElementById('tripEndDate')?.addEventListener('change', () => this.updateTripDetails());
        document.getElementById('tripBudget')?.addEventListener('input', () => this.updateTripDetails());
        
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = btn.dataset.type;
                this.quickAddActivity(type);
            });
        });
        
        // Activity form
        document.getElementById('activityForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addActivity();
        });

        // Auto-save every 30 seconds
        setInterval(() => {
            if (this.currentTrip) {
                this.autoSave();
            }
        }, 30000);
    }

    createNewTrip() {
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
        
        this.currentTrip = {
            id: Date.now().toString(),
            name: '',
            destination: '',
            startDate: today,
            endDate: tomorrow,
            budget: 0,
            days: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Add first day
        this.addDay();
        
        // Update UI
        document.getElementById('emptyState').style.display = 'none';
        document.getElementById('itineraryTimeline').style.display = 'block';
        document.getElementById('tripStartDate').value = today;
        document.getElementById('tripEndDate').value = tomorrow;
        
        this.enableButtons();
        this.updateStats();
        this.showNotification('New trip created!', 'success');
    }

    addDay() {
        if (!this.currentTrip) return;

        const dayNumber = this.currentTrip.days.length + 1;
        const dayDate = this.calculateDayDate(dayNumber);
        
        const newDay = {
            id: Date.now().toString(),
            dayNumber: dayNumber,
            date: dayDate,
            activities: []
        };

        this.currentTrip.days.push(newDay);
        this.renderDay(newDay);
        this.updateStats();
        this.autoSave();
    }

    calculateDayDate(dayNumber) {
        const startDate = document.getElementById('tripStartDate').value;
        if (!startDate) return '';
        
        const date = new Date(startDate);
        date.setDate(date.getDate() + (dayNumber - 1));
        return date.toISOString().split('T')[0];
    }

    renderDay(day) {
        const container = document.getElementById('daysContainer');
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        dayCard.dataset.dayId = day.id;
        
        const formattedDate = day.date ? new Date(day.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }) : 'Date not set';
        
        const totalCost = day.activities.reduce((sum, activity) => sum + (parseFloat(activity.cost) || 0), 0);
        const totalActivities = day.activities.length;
        
        dayCard.innerHTML = `
            <div class="day-header" onclick="tripPlanner.toggleDay('${day.id}')">
                <div class="day-info">
                    <div class="day-number">${day.dayNumber}</div>
                    <div class="day-details">
                        <h3>Day ${day.dayNumber}</h3>
                        <div class="day-meta">
                            <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                            <span><i class="fas fa-tasks"></i> ${totalActivities} activities</span>
                            <span><i class="fas fa-dollar-sign"></i> $${totalCost.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div class="day-actions" onclick="event.stopPropagation()">
                    <button class="day-action-btn primary" onclick="tripPlanner.openActivityModal('${day.id}')">
                        <i class="fas fa-plus"></i>
                        Add Activity
                    </button>
                    <button class="day-action-btn" onclick="tripPlanner.deleteDay('${day.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="day-activities">
                <div class="activities-list" id="activities-${day.id}">
                    ${day.activities.length > 0 ? this.renderActivities(day.activities, day.id) : `
                        <div class="activities-empty">
                            <i class="fas fa-clipboard-list"></i>
                            <p>No activities yet. Click "Add Activity" to start planning this day.</p>
                        </div>
                    `}
                </div>
            </div>
        `;
        
        container.appendChild(dayCard);
    }

    renderActivities(activities, dayId) {
        return activities.map(activity => `
            <div class="activity-item" data-activity-id="${activity.id}">
                <div class="activity-icon ${activity.type}">
                    <i class="${this.getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-header">
                        <div>
                            <div class="activity-title">${activity.name}</div>
                            ${activity.time ? `<div class="activity-time"><i class="fas fa-clock"></i> ${activity.time}</div>` : ''}
                        </div>
                    </div>
                    <div class="activity-meta">
                        ${activity.duration ? `<div class="activity-meta-item"><i class="fas fa-hourglass-half"></i> ${activity.duration}h</div>` : ''}
                        ${activity.cost ? `<div class="activity-meta-item"><i class="fas fa-dollar-sign"></i> $${parseFloat(activity.cost).toFixed(2)}</div>` : ''}
                        ${activity.location ? `<div class="activity-meta-item"><i class="fas fa-map-marker-alt"></i> ${activity.location}</div>` : ''}
                    </div>
                    ${activity.notes ? `<div class="activity-notes">${activity.notes}</div>` : ''}
                    ${activity.url ? `<div class="activity-notes"><i class="fas fa-link"></i> <a href="${activity.url}" target="_blank">More info</a></div>` : ''}
                </div>
                <div class="activity-actions">
                    <button class="activity-action-btn" onclick="tripPlanner.editActivity('${dayId}', '${activity.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="activity-action-btn danger" onclick="tripPlanner.deleteActivity('${dayId}', '${activity.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    getActivityIcon(type) {
        const icons = {
            sightseeing: 'fas fa-camera',
            food: 'fas fa-utensils',
            shopping: 'fas fa-shopping-bag',
            entertainment: 'fas fa-theater-masks',
            transport: 'fas fa-plane',
            accommodation: 'fas fa-hotel',
            other: 'fas fa-circle'
        };
        return icons[type] || icons.other;
    }

    toggleDay(dayId) {
        const dayCard = document.querySelector(`[data-day-id="${dayId}"]`);
        if (dayCard) {
            dayCard.classList.toggle('collapsed');
        }
    }

    collapseAllDays() {
        document.querySelectorAll('.day-card').forEach(card => {
            card.classList.add('collapsed');
        });
    }

    openActivityModal(dayId) {
        this.currentDayIndex = this.currentTrip.days.findIndex(d => d.id === dayId);
        document.getElementById('activityModal').classList.add('active');
        document.getElementById('activityForm').reset();
    }

    closeActivityModal() {
        document.getElementById('activityModal').classList.remove('active');
        this.currentDayIndex = null;
    }

    quickAddActivity(type) {
        if (!this.currentTrip || this.currentTrip.days.length === 0) {
            this.showNotification('Please create a trip and add a day first', 'warning');
            return;
        }
        
        // Open modal with pre-selected type
        this.currentDayIndex = 0; // Add to first day by default
        document.getElementById('activityType').value = type;
        this.openActivityModal(this.currentTrip.days[0].id);
    }

    addActivity() {
        if (this.currentDayIndex === null) return;

        const activity = {
            id: Date.now().toString(),
            name: document.getElementById('activityName').value,
            type: document.getElementById('activityType').value,
            time: document.getElementById('activityTime').value,
            duration: document.getElementById('activityDuration').value,
            cost: document.getElementById('activityCost').value,
            location: document.getElementById('activityLocation').value,
            notes: document.getElementById('activityNotes').value,
            url: document.getElementById('activityUrl').value
        };

        this.currentTrip.days[this.currentDayIndex].activities.push(activity);
        this.refreshDays();
        this.closeActivityModal();
        this.updateStats();
        this.autoSave();
        this.showNotification('Activity added!', 'success');
    }

    deleteActivity(dayId, activityId) {
        if (!confirm('Are you sure you want to delete this activity?')) return;

        const dayIndex = this.currentTrip.days.findIndex(d => d.id === dayId);
        if (dayIndex === -1) return;

        this.currentTrip.days[dayIndex].activities = this.currentTrip.days[dayIndex].activities.filter(
            a => a.id !== activityId
        );

        this.refreshDays();
        this.updateStats();
        this.autoSave();
        this.showNotification('Activity deleted', 'success');
    }

    deleteDay(dayId) {
        if (!confirm('Are you sure you want to delete this entire day?')) return;

        this.currentTrip.days = this.currentTrip.days.filter(d => d.id !== dayId);
        
        // Renumber days
        this.currentTrip.days.forEach((day, index) => {
            day.dayNumber = index + 1;
            day.date = this.calculateDayDate(index + 1);
        });

        this.refreshDays();
        this.updateStats();
        this.autoSave();
        this.showNotification('Day deleted', 'success');
    }

    refreshDays() {
        const container = document.getElementById('daysContainer');
        container.innerHTML = '';
        this.currentTrip.days.forEach(day => this.renderDay(day));
    }

    updateTripDetails() {
        if (!this.currentTrip) return;

        this.currentTrip.name = document.getElementById('tripName').value;
        this.currentTrip.destination = document.getElementById('tripDestination').value;
        this.currentTrip.startDate = document.getElementById('tripStartDate').value;
        this.currentTrip.endDate = document.getElementById('tripEndDate').value;
        this.currentTrip.budget = document.getElementById('tripBudget').value;
        this.currentTrip.updatedAt = new Date().toISOString();

        // Update day dates
        this.currentTrip.days.forEach((day, index) => {
            day.date = this.calculateDayDate(index + 1);
        });

        document.getElementById('timelineTripName').textContent = this.currentTrip.name || 'My Trip';
        this.updateStats();
        this.refreshDays();
    }

    updateStats() {
        if (!this.currentTrip) return;

        // Calculate duration
        const start = new Date(this.currentTrip.startDate);
        const end = new Date(this.currentTrip.endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        document.getElementById('tripDuration').textContent = `${days} days`;

        // Count unique destinations
        const destinations = new Set();
        this.currentTrip.days.forEach(day => {
            day.activities.forEach(activity => {
                if (activity.location) destinations.add(activity.location);
            });
        });
        document.getElementById('totalDestinations').textContent = `${destinations.size} destinations`;

        // Count activities
        const totalActivities = this.currentTrip.days.reduce((sum, day) => sum + day.activities.length, 0);
        document.getElementById('totalActivities').textContent = `${totalActivities} activities`;
    }

    saveTrip() {
        if (!this.currentTrip) return;

        const trips = this.getSavedTrips();
        const existingIndex = trips.findIndex(t => t.id === this.currentTrip.id);

        if (existingIndex >= 0) {
            trips[existingIndex] = this.currentTrip;
        } else {
            trips.push(this.currentTrip);
        }

        localStorage.setItem('savedTrips', JSON.stringify(trips));
        this.loadSavedTrips();
        this.showNotification('Trip saved successfully!', 'success');
    }

    autoSave() {
        if (!this.currentTrip) return;
        localStorage.setItem('currentTrip', JSON.stringify(this.currentTrip));
    }

    checkForAutoSave() {
        const savedTrip = localStorage.getItem('currentTrip');
        if (savedTrip) {
            const shouldLoad = confirm('You have an unsaved trip. Would you like to continue working on it?');
            if (shouldLoad) {
                this.loadTrip(JSON.parse(savedTrip));
            } else {
                localStorage.removeItem('currentTrip');
            }
        }
    }

    loadTrip(trip) {
        this.currentTrip = trip;
        
        // Update form
        document.getElementById('tripName').value = trip.name || '';
        document.getElementById('tripDestination').value = trip.destination || '';
        document.getElementById('tripStartDate').value = trip.startDate || '';
        document.getElementById('tripEndDate').value = trip.endDate || '';
        document.getElementById('tripBudget').value = trip.budget || '';
        
        // Update timeline
        document.getElementById('timelineTripName').textContent = trip.name || 'My Trip';
        document.getElementById('emptyState').style.display = 'none';
        document.getElementById('itineraryTimeline').style.display = 'block';
        
        // Render days
        this.refreshDays();
        this.updateStats();
        this.enableButtons();
        this.loadSuggestions(trip.destination);
    }

    getSavedTrips() {
        const trips = localStorage.getItem('savedTrips');
        return trips ? JSON.parse(trips) : [];
    }

    loadSavedTrips() {
        const trips = this.getSavedTrips();
        const container = document.getElementById('savedTripsList');
        
        if (trips.length === 0) {
            container.innerHTML = '<p class="trips-empty">No saved trips yet</p>';
            return;
        }

        container.innerHTML = trips.map(trip => {
            const date = new Date(trip.updatedAt).toLocaleDateString();
            return `
                <div class="saved-trip-item" onclick="tripPlanner.loadTripFromList('${trip.id}')">
                    <div class="saved-trip-name">${trip.name || 'Untitled Trip'}</div>
                    <div class="saved-trip-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${trip.destination || 'No destination'}</span>
                        <span><i class="fas fa-calendar"></i> ${trip.days.length} days</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    loadTripFromList(tripId) {
        const trips = this.getSavedTrips();
        const trip = trips.find(t => t.id === tripId);
        if (trip) {
            this.loadTrip(trip);
            this.showNotification('Trip loaded!', 'success');
        }
    }

    openLoadTripModal() {
        const trips = this.getSavedTrips();
        const container = document.getElementById('loadTripsList');
        
        if (trips.length === 0) {
            container.innerHTML = '<p class="trips-empty">No saved trips yet</p>';
        } else {
            container.innerHTML = trips.map(trip => {
                const date = new Date(trip.updatedAt).toLocaleDateString();
                const activities = trip.days.reduce((sum, day) => sum + day.activities.length, 0);
                return `
                    <div class="load-trip-item" onclick="tripPlanner.loadTripFromModal('${trip.id}')">
                        <div class="load-trip-header">
                            <div class="load-trip-name">${trip.name || 'Untitled Trip'}</div>
                            <button class="delete-trip-btn" onclick="event.stopPropagation(); tripPlanner.deleteSavedTrip('${trip.id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                        <div class="load-trip-meta">
                            <span><i class="fas fa-map-marker-alt"></i> ${trip.destination || 'No destination'}</span>
                            <span><i class="fas fa-calendar"></i> ${trip.days.length} days</span>
                            <span><i class="fas fa-tasks"></i> ${activities} activities</span>
                            <span><i class="fas fa-clock"></i> ${date}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }
        
        document.getElementById('loadTripModal').classList.add('active');
    }

    loadTripFromModal(tripId) {
        this.loadTripFromList(tripId);
        this.closeLoadTripModal();
    }

    closeLoadTripModal() {
        document.getElementById('loadTripModal').classList.remove('active');
    }

    deleteSavedTrip(tripId) {
        if (!confirm('Are you sure you want to delete this saved trip?')) return;

        let trips = this.getSavedTrips();
        trips = trips.filter(t => t.id !== tripId);
        localStorage.setItem('savedTrips', JSON.stringify(trips));
        
        this.loadSavedTrips();
        this.openLoadTripModal(); // Refresh modal
        this.showNotification('Trip deleted', 'success');
    }

    openShareTripModal() {
        if (!this.currentTrip) return;

        const shareUrl = `${window.location.origin}${window.location.pathname}?trip=${this.currentTrip.id}`;
        document.getElementById('shareLinkInput').value = shareUrl;
        document.getElementById('shareTripModal').classList.add('active');
    }

    closeShareTripModal() {
        document.getElementById('shareTripModal').classList.remove('active');
    }

    loadSuggestions(destination) {
        if (!destination) {
            document.getElementById('suggestionsList').innerHTML = '<p class="suggestions-empty">Enter a destination to see suggestions</p>';
            return;
        }

        // Mock suggestions (in real app, this would call an API)
        const suggestions = {
            'paris': [
                { name: 'Eiffel Tower', type: 'sightseeing', duration: 2 },
                { name: 'Louvre Museum', type: 'sightseeing', duration: 3 },
                { name: 'Café de Flore', type: 'food', duration: 1 },
                { name: 'Champs-Élysées', type: 'shopping', duration: 2 }
            ],
            'tokyo': [
                { name: 'Sensoji Temple', type: 'sightseeing', duration: 1.5 },
                { name: 'Tsukiji Market', type: 'food', duration: 2 },
                { name: 'Shibuya Crossing', type: 'sightseeing', duration: 1 },
                { name: 'Tokyo Skytree', type: 'sightseeing', duration: 2 }
            ],
            'new york': [
                { name: 'Statue of Liberty', type: 'sightseeing', duration: 3 },
                { name: 'Central Park', type: 'sightseeing', duration: 2 },
                { name: 'Broadway Show', type: 'entertainment', duration: 3 },
                { name: 'Times Square', type: 'sightseeing', duration: 1 }
            ]
        };

        const destinationLower = destination.toLowerCase();
        const matchedSuggestions = suggestions[destinationLower] || [];

        if (matchedSuggestions.length === 0) {
            document.getElementById('suggestionsList').innerHTML = '<p class="suggestions-empty">No suggestions available for this destination</p>';
            return;
        }

        document.getElementById('suggestionsList').innerHTML = matchedSuggestions.map(suggestion => `
            <div class="suggestion-item">
                <div class="suggestion-info">
                    <div class="suggestion-title">${suggestion.name}</div>
                    <div class="suggestion-meta">${suggestion.type} • ${suggestion.duration}h</div>
                </div>
                <button class="suggestion-add-btn" onclick="tripPlanner.addSuggestion('${suggestion.name}', '${suggestion.type}', ${suggestion.duration})">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `).join('');
    }

    addSuggestion(name, type, duration) {
        if (!this.currentTrip || this.currentTrip.days.length === 0) {
            this.showNotification('Please create a trip and add a day first', 'warning');
            return;
        }

        const activity = {
            id: Date.now().toString(),
            name: name,
            type: type,
            time: '',
            duration: duration,
            cost: '',
            location: this.currentTrip.destination,
            notes: '',
            url: ''
        };

        // Add to first day
        this.currentTrip.days[0].activities.push(activity);
        this.refreshDays();
        this.updateStats();
        this.autoSave();
        this.showNotification(`${name} added to Day 1!`, 'success');
    }

    exportToPDF() {
        if (!this.currentTrip) return;

        // Create a simple text representation (in real app, use jsPDF library)
        let content = `${this.currentTrip.name || 'My Trip'}\n`;
        content += `Destination: ${this.currentTrip.destination || 'Not specified'}\n`;
        content += `Duration: ${this.currentTrip.startDate} to ${this.currentTrip.endDate}\n\n`;

        this.currentTrip.days.forEach(day => {
            content += `\nDAY ${day.dayNumber} - ${day.date}\n`;
            content += '='.repeat(50) + '\n';
            day.activities.forEach(activity => {
                content += `\n${activity.time || 'All day'} - ${activity.name}\n`;
                if (activity.location) content += `  Location: ${activity.location}\n`;
                if (activity.notes) content += `  Notes: ${activity.notes}\n`;
            });
        });

        // Download as text file
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.currentTrip.name || 'trip'}-itinerary.txt`;
        a.click();
        URL.revokeObjectURL(url);

        this.showNotification('Trip exported!', 'success');
    }

    enableButtons() {
        document.getElementById('saveTripBtn').disabled = false;
        document.getElementById('exportTripBtn').disabled = false;
        document.getElementById('shareTripBtn').disabled = false;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
            color: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Global functions for onclick handlers
function closeActivityModal() {
    tripPlanner.closeActivityModal();
}

function closeLoadTripModal() {
    tripPlanner.closeLoadTripModal();
}

function closeShareTripModal() {
    tripPlanner.closeShareTripModal();
}

function copyShareLink() {
    const input = document.getElementById('shareLinkInput');
    input.select();
    document.execCommand('copy');
    tripPlanner.showNotification('Link copied!', 'success');
}

function shareViaEmail() {
    const trip = tripPlanner.currentTrip;
    const subject = encodeURIComponent(`Check out my ${trip.name} itinerary!`);
    const body = encodeURIComponent(`I'm planning a trip to ${trip.destination}. Check it out: ${window.location.href}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
}

function shareViaWhatsApp() {
    const trip = tripPlanner.currentTrip;
    const text = encodeURIComponent(`Check out my ${trip.name} itinerary! ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`);
}

function shareViaFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
}

function shareViaTwitter() {
    const trip = tripPlanner.currentTrip;
    const text = encodeURIComponent(`Planning a trip to ${trip.destination}!`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize planner
const tripPlanner = new TripPlanner();
