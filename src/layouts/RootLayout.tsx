import { Outlet } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';
import { useEffect } from 'react';
import Header from './Header';

const RootLayout = () => {
  const { isDarkMode } = useAppStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
