import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isFullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      isFullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-mono font-medium tracking-[0.12em] uppercase transition-all duration-300 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[var(--color-earth-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-primary)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer relative group overflow-hidden select-none';

    const sizeStyles = {
      sm: 'px-3.5 py-2.5 text-[11px] gap-1.5 min-h-[44px] sm:min-h-0',
      md: 'px-5 py-3 text-xs gap-2 min-h-[44px]',
      lg: 'px-7 py-4 text-sm gap-2.5 min-h-[48px]',
    };

    const variantStyles = {
      primary:
        'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] border border-[var(--color-text-primary)] hover:bg-[var(--color-earth-accent)] hover:border-[var(--color-earth-accent)] hover:text-white',
      secondary:
        'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-stone)] hover:border-[var(--color-earth-accent-border)] hover:bg-[var(--color-bg-card-hover)]',
      accent:
        'bg-[var(--color-earth-accent)] text-white border border-[var(--color-earth-accent)] hover:bg-[var(--color-earth-accent-hover)] hover:border-[var(--color-earth-accent-hover)]',
      outline:
        'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-medium)] hover:border-[var(--color-earth-accent)] hover:text-[var(--color-earth-accent)]',
      ghost:
        'bg-transparent text-[var(--color-text-secondary)] border border-transparent hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]',
      text:
        'bg-transparent text-[var(--color-text-primary)] hover:text-[var(--color-earth-accent)] px-0 py-0 rounded-none border-b border-[var(--color-earth-accent)] hover:border-[var(--color-earth-accent-hover)] gap-1.5',
    };

    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            baseStyles,
            sizeStyles[size],
            variantStyles[variant],
            isFullWidth && 'w-full',
            className
          )
        )}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5">
            {icon}
          </span>
        )}
        <span className="relative z-10">{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
