import { Outlet, Link } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';

const RootLayout = () => {
  const { isDarkMode, toggleDarkMode } = useAppStore();

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="bg-primary/10 border-b shadow-sm dark:bg-primary/5">
        <nav className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">3D Air Pollution Map</div>
            <div className="flex items-center gap-6">
              <ul className="flex space-x-6">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
              </ul>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-primary/10 border-t p-4 mt-auto dark:bg-primary/5">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} 3D Air Pollution Map</p>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
