interface GradientCheckIconProps {
  className?: string;
}

export function GradientCheckIcon({ className = "w-8 h-8" }: GradientCheckIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="16"
        cy="16"
        r="15"
        fill="#4A3B6B"
        stroke="none"
      />
      <path
        d="M9 16.5 L13.5 21 L23 11.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
