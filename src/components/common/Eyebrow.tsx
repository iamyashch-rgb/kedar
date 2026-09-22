import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface EyebrowProps {
  index?: string;
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'boxed' | 'minimal';
  className?: string;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  index,
  children,
  variant = 'default',
  className,
}) => {
  const variantStyles = {
    default: 'text-[var(--color-earth-accent)]',
    accent: 'text-[var(--color-text-primary)] bg-[var(--color-earth-accent-muted)] border border-[var(--color-earth-accent-border)] px-2.5 py-1',
    boxed: 'text-[var(--color-concrete-light)] border border-[var(--color-border-stone)] px-3 py-1 bg-[var(--color-bg-tertiary)]',
    minimal: 'text-[var(--color-concrete-light)]',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] uppercase select-none',
          variantStyles[variant],
          className
        )
      )}
    >
      {/* Structural Accent Square/Dot */}
      {variant === 'default' && (
        <span className="w-1.5 h-1.5 bg-[var(--color-earth-accent)] shrink-0" />
      )}

      {index && (
        <span className="opacity-80 font-mono text-[var(--color-text-muted)]">
          {index}
        </span>
      )}

      {index && <span className="text-[var(--color-border-stone)]">//</span>}

      <span>{children}</span>
    </div>
  );
};

export default Eyebrow;
