import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ArchitecturalImageProps {
  src: string;
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4' | '21/9' | 'auto';
  caption?: string;
  tag?: string;
  coordinate?: string;
  className?: string;
  imageClassName?: string;
  showOverlay?: boolean;
}

export const ArchitecturalImage: React.FC<ArchitecturalImageProps> = ({
  src,
  alt,
  aspectRatio = '16/9',
  caption,
  tag,
  coordinate,
  className,
  imageClassName,
  showOverlay = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClass = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '3/4': 'aspect-[3/4]',
    '21/9': 'aspect-[21/9]',
    'auto': 'aspect-auto',
  }[aspectRatio];

  const fallbackSrc = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop';

  return (
    <figure
      className={twMerge(
        clsx(
          'arch-image-frame relative group w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-stone)] overflow-hidden',
          aspectClass,
          className
        )
      )}
    >
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[var(--color-bg-tertiary)] animate-pulse flex items-center justify-center">
          <span className="font-mono text-xs text-[var(--color-concrete-mid)] tracking-widest uppercase">
            Loading Asset...
          </span>
        </div>
      )}

      {/* Main Image */}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={twMerge(
          clsx(
            'w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105',
            isLoaded ? 'opacity-100' : 'opacity-0',
            imageClassName
          )
        )}
      />

      {/* Architectural Hairline Frame Overlay */}
      <div className="absolute inset-0 border border-white/5 pointer-events-none group-hover:border-[var(--color-earth-accent-border)] transition-colors duration-500" />

      {/* Corner Crosshairs */}
      <span className="absolute top-2 left-2 font-mono text-[10px] text-[var(--color-earth-accent)] opacity-40 group-hover:opacity-100 transition-opacity">
        +
      </span>
      <span className="absolute bottom-2 right-2 font-mono text-[10px] text-[var(--color-earth-accent)] opacity-40 group-hover:opacity-100 transition-opacity">
        +
      </span>

      {/* Hover Light Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/80 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />
      )}

      {/* Architectural Tag / Metadata Overlay */}
      {(tag || coordinate || caption) && (
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2 pointer-events-none z-10">
          <div>
            {tag && (
              <span className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 bg-[var(--color-bg-primary)]/90 border border-[var(--color-border-stone)] text-[var(--color-earth-accent)] mb-1">
                {tag}
              </span>
            )}
            {caption && (
              <p className="text-xs text-[var(--color-text-secondary)] font-medium line-clamp-1 group-hover:text-[var(--color-text-primary)] transition-colors">
                {caption}
              </p>
            )}
          </div>
          {coordinate && (
            <span className="font-mono text-[10px] tracking-widest text-[var(--color-concrete-light)] opacity-70 shrink-0">
              [ {coordinate} ]
            </span>
          )}
        </div>
      )}
    </figure>
  );
};

export default ArchitecturalImage;
