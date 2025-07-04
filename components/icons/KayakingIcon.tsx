import React from 'react';

interface KayakingIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const KayakingIcon: React.FC<KayakingIconProps> = ({ 
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
      aria-label="Kayaking activity"
    >
      {/* Kayak hull */}
      <path
        d="M2 15c0-1 1-1.5 2-1.5h16c1 0 2 0.5 2 1.5s-1 1.5-2 1.5H4c-1 0-2-0.5-2-1.5z"
        fill={color}
        opacity="0.8"
      />
      
      {/* Kayak pointed ends */}
      <path
        d="M2 15l-1-1v2l1-1zM22 15l1-1v2l-1-1z"
        fill={color}
        opacity="0.6"
      />
      
      {/* Person silhouette */}
      <circle
        cx="12"
        cy="10"
        r="1.5"
        fill={color}
      />
      <path
        d="M12 11.5v2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Paddle */}
      <path
        d="M6 8l6 4 6-4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Paddle blades */}
      <ellipse
        cx="6"
        cy="8"
        rx="1.5"
        ry="3"
        fill={color}
        opacity="0.7"
        transform="rotate(-30 6 8)"
      />
      <ellipse
        cx="18"
        cy="8"
        rx="1.5"
        ry="3"
        fill={color}
        opacity="0.7"
        transform="rotate(30 18 8)"
      />
      
      {/* Water ripples */}
      <path
        d="M3 18c2-1 4-1 6 0s4 1 6 0 4-1 6 0"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
};

export default KayakingIcon;
