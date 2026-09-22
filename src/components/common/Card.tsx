import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'panel' | 'outlined' | 'elevated' | 'accent';
  hoverEffect?: boolean;
  showCrosshair?: boolean;
  index?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'panel',
  hoverEffect = true,
  showCrosshair = false,
  index,
  className,
  ...props
}) => {
  const variantStyles = {
    panel: 'bg-[var(--color-bg-card)] border border-[var(--color-border-stone)]',
    outlined: 'bg-transparent border border-[var(--color-border-stone)]',
    elevated: 'bg-[var(--color-bg-elevated)] border border-[var(--color-border-medium)]',
    accent: 'bg-[var(--color-bg-card)] border border-[var(--color-earth-accent-border)]',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'arch-card relative p-6 sm:p-8 rounded-[2px] transition-all duration-500 group overflow-hidden',
          variantStyles[variant],
          hoverEffect && 'hover:border-[var(--color-earth-accent-border)] hover:bg-[var(--color-bg-card-hover)]',
          className
        )
      )}
      {...props}
    >
      {/* Corner Crosshair Detail */}
      {showCrosshair && (
        <>
          <span className="absolute top-2 left-2 font-mono text-[10px] text-[var(--color-earth-accent)] opacity-40 group-hover:opacity-100 transition-opacity">
            +
          </span>
          <span className="absolute bottom-2 right-2 font-mono text-[10px] text-[var(--color-earth-accent)] opacity-40 group-hover:opacity-100 transition-opacity">
            +
          </span>
        </>
      )}

      {/* Index indicator */}
      {index && (
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--color-border-stone)] group-hover:border-[var(--color-border-medium)] transition-colors">
          <span className="font-mono text-xs text-[var(--color-earth-accent)] tracking-widest uppercase">
            {index}
          </span>
          <div className="w-1.5 h-1.5 bg-[var(--color-border-stone)] group-hover:bg-[var(--color-earth-accent)] transition-colors" />
        </div>
      )}

      {children}
    </div>
  );
};

export default Card;
