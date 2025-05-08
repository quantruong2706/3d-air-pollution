import { ROUTES } from '@/constants/routes/paths';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-background shadow-sm px-8 py-4 z-100">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-lg font-bold text-foreground">
            Air Pollution
          </Link>
        </div>
        <nav className="flex gap-4">
          <Link
            to={ROUTES.DASHBOARD}
            className={`text-sm ${
              isActive(ROUTES.DASHBOARD)
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to={ROUTES.MAP_BOX_FACTORY}
            className={`text-sm ${
              isActive(ROUTES.MAP_BOX_FACTORY)
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Factory
          </Link>
          <Link
            to={ROUTES.AIR_POLLUTION_MAP}
            className={`text-sm ${
              isActive(ROUTES.AIR_POLLUTION_MAP)
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Map
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
