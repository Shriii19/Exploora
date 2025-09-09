# 🌍 Travel Explorer Website

A modern, responsive Travel Explorer Website built with HTML, CSS, and JavaScript. Discover amazing destinations, check weather conditions, and explore beautiful photos of cities around the world.

## 🎯 Problem Statement

Planning a trip can be overwhelming without easy access to destination information. Travelers often struggle to find reliable, up-to-date information about destinations, weather conditions, and visual representations of places they want to visit. This project offers a clean interface to explore destinations, view photos, and check weather, simplifying trip planning for users.

## ✨ Features

### 🎯 Core Features
- **Multi-page Architecture** with Home, About, Destinations, and Contact pages
- **Modern Header** with responsive navigation and search functionality
- **Hero Section** with beautiful gradient background and travel-themed design
- **Real API Integration** with Unsplash API for photos and OpenWeatherMap API for weather
- **Destination Info Section** displaying high-quality city photos in a gallery format
- **Weather Info Section** showing real-time temperature, weather condition, and weather icons
- **Recent Searches Section** with interactive cards showing previously searched cities
- **Destinations Gallery** with filtering by regions (Europe, Asia, America, Oceania)
- **Contact Form** with validation and FAQ section

### 🎨 Design & Styling
- **Color Scheme**: Blue (#0077b6), White, Light Gray
- **Typography**: Clean, modern Poppins font family
- **Rounded corners** for all cards and interactive elements
- **Responsive layout** optimized for desktop, tablet, and mobile devices
- **Smooth animations** and hover effects
- **Loading spinner** for better user experience
- **Mobile-first responsive navigation** with hamburger menu

### 🚀 Interactive Features
- **Real-time search** with API integration and fallback to sample data
- **Local storage** for recent searches persistence
- **Click-to-search** recent search cards and destination cards
- **Keyboard navigation** (Enter to search, Escape to reset)
- **Responsive photo gallery** with real Unsplash images
- **Weather icons** that change based on real weather conditions
- **FAQ accordion** with smooth animations
- **Form validation** with real-time feedback

## 🛠️ Technologies Used

- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Interactive functionality and DOM manipulation
- **Unsplash API** - High-quality destination photography
- **OpenWeatherMap API** - Real-time weather data and forecasts
- **Font Awesome** - Beautiful weather and UI icons
- **Google Fonts** - Poppins font family for modern typography
- **Local Storage** - Persistent recent searches

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🌟 Available Destinations

The website includes data for popular destinations worldwide:
- **Europe**: Paris, London, Rome, Barcelona
- **Asia**: Tokyo, Dubai, Bangkok
- **America**: New York, Los Angeles
- **Oceania**: Sydney

## 🚀 Getting Started

### Prerequisites
1. **API Keys** (Optional - works with sample data if not provided):
   - Unsplash API key from [Unsplash Developers](https://unsplash.com/developers)
   - OpenWeatherMap API key from [OpenWeatherMap](https://openweathermap.org/api)

### Installation
1. **Clone or download** the project files
2. **Update API keys** in `script.js` (replace placeholder values):
   ```javascript
   const UNSPLASH_API_KEY = 'your_unsplash_api_key_here';
   const OPENWEATHER_API_KEY = 'your_openweather_api_key_here';
   ```
3. **Open** `index.html` in your web browser
4. **Start exploring** destinations!

### Usage
1. **Search for a city**: Use the search bar to look for destinations
2. **Explore results**: View real photos and weather information
3. **Browse destinations**: Visit the Destinations page to explore by region
4. **Learn more**: Check the About page for project details
5. **Get in touch**: Use the Contact page for feedback or questions

## 📁 File Structure

```
travel-explorer/
├── index.html          # Home page with search functionality
├── about.html          # About page with project information
├── destinations.html   # Destinations gallery with regional filtering
├── contact.html        # Contact form and FAQ
├── styles.css          # Main CSS styling and responsive design
├── script.js           # Main JavaScript functionality and API integration
├── destinations.js     # Destinations page specific functionality
├── contact.js          # Contact page functionality
└── README.md           # Project documentation
```

## 🔧 API Integration

### Unsplash API
- **Purpose**: Fetch high-quality destination photos
- **Endpoint**: `https://api.unsplash.com/search/photos`
- **Features**: Search by city name, get multiple photos per destination

### OpenWeatherMap API
- **Purpose**: Get real-time weather data
- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Features**: Current temperature, weather conditions, weather icons

### Fallback System
If API keys are not provided, the website automatically falls back to sample data, ensuring full functionality without external dependencies.

## 🎯 Usage Tips

- **API Setup**: Add your API keys for real-time data, or use sample data for testing
- **Search**: Try searching for major cities like "Paris", "Tokyo", "New York"
- **Navigation**: Use the hamburger menu on mobile devices
- **Destinations**: Browse destinations by region on the Destinations page
- **Contact**: Use the contact form for feedback or feature requests

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 Project by

**Shrinivas Mudabe** - Full-stack developer passionate about creating user-friendly web applications that solve real-world problems.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

---

**Made with ❤️ using HTML, CSS, and JavaScript**
