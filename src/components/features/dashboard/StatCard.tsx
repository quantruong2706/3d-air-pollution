import React, { ReactNode } from 'react';

interface StatCardProps {
  readonly title: string;
  readonly value: string | number;
  readonly icon: ReactNode;
  readonly change?: {
    value: number;
    isPositive: boolean;
  };
  readonly subtitle?: string;
  readonly colorClass?: string;
}

/**
 * Summary statistic card component with icon and optional trend indicator
 */
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  subtitle,
  colorClass = 'bg-blue-500',
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center">
          {/* Icon */}
          <div className={`${colorClass} p-2 rounded-lg text-white`}>{icon}</div>

          {/* Title and values */}
          <div className="ml-4 flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {title}
            </h3>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>

              {/* Change indicator */}
              {change && (
                <span
                  className={`ml-2 text-sm font-medium flex items-center ${
                    change.isPositive
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  <span className="sr-only">
                    {change.isPositive ? 'Increased by' : 'Decreased by'}
                  </span>
                  <svg
                    className="h-4 w-4 self-center"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {change.isPositive ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    )}
                  </svg>
                  <span>{Math.abs(change.value)}%</span>
                </span>
              )}
            </div>

            {/* Optional subtitle */}
            {subtitle && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
