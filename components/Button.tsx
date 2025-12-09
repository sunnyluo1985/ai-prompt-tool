import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  icon,
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";
  
  const variants = {
    primary: `
      bg-gradient-to-r from-teal-600 to-emerald-600 
      text-white 
      hover:from-teal-500 hover:to-emerald-500 
      border border-teal-500/30 
      shadow-[0_0_20px_rgba(20,184,166,0.3)] 
      hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]
    `,
    secondary: `
      bg-zinc-900/50 backdrop-blur-md
      text-zinc-100 
      hover:bg-zinc-800/80 
      border border-white/10 hover:border-white/20
    `,
    ghost: "text-zinc-400 hover:text-white hover:bg-white/5",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {/* Shine effect for primary button */}
      {variant === 'primary' && !isLoading && !disabled && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
      
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span className="animate-pulse">AI 思考中...</span>
        </>
      ) : (
        <>
          {icon && <span className="mr-2 group-hover:scale-110 transition-transform">{icon}</span>}
          <span className="relative z-10">{children}</span>
        </>
      )}
    </button>
  );
};