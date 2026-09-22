import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Eyebrow } from './Eyebrow';

export interface SectionHeaderProps {
  index?: string;
  eyebrow?: string;
  title: string;
  highlightWord?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  layout?: 'stacked' | 'split';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  eyebrow,
  title,
  highlightWord,
  subtitle,
  align = 'left',
  layout = 'stacked',
  className,
}) => {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  const renderTitle = () => {
    if (!highlightWord || !title.includes(highlightWord)) {
      return title;
    }

    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-[var(--color-earth-accent)] font-normal italic">
          {highlightWord}
        </span>
        {parts[1]}
      </>
    );
  };

  if (layout === 'split') {
    return (
      <div
        className={twMerge(
          clsx(
            'grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 lg:mb-20 pb-8 border-b border-[var(--color-border-stone)]',
            className
          )
        )}
      >
        <div className="lg:col-span-7 flex flex-col items-start">
          {(eyebrow || index) && (
            <Eyebrow index={index} className="mb-4">
              {eyebrow || ''}
            </Eyebrow>
          )}

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight leading-[1.1]">
            {renderTitle()}
          </h2>
        </div>

        {subtitle && (
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] font-normal leading-relaxed max-w-xl">
              {subtitle}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        clsx('flex flex-col max-w-4xl mb-12 lg:mb-16', alignStyles[align], className)
      )}
    >
      {(eyebrow || index) && (
        <Eyebrow index={index} className="mb-4">
          {eyebrow || ''}
        </Eyebrow>
      )}

      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight leading-[1.1] mb-6">
        {renderTitle()}
      </h2>

      {subtitle && (
        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed font-normal max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
