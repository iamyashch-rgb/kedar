import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'rera' | 'gold' | 'outline' | 'slate' | 'category';
  icon?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  icon = false,
  className,
}) => {
  const variantStyles = {
    rera: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40 shadow-[0_0_12px_rgba(0,168,107,0.2)]',
    gold: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    outline: 'bg-transparent text-slate-300 border-white/15',
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
    category: 'bg-amber-400/20 text-amber-200 border-amber-400/40 font-semibold',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm tracking-wide',
          variantStyles[variant],
          className
        )
      )}
    >
      {variant === 'rera' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
      {icon && variant !== 'rera' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
      {children}
    </span>
  );
};
