"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, ImageIcon } from "lucide-react";

export function ImageUploader({ onImageCapture, uploadedImage, onClear }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    }
  }, []);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const processFile = (file) => {
    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a JPG, PNG, or WebP image.");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("Image must be less than 10MB.");
      return;
    }

    // Convert to data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageCapture(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <AnimatePresence mode="wait">
        {uploadedImage ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-800"
          >
            <img
              src={uploadedImage}
              alt="Uploaded home"
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClear}
              className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full
                       transition-colors duration-200"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            className={`
              w-full aspect-[4/3] rounded-xl border-2 border-dashed cursor-pointer
              flex flex-col items-center justify-center gap-4 transition-all duration-300
              ${isDragging 
                ? "border-amber-400 bg-amber-400/10" 
                : "border-neutral-600 hover:border-neutral-500 bg-neutral-800/50 hover:bg-neutral-800"
              }
            `}
          >
            <div className={`
              p-4 rounded-full transition-colors duration-300
              ${isDragging ? "bg-amber-400/20" : "bg-neutral-700"}
            `}>
              {isDragging ? (
                <ImageIcon className="w-8 h-8 text-amber-400" />
              ) : (
                <Upload className="w-8 h-8 text-neutral-400" />
              )}
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-white mb-1">
                Upload a photo of your doorway
              </p>
              <p className="text-sm text-neutral-400">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-neutral-500 mt-2">
                JPG, PNG, or WebP • Max 10MB
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
