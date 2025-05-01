import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../constants/routes/paths';

// Layouts
import RootLayout from '../layouts/RootLayout';

// Pages
import Home from '../pages/Home';
import AirPollutionMap from '../pages/AirPollutionMap';
import NotFound from '../pages/NotFound';

/**
 * Application router configuration
 */
const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
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
