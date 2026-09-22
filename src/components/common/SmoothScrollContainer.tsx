import React from 'react';
import { useLenis } from '../../hooks/useLenis';

export interface SmoothScrollContainerProps {
  children: React.ReactNode;
}

export const SmoothScrollContainer: React.FC<SmoothScrollContainerProps> = ({ children }) => {
  // Initialize Lenis smooth scrolling engine
  useLenis({
    duration: 1.2,
    smoothWheel: true,
  });

  return <div className="smooth-scroll-wrapper relative w-full overflow-hidden">{children}</div>;
};
