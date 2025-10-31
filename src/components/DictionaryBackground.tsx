export default function DictionaryBackground() {
  return (
    <div className="w-full fixed h-screen overflow-hidden inset-0 bg-[#0a5b95]/70 -z-20">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0.05 }} />
          </linearGradient>
          
          <linearGradient id="letterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.15 }} />
            <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.08 }} />
          </linearGradient>

          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#94a3b8" opacity="0.15" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#dots)" />

        <g opacity="0.6">
          <rect x="100" y="150" width="200" height="280" rx="8" fill="url(#bookGradient)" transform="rotate(-15 200 290)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="-15 200 290"
              to="-12 200 290"
              dur="4s"
              repeatCount="indefinite"
              direction="alternate"
            />
          </rect>
          
          <rect x="1100" y="400" width="180" height="250" rx="8" fill="url(#bookGradient)" transform="rotate(12 1190 525)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="12 1190 525"
              to="15 1190 525"
              dur="5s"
              repeatCount="indefinite"
              direction="alternate"
            />
          </rect>

          <rect x="850" y="100" width="160" height="220" rx="6" fill="url(#bookGradient)" transform="rotate(8 930 210)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="8 930 210"
              to="5 930 210"
              dur="4.5s"
              repeatCount="indefinite"
              direction="alternate"
            />
          </rect>
        </g>

        <g opacity="0.5" fontFamily="Georgia, serif" fontWeight="300">
          <text x="300" y="600" fontSize="120" fill="url(#letterGradient)">ក</text>
          <text x="1200" y="250" fontSize="90" fill="url(#letterGradient)">អ</text>
          <text x="600" y="150" fontSize="100" fill="url(#letterGradient)">ហ</text>
          <text x="200" y="700" fontSize="85" fill="url(#letterGradient)">ន</text>
          <text x="1000" y="650" fontSize="95" fill="url(#letterGradient)">ឋ</text>
        </g>

        <g opacity="0.2" stroke="#475569" strokeWidth="2" fill="none">
          <line x1="400" y1="320" x2="550" y2="320" strokeDasharray="5,5">
            <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="400" y1="350" x2="600" y2="350" strokeDasharray="5,5">
            <animate attributeName="opacity" values="0.2;0.35;0.2" dur="3.5s" repeatCount="indefinite" />
          </line>
          <line x1="900" y1="500" x2="1050" y2="500" strokeDasharray="5,5">
            <animate attributeName="opacity" values="0.15;0.3;0.15" dur="4s" repeatCount="indefinite" />
          </line>
          <line x1="900" y1="530" x2="1080" y2="530" strokeDasharray="5,5">
            <animate attributeName="opacity" values="0.15;0.35;0.15" dur="3.8s" repeatCount="indefinite" />
          </line>
        </g>   
      </svg>

    </div>
  );
}