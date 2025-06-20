import React, { forwardRef, useState } from "react";
import { motion } from 'framer-motion';

const ImageDisplay = forwardRef(({ Img, size,overlayenable }, ref) => {
  const [overlay, setOverlay] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`flex justify-center items-center w-[20rem] h-[15rem] overflow-hidden relative`}
      onHoverStart={() => setOverlay(true)} 
      onHoverEnd={() => setOverlay(false)}   
    >
      <img
        src={Img}
        alt=""
        className={`w-full h-full object-cover transition-all duration-100 ease-in-out ${overlay&&overlayenable ? 'blur-xs' : ''}`}  // Transition for blur effect
      />
      <div 
        className={`absolute bg-black inset-0 z-10 transition-opacity duration-300 ease-in-out ${overlay ? 'opacity-30' : 'opacity-0'}`}  // Smooth transition for overlay opacity
      ></div>
    </motion.div>
  );
});

export default ImageDisplay;