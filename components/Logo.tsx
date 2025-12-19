
import React from 'react';

interface LogoProps {
  className?: string;
  animated?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, animated = false }) => {
  return (
    <svg 
      viewBox="0 0 160 160" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <style>
        {`
          .logo-path {
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
            animation: draw 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }
        `}
      </style>
      
      {/* Top Bar - Right aligned with the middle bar below */}
      <path 
        d="M55 45H125" 
        stroke="currentColor" 
        strokeWidth="13" 
        strokeLinecap="round" 
        className={animated ? 'logo-path' : ''}
        style={{ animationDelay: '0.1s' }}
      />
      
      {/* Main Body - Middle Bar loops LEFT to become Bottom Bar */}
      {/* Starts Right (125), goes Left (55), Arcs Down/Right to form bottom tail */}
      <path 
        d="M125 80H55A17.5 17.5 0 0 0 55 115H85" 
        stroke="currentColor" 
        strokeWidth="13" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animated ? 'logo-path' : ''}
        style={{ animationDelay: '0.3s' }}
      />
    </svg>
  );
};
