"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

export function BeforeAfterSlider({ beforeImage, afterImage }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback((e) => {
    isDragging.current = true;
    handleMove(e.clientX);
  }, [handleMove]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  }, [handleMove]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchStart = useCallback((e) => {
    isDragging.current = true;
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-lg overflow-hidden cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* After image (full width) */}
        <img
          src={afterImage}
          alt="After - with new door"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        
        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Before - original"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: `${100 / (sliderPosition / 100)}%` }}
            draggable={false}
          />
        </div>
        
        {/* Slider line and handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
            <div className="flex gap-1">
              <div className="w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-neutral-800" />
              <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-neutral-800" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 rounded text-sm text-white">
          Before
        </div>
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 rounded text-sm text-white">
          After
        </div>
      </div>
    </motion.div>
  );
}
