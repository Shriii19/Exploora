// API Configuration
// Replace these with your actual API keys
const API_CONFIG = {
    OPENWEATHER: {
        key: 'YOUR_OPENWEATHER_API_KEY',
        baseUrl: 'https://api.openweathermap.org/data/2.5'
    },
    UNSPLASH: {
        accessKey: 'YOUR_UNSPLASH_ACCESS_KEY',
        baseUrl: 'https://api.unsplash.com'
    },
    AMADEUS: {
        clientId: 'YOUR_AMADEUS_CLIENT_ID',
        clientSecret: 'YOUR_AMADEUS_CLIENT_SECRET',
        baseUrl: 'https://test.api.amadeus.com/v1'
    },
    TELEPORT: {
        baseUrl: 'https://api.teleport.org/api'
    }
};

// Amadeus token management
let amadeusToken = null;
let tokenExpiry = null;

export { API_CONFIG, amadeusToken, tokenExpiry };