// API Configuration
// Your actual API keys configured
const API_CONFIG = {
    OPENWEATHER: {
        key: 'aff6496c6e7ebc7689c124fa287c2085',
        baseUrl: 'https://api.openweathermap.org/data/2.5'
    },
    UNSPLASH: {
        accessKey: 'v8R5H9rR-0BH0f-wb-n6o4zkDEDaRG6RhdR1WcuJMEs',
        baseUrl: 'https://api.unsplash.com'
    },
    AMADEUS: {
        clientId: '8NaeMAQ2MWMqkCIOVGXkK1igGDdD5ZQ6',
        clientSecret: 'GZDdmQA1KYDJOy6Q',
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