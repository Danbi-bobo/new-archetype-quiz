import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  // Flat Linear Style: Less rounding, no shadows, distinct borders
  const baseStyles = "py-3 px-8 rounded-lg font-medium transition-all duration-200 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";
  
  const variants = {
    // Solid fill, no shadow
    primary: "bg-stone-900 text-stone-50 border border-stone-900 hover:bg-stone-700 hover:border-stone-700",
    // Light background
    secondary: "bg-stone-100 text-stone-900 border border-stone-200 hover:bg-stone-200 hover:border-stone-300",
    // Explicit outline
    outline: "bg-transparent border border-stone-300 text-stone-900 hover:border-stone-900 hover:bg-stone-50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};