import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import './styles/main.scss';

// Import layouts and pages
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/Home';
import AboutPage from './pages/VisualizationPage';
import NotFoundPage from './pages/NotFound';

// Create router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
