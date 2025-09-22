# 🌍 Travel Explorer API Integration Guide

## 📋 Overview
This guide explains how to integrate the Travel Explorer website with powerful travel APIs to make it fully functional.

## 🔑 API Keys Setup

### 1. OpenWeather API
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Replace `YOUR_OPENWEATHER_API_KEY` in `js/api-config.js`

### 2. Unsplash API
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Get your Access Key
4. Replace `YOUR_UNSPLASH_ACCESS_KEY` in `js/api-config.js`

### 3. Amadeus Travel API
1. Go to [Amadeus for Developers](https://developers.amadeus.com/)
2. Register and create a new app
3. Get your Client ID and Client Secret
4. Replace the credentials in `js/api-config.js`

### 4. Teleport API
- **No API key required!** Teleport API is free to use.

## 🚀 Installation Steps

### Step 1: Update HTML Files
Add the following script tags to your HTML files:

```html
<!-- Add to the <head> section of all HTML files -->
<link rel="stylesheet" href="css/api-styles.css">

<!-- Add before closing </body> tag -->
<script type="module" src="js/main.js"></script>
```

### Step 2: Configure API Keys
Edit `js/api-config.js` and replace the placeholder API keys:

```javascript
const API_CONFIG = {
    OPENWEATHER: {
        key: 'your_actual_openweather_api_key_here',
        baseUrl: 'https://api.openweathermap.org/data/2.5'
    },
    UNSPLASH: {
        accessKey: 'your_actual_unsplash_access_key_here',
        baseUrl: 'https://api.unsplash.com'
    },
    AMADEUS: {
        clientId: 'your_actual_amadeus_client_id_here',
        clientSecret: 'your_actual_amadeus_client_secret_here',
        baseUrl: 'https://test.api.amadeus.com/v1'
    }
};
```

### Step 3: Test the Integration
1. Open your website in a browser
2. Try searching for a city (e.g., "New York")
3. Check that weather, photos, and deals load properly

## 🎯 API Functions

### 1. City Search (Teleport API)
```javascript
// Search for city information
await searchCity('Paris');
```
**Features:**
- City population and location
- Quality of life scores
- Country information

### 2. Weather Data (OpenWeather API)
```javascript
// Get weather for a city
await getWeather('London');

// Get weather with coordinates
await getWeather('Tokyo', 35.6762, 139.6503);
```
**Features:**
- Current temperature and conditions
- Humidity, wind speed, pressure
- Sunrise/sunset times
- Weather icons

### 3. Trending Photos (Unsplash API)
```javascript
// Get trending travel photos
await getTrendingPhotos('beach', 12);

// Get photos by categories
await getPhotosByCategories(['beach', 'mountains', 'city']);
```
**Features:**
- High-quality travel photos
- Photographer credits
- Location information
- Like functionality

### 4. Flights & Hotels (Amadeus API)
```javascript
// Get flight and hotel deals
await getFlightsHotels('Paris', 48.8566, 2.3522);
```
**Features:**
- Flight prices and schedules
- Hotel recommendations with ratings
- Distance from city center
- Amenities information

## 🔧 Customization

### Adding New Destinations
To add weather widgets to new destination cards:

```javascript
// In your destination card HTML, add data attributes:
<div class="destination-card" data-city="Barcelona">
    <!-- card content -->
</div>
```

### Modifying Photo Categories
Edit the categories in `js/unsplash-api.js`:

```javascript
const categories = ['beach', 'mountains', 'city', 'nature', 'architecture'];
```

### Changing Default Origin City
For flight searches, modify the default origin in `js/amadeus-api.js`:

```javascript
export async function getFlightsHotels(cityName, lat, lon, originCity = 'LON') {
    // Changed from 'NYC' to 'LON' (London)
}
```

## 🛡️ Security Best Practices

### Environment Variables (Recommended)
For production, use environment variables:

```javascript
const API_CONFIG = {
    OPENWEATHER: {
        key: process.env.OPENWEATHER_API_KEY,
        // ...
    }
};
```

### API Key Restrictions
1. **OpenWeather**: Restrict by domain in dashboard
2. **Unsplash**: Set allowed domains in app settings
3. **Amadeus**: Use IP restrictions if available

### Rate Limiting
The code includes built-in rate limiting and error handling:
- Debounced search (300ms delay)
- Graceful fallbacks for API failures
- Loading states for better UX

## 🐛 Troubleshooting

### Common Issues

**1. CORS Errors**
- Ensure your domain is whitelisted in API settings
- Use HTTPS in production

**2. API Key Not Working**
- Double-check the key is correctly copied
- Verify the key is active in the API dashboard
- Check for trailing spaces or special characters

**3. No Data Returned**
- Check browser console for error messages
- Verify API endpoints are correct
- Test with sample cities first

**4. Images Not Loading**
- Unsplash API requires attribution
- Check image URLs are not blocked by ad blockers

### Testing Mode
Use sample data when APIs are not available:

```javascript
// In each API file, enable demo mode:
const DEMO_MODE = true; // Set to false for production
```

## 📱 Browser Compatibility
- Modern browsers (Chrome 80+, Firefox 75+, Safari 13+)
- ES6 modules support required
- Fetch API support required

## 🔄 API Limits & Costs

### Free Tier Limits:
- **OpenWeather**: 1,000 calls/day
- **Unsplash**: 50 requests/hour
- **Amadeus**: 1,000 transactions/month
- **Teleport**: No limits (completely free)

### Upgrading:
All APIs offer paid plans for higher limits when needed.

## 📞 Support
If you encounter issues:
1. Check the browser console for errors
2. Verify API keys are correctly configured
3. Test with simple city names first
4. Review the API documentation for updates

## 🎉 Success!
Once configured, your Travel Explorer will have:
- ✅ Real-time city information
- ✅ Live weather data
- ✅ Stunning travel photography
- ✅ Flight and hotel recommendations
- ✅ Interactive search with suggestions
- ✅ Mobile-responsive design

Enjoy your fully functional travel website! 🌍✈️