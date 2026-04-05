import React, { useEffect, useState } from 'react';

const MouseGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      // Using requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };
    
    // Determine if interacting with clickable elements to increase brightness
    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-all duration-300 ease-out mix-blend-screen"
      style={{
        background: `radial-gradient(${isHovering ? '400px' : '600px'} circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, ${isHovering ? '0.08' : '0.04'}), transparent 40%)`
      }}
    />
  );
};

export default MouseGlow;
