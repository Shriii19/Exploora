# Component System Setup

## Overview
This project now uses a reusable component system similar to React components for the header and footer across all pages.

## Files Structure
```
travel-explorer/
├── components/
│   ├── header.html      # Header component
│   ├── footer.html      # Footer component
│   └── loader.js        # JavaScript loader for components
├── index.html           # Home page
├── about.html           # About page
├── destinations.html    # Destinations page
├── contact.html         # Contact page
└── styles.css          # Shared styles
```

## How It Works

### 1. Component Files
- **header.html**: Contains the navigation header with logo, menu, and search
- **footer.html**: Contains the premium footer with brand info, links, and legal info
- **loader.js**: JavaScript that loads components into pages and handles functionality

### 2. Page Structure
Each page now uses placeholders instead of hardcoded header/footer:

```html
<body>
    <!-- Header Placeholder -->
    <div id="header-placeholder"></div>
    
    <!-- Page Content -->
    <main>
        <!-- Your page-specific content -->
    </main>
    
    <!-- Footer Placeholder -->
    <div id="footer-placeholder"></div>
    
    <!-- Load component system first -->
    <script src="components/loader.js"></script>
    <!-- Then your page-specific scripts -->
    <script src="script.js"></script>
</body>
```

### 3. Features

#### Automatic Navigation Active States
- The loader automatically sets the correct navigation item as "active" based on the current page
- Uses `data-page` attributes to match current page with navigation items

#### Search Functionality
- Search functionality works across all pages
- Searches redirect to the home page with query parameters
- Auto-executes search if URL has search parameters

#### Mobile Menu
- Hamburger menu functionality is automatically initialized
- Menu closes when clicking links or outside the menu area

#### Responsive Design
- All components are fully responsive
- Consistent styling across all pages

## Benefits

### ✅ Consistency
- Same header and footer on all pages
- Unified navigation experience
- Consistent styling and behavior

### ✅ Maintainability
- Edit header/footer in one place
- Changes automatically apply to all pages
- Easy to add new navigation items

### ✅ Performance
- Components are loaded asynchronously
- No duplicate HTML code
- Smaller page file sizes

### ✅ Scalability
- Easy to add new pages
- Simple to modify global elements
- Component-based architecture

## Adding New Pages

To add a new page to the site:

1. Create your HTML file with the placeholder structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Your head content -->
</head>
<body>
    <div id="header-placeholder"></div>
    
    <!-- Your page content -->
    
    <div id="footer-placeholder"></div>
    
    <script src="components/loader.js"></script>
    <script src="script.js"></script>
</body>
</html>
```

2. Add navigation link to `components/header.html` if needed

3. Update the page mapping in `components/loader.js` if you want automatic active navigation

## Customization

### Adding New Navigation Items
Edit `components/header.html` and add your link:
```html
<li><a href="newpage.html" class="nav-link" data-page="newpage">New Page</a></li>
```

### Modifying Footer Content
Edit `components/footer.html` to update footer sections, links, or content.

### Styling Changes
All component styles are in `styles.css` with classes like:
- `.header` - Header styles
- `.footer-premium` - Footer styles
- `.nav-link` - Navigation link styles

## Browser Compatibility
- Works in all modern browsers
- Uses fetch API for loading components
- Falls back gracefully if JavaScript is disabled

This component system provides the flexibility and maintainability of React components while using vanilla HTML and JavaScript.
