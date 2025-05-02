import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../constants/routes/paths';

// Layouts
import RootLayout from '../layouts/RootLayout';

// Pages
import Dashboard from '../pages/Dashboard';
import AirPollutionMap from '../pages/VisualizationPage';
import NotFound from '../pages/NotFound';

/**
 * Application router configuration
 */
const router = createBrowserRouter([
  {
    path: ROUTES.DASHBOARD,
    element: <RootLayout />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.AIR_POLLUTION_MAP,
        element: <AirPollutionMap />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
