import type React from "react";

interface RaftingIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const RaftingIcon: React.FC<RaftingIconProps> = ({
  className = "",
  size = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Rafting activity"
    >
      {/* Raft base */}
      <path
        d="M3 16c0-1 1-2 2-2h14c1 0 2 1 2 2v1c0 1-1 2-2 2H5c-1 0-2-1-2-2v-1z"
        fill={color}
        opacity="0.8"
      />

      {/* Water waves */}
      <path
        d="M2 20c1-1 2-1 3 0s2 1 3 0 2-1 3 0 2 1 3 0 2-1 3 0 2 1 3 0 2-1 3 0"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Person silhouette */}
      <circle cx="12" cy="10" r="2" fill={color} />
      <path d="M12 12v2" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Paddle */}
      <path
        d="M8 8l-2-4M16 8l2-4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="6" cy="4" rx="1" ry="2" fill={color} opacity="0.7" />
      <ellipse cx="18" cy="4" rx="1" ry="2" fill={color} opacity="0.7" />
    </svg>
  );
};

export default RaftingIcon;
