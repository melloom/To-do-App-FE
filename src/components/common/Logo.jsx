import React from 'react';

const Logo = ({ width = 192, height = 192 }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 192 192"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" fill="#4A6FA5" rx="24" />
      <text 
        x="50%" 
        y="50%" 
        fontSize="80" 
        fontWeight="bold" 
        fontFamily="Arial, sans-serif"
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="middle"
      >
        T
      </text>
      <circle cx="140" cy="60" r="20" fill="#FFD166" />
      <path d="M40 85 L75 120 L130 65" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default Logo;