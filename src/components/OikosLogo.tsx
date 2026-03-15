import { cn } from "@/lib/utils";

interface OikosLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white" | "dark";
}

export function OikosLogo({ className, size = "md", variant = "default" }: OikosLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  };

  const gradientId = `logo-gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeClasses[size], className)}
      aria-label="Oikos Energy Logo"
    >
      <defs>
        {/* Main gradient - emerald to cyan */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        
        {/* Glow filter for premium effect */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Outer sun rays (8 rays) */}
      <g opacity="0.6" filter="url(#glow)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 50 + Math.cos(rad) * 35;
          const y1 = 50 + Math.sin(rad) * 35;
          const x2 = 50 + Math.cos(rad) * 45;
          const y2 = 50 + Math.sin(rad) * 45;
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={`url(#${gradientId})`}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          );
        })}
      </g>

      {/* House roof (subtle Oikos reference) - top triangle */}
      <path
        d="M 50 20 L 70 35 L 30 35 Z"
        fill={`url(#${gradientId})`}
        opacity="0.9"
      />

      {/* Central circle (sun core) */}
      <circle
        cx="50"
        cy="50"
        r="22"
        fill={`url(#${gradientId})`}
        filter="url(#glow)"
      />

      {/* Inner house shape - geometric */}
      <g fill="#0f172a" opacity="0.95">
        {/* Roof peak */}
        <path d="M 50 35 L 60 42 L 40 42 Z" />
        
        {/* House body */}
        <rect x="42" y="42" width="16" height="14" rx="1" />
        
        {/* Door */}
        <rect x="48" y="48" width="4" height="8" rx="0.5" fill="#10b981" opacity="0.4" />
        
        {/* Window */}
        <rect x="52" y="44" width="3" height="3" rx="0.5" fill="#10b981" opacity="0.4" />
      </g>

      {/* Energy wave accent (bottom) */}
      <path
        d="M 35 60 Q 50 63 65 60"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
    </svg>
  );
}