import { useState, useEffect } from 'react';

export const useResolution = () => {
  const [resolution, setResolution] = useState({ width: window.innerWidth, height: window.innerHeight });
  function handleResize() {
    setResolution({ width: window.innerWidth, height: window.innerHeight });
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [resolution]);
  return resolution;
};
