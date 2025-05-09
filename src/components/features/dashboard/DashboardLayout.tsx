import React, { ReactNode } from 'react';
import { LayoutDashboard, Map, BarChart3, Settings, Info, Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/common/ThemeToggle';
import { useState } from 'react';

interface DashboardLayoutProps {
  readonly children: ReactNode;
}

interface NavItemProps {
  readonly icon: ReactNode;
  readonly label: string;
  readonly isActive?: boolean;
  readonly onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive = false, onClick }) => {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors cursor-default ${
          isActive
            ? 'bg-primary text-primary-foreground font-medium'
            : 'hover:bg-primary/10 text-gray-600 dark:text-gray-300'
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    </li>
  );
};

const DASHBOARD_NAV_ITEMS = [
  { icon: <LayoutDashboard size={18} />, label: 'Overview', id: 'overview' },
  { icon: <BarChart3 size={18} />, label: 'Analytics', id: 'analytics' },
  { icon: <Map size={18} />, label: 'Map View', id: 'map' },
  { icon: <Info size={18} />, label: 'Information', id: 'info' },
  { icon: <Settings size={18} />, label: 'Settings', id: 'settings' },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const activeSection = 'overview';
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Toggle sidebar for mobile view
  const toggleSidebar = (): void => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Mobile sidebar toggle button */}
      <button
        type="button"
        onClick={toggleSidebar}
        className="lg:hidden fixed top-16 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md text-primary"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col 
          transition-all duration-300 fixed lg:relative z-40 h-[calc(100vh-64px)]
          ${sidebarOpen ? 'w-60 left-0' : 'w-0 -left-60 lg:left-0 lg:w-20'}`}
      >
        <div className="flex flex-col flex-grow p-4">
          {/* Sidebar navigation */}
          <nav>
            <ul className="space-y-2">
              {DASHBOARD_NAV_ITEMS.map(item => (
                <NavItem
                  key={item.id}
                  icon={item.icon}
                  label={!sidebarOpen && window.innerWidth >= 1024 ? '' : item.label}
                  isActive={activeSection === item.id}
                  // onClick={() => setActiveSection(item.id)}
                />
              ))}
            </ul>
          </nav>

          <div className="mt-auto">
            {/* Settings and account controls */}
            <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-2 space-y-2">
              <div className="flex items-center justify-between px-3">
                <span className={`text-sm text-gray-500 ${!sidebarOpen && 'lg:hidden'}`}>
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto p-0">
        <main className="relative w-full h-full">
          <div className="absolute inset-0 overflow-y-auto pb-6">
            {/* Dashboard content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
