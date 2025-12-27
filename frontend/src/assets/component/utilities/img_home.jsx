import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export const Img_home = ({ 
  src, 
  rotate = '', 
  bg = 'from-green-950 to-blue-950',
  mobileScale = 1.44,
  desktopScale = 1.3,
  maxWidth = '90%',
  maxHeight = '90vh'
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsPortrait(window.matchMedia('(orientation: portrait)').matches);
    };
    
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Desktop animations
  const scaleDesktop = useTransform(scrollYProgress, [0, 0.5], [1, desktopScale]);
  const opacityDesktop = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  // Mobile animations
  const yMobile = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
  const opacityMobile = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // Calculate optimal image dimensions for mobile
  const getMobileImageStyle = () => {
    if (isPortrait) {
      return {
        maxWidth: '80vh',
        maxHeight: '80vw'
      };
    } else {
      return {
        maxWidth: '80vw',
        maxHeight: '80vh'
      };
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full min-h-screen bg-gradient-to-br ${bg}
      flex items-center justify-center p-4 md:p-8 overflow-hidden`}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          height: isMobile ? '100vh' : 'auto',
          minHeight: isMobile ? '100vh' : 'auto'
        }}
      >
        <motion.div
          className="flex items-center justify-center w-full h-full"
          style={{
            y: isMobile ? yMobile : 0,
            scale: isMobile ? 1 : scaleDesktop,
            opacity: isMobile ? opacityMobile : opacityDesktop
          }}
        >
          <div className="relative flex items-center justify-center w-full h-full">
            <motion.img
              src={src}
              alt="Presentation Image"
              className="object-contain"
              style={{
                transformOrigin: 'center center',
                ...(isMobile ? {
                  transform: `${rotate} scale(${mobileScale})`,
                  ...getMobileImageStyle()
                } : {
                  maxWidth: maxWidth,
                  maxHeight: maxHeight,
                  width: 'auto',
                  height: 'auto'
                })
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};