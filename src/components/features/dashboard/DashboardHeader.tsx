import React from 'react';
import { Bell, Search, Clock } from 'lucide-react';
import { useMemo } from 'react';

interface DashboardHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
}

/**
 * Header component for the dashboard with search, notifications and date/time
 */
const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
  const currentDate = useMemo(() => {
    const date = new Date();
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Title and subtitle */}
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
            )}
          </div>

          {/* Header controls */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Search */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary/40 focus:border-primary block w-full pl-10 p-2"
              />
            </div>

            {/* Date and time */}
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock size={16} className="mr-2" />
              <span>{currentDate}</span>
            </div>

            {/* Notifications */}
            <button
              type="button"
              className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <span className="sr-only">View notifications</span>
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
