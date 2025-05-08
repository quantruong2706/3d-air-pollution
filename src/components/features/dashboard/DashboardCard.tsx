import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardCardProps {
  readonly title: string;
  readonly icon?: ReactNode;
  readonly accentColor?: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly headerRightContent?: ReactNode;
  readonly noPadding?: boolean;
}

/**
 * Standardized card component for dashboard with consistent styling
 */
const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  accentColor = 'blue',
  children,
  className = '',
  headerRightContent,
  noPadding = false,
}) => {
  // Map color names to Tailwind classes
  const colorMap: Record<string, string> = {
    blue: 'border-l-blue-500 from-blue-50',
    green: 'border-l-green-500 from-green-50',
    orange: 'border-l-orange-500 from-orange-50',
    purple: 'border-l-purple-500 from-purple-50',
    red: 'border-l-red-500 from-red-50',
    indigo: 'border-l-indigo-500 from-indigo-50',
  };

  const accentClasses = colorMap[accentColor] || colorMap.blue;

  return (
    <Card className={`overflow-hidden border-l-4 ${accentClasses} ${className}`}>
      <CardHeader className="bg-gradient-to-r from-transparent to-transparent p-4 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            {icon && <div className={`text-${accentColor}-500`}>{icon}</div>}
            <span>{title}</span>
          </CardTitle>
          {headerRightContent && <div className="flex items-center">{headerRightContent}</div>}
        </div>
      </CardHeader>
      <CardContent className={noPadding ? 'p-0' : 'p-4'}>{children}</CardContent>
    </Card>
  );
};

export default DashboardCard;
