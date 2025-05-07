import React from 'react';

interface LoadingSpinnerProps {
  readonly text?: string;
  readonly size?: 'small' | 'medium' | 'large';
  readonly variant?: 'light' | 'dark' | 'primary' | 'success' | 'warning' | 'danger' | 'gradient';
  readonly className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text,
  size = 'medium',
  variant = 'primary',
  className = '',
}) => {
  // Size mappings
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
  };

  // Variant mappings
  const variantClasses = {
    light: 'text-white',
    dark: 'text-blue-600',
    primary: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500',
    gradient:
      'text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500',
  };

  const glowClasses = {
    light: 'shadow-[0_0_15px_rgba(255,255,255,0.7)]',
    dark: 'shadow-[0_0_15px_rgba(37,99,235,0.7)]',
    primary: 'shadow-[0_0_15px_rgba(59,130,246,0.7)]',
    success: 'shadow-[0_0_15px_rgba(34,197,94,0.7)]',
    warning: 'shadow-[0_0_15px_rgba(234,179,8,0.7)]',
    danger: 'shadow-[0_0_15px_rgba(239,68,68,0.7)]',
    gradient: 'shadow-[0_0_15px_rgba(168,85,247,0.7)]',
  };

  const containerClasses = {
    light: 'bg-blue-600/10 text-white',
    dark: 'bg-white/10 text-gray-800',
    primary: 'bg-blue-500/10 text-blue-600',
    success: 'bg-green-500/10 text-green-600',
    warning: 'bg-yellow-500/10 text-yellow-700',
    danger: 'bg-red-500/10 text-red-600',
    gradient: 'bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 text-gray-800',
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-6 rounded-lg ${containerClasses[variant]} ${className}`}
    >
      <div className="relative">
        <div
          className={`${sizeClasses[size]} ${variantClasses[variant]} ${glowClasses[variant]} animate-spin rounded-full border-4 border-solid ${variant === 'gradient' ? 'border-l-purple-500 border-t-pink-500 border-r-transparent border-b-red-500' : 'border-current border-r-transparent'} align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
          role="status"
        />
        <div
          className={`${sizeClasses[size]} absolute top-0 left-0 ${variantClasses[variant]} animate-ping rounded-full border-4 border-solid ${variant === 'gradient' ? 'border-l-purple-500/30 border-t-pink-500/30 border-r-transparent border-b-red-500/30' : 'border-current'} opacity-20 align-[-0.125em] motion-reduce:animate-none`}
          aria-hidden="true"
        />
      </div>
      {text && (
        <div className={`mt-3 text-center font-medium ${variantClasses[variant]}`}>{text}</div>
      )}
    </div>
  );
};

export default LoadingSpinner;
