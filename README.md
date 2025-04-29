# 3D Air Pollution Map

A modern web application for visualizing air pollution data in an interactive 3D environment, helping users understand air quality patterns and trends across different regions.

## Features

- Interactive 3D visualization of air pollution data
- Multiple data layer views (PM2.5, PM10, NO2, O3)
- Customizable pollution thresholds
- Responsive design for all devices
- Dark/light theme support
- Real-time data visualization

## Technology Stack

### Frontend

- React 19 with TypeScript
- Vite for fast development and optimized builds
- Tailwind CSS for responsive styling
- shadcn/ui for components
- Zustand for state management
- React Router DOM for navigation

### Data Visualization

- (Future implementation) Three.js for 3D rendering
- (Future implementation) React Three Fiber
- Interactive data visualization components

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/3d-air-pollution-map.git
cd 3d-air-pollution-map

# Install dependencies
yarn install

# Start the development server
yarn dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Generate a production build
yarn build

# Preview the production build
yarn preview
```

## Project Structure

```
3d-air-pollution-map/
├── src/                  # Source code
│   ├── assets/           # Static assets
│   ├── components/       # Reusable UI components
│   │   └── ui/           # shadcn/ui components
│   ├── layouts/          # Layout components
│   ├── lib/              # Utility functions and helpers
│   ├── pages/            # Page components
│   ├── stores/           # Zustand state stores
│   └── styles/           # SCSS stylesheets
├── public/               # Public assets
├── index.html            # HTML entry point
└── package.json          # Project dependencies
```

## Code Quality

This project uses:

- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- lint-staged for running linters on git staged files

## Future Enhancements

- Integration with real-time air quality APIs
- Advanced 3D visualization with Three.js
- Time-series visualizations of pollution data
- User location-based data filtering
- Comparative analysis between regions
- Mobile app versions

## License

MIT

## Acknowledgements

- Air quality data sources
- Open-source visualization libraries
- Community contributors
