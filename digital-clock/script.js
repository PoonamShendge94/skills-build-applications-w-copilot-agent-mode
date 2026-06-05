// Default time zones
const DEFAULT_TIMEZONES = [
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney'
];

// All available time zones
const ALL_TIMEZONES = [
    'UTC',
    'America/Anchorage',
    'America/Los_Angeles',
    'America/Denver',
    'America/Chicago',
    'America/New_York',
    'America/Toronto',
    'America/Mexico_City',
    'America/Argentina/Buenos_Aires',
    'Atlantic/Azores',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Moscow',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Bangkok',
    'Asia/Hong_Kong',
    'Asia/Tokyo',
    'Australia/Perth',
    'Australia/Sydney',
    'Pacific/Auckland',
    'Pacific/Fiji'
];

// Emoji for regions
const REGION_EMOJI = {
    'America/Anchorage': '🇺🇸',
    'America/Los_Angeles': '🇺🇸',
    'America/Denver': '🇺🇸',
    'America/Chicago': '🇺🇸',
    'America/New_York': '🇺🇸',
    'America/Toronto': '🇨🇦',
    'America/Mexico_City': '🇲🇽',
    'America/Argentina/Buenos_Aires': '🇦🇷',
    'Atlantic/Azores': '🇵🇹',
    'Europe/London': '🇬🇧',
    'Europe/Paris': '🇫🇷',
    'Europe/Berlin': '🇩🇪',
    'Europe/Moscow': '🇷🇺',
    'Asia/Dubai': '🇦🇪',
    'Asia/Kolkata': '🇮🇳',
    'Asia/Bangkok': '🇹🇭',
    'Asia/Hong_Kong': '🇭🇰',
    'Asia/Tokyo': '🇯🇵',
    'Australia/Perth': '🇦🇺',
    'Australia/Sydney': '🇦🇺',
    'Pacific/Auckland': '🇳🇿',
    'Pacific/Fiji': '🇫🇯',
    'UTC': '🌍'
};

let activeTimezones = [...DEFAULT_TIMEZONES];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    populateTimezoneSelect();
    renderClocks();
    updateClocks();
    // Update every second
    setInterval(updateClocks, 1000);
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    const addZoneBtn = document.getElementById('addZoneBtn');
    const resetBtn = document.getElementById('resetBtn');
    const modal = document.getElementById('modal');
    const confirmBtn = document.getElementById('confirmBtn');
    const closeBtn = document.querySelector('.close');

    addZoneBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    resetBtn.addEventListener('click', () => {
        activeTimezones = [...DEFAULT_TIMEZONES];
        renderClocks();
        updateClocks();
    });

    confirmBtn.addEventListener('click', () => {
        const select = document.getElementById('timezoneSelect');
        const timezone = select.value;
        if (timezone && !activeTimezones.includes(timezone)) {
            activeTimezones.push(timezone);
            renderClocks();
            updateClocks();
        }
        modal.style.display = 'none';
        select.value = '';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Populate timezone select dropdown
function populateTimezoneSelect() {
    const select = document.getElementById('timezoneSelect');
    ALL_TIMEZONES.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz;
        option.textContent = tz;
        select.appendChild(option);
    });
}

// Render clock cards
function renderClocks() {
    const clockGrid = document.getElementById('clockGrid');
    clockGrid.innerHTML = '';

    activeTimezones.forEach(timezone => {
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.id = `clock-${timezone}`;

        const emoji = REGION_EMOJI[timezone] || '🌐';
        card.innerHTML = `
            <div class="timezone-name">
                <span class="timezone-emoji">${emoji}</span>
                <span>${timezone}</span>
            </div>
            <div class="digital-display" id="time-${timezone}">--:--:--</div>
            <div class="time-details">
                <div class="date-display" id="date-${timezone}"></div>
                <div class="utc-offset" id="offset-${timezone}"></div>
            </div>
            <button class="remove-btn" onclick="removeTimezone('${timezone}')">Remove</button>
        `;

        clockGrid.appendChild(card);
    });
}

// Update all clock displays
function updateClocks() {
    activeTimezones.forEach(timezone => {
        updateClock(timezone);
    });
}

// Update individual clock
function updateClock(timezone) {
    try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });

        const time = formatter.format(now);
        const date = dateFormatter.format(now);

        // Calculate UTC offset
        const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
        const offset = (now.getTime() - tzDate.getTime()) / 3600000;
        const offsetStr = offset >= 0 ? `UTC+${Math.abs(offset)}` : `UTC${offset}`;

        // Update DOM
        const timeElement = document.getElementById(`time-${timezone}`);
        const dateElement = document.getElementById(`date-${timezone}`);
        const offsetElement = document.getElementById(`offset-${timezone}`);

        if (timeElement) timeElement.textContent = time;
        if (dateElement) dateElement.textContent = date;
        if (offsetElement) offsetElement.textContent = offsetStr;
    } catch (error) {
        console.error(`Error updating clock for ${timezone}:`, error);
    }
}

// Remove timezone
function removeTimezone(timezone) {
    activeTimezones = activeTimezones.filter(tz => tz !== timezone);
    renderClocks();
    updateClocks();
}