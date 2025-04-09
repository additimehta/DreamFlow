
import React, { useEffect, useRef } from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    // Animation for floating clouds
    cloudRefs.current.forEach((cloud, index) => {
      if (!cloud) return;
      
      const speed = 0.1 + Math.random() * 0.2;
      const delay = Math.random() * 10;
      const initialLeft = Math.random() * 100;
      
      const animate = () => {
        let position = initialLeft;
        let direction = 1;
        
        const moveCloud = () => {
          if (position > 105) direction = -1;
          if (position < -5) direction = 1;
          
          position += speed * direction;
          if (cloud) cloud.style.left = `${position}%`;
          
          requestAnimationFrame(moveCloud);
        };
        
        setTimeout(() => requestAnimationFrame(moveCloud), delay * 1000);
      };
      
      animate();
    });
  }, []);
  
  // Create cloud elements
  const createClouds = () => {
    const clouds = [];
    for (let i = 0; i < 6; i++) {
      const size = 40 + Math.random() * 50;
      const top = Math.random() * 90;
      const opacity = 0.2 + Math.random() * 0.3;
      
      clouds.push(
        <div
          key={i}
          ref={el => cloudRefs.current[i] = el}
          className={`fixed -z-10 blur-3xl rounded-full transition-all duration-1000`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${Math.random() * 100}%`,
            opacity,
            backgroundColor: i % 2 === 0 
              ? 'rgba(195, 55, 255, 0.2)' 
              : 'rgba(55, 125, 255, 0.2)'
          }}
        />
      );
    }
    return clouds;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-inter bg-gradient-to-br from-primary/20 via-background to-secondary/20 dark:from-primary/10 dark:via-background dark:to-secondary/10 animate-background-shift">
      <Header />
      <main className="w-full px-4 md:px-6 lg:px-8 xl:px-12">
        {children}
      </main>
      
      {createClouds()}
      
      <div className="fixed -z-10 top-0 left-0 w-[400px] h-[400px] bg-primary/30 dark:bg-primary/20 rounded-full blur-3xl" />
      <div className="fixed -z-10 bottom-0 right-0 w-[400px] h-[400px] bg-secondary/30 dark:bg-secondary/20 rounded-full blur-3xl" />
    </div>
  );
};

export default Layout;
