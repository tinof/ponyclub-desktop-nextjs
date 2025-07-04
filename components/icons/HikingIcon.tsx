import React from 'react';

interface HikingIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const HikingIcon: React.FC<HikingIconProps> = ({ 
  className = '', 
  size = 24, 
  color = 'currentColor' 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Hiking activity"
    >
      {/* Mountains */}
      <path
        d="M2 18l4-6 3 2 4-8 3 4 4-6 2 3v11H2z"
        fill={color}
        opacity="0.6"
      />
      
      {/* Mountain peaks */}
      <path
        d="M2 18l4-6 3 2 4-8 3 4 4-6 2 3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Hiker silhouette */}
      <circle
        cx="8"
        cy="6"
        r="1.5"
        fill={color}
      />
      <path
        d="M8 7.5v4M7 9l2 1M6 11.5l2-1 2 3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Hiking stick */}
      <path
        d="M6 8l-1-3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Backpack */}
      <path
        d="M9 8c0-0.5 0.5-1 1-1s1 0.5 1 1v2c0 0.5-0.5 1-1 1s-1-0.5-1-1V8z"
        fill={color}
        opacity="0.7"
      />
      
      {/* Trail path */}
      <path
        d="M2 20c2-1 4 0 6-1s4 0 6-1 4 0 6-1 2 1 2 1"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      
      {/* Trees */}
      <path
        d="M18 14l1-2 1 2v4h-2v-4zM4 16l0.5-1 0.5 1v2H4v-2z"
        fill={color}
        opacity="0.5"
      />
    </svg>
  );
};

export default HikingIcon;
