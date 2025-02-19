export function Logo({ className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 100 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-auto h-8 ${className}`}
      {...props}
    >
      <g className="animate-in fade-in duration-1000">
        <path
          d="M15 8h20v24a8 8 0 0 1-8 8H15V8Z"
          className="fill-blue-500 animate-pulse"
          style={{ animationDuration: "3s" }}
          filter="url(#glow)"
        />
        <circle cx="25" cy="20" r="4" className="fill-white" filter="url(#keyhole-glow)" />
        <path d="M45 8h20v32H45zM75 8h10v32H75z" className="fill-blue-500" filter="url(#glow)" />
      </g>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
          <feFlood floodColor="#60A5FA" floodOpacity="0.5" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="keyhole-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
          <feFlood floodColor="#FFFFFF" floodOpacity="0.8" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}

