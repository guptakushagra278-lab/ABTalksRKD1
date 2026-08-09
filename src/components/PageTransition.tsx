import React from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ 
        duration: 0.3, 
        ease: "easeOut"
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
