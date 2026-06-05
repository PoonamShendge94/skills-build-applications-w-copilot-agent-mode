# Digital Clock - Multiple Time Zones

A responsive web application that displays the current time in multiple time zones simultaneously. Perfect for tracking time across different regions.

## Features

✨ **Key Features:**
- 🕐 Real-time digital clock display
- 🌍 Support for 23+ major time zones
- ➕ Add/remove time zones dynamically
- 📱 Fully responsive design
- 🎨 Beautiful gradient UI with smooth animations
- 📅 Displays date and UTC offset for each time zone
- 🚀 Lightweight and fast performance

## Supported Time Zones

- **North America**: New York, Chicago, Denver, Los Angeles, Anchorage, Toronto, Mexico City
- **South America**: Buenos Aires
- **Europe**: London, Paris, Berlin, Moscow, Azores
- **Asia**: Dubai, Kolkata, Bangkok, Hong Kong, Tokyo
- **Oceania**: Perth, Sydney, Auckland
- **Pacific**: Fiji
- **UTC**: Coordinated Universal Time

## How to Use

1. **View Default Time Zones**: The app starts with 4 major time zones (New York, London, Tokyo, Sydney)
2. **Add Time Zone**: Click "+ Add Time Zone" to select from the dropdown and add a new timezone
3. **Remove Time Zone**: Click "Remove" on any clock card to remove it
4. **Reset**: Click "Reset to Defaults" to return to the default 4 time zones

## Installation

1. Clone or download the repository
2. Open `index.html` in your web browser
3. No dependencies or build process required!

## Files

- `index.html` - HTML structure
- `styles.css` - Styling and responsive design
- `script.js` - JavaScript logic for time display and interactivity

## Technical Details

- Uses JavaScript's `Intl.DateTimeFormat` API for accurate timezone conversion
- Updates every second for real-time display
- Calculates UTC offset automatically
- Responsive grid layout using CSS Grid
- Modal dialog for adding time zones

## Browser Support

- Chrome/Edge 24+
- Firefox 29+
- Safari 10+
- Opera 15+

## Performance

- Lightweight: ~10KB total (minified)
- No external dependencies
- Smooth animations and transitions
- Optimized for all device sizes

## Customization

You can easily customize:
- Default time zones (edit `DEFAULT_TIMEZONES` array)
- Add/remove supported time zones (edit `ALL_TIMEZONES` array)
- Region emojis (edit `REGION_EMOJI` object)
- Colors and styling in `styles.css`

## License

Free to use and modify for personal and commercial projects.
