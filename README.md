# 🌍 Travel Explorer Website

A modern, responsive Travel Explorer Website built with HTML, CSS, and JavaScript. Discover amazing destinations, check weather conditions, and explore beautiful photos of cities around the world.

## ✨ Features

### 🎯 Core Features
- **Modern Header** with logo "🌍 Travel Explorer", search bar, and search button
- **Hero Section** with beautiful gradient background and travel-themed design
- **Destination Info Section** displaying a grid of 3-5 city photos in a gallery format
- **Weather Info Section** showing temperature, weather condition, and weather icons
- **Recent Searches Section** with interactive cards showing previously searched cities
- **Footer** with "Made with ❤️ using HTML, CSS, and JavaScript"

### 🎨 Design & Styling
- **Color Scheme**: Blue (#0077b6), White, Light Gray
- **Typography**: Clean, modern Poppins font family
- **Rounded corners** for all cards and interactive elements
- **Responsive layout** optimized for desktop, tablet, and mobile devices
- **Smooth animations** and hover effects
- **Loading spinner** for better user experience

### 🚀 Interactive Features
- **Real-time search** with smooth animations
- **Local storage** for recent searches persistence
- **Click-to-search** recent search cards
- **Keyboard navigation** (Enter to search, Escape to reset)
- **Responsive photo gallery** with gradient placeholders
- **Weather icons** that change based on conditions

## 🛠️ Technologies Used

- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Interactive functionality and DOM manipulation
- **Font Awesome** - Beautiful weather and UI icons
- **Google Fonts** - Poppins font family for modern typography
- **Local Storage** - Persistent recent searches

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🌟 Available Destinations

The website includes sample data for these cities:
- **Paris, France** - Eiffel Tower, Louvre Museum, Notre-Dame Cathedral
- **Tokyo, Japan** - Tokyo Tower, Senso-ji Temple, Shibuya Crossing
- **London, UK** - Big Ben, Tower Bridge, Buckingham Palace
- **New York, USA** - Statue of Liberty, Times Square, Central Park
- **Sydney, Australia** - Opera House, Harbour Bridge, Bondi Beach
- **Rome, Italy** - Colosseum, Vatican City, Trevi Fountain

## 🚀 Getting Started

1. **Open the website**: Open `index.html` in your web browser
2. **Search for a city**: Use the search bar to look for destinations
3. **Explore results**: View photos, weather information, and city details
4. **Check recent searches**: Click on recent search cards to search again

## 📁 File Structure

```
travel-explorer/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🎯 Usage Tips

- **Search Tips**: Try searching for "Paris", "Tokyo", "London", "New York", "Sydney", or "Rome"
- **Navigation**: Use the Escape key to reset the view to the welcome screen
- **Recent Searches**: Click on any recent search card to quickly search again
- **Mobile Friendly**: The site works perfectly on mobile devices with touch-friendly interactions

## 🔧 Customization

### Adding New Cities
To add new destinations, update the `sampleDestinations` object in `script.js`:

```javascript
'cityname': {
    name: 'City Name, Country',
    photos: [
        { title: 'Landmark', description: 'Description' },
        // Add more photos...
    ],
    weather: {
        temperature: '25°C',
        condition: 'Sunny',
        icon: 'fas fa-sun'
    }
}
```

### Styling Customization
- **Colors**: Update the CSS variables in `styles.css`
- **Fonts**: Change the Google Fonts import in `index.html`
- **Layout**: Modify the grid layouts for different responsive breakpoints

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

---

**Project by shrinivas mudabe**
