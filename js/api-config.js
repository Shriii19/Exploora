// API Configuration
// Use environment variables if available, otherwise fallback to default keys
const API_CONFIG = {
    OPENWEATHER: {
        key: process?.env?.OPENWEATHER_API_KEY || 'aff6496c6e7ebc7689c124fa287c2085',
        baseUrl: 'https://api.openweathermap.org/data/2.5'
    },
    UNSPLASH: {
        accessKey: process?.env?.UNSPLASH_ACCESS_KEY || 'v8R5H9rR-0BH0f-wb-n6o4zkDEDaRG6RhdR1WcuJMEs',
        baseUrl: 'https://api.unsplash.com'
    },
    AMADEUS: {
        clientId: process?.env?.AMADEUS_CLIENT_ID || '8NaeMAQ2MWMqkCIOVGXkK1igGDdD5ZQ6',
        clientSecret: process?.env?.AMADEUS_CLIENT_SECRET || 'GZDdmQA1KYDJOy6Q',
        baseUrl: 'https://test.api.amadeus.com/v1'
    },
    TELEPORT: {
        baseUrl: 'https://api.teleport.org/api'
    }
};

// Validate API keys
function validateApiKeys() {
    const requiredKeys = [
        { service: 'OpenWeather', key: API_CONFIG.OPENWEATHER.key },
        { service: 'Unsplash', key: API_CONFIG.UNSPLASH.accessKey },
        { service: 'Amadeus', key: API_CONFIG.AMADEUS.clientId }
    ];
    
    const missingKeys = requiredKeys.filter(({ key }) => !key || key === 'your-api-key-here');
    
    if (missingKeys.length > 0) {
        console.warn('Missing API keys for:', missingKeys.map(({ service }) => service).join(', '));
    }
}

// Initialize validation
validateApiKeys();

// Amadeus token management
let amadeusToken = null;
let tokenExpiry = null;

export { API_CONFIG, amadeusToken, tokenExpiry };