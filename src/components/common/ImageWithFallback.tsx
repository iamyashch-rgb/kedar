import React, { useState } from 'react';
import { generateSrcSet, getOptimizedImageUrl } from '../../config/image.config';
import { ImageOff } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: 'auto' | 'square' | 'video' | 'portrait' | 'landscape';
  className?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  aspectRatio = 'landscape',
  className,
  containerClassName,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const aspectStyles = {
    auto: 'aspect-auto',
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[16/10]',
  };

  const optimizedSrc = getOptimizedImageUrl(src, 1000);
  const srcSet = generateSrcSet(src);

  return (
    <div
      className={twMerge(
        clsx(
          'relative overflow-hidden bg-slate-900 rounded-xl',
          aspectStyles[aspectRatio],
          containerClassName
        )
      )}
    >
      {/* Loading Skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-slate-800/80 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
        </div>
      )}

      {error ? (
        <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-4 text-slate-500 text-xs text-center">
          <ImageOff className="w-8 h-8 mb-2 stroke-[1.5]" />
          <span>Image preview unavailable</span>
        </div>
      ) : (
        <img
          src={optimizedSrc}
          srcSet={srcSet || undefined}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={twMerge(
            clsx(
              'w-full h-full object-cover transition-all duration-700',
              !loaded ? 'opacity-0 scale-105' : 'opacity-100 scale-100',
              className
            )
          )}
          {...props}
        />
      )}
    </div>
  );
};
