import circle from "/circle-image.png";


export default function DictionaryBackground() {
  return (
    <div className="w-full fixed h-screen overflow-hidden inset-0 -z-20">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="letterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.15 }} />
            <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.08 }} />
          </linearGradient>

          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#94a3b8" opacity="0.15" />
          </pattern>
        </defs>


        <g opacity="0.5" fontFamily="Georgia, serif" fontWeight="300">
          <text x="300" y="600" fontSize="120" fill="url(#letterGradient)">ក</text>
          <text x="1200" y="250" fontSize="90" fill="url(#letterGradient)">អ</text>
          <text x="600" y="150" fontSize="100" fill="url(#letterGradient)">ហ</text>
          <text x="200" y="700" fontSize="85" fill="url(#letterGradient)">ន</text>
          <text x="1000" y="650" fontSize="95" fill="url(#letterGradient)">ឋ</text>
        </g>


      </svg>


      {/* below is a spinning circle, it needs resources to run (Performance drop)  */}

      <div className="absolute -right-20 top-10 size-[600px] animate-spin [animation-duration:15s]">
        <img
          src={circle}
          alt=""
          className="absolute inset-0 w-full h-full opacity-60 brightness-50"
        />

        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4  rounded-full flex items-center justify-center bg-gray-200 p-3" >ក</div>
          <div className="absolute right-0 top-1/2 rotate-90 -translate-y-1/2 translate-x-1/2 size-4  rounded-full flex items-center justify-center bg-gray-200 p-3" >ខ</div>

          <div className="absolute left-[135px] rotate-90 top-1/2 -translate-x-1/2 translate-y-1/2 size-4 rounded-full flex items-center justify-center bg-gray-200 p-3" >គ</div>
        </div>
      </div>


    </div>
  );
}