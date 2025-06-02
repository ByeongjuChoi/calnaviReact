import React, { useEffect, useRef } from 'react';

const MouseFollower: React.FC = () => {
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (followerRef.current) {
        followerRef.current.style.left = `${e.clientX}px`;
        followerRef.current.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={followerRef}
      style={{
        position: 'fixed',
        width: '32px', // 추천 사이즈
        height: '32px',
        backgroundImage: 'url(/images/metamong1.gif)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
      }}
    />
  );
};

export default MouseFollower;