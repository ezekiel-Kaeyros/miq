'use client';
import React, { HTMLAttributes } from 'react';

import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion';
interface AnimateClickProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AnimateClick: React.FC<AnimateClickProps> = ({ children }) => {
  return (
    <motion.div
      className="cursor-pointer"
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateClick;
