interface SkyProps {
  className?: string;
}

export default function Sky({ className = "" }: SkyProps) {
  return (
    <div
      className={`
        bg-gradient-to-b 
        from-blue-300 
        via-blue-200 
        to-blue-100 
        w-full 
        h-full 
        relative 
        overflow-hidden
        ${className}
      `}
    ></div>
  );
}
