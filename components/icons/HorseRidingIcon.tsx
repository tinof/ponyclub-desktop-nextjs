import React from 'react';

interface HorseRidingIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const HorseRidingIcon: React.FC<HorseRidingIconProps> = ({ 
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
      aria-label="Horse riding activity"
    >
      {/* Horse head and neck */}
      <path
        d="M8 6c0-1 1-2 2-2s2 1 2 2v2c0 1-1 2-2 2s-2-1-2-2V6z"
        fill={color}
        opacity="0.8"
      />
      
      {/* Horse ears */}
      <path
        d="M9 4l-1-1M11 4l1-1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Horse body */}
      <ellipse
        cx="10"
        cy="12"
        rx="3"
        ry="2"
        fill={color}
        opacity="0.7"
      />
      
      {/* Horse legs */}
      <path
        d="M8 14v4M12 14v4M7 14v3M13 14v3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Rider silhouette */}
      <circle
        cx="14"
        cy="8"
        r="1.5"
        fill={color}
      />
      <path
        d="M14 9.5v2.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Rider legs */}
      <path
        d="M13 12l-1 2M15 12l1 2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Horse tail */}
      <path
        d="M7 12c-1 1-1 3 0 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Ground line */}
      <path
        d="M2 20h20"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
};

export default HorseRidingIcon;
