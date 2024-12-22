import React, { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';
import '../css/landing.css';

const Background3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const app = new Application(canvas);
    app.load('https://prod.spline.design/FiblkEZ8F88O39Aa/scene.splinecode');

    return () => {
      app.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="background-3d" />;
};

export default Background3D;