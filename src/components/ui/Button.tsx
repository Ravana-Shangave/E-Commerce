import React from 'react';
import { Loader } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'destructive';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', isLoading, variant = 'primary', disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors';
    
    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={`${baseStyles} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
