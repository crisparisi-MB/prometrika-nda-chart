interface AsteriskIconProps {
  className?: string;
}

export function AsteriskIcon({ className = "w-10 h-10" }: AsteriskIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform="translate(12, 12)">
        <line x1="0" y1="-2.7" x2="0" y2="2.7" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
        <line x1="-2.34" y1="-1.35" x2="2.34" y2="1.35" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
        <line x1="-2.34" y1="1.35" x2="2.34" y2="-1.35" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
