# Contributing to Travel Explorer

Thank you for considering contributing to Travel Explorer! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information

### Suggesting Features

Feature suggestions are welcome! Please include:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Any relevant examples or mockups

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Guidelines

### Code Style

**HTML:**
- Use semantic HTML5 elements
- Include proper ARIA labels
- Maintain consistent indentation (2 spaces)
- Add comments for complex sections

**CSS:**
- Follow existing naming conventions
- Use CSS custom properties for colors
- Keep selectors specific but not overly complex
- Add comments for major sections
- Maintain responsive design principles

**JavaScript:**
- Use ES6+ features
- Follow existing code patterns
- Add JSDoc comments for functions
- Handle errors gracefully
- Keep functions small and focused

### Commit Messages

Follow this format:
```
Type: Brief description

- Detailed point 1
- Detailed point 2
```

Types:
- `Fix:` Bug fixes
- `Feature:` New features
- `Update:` Updates to existing features
- `Docs:` Documentation changes
- `Style:` Code style changes
- `Refactor:` Code refactoring
- `Test:` Adding tests
- `Chore:` Maintenance tasks

### Testing

Before submitting:
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile devices
- [ ] Verify responsive design
- [ ] Check console for errors
- [ ] Test all interactive features
- [ ] Validate HTML/CSS
- [ ] Check accessibility

### Documentation

Update documentation when:
- Adding new features
- Changing functionality
- Fixing significant bugs
- Updating dependencies

## Project Structure

```
travel-explorer/
├── index.html              # Homepage
├── destinations.html       # Destinations page
├── blog.html              # Blog page
├── planner.html           # Trip planner
├── about.html             # About page
├── contact.html           # Contact page
├── destination-detail.html # Destination details
├── styles.css             # Main stylesheet
├── script.js              # Main JavaScript
├── components/            # Reusable components
├── css/                   # Additional CSS
├── js/                    # Additional JavaScript
├── images/                # Image assets
└── services/              # Service pages
```

## Areas for Contribution

### High Priority
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] Mobile UX enhancements
- [ ] Cross-browser compatibility

### Medium Priority
- [ ] Additional destination content
- [ ] Blog article creation
- [ ] Feature enhancements
- [ ] UI/UX improvements

### Low Priority
- [ ] Code refactoring
- [ ] Documentation improvements
- [ ] Test coverage
- [ ] Additional animations

## Questions?

Feel free to open an issue for:
- Questions about the codebase
- Clarification on features
- Discussion about potential changes

## Code of Conduct

- Be respectful and constructive
- Focus on the code, not the person
- Accept constructive criticism
- Help others learn and grow

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Travel Explorer! 🌍✈️
