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
├── public/               # Public assets
├── src/                  # Source code
│   ├── assets/           # Static assets
│   ├── components/       # UI components
│   │   ├── common/       # Common reusable components
│   │   ├── features/     # Feature-specific components
│   │   └── ui/           # shadcn/ui components
│   ├── constants/        # Application constants
│   ├── layouts/          # Layout components
│   ├── lib/              # Utility functions and helpers
│   │   ├── contexts/     # React contexts
│   │   ├── db/           # Database related code
│   │   └── hooks/        # Custom React hooks
│   ├── pages/            # Page components
│   ├── stores/           # Zustand state stores
│   ├── styles/           # SCSS stylesheets
│   │   ├── base/         # Base styles
│   │   ├── layouts/      # Layout styles
│   │   ├── themes/       # Theme-related styles
│   │   └── utils/        # Style utilities
│   ├── tests/            # Test files
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── components.json       # shadcn/ui components configuration
├── index.html            # HTML entry point
├── package.json          # Project dependencies
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.ts        # Vite configuration
```

## Testing

This project uses:

- Vitest for unit and component testing
- React Testing Library for component tests

Run tests with:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Generate test coverage report
yarn test:coverage
```

## Code Quality

This project uses:

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking
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
