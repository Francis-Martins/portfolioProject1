import React, { useState, useEffect, useRef } from 'react';

const ScrollReveal = ({ 
  children, 
  delay = 0, 
  duration = 500, 
  threshold = 0.1,
  direction = 'fadeUp' // 'fadeUp', 'slideLeft', 'scaleIn'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, isVisible]);

  // Define animation classes based on direction
  const hiddenClasses = {
    fadeUp: 'opacity-0 translate-y-8',
    slideLeft: 'opacity-0 translate-x-12',
    scaleIn: 'opacity-0 scale-90'
  };

  const visibleClasses = 'opacity-100 translate-y-0 translate-x-0 scale-100';

  return (
    <div
      id="scroll-reveal"
      ref={ref}
      className={`transition-all ease-out ${
        isVisible ? visibleClasses : hiddenClasses[direction] || hiddenClasses.fadeUp
      }`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;