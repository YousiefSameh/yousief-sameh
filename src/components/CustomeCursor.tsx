import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-[50px] h-[50px] bg-[#2dc65346] rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        filter: "blur(12px)",
        // backdropFilter: "blur(2px)",
      }}
    />
  );
};

export default CustomCursor;
